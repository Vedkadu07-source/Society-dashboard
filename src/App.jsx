import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ToastContainer from './components/ToastContainer';
import { ResidentLayout, AdminLayout } from './components/Layout/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Payments from './pages/Payments';
import Notices from './pages/Notices';
import AdminOverview from './pages/admin/AdminOverview';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminResidents from './pages/admin/AdminResidents';
import AdminPayments from './pages/admin/AdminPayments';
import AdminNotices from './pages/admin/AdminNotices';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Resident routes */}
          <Route element={<ResidentLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/notices" element={<Notices />} />
          </Route>

          {/* Committee routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/residents" element={<AdminResidents />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/notices" element={<AdminNotices />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

