import React, { useEffect, useState } from "react";
import "./LecturerDashboard.css";
import { FetchIssues, ResolveIssue } from "../services/issueService";

const LecturerDashboard = () => {


  const [issues, setIssues] = useState([]);

  console.log(issues)

  const handleInputChange = (index, value, id) => {
    const updatedIssues = [...issues];
    ResolveIssue(id)
    updatedIssues[index].status = value;
    setIssues(updatedIssues);
  };

  useEffect(() => {
    FetchIssues(setIssues)
  }, [])

  return (
    <div className="dashboard-container">
      <h2 className="title">ASSIGNED ISSUES</h2>
      <div className="course-section">
        <h3>COURSE: IT</h3>
        <table>
          <thead>
            <tr>
              <th>STUDENT NO.</th>
              <th>ISSUE DETAILS</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
                <tr key={index} >
                  <td>{issue.student_details?.student_no}</td>
                  <td>{issue.issue_details}</td>
                  <td>{issue.status}</td>
                  <td>
                    <select
                      value={issue.status}
                      onChange={(e) => handleInputChange(index, e.target.value, issue.id)}
                    >
                      <option value="resolved">Resolved</option>
                      <option value="pending">Pending</option>
                      {/* you didnt put an alternative for in progress and that is why this is commented out.  */}
                      {/* <option value="in_progress">In Progress</option> */}
                      /</select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>


      <div className="stats">
        <p>ASSIGNED ISSUES: 15</p>
        <p>RESOLVED ISSUES: 06</p>
        <p>PENDING ISSUES: 09</p>
        {/* Couldn't include these because the field of category is not being captured from the front end but 
        if you include it then you can easily get this info as well. */}
        {/* <p>MISSING MARKS: 11</p>
        <p>REMARKING: 02</p>
        <p>WRONG MARKS: 02</p> */}
      </div>

    </div>
  );
};

export default LecturerDashboard;
