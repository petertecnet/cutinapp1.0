import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import EmailVerifyPage from "./pages/auth/EmailVerifyPage";
import LogoutPage from "./pages/auth/LogoutPage";
import PasswordEmailPage from "./pages/auth/PasswordEmailPage";
import PasswordPage from "./pages/auth/PasswordPage";
import DashboardPage from "./pages/DashboardPage";



// Administrativo
// User
import UserListPage from "./pages/admin/user/UserListPage";
import UserCreatePage from "./pages/admin/user/UserCreatePage";
// Profile
import ProfileCreatePage from "./pages/admin/profile/ProfileCreatePage";
import ProfileListPage from "./pages/admin/profile/ProfileListPage";
import ProfileUpdatePage from "./pages/admin/profile/ProfileUpdatePage";
// Production
import ProductionListAdminPage from "./pages/admin/production/ProductionListAdminPage";

// Corporativo
//Production
import ProductionUpdatePage  from "./pages/production/ProductionUpdatePage";
import ProductionListCorpPage from "./pages/corp/production/ProductionListCorpPage";

//Participativo
//Production
import ProductionCreatePage from "./pages/production/ProductionCreatePage";
import ProductionListPage from "./pages/production/ProductionPage";
import ProductionViewPage  from "./pages/production/ProductionViewPage";


//User
import UserViewPage  from "./pages/user/UserViewPage";
import UserEditPage from "./pages/user/UserEditPage";



import LoadingComponent from "./components/LoadingComponent";
import authService from "./services/AuthService";


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
        <Route path="/user/admin/list" element={protectedRoute(<UserListPage />)} />
        <Route path="/user/create" element={protectedRoute(<UserCreatePage />)} /> 
        <Route path="/user/:userName" element={protectedRoute(<UserViewPage />)}/>


        <Route path="/profile/admin/create" element={protectedRoute(<ProfileCreatePage />)} />
        <Route path="/profile/admin/list" element={protectedRoute(<ProfileListPage />)} />
        <Route path="/profile/admin/update/:id" element={protectedRoute(<ProfileUpdatePage />)}/>
        
        <Route path="/production/admin/list" element={protectedRoute(<ProductionListAdminPage />)} />
       

        <Route path="/production/create" element={protectedRoute(<ProductionCreatePage />)} />
        <Route path="/productions" element={protectedRoute(<ProductionListPage />)} /> 
        <Route path="/production/update/:id" element={protectedRoute(<ProductionUpdatePage />)}/>
        <Route path="/production/show/:id" element={protectedRoute(<ProductionUpdatePage />)}/>
        <Route path="/production/view/:slug" element={protectedRoute(<ProductionViewPage />)}/>
        <Route path="/production/corp/list" element={protectedRoute(<ProductionListCorpPage />)} />
       
       

      </Routes>
    </Router>
  );
};

export default App;