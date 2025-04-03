import React, { useState } from 'react';
import "./Registrardashboard.css";// Fixing the case for component import

// Initial issues with added 'dateSubmitted' field
const initialIssues = [
  { id: 1, studentName: 'John Doe', course: 'BSCS', courseUnit: 'DSA', lecturerName: 'Kizito', status: 'Pending', dateSubmitted: '2025-03-15' },
  { id: 2, studentName: 'Jane Smith', course: 'BSSE', courseUnit: 'SDP', lecturerName: 'Daniel', status: 'Resolved', dateSubmitted: '2025-03-16' },
  { id: 3, studentName: 'Samuel Green', course: 'BLIS', courseUnit: 'SAAD', lecturerName: 'Kevin', status: 'Pending', dateSubmitted: '2025-03-17' },
  { id: 3, studentName: 'Sarah Grace', course: 'BIST', courseUnit: 'SAAD', lecturerName: 'Kevin', status: 'Pending', dateSubmitted: '2025-03-14' },
];

export default function RegistrarDashboard() {
  const [issues, setIssues] = useState(initialIssues);

  // Handle submission of new issues
  const onSubmitIssue = (newIssue) => {
    setIssues((prevIssues) => [...prevIssues, newIssue]);
  };

  // Toggle issue status between 'Pending' and 'Resolved'
  const toggleStatus = (id) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id
          ? { ...issue, status: issue.status === 'Pending' ? 'Resolved' : 'Pending' }
          : issue
      )
    );
  };

  // Group issues by lecturer for the student issues list
  const groupByLecturer = issues.reduce((grouped, issue) => {
    if (!grouped[issue.lecturerName]) {
      grouped[issue.lecturerName] = [];
    }
    grouped[issue.lecturerName].push(issue);
    return grouped;
  }, {});

  // Get list of unique lecturers and their course units
  const lecturersList = Array.from(new Set(issues.map((issue) => issue.lecturerName)))
    .map((lecturerName) => ({
      lecturerName,
      courses: issues.filter((issue) => issue.lecturerName === lecturerName).map((issue) => issue.courseUnit),
    }));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">REGISTRAR DASHBOARD</h1>
      
      {/* Issue Page to submit new issues */}
      <issuepage onSubmitIssue={onSubmitIssue} />

      {/* Lecturers List */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Lecturers and Course Units</h2>
      <ul className="list-disc pl-6">
        {lecturersList.map((lecturer) => (
          <li key={lecturer.lecturerName}>
            <strong>{lecturer.lecturerName}:</strong> {lecturer.courses.join(', ')}
          </li>
        ))}
      </ul>

      {/* Student Issues List */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Student Issues</h2>
      {Object.keys(groupByLecturer).map((lecturer) => (
        <div key={lecturer} className="mb-6">
          <h3 className="text-xl font-semibold">{lecturer}</h3>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Student Name</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Course Unit</th>
                <th className="border border-gray-300 p-2">Date Submitted</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupByLecturer[lecturer].map((issue) => (
                <tr key={issue.id} className="text-center">
                  <td className="border border-gray-300 p-2">{issue.studentName}</td>
                  <td className="border border-gray-300 p-2">{issue.course}</td>
                  <td className="border border-gray-300 p-2">{issue.courseUnit}</td>
                  <td className="border border-gray-300 p-2">{issue.dateSubmitted}</td>
                  <td className={`border border-gray-300 p-2 ${issue.status === 'Resolved' ? 'text-green-600' : 'text-red-600'}`}>{issue.status}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => toggleStatus(issue.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                    >
                      {issue.status === 'Pending' ? 'Mark as Resolved' : 'Mark as Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
