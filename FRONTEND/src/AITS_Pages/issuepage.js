import React, { useState } from "react";
import "./AcademicIssuePage.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AcademicIssuePage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [courseUnit, setCourseUnit] = useState("");
    const [lecturerName, setLecturerName] = useState("");
    const [issueDetails, setIssueDetails] = useState("");
    // const [successMessage, setSuccessMessage] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(false);

    const courses = {
        SCIT: [
            { value: "BSCS", label: "Bachelor of Science in Computer Science" },
            { value: "BIST", label: "Bachelor of Information Systems and Technology" },
            { value: "IT", label: "Bachelor of Information Technology" },
            { value: "BSSE", label: "Bachelor of Science in Software Engineering" },
        ],
        EALIS: [
            { value: "BLIS", label: "Bachelor of Library and Information Science" },
            { value: "BRAM", label: "Bachelor of Records and Archives Management" },
        ],
    };

    const departments = {
        SCIT: [
            { value: "1", label: "Department of Computer Science" },
            { value: "2", label: "Department of Information Systems" },
            { value: "3", label: "Department of Information Technology" },
            { value: "4", label: "Department of Networks" },
        ],
        EALIS: [
            { value: "5", label: "Department of Library & Information Sciences" },
            { value: "6", label: "Department of Records & Archives Management" },
        ],
    };

    const years = [1, 2, 3, 4];
    const semesters = [1, 2];

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Data object to send to the backend
        const issueData = {
            school: selectedSchool,
            department: selectedDepartment,
            course: selectedCourse,
            year: selectedYear,
            semester: selectedSemester,
            course_unit: courseUnit,
            lecturer_name: lecturerName,
            issue_details: issueDetails,
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/issues/submit/`, issueData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                setSelectedSchool("");
                setSelectedDepartment("");
                setSelectedCourse("");
                setSelectedYear("");
                setSelectedSemester("");
                setCourseUnit("");
                setLecturerName("");
                setIssueDetails("");
                navigate('/student')
                toast('Issue Submitted Successfully', {style: {backgroundColor: 'green', color: 'white'}})
            }
        } catch (error) {
            console.error("Posting issue Error", error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <h2>COCIS Academic Issue Report</h2>
            <form onSubmit={handleSubmit}>
                <label>Select School:</label>
                <select onChange={(e) => setSelectedSchool(e.target.value)} required>
                    <option value="">-- Select School --</option>
                    <option value="SCIT">School of Computing and Informatics Technology</option>
                    <option value="EALIS">East African School of Library and Information Science</option>
                </select>

                <label>Select Department:</label>
                <select onChange={(e) => setSelectedDepartment(e.target.value)} required>
                    <option value="">-- Select Department --</option>
                    {selectedSchool && departments[selectedSchool].map((dept) => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                    ))}
                </select>

                <label>Select Course:</label>
                <select onChange={(e) => setSelectedCourse(e.target.value)} required>
                    <option value="">-- Select Course --</option>
                    {selectedSchool && courses[selectedSchool].map((course) => (
                        <option key={course.value} value={course.value}>{course.label}</option>
                    ))}
                </select>

                <label>Year of Study:</label>
                <select onChange={(e) => setSelectedYear(e.target.value)} required>
                    <option value="">-- Select Year --</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year} Year ({selectedCourse})</option>
                    ))}
                </select>

                <label>Select Semester:</label>
                <select onChange={(e) => setSelectedSemester(e.target.value)} required>
                    <option value="">-- Select Semester --</option>
                    {semesters.map((semester) => (
                        <option key={semester} value={semester}>Semester {semester}</option>
                    ))}
                </select>

                <label>Course Unit:</label>
                <textarea onChange={(e) => setCourseUnit(e.target.value)} rows="1" required></textarea>

                <label>Lecturer's Name:</label>
                <textarea onChange={(e) => setLecturerName(e.target.value)} rows="1" required></textarea>

                <label>Issue Details:</label>
                <textarea onChange={(e) => setIssueDetails(e.target.value)} rows="3" required></textarea>

                <button type="submit">Submit</button>
            </form>
            {/* {successMessage && <p className="success-message">Issue submitted successfully!</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        </div>
    );
};

export default AcademicIssuePage;
