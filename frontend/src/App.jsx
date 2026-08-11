import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Registrations from './pages/admin/Registrations';
import SpeakersAdmin from './pages/admin/Speakers';
import GalleryAdmin from './pages/admin/Gallery';
import EventAdmin from './pages/admin/Event';
import MessagesAdmin from './pages/admin/Messages';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import RegisterPage from './pages/Register';
import SpeakersPage from './pages/Speakers';
import MediaPage from './pages/Media';
import ChurchPage from './pages/Church';
import ContactPage from './pages/Contact';
import Navbar from './components/Navbar';
import CheckIn from './pages/admin/CheckIn';

function App() {
  return (
    <BrowserRouter>
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
              <Route path="/admin/messages" element={<MessagesAdmin />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;