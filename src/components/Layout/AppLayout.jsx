import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export function ResidentLayout() {
  const { user } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-white w-full min-w-0 max-w-full selection:bg-primary-100 selection:text-primary-900">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant="resident"
      />
      <div className="flex-1 min-w-0 flex flex-col bg-white">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="w-full min-w-0 px-6 lg:px-12 pt-8 pb-32 lg:pb-16 max-w-7xl mx-auto flex-1 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const { user } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role !== 'committee') {
    return (
      <div className="min-h-screen flex bg-white w-full min-w-0 max-w-full">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="resident"
        />
        <div className="flex-1 min-w-0 flex flex-col bg-white">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="w-full min-w-0 px-6 lg:px-12 pt-8 pb-32 lg:pb-16 max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="max-w-md w-full">
              <div className="w-20 h-20 bg-surface-50 text-surface-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldAlert size={32} />
              </div>
              <h2 className="text-3xl font-light text-surface-900 tracking-tight mb-4">Restricted Access</h2>
              <p className="text-sm text-surface-500 leading-relaxed mb-10">
                This workspace is reserved for committee members. Please contact administration for access privileges.
              </p>
              <button 
                onClick={() => window.history.back()}
                className="bg-surface-900 hover:bg-surface-800 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors flex items-center gap-2 mx-auto"
              >
                <ArrowLeft size={14} /> Go Back
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white w-full min-w-0 max-w-full selection:bg-primary-100 selection:text-primary-900">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant="committee"
      />
      <div className="flex-1 min-w-0 flex flex-col bg-white">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="w-full min-w-0 px-6 lg:px-12 pt-8 pb-32 lg:pb-16 max-w-7xl mx-auto flex-1 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
