
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Link,
  CircularProgress,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"; // Import useFormik
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./Footer.css"; // Import the CSS file for styling

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { setUserId } = useAuth();
  const { setToken,  setloginEmail, setfirstName , setrole , setcompanyName ,setaccId, setorgId} = useAuth();

  const [isFlipped, setIsFlipped] = useState(false);
  const [step, setStep] = useState(1);
 
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  

  const [emailFromResponse, setEmailFromResponse] = useState(""); // To store email from previous API
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = () => {
    setIsFlipped(!isFlipped);
    setStep(1);
  };


  const handleEmailSubmit = async () => {
    setError("");
    setLoading(true);
  
    try {
      const apiUrl = `${baseUrl}/api/users/forgot-password/${email}`;
  
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const result = await response.text(); // Read the response as plain text
        const trimmedResult = result.trim(); // Trim spaces from front and back
        console.log("Success:", trimmedResult);
  
        // Assuming result contains the email in plain text format
        setEmailFromResponse(trimmedResult); // Store the trimmed email in state
        toast.success("Email sent successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setStep(2); // Move to the Set New Password form
      } else {
        const errorText = await response.text();
        toast.error(errorText.trim() || "Failed to send email. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Network Error during email submission: ", error);
      toast.error("An error occurred while sending the email. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  



//SETTING NEW PASSWORD
  const handlePasswordSubmit = async () => {
    // Define the base URL
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    // Construct the URL with query parameters
    const url = `${baseUrl}/api/users/change-password?email=${emailFromResponse}&oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`;
                  
    try {
      // Send the POST request
      const response = await fetch(url, {
        method: "PUT",
      });

      // Check if the response is successful
      if (response.ok) {
        console.log("Password reset successful");
        setIsFlipped(false); // Flip back to sign-in screen
        setStep(1); // Set step back to initial
        toast.success("New Password Created successful!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        const errorData = await response.json();
        console.error("Error resetting password:", errorData.message);
        toast.error(
          `Failed to reset password: ${errorData.message}`,
          { position: "top-right", autoClose: 2000 }``
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error: Please try again later.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailBlur = () => {
    if (!email) {
      // If email is empty, show error message for missing email
      setEmailError("Please enter an email address.");
    } else if (!email.match(emailPattern)) {
      // If email is not empty but invalid, show error for invalid email
      setEmailError("Please enter a valid email address.");
    } else {
      // Clear the error if email is valid
      setEmailError("");
    }
  };


  const handleLogin = async () => {
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
    setError(""); // Reset general error message

    // Basic validation for mandatory fields
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!email.match(emailPattern)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return; // Exit if there are validation errors

    setLoading(true);

    try {
      const apiUrl = `${baseUrl}/api/v1/auth/authenticate?email=${email}&password=${password}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        const { access_token: token } = result;

        if (token) {
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;

          setloginEmail(decodedToken.email);
          localStorage.setItem("loginEmail", decodedToken.email);
          setToken(token);
          console.log("firstandLast name :"+decodedToken.firstname +" "+decodedToken.lastname);
          setfirstName(decodedToken.firstname +" "+decodedToken.lastname)
          // console.log("USER ROLE  : "+ userRole)
          setcompanyName(decodedToken.companyName);
          setrole(userRole);
          // Route based on user role
          switch (userRole) {
            case "ORGANIZATION":
              setUserId(decodedToken.organizationId);
              navigate("/PrincipalDashboard");
              setorgId(decodedToken.organizationId)
              break;
           
            case "ACCOUNTS":
              setaccId(decodedToken.accId)
              setUserId(decodedToken.accountsId);
              setorgId(decodedToken.organizationId)
              navigate("/AccountsDashboard");
              break;
           
          
            default:
              throw new Error(
                "Invalid role. Please contact the administrator."
              );
          }

          localStorage.setItem("role", userRole);
          localStorage.setItem("email", email);
         
        } else {
          setError(
            "Access token is missing. Please contact the administrator."
          );
        }
      } else {
        console.error("Login failed: ", result);
        // setError(result.message || "Invalid credentials");
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      // setError(error.message || "Failed to login. Please try again later.");
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      role: "",
    },

    onSubmit: (values) => {
      handleLogin();
    },
  });

  return (
    <>
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background:
          'url("https://wallpaperaccess.com/full/4153450.jpg") no-repeat center center fixed',
        // backgroundColor:'#E8F5E9',
        backgroundSize: "cover",
        padding: "0 10px",
      }}
    >

      
      <ToastContainer />
      {/* Combined Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "row", // Display in row to separate left (logo) and right (form) sections
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",

          // background: 'url("https://img.freepik.com/free-photo/ripped-papers-array_23-2147734446.jpg?t=st=1729843355~exp=1729846955~hmac=700f0e6b5b0060e3a47b56cd242f388e80d632bf0771f0dfa232f41c2da1ff18&w=996") no-repeat center center fixed',
          backgroundSize: "cover",
          // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          // borderRadius: '8px',
          width: "83%",
          height: "80%", // Reduce height slightly for better centering
        }}
      >
        {/* Logo and Title Section */}
        <div style={{ textAlign: "center", marginBottom: "40px", flex: 1 }}>
          {/* <img src="https://5.imimg.com/data5/SELLER/Logo/2023/11/364146045/MQ/XA/WN/73192754/logo1.jpeg" alt="Company Logo" style={{
            width: '35%',
            height: 'auto',
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.3)',
            backgroundColor: 'white',
            borderRadius: '50%'
          }} /> */}
          {/* <Typography
            variant="h2"
            style={{
              color: "white",
              marginTop: "20px",
              fontWeight: "700",
              fontSize: "3rem",
              letterSpacing: "2px",
              textShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)", // Softened box shadow for depth
              fontFamily: "'Poppins', sans-serif", // Modern font family
            }}
          >
            <span style={{color:"red",marginRight:'9px'}}>MAP</span><span style={{color:"yellow",marginRight:'9px'}}>BOOKS</span>
          </Typography> */}

          <img src="./assets/maplogowhite.png" alt="Description of the image" style={{
            width: '70%',
            height: '70%',
        
          }} />


          {/* <img src="./assets/mapbooksLogo.png" alt="Company Logo" style={{
            width: '35%',
            height: 'auto',
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.3)',
            backgroundColor: 'white',
            borderRadius: '50%'
          }} />  */}
          {/* <Typography
            variant="h6"
            style={{
              color: "white",
              // fontWeight: "500",
              fontSize: "1.2rem",
              textAlign: "center",
              marginTop: "10px",
              letterSpacing: "1px",
              fontFamily: "'Poppins', sans-serif", // Consistent modern font family
              fontWeight: "bold",
              textShadow: "19px 30px 30px rgba(0.5, 0, 0, 0.2)", // Softer shadow for subtitle
            }}
          >
 
          
           </Typography> */}
        </div>

        {/* Sign In Form */}
        <Container
          component="main"
          maxWidth="xs"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            width:"80%",
            marginTop:'40px'
          }}
        >
          <div
            style={{
              transition: "transform 0.5s",
              transformStyle: "preserve-3d",
              position: "relative",
              width: "100%",
              height: "100%", // Ensure height of the container
              transform: isFlipped ? "rotateY(180deg)" : "none",
            }}
          >
            {/* Front of the Card - Sign In Form */}
            <div
              style={{
                // backgroundColor: "transparent",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                // boxShadow:
                //   "1px 1px 10px rgba(0, 0, 0, 0.2), -1px -1px 10px rgba(0, 0, 0, 0.2), 2px -2px 14px rgba(0, 0, 0, 0.2), -2px 2px 14px rgba(0, 0, 0, 0.2)",

                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Sign In
              </Typography>

              <div style={{ marginTop: "20px" }}>
              
<label
  style={{
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
  }}
>
  Email:
</label>
<TextField
  variant="filled"
  fullWidth
  id="email"
  name="email"
  type="email"
  autoComplete="email"
  autoFocus
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={handleEmailBlur}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
    }
  }}
  error={!!emailError} // Highlight the field red if there's an error
  helperText={emailError ? emailError : ""} // Display error message or leave blank
  placeholder="Enter your email"
  InputProps={{
    style: {
      backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
      height: "50px",
      marginBottom: "10px", // Reduced margin for a tighter layout
      border: emailError
        ? "1px solid rgba(0, 0, 0, 0.2)" // Default border if there's an error
        : email // Green border if email is valid
        ? "2px solid #65D876"
        : "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "8px", // Rounded corners
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
    },
    disableUnderline: true, // Disable default underline
  }}
  inputProps={{
    style: {
      color: "black", // Set input text color
      padding: "10px",
    },
  }}
  FormHelperTextProps={{
    style: {
      color: "#F25A5B", // Error message color
      fontWeight: "bold", // Bold font weight for error message
      fontSize: "14px", // Adjust font size
    },
  }}
/>


                <label
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Password:
                </label>
                <TextField
                  variant="filled"
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      formik.handleSubmit();
                    }
                  }}
                  error={!!passwordError} // Highlight the field red if there's an error
                  helperText={passwordError ? passwordError : ""} // Display error message or leave blank
                  placeholder="Enter your password"
                  InputProps={{
                    style: {
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
                      height: "50px",
                      marginBottom: "10px", // Reduced margin for a tighter layout
                      border: passwordError
                      ? "1px solid rgba(0, 0, 0, 0.2)" // Default border if there's an error
                      : password // Green border if email is valid
                      ? "2px solid #65D876"
                      : "1px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px", // Rounded corners
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                    },
                    disableUnderline: true, // Disable default underline
                  }}
                  inputProps={{
                    style: {
                      color: "black", // Set input text color
                      padding: "10px",
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      color: "#F25A5B", // Error message color
                      fontWeight: "bold", // Bold font weight for error message
                      fontSize: "14px", // Adjust font size
                    },
                  }}
                />

                <Typography
                  style={{
                    color: "black",
                    textAlign: "right",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "10px",
                    textDecoration: "underline",
                  }}
                  onClick={handleForgotPassword}
                >
                  Forgotten Password?
                </Typography>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={formik.handleSubmit}
                  disabled={loading}
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#2ED0A5", // Transparent background
                    color: "white", // Text color matching the original button background
                    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    border: "1px solid #2ED0A5", // Add a border to define button edges
                    "&:hover": {
                      backgroundColor: "rgba(46, 208, 165, 0.4)", // Darker transparent on hover
                      color: "black", // White text color on hover for better contrast
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "white" }} />
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {error && <p style={{ color: "red", fontWeight:'bold' }}>{error}</p>}

                <Typography
                  align="center"
                  style={{ color: "black", marginTop: "16px" , marginBottom:'30px'}}
                >
                  Not registered yet?
                  <Link
                    onClick={() => navigate("/OrganizationForm")}
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                      paddingLeft: "6px",
                    }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </div>
              
            </div>

            {/* Back of the Card - Forgot Password / Reset Password Form */}
            <div
              style={{
                // backgroundColor: 'transparent',
                backgroundColor:"white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                transform: "rotateY(180deg)",
              }}
            >
              {/* Back Card Content */}
              <Typography
                variant="h5"
                align="center"
                style={{ color: "black", fontWeight: "bold" }}
              >
                {step === 1 ? "Reset Password" : "Set New Password"}
              </Typography>

              <div style={{ marginTop: "20px" }}>
                {step === 1 ? (
                  <>
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Email:
                    </label>
                    <TextField
                      variant="filled"
                      fullWidth
                      id="reset-email"
                      name="reset-email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Registered Email"
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
                          height: "50px",
                          marginBottom: "10px", // Reduced margin for a tighter layout
                          border: emailError
                            ? "1px solid rgba(0, 0, 0, 0.2)" // Default border if there's an error
                            : email // Green border if email is valid
                            ? "2px solid #65D876"
                            : "1px solid rgba(0, 0, 0, 0.2)",
                          borderRadius: "8px", // Rounded corners
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                        },
                        disableUnderline: true, // Disable default underline
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          padding: "10px", // Set the input text color
                        },
                      }}
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}{" "}
                    {/* Error message display */}

            
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={handleEmailSubmit}
                      style={{ marginTop: "20px", backgroundColor: "#2ED0A5" }}
                    >
                      {loading ? (
                        <CircularProgress
                          size={24}
                          style={{ color: "white" }}
                        />
                      ) : (
                        "Send"
                      )}
                    </Button>
                    
                  </>
                ) : (
                  <>
                   <div>
                  <label>Email</label>
                  <input type="email" value={emailFromResponse} readOnly /> {/* Non-editable email */}
                </div>
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Recived Password
                    </label>
                    <TextField
                      variant="filled"
                      fullWidth
                      id="verification-code"
                      name="verification-code"
                      autoComplete="off"
                      value={oldPassword}
                      onChange={(e) => setoldPassword(e.target.value)}
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
                          height: "50px",
                          marginBottom: "10px", // Reduced margin for a tighter layout
                          border: "1px solid rgba(0, 0, 0, 0.2)", // Semi-transparent border
                          borderRadius: "8px", // Rounded corners
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                        },
                        disableUnderline: true, // Disable default underline
                      }}
                      inputProps={{ style: { padding: "10px" } }}
                    />

                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      New Password:
                    </label>
                    <TextField
                      variant="filled"
                      fullWidth
                      name="new-password"
                      type="password"
                      id="new-password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
                          height: "50px",
                          marginBottom: "10px", // Reduced margin for a tighter layout
                          border: "1px solid rgba(0, 0, 0, 0.2)", // Semi-transparent border
                          borderRadius: "8px", // Rounded corners
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                        },
                        disableUnderline: true, // Disable default underline
                      }}
                      inputProps={{ style: { padding: "10px" } }}
                    />

                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Confirm Password:
                    </label>
                    <TextField
                      variant="filled"
                      fullWidth
                      name="confirm-password"
                      type="password"
                      id="confirm-password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        style: {
                          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
                          height: "50px",
                          marginBottom: "10px", // Reduced margin for a tighter layout
                          border: "1px solid rgba(0, 0, 0, 0.2)", // Semi-transparent border
                          borderRadius: "8px", // Rounded corners
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
                        },
                        disableUnderline: true, // Disable default underline
                      }}
                      inputProps={{ style: { padding: "10px" } }}
                    />
                     
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      onClick={handlePasswordSubmit}
                      style={{ marginTop: "30px", backgroundColor: "#2ED0A5" }}
                    >
                      {loading ? (
                        <CircularProgress
                          size={24}
                          style={{ color: "white" }}
                        />
                      ) : (
                        "Create Password"
                      )}
                    </Button>
                  </>
                )}

                <Typography
                  align="center"
                  style={{
                    color: "black",
                    marginTop: "20px",
                    cursor: "pointer",
                    marginBottom:'30px'
                  }}
                  onClick={handleForgotPassword}
                >
                  Back to Sign In
                </Typography>
                          
                  
              </div>
            </div>
          </div>
          
        </Container>
        
      </div>



    </div>
  
    
    </>
  );
};

export default SignIn;
