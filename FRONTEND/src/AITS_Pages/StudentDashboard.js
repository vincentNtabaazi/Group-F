import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import { FetchIssues } from "../services/issueService";
import Modal from "../components/Modal";
import Editpage from "../components/Editpage";
import toast from "react-hot-toast";


const StudentDashboard = ({ user = {} }) => {

  const navigate = useNavigate()

  const [courseUnits, setCourseUnits] = useState([]);
  const [singleIssue, setSingleIssue ] = useState([])

  console.log("Data:", courseUnits);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    toast('Issues updated successfully!', {style: {backgroundColor: 'green', color: 'white'}});
  };

  const handleEdit = (course) => {
    setSingleIssue(course)
    openModal()
  }

  

  // const handleDelete = (id) => {
  //   DeleteIssue(id)
  // }

  useEffect(() => {
      FetchIssues(setCourseUnits)
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="dashboard-container">
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <Editpage data={singleIssue} onClose={closeModal}  />
      </Modal>

      <h1>Student Dashboard</h1>
      <h2>Hi, {user?.firstName || "Student"}! 👋</h2>
      <p>Track and update your issue resolutions.</p>

      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseUnits.map((course, index) => (
              <tr key={index} className={course.status}>
                <td>{course.course_unit}</td>
                <td>{course.status}</td>
                <td>{course.issue_details}</td>
                <td>
                  <Link
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </Link>
                  <br />
                  {/* I realized that only a registrar can delete an issue */}
                  {/* <Link
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit">Update Issues</button>
      </form>

      <button className="report-btn" onClick={() => navigate("/student/academic-issues")}>
        Report an Issue
      </button>
    </div>
  );
};

export default StudentDashboard;