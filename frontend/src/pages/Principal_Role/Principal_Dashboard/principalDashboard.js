import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PieChart, Pie, Cell, Legend } from "recharts";
import SchoolIcon from '@mui/icons-material/School'; // Import icon

const Dashboard = () => {
  // Data for Pie Chart
  const pieData = [
    { name: "Completed", value: 70, color: "#28a745" },
    { name: "Pending", value: 20, color: "#ffc107" },
    { name: "Absent", value: 10, color: "#dc3545" },
  ];

  return (
    <div style={{ backgroundColor: "#F5F5F6", minHeight: "100vh", padding: "10px" }}>
      {/* Injecting the animation styles */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      {/* Main Grid Container */}
      <Grid container spacing={3} style={{ marginTop: "30px" }}>
        {/* Row 1: Teachers Stats */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ ...cardStyle, borderBottom: "4px solid #007bff" }}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <SchoolIcon style={{ fontSize: 30, color: "#007bff" }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">TOTAL TEACHERS</Typography>
                <Typography variant="h5" style={{ color: "#007bff" }}>
                  50
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper style={{ ...cardStyle, borderBottom: "4px solid #28a745" }}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <SchoolIcon style={{ fontSize: 40, color: "#28a745" }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">PRESENT TEACHERS</Typography>
                <Typography variant="h5" style={{ color: "#28a745" }}>
                  45
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper style={{ ...cardStyle, borderBottom: "4px solid #dc3545" }}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item>
                <SchoolIcon style={{ fontSize: 40, color: "#dc3545" }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h6">ABSENT TEACHERS</Typography>
                <Typography variant="h5" style={{ color: "#dc3545" }}>
                  5
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Row 2: Students Stats */}
        <Grid item xs={12} sm={4}>
          <Paper style={{ ...cardStyle, borderBottom: "4px solid #007bff" }}>
            <Typography variant="h6">TOTAL STUDENTS</Typography>
            <Typography variant="h5" style={{ color: "#007bff" }}>
              500
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper style={{ ...cardStyle, borderBottom: "4px solid #28a745" }}>
            <Typography variant="h6">PRESENT STUDENTS</Typography>
            <Typography variant="h5" style={{ color: "#28a745" }}>
              450
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper style={{ ...cardStyle, borderBottom: "4px solid #dc3545" }}>
            <Typography variant="h6">ABSENT STUDENTS</Typography>
            <Typography variant="h5" style={{ color: "#dc3545" }}>
              10
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Scrolling Announcements */}
      <div style={scrollingBarStyle}>
        <Typography variant="h6" style={scrollTextStyle}>
          🚨 Upcoming Exam on 20th Jan | 📢 Parent-Teacher Meeting on 25th Jan | 📝 Submit Assignments by 15th Jan 🚨
        </Typography>
      </div>

      {/* Table and Pie Chart Section */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: 2, padding: "6px", overflow: "auto" }}>
          <TableContainer
            component={Paper}
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              margin: 0,
              padding: 0,
            }}
          >
            <Table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
              <TableHead
                style={{
                  ...tableHeaderStyle,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  width: "100%",
                  borderCollapse: "collapse",
                }}
                aria-label="sticky table"
              >
                <TableRow>
                  {["S.No", "Date", "Class", "Subject", "Name", "Period Time", "Status"].map((header) => (
                    <TableCell key={header} style={headerCellStyle}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {[
                  { id: 1, date: "10-Jan-2025", class: "10A", subject: "Math", name: "Mr. John", time: "10:00 AM - 11:00 AM", status: "Completed" },
                  { id: 2, date: "10-Jan-2025", class: "9B", subject: "Science", name: "Ms. Smith", time: "11:00 AM - 12:00 PM", status: "Pending" },
                  { id: 3, date: "10-Jan-2025", class: "8C", subject: "English", name: "Ms. Clark", time: "12:00 PM - 1:00 PM", status: "Completed" },
                  { id: 4, date: "10-Jan-2025", class: "7D", subject: "History", name: "Mr. Lee", time: "1:00 PM - 2:00 PM", status: "Pending" },
                  { id: 5, date: "10-Jan-2025", class: "6E", subject: "Geography", name: "Ms. Taylor", time: "2:00 PM - 3:00 PM", status: "Completed" },
                ].map((row) => (
                  <TableRow key={row.id} style={tableRowStyle}>
                    <TableCell style={cellStyle}>{row.id}</TableCell>
                    <TableCell style={cellStyle}>{row.date}</TableCell>
                    <TableCell style={cellStyle}>{row.class}</TableCell>
                    <TableCell style={cellStyle}>{row.subject}</TableCell>
                    <TableCell style={cellStyle}>{row.name}</TableCell>
                    <TableCell style={cellStyle}>{row.time}</TableCell>
                    <TableCell
                      style={{
                        ...cellStyle,
                        color: row.status === "Completed" ? "#155724" : row.status === "Pending" ? "#856404" : "#721c24",
                        backgroundColor:
                          row.status === "Completed"
                            ? "#d4edda"
                            : row.status === "Pending"
                            ? "#fff3cd"
                            : "#f8d7da",
                        fontWeight: "bold",
                        borderRadius: "8px",
                      }}
                    >
                      {row.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ flex: 1, marginLeft: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  padding: "10px",  // Reduced padding for smaller card size
  position: "relative",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  height: "40px", // Explicitly setting the height to increase the card height for icons and titles
};

const tableHeaderStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  fontWeight: "bold",
};

const headerCellStyle = {
  padding: "10px",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
};

const cellStyle = {
  padding: "10px",
  fontSize: "14px",
  textAlign: "center",
};

const tableRowStyle = {
  "&:nth-child(even)": {
    backgroundColor: "#f2f2f2",
  },
};

const scrollingBarStyle = {
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const scrollTextStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#000",
  padding: "10px",
  whiteSpace: "nowrap",
  animation: "scroll 15s linear infinite",
};

export default Dashboard;
