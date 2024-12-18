import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, // A container component for layout with padding/margins
  Typography, // For text and headings
  TextField, // Styled input fields
  Button, // Styled buttons
  Paper, // A card-like container with shadow
  Grid, // Responsive grid layout
  CircularProgress, // Loading spinner
} from "@mui/material";

const ReportFormEdit = () => {
  /** =======================
   * STATE DEFINITIONS
   * ======================== */
  // State to store the list of reports fetched from the backend
  const [reports, setReports] = useState([]);

  // State to track the selected report being edited
  const [selectedReport, setSelectedReport] = useState(null);

  // State to hold form data (name, breed, color, images, etc.)
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    color: "",
    images: "",
    lastLocation: "",
    lastDateSeen: "",
  });

  // State to manage loading indicator while updating a report
  const [loading, setLoading] = useState(false);

  // State to hold any error messages
  const [error, setError] = useState(null);

  /** =======================
   * FETCH REPORTS FROM BACKEND
   * ======================== */
  useEffect(() => {
    // Function to fetch all reports from the server
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5501/report");
        setReports(response.data); // Update the reports state
      } catch (err) {
        setError("Error fetching reports."); // Display an error if fetching fails
      }
    };

    fetchReports(); // Call the fetch function when the component mounts
  }, []);

  /** =======================
   * HANDLE REPORT SELECTION
   * ======================== */
  const handleSelectReport = (report) => {
    // Set the selected report for editing
    setSelectedReport(report);

    // Pre-fill the form fields with data from the selected report
    setFormData({
      name: report.name.join(", "),
      breed: report.breed.join(", "),
      color: report.color.join(", "),
      images: report.images.join(", "),
      lastLocation: report.lastLocation.join(", "),
      lastDateSeen: report.lastDateSeen.join(", "),
    });
  };

  /** =======================
   * HANDLE FORM INPUT CHANGES
   * ======================== */
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure input name and value
    setFormData((prevData) => ({
      ...prevData, // Copy the previous form data
      [name]: value, // Update only the changed field
    }));
  };

  /** =======================
   * HANDLE FORM SUBMISSION
   * ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (!selectedReport) {
      setError("No report selected for editing."); // Ensure a report is selected
      return;
    }

    setLoading(true); // Show loading spinner
    setError(null); // Clear any previous errors

    try {
      // Send an API request to update the selected report
      await axios.put(
        `http://localhost:5501/report/${selectedReport._id}`,
        formData
      );
      setLoading(false); // Hide loading spinner
      alert("Report updated successfully!"); // Notify the user of success

      // Reset the selected report and form data
      setSelectedReport(null);
      setFormData({
        name: "",
        breed: "",
        color: "",
        images: "",
        lastLocation: "",
        lastDateSeen: "",
      });
    } catch (err) {
      setLoading(false); // Hide loading spinner
      setError("Failed to update report."); // Display error message
    }
  };

  /** =======================
   * COMPONENT RETURN
   * ======================== */
  return (
    <Box p={3}>
      {/* Main Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Report Information
      </Typography>

      {/* Display Error Messages */}
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        {/* LEFT COLUMN: List of Reports */}
        <Grid item xs={12} md={6}>
          {/* Section Title */}
          <Typography variant="h5" gutterBottom>
            Report List
          </Typography>

          {/* Container for the Report List */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              maxWidth: "600px", // Limit the width of the list for better appearance
              margin: "0 auto", // Center the list horizontally
            }}
          >
            {reports.map((report) => (
              <Box
                key={report._id}
                display="flex" // Align items in a row
                alignItems="center" // Vertically center the content
                justifyContent="space-between" // Space between text and button
                mb={2} // Add margin below each item
              >
                {/* Report Details */}
                <Typography variant="body1">
                  {report.name.join(", ")} - {report.breed.join(", ")}
                </Typography>

                {/* Edit Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleSelectReport(report)}
                  sx={{
                    textTransform: "none", // Prevent uppercase text
                    borderRadius: "8px", // Rounded corners
                  }}
                >
                  Edit
                </Button>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: Edit Form */}
        <Grid item xs={12} md={6}>
          {/* Show the Edit Form Only When a Report is Selected */}
          {selectedReport ? (
            <Paper elevation={3} sx={{ p: 3 }}>
              {/* Form Title */}
              <Typography variant="h5" gutterBottom>
                Editing: {selectedReport.name.join(", ")}
              </Typography>

              {/* Loading Indicator */}
              {loading && <CircularProgress />}

              {/* Edit Form */}
              <form onSubmit={handleSubmit}>
                {/* Input Field: Name */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                {/* Input Field: Breed */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  required
                />

                {/* Input Field: Color */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                />

                {/* Input Field: Images */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Images (comma-separated)"
                  name="images"
                  value={formData.images}
                  onChange={handleInputChange}
                />

                {/* Input Field: Last Location */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Location (comma-separated)"
                  name="lastLocation"
                  value={formData.lastLocation}
                  onChange={handleInputChange}
                />

                {/* Input Field: Last Date Seen */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Date Seen (comma-separated)"
                  name="lastDateSeen"
                  value={formData.lastDateSeen}
                  onChange={handleInputChange}
                />

                {/* Submit and Cancel Buttons */}
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Update Report
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                    onClick={() => setSelectedReport(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Paper>
          ) : (
            <Typography>Select a report to edit.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportFormEdit;
