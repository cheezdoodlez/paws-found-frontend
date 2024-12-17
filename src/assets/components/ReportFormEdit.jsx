import React, { useState, useEffect } from "react";
import axios from "axios";

const ReportFormEdit = () => {
  // State to store the list of reports
  const [reports, setReports] = useState([]);
  // State to store the selected report (for editing)
  const [selectedReport, setSelectedReport] = useState(null);
  // State to store the form data
  const [formData, setFormData] = useState({
    name: [],
    breed: [],
    color: [],
    images: [],
    lastLocation: [],
    lastDateSeen: [],
  });
  // State to manage loading and error status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the list of reports from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5501/report");
        setReports(response.data);
      } catch (err) {
        setError("Error fetching reports");
      }
    };

    fetchReports();
  }, []);

  // Handle report selection for editing
  const handleSelectReport = (report) => {
    setSelectedReport(report); // Set the selected report for editing
    setFormData({
      name: report.name.join(", "), // Convert array to comma-separated string
      breed: report.breed.join(", "),
      color: report.color.join(", "),
      images: report.images.join(", "),
      lastLocation: report.lastLocation.join(", "),
      lastDateSeen: report.lastDateSeen.join(", "),
    });
  };

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image and other array inputs
  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  // Handle form submission (Update the report data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReport) {
      setError("No report selected for editing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:5501/report/${selectedReport._id}`,
        formData
      );
      setLoading(false);
      alert("Report updated successfully!");
      setSelectedReport(null); // Reset selected report after successful update
      setFormData({
        name: "",
        breed: "",
        color: "",
        images: [],
        lastLocation: [],
        lastDateSeen: [],
      }); // Reset the form data
    } catch (err) {
      setLoading(false);
      setError("Failed to update report data.");
    }
  };

  return (
    <div>
      <h2>Edit Report Information</h2>

      {/* List of Reports */}
      <div>
        <h3>Report List</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              {report.name.join(", ")} - {report.breed.join(", ")}
              <button onClick={() => handleSelectReport(report)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Form (only visible if a report is selected) */}
      {selectedReport && (
        <div>
          <h3>Edit Report: {selectedReport.name.join(", ")}</h3>

          {loading && <p>Updating report...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Breed </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Images </label>
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleArrayInputChange}
              />
            </div>

            <div>
              <label>Last Location </label>
              <input
                type="text"
                name="lastLocation"
                value={formData.lastLocation}
                onChange={handleArrayInputChange}
              />
            </div>

            <div>
              <label>Last Date Seen </label>
              <input
                type="text"
                name="lastDateSeen"
                value={formData.lastDateSeen}
                onChange={handleArrayInputChange}
              />
            </div>

            <button type="submit">Update Report</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReportFormEdit;
