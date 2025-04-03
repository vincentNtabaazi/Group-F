import React, { useState } from "react";
import { UpdateIssue } from "../services/issueService";

function Editpage({ data, onClose}) {
  console.log("data", data);

  const id = data.id;
  const [courseUnit, setCourseUnit] = useState(data.course_unit);
  const [lecturerName, setLecturerName] = useState(data.lecturer_name);
  const [issueDetails, setIssueDetails] = useState(data.issue_details);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSubmit = {
        course_unit: courseUnit,
        lecturer_name: lecturerName,
        issue_details: issueDetails,
      // Add other values here that you want to send to the database
    };

    // Assuming UpdateIssue is a function that submits the data
    UpdateIssue(id, dataToSubmit);

    // Close the modal after submitting
    if (onClose) {
      onClose(); // Call onClose to close the modal
      
    }
  };

  return (
    <div>
      <h2>EDIT ISSUE</h2>
      <form onSubmit={handleSubmit}>
        <label>Course Unit:</label>
        <textarea
          onChange={(e) => setCourseUnit(e.target.value)}
          rows="1"
          value={courseUnit}
          required
        ></textarea>

        <label>Lecturer's Name:</label>
        <textarea
          onChange={(e) => setLecturerName(e.target.value)}
          rows="1"
          value={lecturerName}
          required
        ></textarea>

        <label>Issue Details:</label>
        <textarea
          onChange={(e) => setIssueDetails(e.target.value)}
          rows="3"
          value={issueDetails}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Editpage;
