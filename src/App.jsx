import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Accueil from './pages/Accueil';
import MainApp from './mainApp';
import AuthPopup from './pages/AuthPopup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { login, logout, isAuthenticated } = useAuth();
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthAction = (mode) => {
    setAuthMode(mode);
    setShowAuthPopup(true);
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Accueil 
              onAuthAction={handleAuthAction}
              isAuthenticated={isAuthenticated}
            />
          }
        />  
        <Route
          path="/app/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainApp logout={logout} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <AuthPopup 
        isOpen={showAuthPopup} 
        onClose={() => setShowAuthPopup(false)}
        initialForm={authMode}
        onLogin={login}
        onRegister={login}
      />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;