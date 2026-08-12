import { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useApiGet } from "../../hooks/useApiGet.js";
import {
  lookupRegistration,
  checkInRegistration,
} from "../../services/registrationService";
import {
  QrCode,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Camera,
  StopCircle,
  RefreshCw,
  User,
  MapPin,
  Calendar,
} from "lucide-react";

// Validation: simple check for UNL-2026-XXXXXXXX format
const isValidRegistrationId = (code) =>
  /^UNL-2026-[A-Z0-9]{6,8}$/i.test(code.trim());

export default function CheckIn() {
  // Scanner state
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerStarting, setScannerStarting] = useState(false);

  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  // Lookup / check-in state
  const [manualCode, setManualCode] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [registration, setRegistration] = useState(null);
  const [checkInResult, setCheckInResult] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [scannedOnce, setScannedOnce] = useState(false);

  // Stats (attended count)
  const { data: statsData } = useApiGet("/api/registrations/admin/stats/");

  const stopScanner = useCallback(async () => {
    if (scannerInstanceRef.current) {
      try {
        await scannerInstanceRef.current.stop();
      } catch {
        // Scanner may already be stopped
      }

      try {
        scannerInstanceRef.current.clear();
      } catch {
        // Ignore clear errors
      }

      scannerInstanceRef.current = null;
    }

    setScannerActive(false);
    setScannerStarting(false);
  }, []);

  // ─── Lookup registration ─────────────────────
  const performLookup = useCallback(async (registrationId) => {
    setLookupLoading(true);
    setLookupError("");
    setRegistration(null);
    setCheckInResult(null);

    try {
      const data = await lookupRegistration(registrationId);
      setRegistration(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setLookupError(
          "Registration not found. No registration was found for this code."
        );
      } else {
        setLookupError(
          "Unable to look up registration. Please try again."
        );
      }
    } finally {
      setLookupLoading(false);
    }
  }, []);

  // ─── QR scan handling ────────────────────────
  const handleScannedCode = useCallback(
    async (code) => {
      if (!isValidRegistrationId(code)) {
        setLookupError("Invalid UNLEASH registration QR code.");
        await stopScanner();
        return;
      }

      // Stop scanner while processing
      await stopScanner();

      const trimmed = code.trim();
      setManualCode(trimmed);

      await performLookup(trimmed);
    },
    [stopScanner, performLookup]
  );

  // ─── Style camera video after html5-qrcode creates it ───
  const styleCameraVideo = useCallback(() => {
    const reader = document.getElementById("qr-reader");

    if (!reader) return;

    const video = reader.querySelector("video");

    if (!video) return;

    video.style.width = "100%";
    video.style.height = "auto";
    video.style.minHeight = "260px";
    video.style.maxHeight = "500px";
    video.style.display = "block";
    video.style.objectFit = "cover";
    video.style.borderRadius = "0.5rem";
    video.setAttribute("playsinline", "true");
    video.setAttribute("autoplay", "true");
    video.muted = true;
  }, []);

  // ─── QR Scanner logic ────────────────────────
  const startScanner = useCallback(async () => {
    setLookupError("");
    setRegistration(null);
    setCheckInResult(null);
    setScannedOnce(false);
    setScannerStarting(true);

    try {
      // Make sure an old scanner is completely stopped first
      if (scannerInstanceRef.current) {
        try {
          await scannerInstanceRef.current.stop();
        } catch {
          // Ignore
        }

        try {
          scannerInstanceRef.current.clear();
        } catch {
          // Ignore
        }

        scannerInstanceRef.current = null;
      }

      const reader = document.getElementById("qr-reader");

      if (!reader) {
        throw new Error("QR scanner container not found.");
      }

      // Clear anything left by a previous scanner instance
      reader.innerHTML = "";

      const html5QrCode = new Html5Qrcode("qr-reader");

      scannerInstanceRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          aspectRatio: 1.777778,
        },
        (decodedText) => {
          if (scannedOnce) return;

          setScannedOnce(true);
          handleScannedCode(decodedText);
        },
        () => {
          // Scanner continuously reports decoding attempts.
          // We intentionally ignore unsuccessful attempts.
        }
      );

      setScannerStarting(false);
      setScannerActive(true);

      // Give html5-qrcode a moment to insert the video element,
      // then style the actual camera preview.
      requestAnimationFrame(() => {
        styleCameraVideo();

        setTimeout(() => {
          styleCameraVideo();
        }, 100);
      });
    } catch (err) {
      console.error("Camera start error:", err);

      setScannerStarting(false);
      setScannerActive(false);

      if (
        err?.name === "NotAllowedError" ||
        err?.message?.toLowerCase().includes("permission")
      ) {
        setLookupError(
          "Camera access was denied. Please allow camera permission in your browser settings and try again."
        );
      } else if (
        err?.name === "NotFoundError" ||
        err?.message?.toLowerCase().includes("camera")
      ) {
        setLookupError(
          "No camera was found on this device. Please use a device with a working camera."
        );
      } else {
        setLookupError(
          "Unable to start the camera. Please ensure your browser has camera access and try again."
        );
      }

      scannerInstanceRef.current = null;
    }
  }, [scannedOnce, handleScannedCode, styleCameraVideo]);

  // ─── Cleanup on unmount ──────────────────────
  useEffect(() => {
    return () => {
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            try {
              scannerInstanceRef.current?.clear();
            } catch {
              // Ignore
            }

            scannerInstanceRef.current = null;
          });
      }
    };
  }, []);

  // Manual code search
  const handleManualSearch = (e) => {
    e.preventDefault();

    const code = manualCode.trim();

    if (!code) return;

    if (!isValidRegistrationId(code)) {
      setLookupError("Invalid UNLEASH registration code format.");
      return;
    }

    performLookup(code);
  };

  // ─── Check-in action ─────────────────────────
  const handleCheckIn = async () => {
    if (!registration) return;

    setCheckingIn(true);
    setLookupError("");

    try {
      const result = await checkInRegistration(
        registration.registration_id
      );

      setCheckInResult({
        success: true,
        alreadyCheckedIn: result.already_checked_in,
        message: result.detail || "Attendance confirmed.",
      });

      // Update registration status locally
      setRegistration((prev) => ({
        ...prev,
        status: "attended",
      }));
    } catch (err) {
      if (err.response?.status === 400) {
        const data = err.response.data;

        if (data?.detail?.includes("Cancelled")) {
          setCheckInResult({
            success: false,
            message: "This registration has been cancelled.",
          });
        } else {
          setCheckInResult({
            success: false,
            message: data?.detail || "Unable to check in.",
          });
        }
      } else {
        setLookupError("Check-in failed. Please try again.");
      }
    } finally {
      setCheckingIn(false);
    }
  };

  // ─── Reset scanner / scan next person ────────
  const resetToScanNext = async () => {
    await stopScanner();

    setRegistration(null);
    setCheckInResult(null);
    setLookupError("");
    setManualCode("");
    setScannedOnce(false);
  };

  // ─── Render ──────────────────────────────────
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="font-display text-3xl text-unleash-brown">
            Check-in
          </h1>

          <p className="text-gray-500 mt-1">
            Scan an attendee's QR code or enter their registration code.
          </p>
        </div>

        {statsData?.attended !== undefined && (
          <div className="mt-4 md:mt-0 bg-unleash-cream px-4 py-2 rounded-full text-sm font-medium">
            Checked in today: {statsData.attended}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Scanner + manual entry */}
        <div className="space-y-6">
          {/* QR Scanner */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-unleash-brown mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-unleash-orange" />
              Scan QR Code
            </h2>

            {/* Camera preview */}
            <div
              id="qr-reader"
              ref={scannerRef}
              className={`mx-auto overflow-hidden rounded-lg border-2 ${
                scannerActive || scannerStarting
                  ? "border-unleash-orange bg-black"
                  : "border-dashed border-gray-300 bg-gray-50"
              }`}
              style={{
                width: "100%",
                maxWidth: "400px",
                minHeight:
                  scannerActive || scannerStarting ? "300px" : "0px",
              }}
            />

            {/* Scanner start state */}
            {!scannerActive && !scannerStarting && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />

                <button
                  onClick={startScanner}
                  className="bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
                >
                  START SCANNER
                </button>

                <p className="text-sm text-gray-500 mt-4">
                  Allow camera access, then position the attendee's QR
                  code inside the frame.
                </p>
              </div>
            )}

            {/* Camera starting state */}
            {scannerStarting && (
              <div className="text-center mt-4">
                <div className="flex items-center justify-center gap-2 text-unleash-brown">
                  <RefreshCw className="w-5 h-5 animate-spin text-unleash-orange" />
                  <span className="font-medium">
                    Starting camera...
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Please allow camera access if your browser asks.
                </p>
              </div>
            )}

            {/* Stop scanner */}
            {scannerActive && (
              <div className="text-center mt-4">
                <button
                  onClick={stopScanner}
                  className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <StopCircle className="w-4 h-4" />
                  STOP SCANNER
                </button>
              </div>
            )}
          </div>

          {/* Manual code lookup */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-unleash-brown mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-unleash-orange" />
              Enter Registration Code
            </h2>

            <form
              onSubmit={handleManualSearch}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="UNL-2026-XXXXXXXX"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />

              <button
                type="submit"
                className="bg-unleash-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-unleash-brown transition-colors"
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Result / Lookup status */}
        <div className="space-y-6">
          {/* Loading */}
          {lookupLoading && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <RefreshCw className="w-10 h-10 animate-spin text-unleash-orange mx-auto mb-4" />

              <p className="text-unleash-brown font-medium">
                Looking up registration...
              </p>
            </div>
          )}

          {/* Error message */}
          {lookupError && !lookupLoading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />

              <p className="text-red-700 font-medium mb-2">
                {lookupError}
              </p>

              <button
                onClick={resetToScanNext}
                className="bg-white text-red-700 px-4 py-2 rounded-lg border border-red-300 hover:bg-red-100 transition-colors"
              >
                TRY AGAIN
              </button>
            </div>
          )}

          {/* Registration found */}
          {registration && !lookupLoading && !checkInResult && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />

                <h2 className="text-xl font-bold text-unleash-brown">
                  Registration Found
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />

                  <span className="font-medium text-unleash-brown">
                    {registration.full_name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-gray-400" />

                  <span className="font-mono text-sm">
                    {registration.registration_id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />

                  <span>{registration.city || "—"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />

                  <span>Age: {registration.age}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-500">
                    Status:{" "}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      registration.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : registration.status === "attended"
                        ? "bg-purple-100 text-purple-700"
                        : registration.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {registration.status}
                  </span>
                </div>

                {registration.email && (
                  <p className="text-sm text-gray-500">
                    {registration.email}
                  </p>
                )}
              </div>

              {registration.status !== "cancelled" &&
                registration.status !== "attended" && (
                  <button
                    onClick={handleCheckIn}
                    disabled={checkingIn}
                    className="w-full bg-unleash-orange text-white py-3 rounded-lg font-bold text-lg hover:bg-unleash-brown transition-colors disabled:opacity-70"
                  >
                    {checkingIn
                      ? "CHECKING IN..."
                      : "CHECK IN"}
                  </button>
                )}
            </div>
          )}

          {/* Check-in result */}
          {checkInResult && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              {checkInResult.success ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

                  <h2 className="text-2xl font-bold text-unleash-brown mb-2">
                    {checkInResult.alreadyCheckedIn
                      ? "ALREADY CHECKED IN"
                      : "ATTENDANCE CONFIRMED"}
                  </h2>

                  <p className="text-unleash-brown/80 mb-4">
                    {checkInResult.alreadyCheckedIn
                      ? "This attendee has already been checked in."
                      : checkInResult.message}
                  </p>

                  {registration && (
                    <p className="font-medium mb-4">
                      {registration.full_name} (
                      {registration.registration_id})
                    </p>
                  )}

                  <button
                    onClick={resetToScanNext}
                    className="bg-unleash-orange text-white px-8 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
                  >
                    SCAN NEXT PERSON
                  </button>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />

                  <h2 className="text-2xl font-bold text-unleash-brown mb-2">
                    CANNOT CHECK IN
                  </h2>

                  <p className="text-unleash-brown/80 mb-4">
                    {checkInResult.message}
                  </p>

                  <button
                    onClick={resetToScanNext}
                    className="bg-unleash-orange text-white px-8 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
                  >
                    SCAN NEXT PERSON
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}