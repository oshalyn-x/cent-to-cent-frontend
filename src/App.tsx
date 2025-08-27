// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/DashboardPage';

const App: React.FC = () => {
  // Protected Route Component
  // const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //   if (isCheckingAuth) {
  //     return (
  //       <div className="flex min-h-screen items-center justify-center">
  //         <div className="text-white">Loading...</div>
  //       </div>
  //     );
  //   }
    
  //   return user ? <>{children}</> : <Navigate to="/login" replace />;
  // };

  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        {/* Redirect root to login if not authenticated */}
        <Route 
          path="/" 
          element={
            <Navigate to="/login" replace />
          } 
        />
        
        {/* Login Route */}
        <Route 
          path="/login" 
          element={
            <LoginPage />
          } 
        />
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;