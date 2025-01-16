import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation , Navigate } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { useAuth } from "./AuthProvider";

import Topbar from "./pages/global/Topbar";
import SignIn from "./pages/signin/signin";
import ChangePassword from "./pages/ChangePassword/changePassword";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OrganizationForm from "./pages/Organization_Role/OrganisationForm/OrganisationForm";
import OrganizationProfile from "./pages/Profile/OrganizationProfile/OrganizationProfile";
import PrincipalDashboard from "./pages/Principal_Role/Principal_Dashboard/principalDashboard";
import All_DocsUpload from "./pages/Fee_Addmission_Role/All_Documents_Upload/All_DocsUplload";



const App = () => {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const { loginEmail } = useAuth(); // Access authentication state// new code

 

  const RequireAuth = ({ children }) => {
    // Check if the loginEmail is available in localStorage
    const loginEmail = localStorage.getItem("loginEmail");
  
    // Debugging: log the value of loginEmail
    console.log("loginEmail:", loginEmail);
  
    // If loginEmail is missing, user is not authenticated, redirect to login page
    if (!loginEmail) {
      // alert("You need to Log In to access this page.");
      return <Navigate to="/" replace />;
    }
  
    // If authenticated, render the children (protected routes)
    return children;
  };

 

  const checkAuthentication = () => {
    const publicRoutes = ["/", "/OrganizationForm"];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    setAuthenticated(!isPublicRoute);
  };

  useEffect(() => {
    checkAuthentication();
  }, [location.pathname]);



  // Check if the current route is valid
  const isNotFound = () => {
    // Define regex for dynamic routes
    const validRoutes = [
      /^\/InvoiceTemplate$/,
      /^\/ChangePassword$/,
      /^\/PrincipalDashboard$/,
      /^\/All_DocsUpload$/,
    ];
    
    // Rest of your code
    

    return !validRoutes.some((route) => route.test(location.pathname));
  };




  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Handle authenticated routes */}
        {/* {authenticated ? ( */}

         {/* If the user is authenticated */}
         {authenticated && !isNotFound() ? (
             <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
             
              <Topbar />
              <main>
                <Routes>
                {/* Profile Routes */}
              
                <Route path="/OrganizationProfile" element={<RequireAuth><OrganizationProfile/></RequireAuth>}/>
                <Route path="/ChangePassword" element={<RequireAuth><ChangePassword /></RequireAuth>} />

                <Route path="/PrincipalDashboard" element={<RequireAuth><PrincipalDashboard /></RequireAuth>} />
                <Route path="/All_DocsUpload" element={<RequireAuth><All_DocsUpload /></RequireAuth>} />
                {/* Not found page */}
                <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              
            </div>
            </MyProSidebarProvider>
          
        ) : (
          <Routes>
            {/* Non-authenticated routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/OrganizationForm" element={<OrganizationForm/>}/>
            <Route path="*" element={<SignIn />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
   
  );
};

export default App;