import React, { useState } from 'react';

const CourseOfferings = ({ data, updateData }) => {
  const [courseId, setCourseId] = useState('');
  const [courseTypeId, setCourseTypeId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [filterCourseType, setFilterCourseType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId || !courseTypeId) {
      setError('Both course and course type are required');
      return;
    }

    const course = data.courses.find((c) => c.id === parseInt(courseId));
    const courseType = data.courseTypes.find(
      (ct) => ct.id === parseInt(courseTypeId)
    );

    if (editingId) {
      // Update existing offering
      const updatedOfferings = data.courseOfferings.map((offering) =>
        offering.id === editingId
          ? {
              ...offering,
              courseId: parseInt(courseId),
              courseTypeId: parseInt(courseTypeId),
              name: `${courseType.name}-${course.name}`,
            }
          : offering
      );
      updateData({ ...data, courseOfferings: updatedOfferings });
      setEditingId(null);
    } else {
      // Add new offering
      const newId = Math.max(...data.courseOfferings.map((o) => o.id), 0) + 1;
      const newOffering = {
        id: newId,
        courseId: parseInt(courseId),
        courseTypeId: parseInt(courseTypeId),
        name: `${courseType.name}-${course.name}`,
      };
      updateData({
        ...data,
        courseOfferings: [...data.courseOfferings, newOffering],
      });
    }
    setCourseId('');
    setCourseTypeId('');
    setError('');
  };

  const handleEdit = (offering) => {
    setCourseId(offering.courseId.toString());
    setCourseTypeId(offering.courseTypeId.toString());
    setEditingId(offering.id);
  };

  const handleDelete = (id) => {
    // Check if offering has any registrations
    const hasRegistrations = data.studentRegistrations.some(
      (reg) => reg.courseOfferingId === id
    );
    if (hasRegistrations) {
      setError('This course offering has student registrations and cannot be deleted');
      return;
    }

    const updatedOfferings = data.courseOfferings.filter(
      (offering) => offering.id !== id
    );
    updateData({ ...data, courseOfferings: updatedOfferings });
    setError('');
  };

  const filteredOfferings = filterCourseType
    ? data.courseOfferings.filter(
        (offering) => offering.courseTypeId === parseInt(filterCourseType)
      )
    : data.courseOfferings;

  return (
    <div className="section">
      <h2>Course Offerings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course:</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select a course</option>
            {data.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Course Type:</label>
          <select
            value={courseTypeId}
            onChange={(e) => setCourseTypeId(e.target.value)}
          >
            <option value="">Select a course type</option>
            {data.courseTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn">
          {editingId ? 'Update' : 'Add'} Course Offering
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="filter-section">
        <label>Filter by Course Type:</label>
        <select
          value={filterCourseType}
          onChange={(e) => setFilterCourseType(e.target.value)}
        >
          <option value="">All Course Types</option>
          {data.courseTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="list-container">
        <h3>Existing Course Offerings</h3>
        <ul className="list">
          {filteredOfferings.map((offering) => {
            const course = data.courses.find(
              (c) => c.id === offering.courseId
            );
            const courseType = data.courseTypes.find(
              (ct) => ct.id === offering.courseTypeId
            );
            return (
              <li key={offering.id} className="list-item">
                <span>
                  {courseType.name}-{course.name}
                </span>
                <div>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(offering)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(offering.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CourseOfferings;