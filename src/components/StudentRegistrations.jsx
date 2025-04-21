import React, { useState } from 'react';

const StudentRegistrations = ({ data, updateData }) => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [courseOfferingId, setCourseOfferingId] = useState('');
  const [error, setError] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !email.trim() || !courseOfferingId) {
      setError('All fields are required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const newId =
      Math.max(...data.studentRegistrations.map((r) => r.id), 0) + 1;
    const newRegistration = {
      id: newId,
      studentName,
      email,
      courseOfferingId: parseInt(courseOfferingId),
    };
    updateData({
      ...data,
      studentRegistrations: [...data.studentRegistrations, newRegistration],
    });
    setStudentName('');
    setEmail('');
    setCourseOfferingId('');
    setError('');
  };

  const handleDelete = (id) => {
    const updatedRegistrations = data.studentRegistrations.filter(
      (reg) => reg.id !== id
    );
    updateData({ ...data, studentRegistrations: updatedRegistrations });
  };

  const filteredRegistrations = selectedOffering
    ? data.studentRegistrations.filter(
        (reg) => reg.courseOfferingId === parseInt(selectedOffering)
      )
    : data.studentRegistrations;

  return (
    <div className="section">
      <h2>Student Registrations</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student name"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Student email"
          />
        </div>
        <div className="form-group">
          <label>Course Offering:</label>
          <select
            value={courseOfferingId}
            onChange={(e) => setCourseOfferingId(e.target.value)}
          >
            <option value="">Select a course offering</option>
            {data.courseOfferings.map((offering) => {
              const course = data.courses.find(
                (c) => c.id === offering.courseId
              );
              const courseType = data.courseTypes.find(
                (ct) => ct.id === offering.courseTypeId
              );
              return (
                <option key={offering.id} value={offering.id}>
                  {courseType.name}-{course.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn">
          Register Student
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="filter-section">
        <label>Filter by Course Offering:</label>
        <select
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(e.target.value)}
        >
          <option value="">All Course Offerings</option>
          {data.courseOfferings.map((offering) => {
            const course = data.courses.find(
              (c) => c.id === offering.courseId
            );
            const courseType = data.courseTypes.find(
              (ct) => ct.id === offering.courseTypeId
            );
            return (
              <option key={offering.id} value={offering.id}>
                {courseType.name}-{course.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="list-container">
        <h3>Student Registrations</h3>
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Course Offering</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((registration) => {
              const offering = data.courseOfferings.find(
                (o) => o.id === registration.courseOfferingId
              );
              const course = offering
                ? data.courses.find((c) => c.id === offering.courseId)
                : null;
              const courseType = offering
                ? data.courseTypes.find(
                    (ct) => ct.id === offering.courseTypeId
                  )
                : null;
              return (
                <tr key={registration.id}>
                  <td>{registration.studentName}</td>
                  <td>{registration.email}</td>
                  <td>
                    {courseType && course
                      ? `${courseType.name}-${course.name}`
                      : 'N/A'}
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(registration.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRegistrations;