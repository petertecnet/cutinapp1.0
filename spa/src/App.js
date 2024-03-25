import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import LogoutPage from "./pages/LogoutPage";
import PasswordEmailPage from "./pages/PasswordEmailPage";
import PasswordPage from "./pages/PasswordPage";
import DashboardPage from "./pages/DashboardPage";

import UserEditPage from "./pages/user/UserEditPage";

import ProfileCreatePage from "./pages/profile/ProfileCreatePage";
import ProfileListPage from "./pages/profile/ProfileListPage";
import ProfileUpdatePage from "./pages/profile/ProfileUpdatePage";


import LoadingComponent from "./components/LoadingComponent";
import authService from "./services/AuthService";
import './css/card.css'; 


const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.me();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  const protectedRoute = (element) => {
    if (user) {
      if (user.email_verified_at) {
        return element;
      } else {
        return <Navigate to="/email-verify" />;
      }
    }
    return <Navigate to="/login" />;
  };

  const emailVerifiedRoute = (element) => {
    if (user) {
      if (!user.email_verified_at) {
        return element;
      } else {
        return <Navigate to="/dashboard" />;
      }
    }
    return <Navigate to="/login" />;
  };

  const restrictedRoute = (element) => {
    if (!user) {
      return element;
    } else {
      return <Navigate to="/dashboard" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={restrictedRoute(<RegisterPage />)} />
        <Route path="/login" element={restrictedRoute(<LoginPage />)} />
        <Route path="/password-email" element={restrictedRoute(<PasswordEmailPage />)}/>
        <Route path="/email-verify" element={emailVerifiedRoute(<EmailVerifyPage />)}/>
        <Route path="/password" element={protectedRoute(<PasswordPage />)} />
        <Route path="/logout" element={(<LogoutPage />)}/>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={protectedRoute(<DashboardPage />)} />

        
        <Route path="/user/edit" element={protectedRoute(<UserEditPage />)} />

        <Route path="/profile/create" element={protectedRoute(<ProfileCreatePage />)} />
        <Route path="/profile/list" element={protectedRoute(<ProfileListPage />)} />
        <Route path="/profile/update/:id" element={protectedRoute(<ProfileUpdatePage />)}
/>
       
      </Routes>
    </Router>
  );
};

export default App;
