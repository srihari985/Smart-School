import React, { useState } from "react";

const All_DocsUpload = () => {
  // State to hold uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hovered, setHovered] = useState(null); // Track which box is being hovered over

  // Array of individual names for the items (16 document boxes)
  const itemNames = [
    "Document 1",
    "Document 2",
    "Document 3",
    "Document 4",
    "Document 5",
    "Document 6",
    "Document 7",
    "Document 8",
    "Document 9",
    "Document 10",
    "Document 11",
    "Document 12",
    "Document 13",
    "Document 14",
    "Document 15",
    "Document 16",
  ];

  // Handle file selection via file input
  const handleFileChange = (index, event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const updatedFiles = [...uploadedFiles];
      updatedFiles[index] = file.name; // Store the file name in state
      setUploadedFiles(updatedFiles);
    }
  };

  // Handle form submission (Placeholder for your logic)
  const handleSubmit = () => {
    alert("Files submitted: " + uploadedFiles.filter(Boolean).join(", "));
  };

  return (
    <div
      style={{
        marginTop: "6%",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        marginLeft: "1%",
        marginRight: "1%",
        height: "90vh",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Upload Documents</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 items per row
          gap: "30px",
          marginTop: "2.9%",
        }}
      >
        {/* Mapping through all document boxes */}
        {itemNames.map((name, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)} // Set hovered box index
            onMouseLeave={() => setHovered(null)} // Reset hovered box index
            style={{
              // backgroundColor: "blue",
              borderRadius: "8px",
              height: "12vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              border: hovered === index ? "2px dotted #007bff" : "2px dashed #ccc", // Dotted border on hover
              transition: "border-color 0.3s", // Smooth transition for border color
            }}
          >
            {/* <h2 style={{ color: "pink" }}>{name}</h2> */}
            <input
              type="file"
              onChange={(event) => handleFileChange(index, event)}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            {/* Show uploaded file name if available */}
            {uploadedFiles[index] && (
              <p style={{ marginTop: "10px", color: "red" }}>
                {uploadedFiles[index]}
              </p>
            )}
            {/* Display text when no file is uploaded */}
            {!uploadedFiles[index] && (
              <p style={{ marginTop: "10px", color: "black" }}>
                Drag & Drop or Click to upload
              </p>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "end", marginTop: "10px" }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default All_DocsUpload;
