import { useEffect, useState } from "react";

// Helper: format number with leading zero
const pad = (num) => String(num).padStart(2, "0");

const getTimeRemaining = (target) => {
  const now = new Date().getTime();
  const distance = target - now;

  if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isPast: false,
  };
};

const Countdown = () => {
  // Target: September 5, 2026 08:00:00 WAT (UTC+1)
  const targetDate = new Date("2026-09-05T08:00:00+01:00").getTime();
  const [time, setTime] = useState(getTimeRemaining(targetDate));
  const [eventStatus, setEventStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTime(remaining);

      const now = new Date();
      const day1Start = new Date("2026-09-05T08:00:00+01:00");
      const day1End = new Date("2026-09-05T23:59:59+01:00");
      const day2Start = new Date("2026-09-06T08:00:00+01:00");
      const day2End = new Date("2026-09-06T23:59:59+01:00");

      if (now >= day2End) {
        setEventStatus("THANK YOU FOR JOINING US");
      } else if (now >= day2Start && now <= day2End) {
        setEventStatus("PRAISE UNLEASHED IS LIVE");
      } else if (now > day1End && now < day2Start) {
        setEventStatus("PRAISE UNLEASHED STARTS IN");
      } else if (now >= day1Start && now <= day1End) {
        setEventStatus("UNLEASH 3.0 IS LIVE");
      } else {
        setEventStatus("UNLEASH 3.0 BEGINS IN");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="bg-unleash-dark-brown py-16 text-unleash-cream">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-2xl md:text-3xl tracking-wider mb-10">
          {eventStatus}
        </h2>
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "DAYS", value: time.days },
            { label: "HOURS", value: time.hours },
            { label: "MINUTES", value: time.minutes },
            { label: "SECONDS", value: time.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-display text-5xl md:text-7xl text-unleash-orange">
                {pad(item.value)}
              </span>
              <span className="text-sm md:text-base font-semibold tracking-widest mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;