import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "UNLEASH 2026",
  "/event": "Event | UNLEASH 2026",
  "/register": "Registration | UNLEASH 2026",
  "/speakers": "Speakers | UNLEASH 2026",
  "/media": "Media | UNLEASH 2026",
  "/church": "Church | UNLEASH 2026",
  "/contact": "Contact | UNLEASH 2026",

  "/admin/login": "Admin Login | UNLEASH 2026",
  "/admin/dashboard": "Dashboard | UNLEASH 2026",
  "/admin/registrations": "Registrations | UNLEASH 2026",
  "/admin/speakers": "Speakers | UNLEASH 2026",
  "/admin/gallery": "Gallery | UNLEASH 2026",
  "/admin/event": "Event Settings | UNLEASH 2026",
  "/admin/check-in": "Check-In | UNLEASH 2026",
  "/admin/settings": "Settings | UNLEASH 2026",
  "/admin/messages": "Messages | UNLEASH 2026",
};

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    document.title =
      pageTitles[location.pathname] || "UNLEASH 2026";
  }, [location.pathname]);

  return null;
};

export default PageTitle;