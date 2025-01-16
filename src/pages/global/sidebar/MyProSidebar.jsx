import React, { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import {List, ListItemButton,Box, Typography, IconButton, Collapse, Button,CircularProgress,Avatar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ReceiptIcon from '@mui/icons-material/Receipt';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import StoreIcon from '@mui/icons-material/Store';
import VerifiedIcon from '@mui/icons-material/Verified';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import UploadIcon from '@mui/icons-material/Upload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { GlobalStyles } from "@mui/system";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import CryptoJS from 'crypto-js';
import TtyIcon from '@mui/icons-material/Tty';
import SellIcon from '@mui/icons-material/Sell';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import AddCardIcon from '@mui/icons-material/AddCard';
import TaskIcon from '@mui/icons-material/Task';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import StorageIcon from '@mui/icons-material/Storage';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import AddCardIcon from '@mui/icons-material/AddCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import FolderIcon from '@mui/icons-material/Folder';

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../../AuthProvider";
import './sidebar.css'
import { Badge } from '@mui/material';


const baseUrl = process.env.REACT_APP_API_BASE_URL;
const MyProSidebar = () => {
  const [badgeCount, setBadgeCount] = useState(0); // State to store the badge count
  // const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({ companyLogo: "", companyName: "" });
  const [loading, setLoading] = useState(true);
  // const [isTicketsOpen, setTicketsOpen] = useState(false);
  const { orgId ,count,techcount,salescount,telcount,refreshKey} = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState(false); // To toggle the submenu
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(-1); 

  const [salesData, setSalesData] = useState([]);
  const [salesManagerData, setSalesManagerData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [telecallerData, setTelecallerData] = useState([]);
  const [technicianData, setTechnicianData] = useState([]);
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  console.log("Secret Key:", secretKey);
 
  // Role-based menu items
  const role = localStorage.getItem("role")   // Convert role to uppercas
  const location = useLocation(); // Get the current location

  // const isActive = (path) => location.pathname === path;


  //Fetch company info
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/auth/organize/getProfile/${orgId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Company Info:", data); // Debug log
        setCompanyInfo({
          companyLogo: data?.companyLogo || "",
          companyName: data?.companyName || "Unknown Company",
        });
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setLoading(false); // Ensure loading state is always updated
      }
    };
    fetchCompanyInfo();
  }, [orgId,refreshKey]);
  

  useEffect(() => {
    // Function to prevent default touch actions
    const preventTouch = (e) => {
      e.preventDefault();
    };

    // Add touch event listeners
    document.addEventListener('touchstart', preventTouch, { passive: false });
    document.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      // Clean up the event listeners on component unmount
      document.removeEventListener('touchstart', preventTouch);
      document.removeEventListener('touchmove', preventTouch);
    };
  }, []);


    // Fetch the badge count from the API
    const fetchBadgeCount = async () => {
      try {

        const response = await fetch(`${baseUrl}/api/quotationList/getCount`); // Replace with your actual API URL
        if (response.ok) {
          const data = await response.text();; // Assuming the API returns a JSON object with badgeCount
          setBadgeCount(Number(data)); // Assuming the response contains badgeCount
        } else {
          console.error('Failed to fetch badge count');
        }
      } catch (error) {
        console.error('Error fetching badge count:', error);
      }
    };
  
    useEffect(() => {
      if (role === 'ACCOUNTS') {
        fetchBadgeCount(); 
      } 
     // Fetch badge count on component mount
    }, [role]);

    useEffect(() => {
      if (role === 'SALE_MANAGER') {
        const fetchSalesData = async () => {
          try {
            const response = await fetch(`${baseUrl}/api/v1/sales/getByAllSalesList`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSalesData(data); // Assuming data is an array of sales
          } catch (error) {
            console.error('Error fetching sales data:', error);
          }
        };
  
        fetchSalesData();
      }
    }, [role]); // Dependency array includes userRole and baseUrl
  
    // Fetch Telecaller data
    useEffect(() => {
      if (role === 'SALE_MANAGER') {
      const fetchTelecallerData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/v1/telecaller/getTelecallerList`);
          const data = await response.json();
          setTelecallerData(data); // Assuming data is an array of telecallers
        } catch (error) {
          console.error('Error fetching telecaller data:', error);
        }
      };
  
      fetchTelecallerData();
    }
  }, [role]);


  //Manager Role
  useEffect(() => {
    if (role === 'MANAGER') {
      const fetchSalesManagersData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/v1/management/getListOf/SaleManager/ids`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSalesManagerData(data); // Assuming data is an array of sales
        } catch (error) {
          console.error('Error fetching sales data:', error);
        }
      };

      fetchSalesManagersData();
    }
  }, [role]); // Dependency array includes userRole and baseUrl

  //Manager Role
  useEffect(() => {
    if (role === 'ADMIN') {
      const fetchAdminManagersData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/v1/management/getAll`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setAdminData(data); // Assuming data is an array of sales
        } catch (error) {
          console.error('Error fetching sales data:', error);
        }
      };

      fetchAdminManagersData();
    }
  }, [role]);

     // Fetch Telecaller data
     useEffect(() => {
      if (role === 'OPERATION_TECH_LEAD') {
      const fetchTechniciansData = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/v1/technician/technican/list`);
          const data = await response.json();
          setTechnicianData(data); // Assuming data is an array of telecallers
        } catch (error) {
          console.error('Error fetching telecaller data:', error);
        }
      };
  
      fetchTechniciansData();
    }
  }, [role]);

   // Utility function to normalize paths, making sure both arguments are defined
   const normalizePath = (path) => {
    return path ? path.replace(/\/$/, '') : ''; // Remove trailing slashes if path is defined
  };

  // Define role-based menu items
  const menuItems = {
 
    ORGANIZATION: [
     
      {
        title: 'Principal Dashboard',
        icon: <DashboardIcon />,
        to: '/PrincipalDashboard',
      },
      {
        title: 'Docs Upload',
        icon: <DashboardIcon />,
        to: '/All_DocsUpload',
      },
      {
        title: 'Teacher Register',
        icon: <HomeOutlinedIcon />,
        to: '/OrganizationAdminRegister',
      },

    ],
   
  };

  const userMenuItems = menuItems[role] || [];
  // const userMenuItems = menuItems[role] || menuItems.GUEST;
  const handleItemClick = (to) => {
    navigate(to);
  };
  const handleSubmenuToggle = (index) => {
    setOpenSubmenu((prevState) => (prevState === index ? -1 : index));
  };

  const handleNestedSubmenuToggle = (subIndex) => {
    setOpenNestedSubmenu((prevState) => (prevState === subIndex ? -1 : subIndex));
  };
  

  return (
    <>
    <GlobalStyles
     styles={{
      '.custom-sidebar-scrollbar': {
        // Firefox scrollbar width
        scrollbarWidth: '1px', // Adjust width for Firefox
        scrollbarColor: '#A5B5B6 #e0e0e0', // Change the thumb color to blue, track to #e0e0e0
  
        // Webkit scrollbar styles (Chrome, Safari, etc.)
        '&::-webkit-scrollbar': {
          width: '2px', // Adjust width for Webkit browsers
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'blue', // Thumb color (the part you drag)
          borderRadius: '4px', // Optional: makes the thumb rounded
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#A5B5B6', // Track color
          borderRadius: '4px', // Optional: makes the track rounded
        },
      },
  
  }}
/> 

    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
       
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "#ffffff !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: "#ffffff",
          fontWeight: "bold !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: "#ff0000 !important",
          fontWeight: "bold !important",
          backgroundColor: "transparent !important",
        },
      }}
     
    >
     <Sidebar
     className="custom-sidebar-scrollbar"
      breakPoint="md"
      style={{ 
         height: '100%',
         width: collapsed ? '80px' : '250px', 
         transition: 'width 0.3s ease-in-out', 
        
      }} // Adjust sidebar width based on collapsed state
      backgroundColor="white"
    >
      {/* Collapse Button */}
      <Box sx={{ mb: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton
          onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}
          sx={{ color: 'white', marginRight: '22px', '&:hover': { backgroundColor: '#3b4d7d' } }}
        >
          {collapsed ? <MenuIcon /> : <CloseIcon />}
        </IconButton>
      </Box>

      {/* Company Logo */}
      {!collapsed && (
        <Box mb="25px" mt={2} textAlign="center">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {loading ? (
              // <CircularProgress sx={{ color: 'white' }} />
              // {<Typography></Typography>}
              <>
                <CircularProgress sx={{ color: 'white', mb: 10 }} />
                <Typography sx={{ color: 'white' }}>Loading Logo...</Typography>
              </>
            ) : (
              <Avatar
              alt="Company Logo"
              src={companyInfo.companyLogo ? `data:image/jpeg;base64,${companyInfo.companyLogo}` : ""} 
              sx={{ width: "100px",
                height:"100px" ,
                borderRadius: "50%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                objectFit: "cover",}}
            />
            )}
          </Box>
          {!loading && (
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ m: '10px 0 0 0', color: 'black' }}
              >
                {companyInfo.companyName}
              </Typography>
            </Box>
          )}
        </Box>
      )}



      {/* Menu Items */}
      <Menu iconShape="square" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  {/* Menu Items */}
  <div>
    {userMenuItems.map((menuItem, index) => (
      <div key={index}>
        <MenuItem
          sx={{
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '10px',
            transition: 'background-color 0.3s, transform 0.2s',
            backgroundColor:
              normalizePath(location.pathname) === normalizePath(menuItem.to)
                ? '#D5C582' // Active color
                : 'green', // Default color
            fontWeight:
              normalizePath(location.pathname) === normalizePath(menuItem.to)
                ? 'bold'
                : 'normal',
            '&:active': {
              backgroundColor: 'yellow', // Active click color
              transform: 'scale(1)',
            },
          }}
          onClick={() => {
            if (menuItem.submenu) {
              handleSubmenuToggle(index); // Toggles second-level submenu
              console.log('Navigating to: ', menuItem.to);
            }
            handleItemClick(menuItem.to); // Direct navigation for items without submenus
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginLeft: '12px',color:'black' }}>
            {menuItem.icon}
            
            <span
              style={{
                marginLeft: '7px',
                fontWeight: '550',
                fontSize: '14px',
                color: 'black',
              }}
            >
              {menuItem.title}
            </span>

            {menuItem.submenu && (
              <span style={{ marginLeft: '10px', color: 'black' }}>
                {openSubmenu === index ? <ExpandLess /> : <ExpandMore />}
              </span>
            )}
          </Box>
        </MenuItem>

        {/* Second-level Submenu */}
        {menuItem.submenu && (
          <Collapse in={openSubmenu === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItem.submenu.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <ListItemButton
                    onClick={() => {
                      if (subItem.submenu) {
                        handleNestedSubmenuToggle(subIndex); // Toggles third-level submenu
                      } else {
                        handleItemClick(subItem.to); // Direct navigation for items without submenus
                      }
                    }}
                    sx={{
                      paddingLeft: '40px',
                      color: 'black',
                      fontSize: '12px',
                      borderRadius: '4px',
                      '&:active': {
                        backgroundColor: '#77DFA4',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginLeft: '4px' }}>
                      {subItem.icon}



                     



                      <span
                        style={{
                          marginLeft: '7px',
                          fontWeight: '300',
                          fontSize: '12px',
                          color: '#E8ECF0',
                        }}
                      >
                        {subItem.title}
                      </span>
                     
                      {subItem.submenu && (
                        <span style={{ marginLeft:"auto", color: '#dfe4ea' }}>
                          {openNestedSubmenu === subIndex ? <ExpandLess /> : <ExpandMore />}
                        </span>
                      )}
                    </Box>
                  </ListItemButton>

                  {/* Third-level submenu */}
                  {subItem.submenu && (
                    <Collapse in={openNestedSubmenu === subIndex} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {subItem.submenu.map((nestedSubItem, nestedIndex) => (
                          <ListItemButton
                            key={nestedIndex}
                            sx={{
                              paddingLeft: '60px',
                              color: '#D3EBED',
                              backgroundColor:
                                normalizePath(location.pathname) === normalizePath(nestedSubItem.to)
                                  ? '#3b4d7d'
                                  : 'transparent',
                            }}
                            onClick={() => {
                              console.log('Navigating to: ', nestedSubItem.to); // Console log for debugging
                              handleItemClick(nestedSubItem.to); // Your navigation function
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              {nestedSubItem.icon}
                              <span style={{ marginLeft: '7px', fontSize: '11px' }}>{nestedSubItem.title}</span>
                            </Box>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    ))}
  </div>

  {/* Company Logo */}
  {/* <Box
  component="footer"
  sx={{
    textAlign: 'center',
    backgroundColor: '#EDDB8C',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out',
    color: 'black',
    width: !collapsed ? '100%' : '0px',
    overflow: 'hidden',
    marginTop: '113%', // Different margin for admin, account, and others
  }}
  
>
  {!collapsed && (
    <>
      <img
        src="../../assets/Maptechnos.jpg" // Replace with the actual path to your logo
        alt="Company Logo"
        style={{
          width: '25%',
          maxWidth: '150px',
          height: 'auto',
          transition: 'width 0.3s ease-in-out',
        }}
      />
      <Box sx={{ marginLeft: '10px' }}>
        <h1 style={{ fontSize: '14px', margin: '0' }}>Map Technos</h1>
        <p style={{ fontSize: '10px', margin: '0' }}>
          Leads to Better Way Of Technology
        </p>
      </Box>
    </>
  )}
</Box> */}


</Menu>




    </Sidebar>
     
    </Box>
    </>
  );
};

export default MyProSidebar;