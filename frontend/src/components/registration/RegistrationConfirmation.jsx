import { useState, useRef } from "react";
import { CheckCircle2, Copy, Download, Printer, Share2, Users, QrCode } from "lucide-react";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const RegistrationConfirmation = ({ registration, onRegisterAnother }) => {
  const [copyText, setCopyText] = useState("COPY CODE");
  const qrRef = useRef(null); // ref to the QR code canvas

  // Inside RegistrationConfirmation component

const handleShare = async () => {
  const shareData = {
    title: "UNLEASH 3.0 Registration",
    text: `UNLEASH 3.0 Registration\nName: ${registration.full_name}\nRegistration Code: ${registration.registration_id}\n\nPlease keep this code for check-in.`,
  };

  // Try to include the QR code as a file if the browser supports sharing files
  try {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas && navigator.canShare && navigator.canShare({ files: [] })) {
      // Convert canvas to blob
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas conversion failed"));
        }, "image/png");
      });

      const file = new File([blob], `${registration.registration_id}-QR.png`, {
        type: "image/png",
      });

      shareData.files = [file];
    }
  } catch {
    // If anything goes wrong, just share text
  }

  // If Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // User cancelled or error – do nothing
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
        // Fallback to clipboard copy if sharing fails
        await fallbackCopyToClipboard();
      }
    }
  } else {
    // Fallback: copy to clipboard
    await fallbackCopyToClipboard();
  }
};

const fallbackCopyToClipboard = async () => {
  try {
    const text = `UNLEASH 3.0 Registration\nName: ${registration.full_name}\nRegistration Code: ${registration.registration_id}\nPlease keep this code for check-in.`;
    await navigator.clipboard.writeText(text);
    // Show a temporary message (we can use the existing copyText state or a new one)
    setCopyText("REGISTRATION COPIED!");
    setTimeout(() => setCopyText("COPY CODE"), 2000);
  } catch (clipErr) {
    console.error("Clipboard copy failed:", clipErr);
    // Last resort: show a message with the code to manually copy
    alert(`Registration code: ${registration.registration_id}`);
  }
};

  // Safety check
  if (!registration || typeof registration !== "object") {
    return (
      <div className="text-center py-12">
        <p className="text-unleash-brown">Loading registration details…</p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(registration.registration_id);
      setCopyText("COPIED!");
      setTimeout(() => setCopyText("COPY CODE"), 2000);
    } catch {
      // ignore
    }
  };

  // Download QR code as a standalone PNG image
  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${registration.registration_id}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download the full registration confirmation as PDF (with QR)
  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("UNLEASH 3.0", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.text("ACCELERATE", 105, 28, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("REGISTRATION CONFIRMED", 105, 38, { align: "center" });

    doc.line(10, 45, 200, 45);

    // Attendee details
    doc.setFontSize(12);
    doc.text(`Attendee: ${registration.full_name}`, 15, 55);
    doc.text(`Registration Code: ${registration.registration_id}`, 15, 62);
    doc.text(`Date: September 5–6, 2026`, 15, 72);
    doc.text(`Time: 8:00 AM`, 15, 79);
    doc.text(`Venue: King's Court Assembly`, 15, 86);
    doc.text(
      "37 Olowora Road, by Deji Olowo Close, Beside Olowora Primary School, Olowora Bus Stop, Ojodu Berger, Lagos.",
      15,
      93
    );

    // Add QR code image to PDF
    const qrCanvas = qrRef.current?.querySelector("canvas");
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL("image/png");
      // Place QR code on the right side of the page
      doc.addImage(qrImage, "PNG", 130, 100, 50, 50);
    }

    // Instruction at the bottom
    doc.setFontSize(10);
    doc.text("Show this QR code or registration code at check-in.", 15, 115);

    doc.save(`UNLEASH3.0_${registration.registration_id}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Success icon */}
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-unleash-green" />
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-4">
          REGISTRATION CONFIRMED
        </h2>
        <p className="text-lg text-unleash-brown/80 mb-8">
          You're officially registered for UNLEASH 3.0.
        </p>

        {/* QR Code Card */}
        <div className="bg-unleash-cream rounded-2xl p-6 md:p-8 mb-8 inline-block w-full max-w-md">
          <p className="text-sm uppercase tracking-widest text-unleash-brown/60 mb-2">
            REGISTRATION QR CODE
          </p>
          {/* The QR code component with ref for canvas access */}
          <div ref={qrRef} className="flex justify-center mb-4">
            <QRCodeCanvas
              value={registration.registration_id}
              size={220}
              level="M"
              includeMargin
              aria-label={`Registration QR code for ${registration.registration_id}`}
            />
          </div>
          <p className="text-sm text-unleash-brown/70 mb-4">
            Show this QR code at check-in.
          </p>
          {/* Registration ID text below */}
          <p className="font-display text-xl md:text-2xl text-unleash-brown break-all mb-2">
            {registration.registration_id}
          </p>
          <p className="text-sm text-unleash-brown/70">
            Attendee: {registration.full_name}
          </p>
        </div>

        {/* Action Buttons – hidden when printing */}
        <div className="print:hidden flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-unleash-brown text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-dark-brown transition-colors text-sm"
          >
            <Copy className="w-4 h-4" />
            {copyText}
          </button>

          <button
            onClick={downloadPDF}
            className="inline-flex items-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD REGISTRATION
          </button>

          <button
            onClick={downloadQRCode}
            className="inline-flex items-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors text-sm"
          >
            <QrCode className="w-4 h-4" />
            DOWNLOAD QR CODE
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 border-2 border-unleash-brown text-unleash-brown px-6 py-3 rounded-full font-bold hover:bg-unleash-brown hover:text-white transition-colors text-sm"
          >
            <Printer className="w-4 h-4" />
            PRINT REGISTRATION
          </button>

          {navigator.share && (
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 border-2 border-unleash-brown text-unleash-brown px-6 py-3 rounded-full font-bold hover:bg-unleash-brown hover:text-white transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              SHARE
            </button>
          )}
        </div>

        {/* What to do next */}
        <div className="bg-unleash-cream rounded-2xl p-6 mb-10 max-w-md mx-auto text-left print:hidden">
          <h3 className="font-display text-xl text-unleash-brown mb-3">WHAT TO DO NEXT</h3>
          <ol className="space-y-2 text-unleash-brown/80 text-sm list-decimal list-inside">
            <li>Save your registration code and QR code.</li>
            <li>Keep it accessible on the event day.</li>
            <li>Show the QR code or registration ID to the team when you arrive.</li>
            <li>Your attendance will be confirmed at check‑in.</li>
          </ol>
        </div>

        {/* Register Another Person – hidden when printing */}
        <div className="print:hidden mt-6">
          <button
            onClick={onRegisterAnother}
            className="inline-flex items-center gap-2 text-unleash-brown font-bold hover:text-unleash-orange transition-colors"
          >
            <Users className="w-4 h-4" />
            REGISTER ANOTHER PERSON
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegistrationConfirmation;