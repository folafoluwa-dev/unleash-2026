import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Registrations from "./pages/admin/Registrations.jsx";
import SpeakersAdmin from "./pages/admin/Speakers.jsx";
import GalleryAdmin from "./pages/admin/Gallery.jsx";
import EventAdmin from "./pages/admin/Event.jsx";
import MessagesAdmin from "./pages/admin/Messages.jsx";
import HomePage from "./pages/HomePage.jsx";
import EventPage from "./pages/EventPage.jsx";
import RegisterPage from "./pages/Register.jsx";
import SpeakersPage from "./pages/Speakers.jsx";
import MediaPage from "./pages/Media.jsx";
import ChurchPage from "./pages/Church.jsx";
import ContactPage from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import CheckIn from "./pages/admin/CheckIn.jsx";
import Settings from './pages/admin/Settings.jsx';
import PageTitle from "./components/PageTitle.jsx";

function App() {
  return (
    <BrowserRouter>
    <PageTitle>

      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/church" element={<ChurchPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/registrations" element={<Registrations />} />
              <Route path="/admin/speakers" element={<SpeakersAdmin />} />
              <Route path="/admin/gallery" element={<GalleryAdmin />} />
              <Route path="/admin/event" element={<EventAdmin />} />
              <Route path="/admin/check-in" element={<CheckIn />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/messages" element={<MessagesAdmin />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </PageTitle>
    </BrowserRouter>
  );
}

export default App;
