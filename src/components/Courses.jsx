import React, { useState } from 'react';

const Courses = ({ data, updateData }) => {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Course name is required');
      return;
    }

    if (editingId) {
      // Update existing course
      const updatedCourses = data.courses.map((course) =>
        course.id === editingId ? { ...course, name } : course
      );
      updateData({ ...data, courses: updatedCourses });
      setEditingId(null);
    } else {
      // Add new course
      const newId = Math.max(...data.courses.map((c) => c.id), 0) + 1;
      const newCourse = { id: newId, name };
      updateData({
        ...data,
        courses: [...data.courses, newCourse],
      });
    }
    setName('');
    setError('');
  };

  const handleEdit = (course) => {
    setName(course.name);
    setEditingId(course.id);
  };

  const handleDelete = (id) => {
    // Check if course is used in any offerings
    const isUsed = data.courseOfferings.some(
      (offering) => offering.courseId === id
    );
    if (isUsed) {
      setError('This course is used in course offerings and cannot be deleted');
      return;
    }

    const updatedCourses = data.courses.filter(
      (course) => course.id !== id
    );
    updateData({ ...data, courses: updatedCourses });
    setError('');
  };

  return (
    <div className="section">
      <h2>Courses</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Hindi, English, Urdu"
          />
        </div>
        <button type="submit" className="btn">
          {editingId ? 'Update' : 'Add'} Course
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="list-container">
        <h3>Existing Courses</h3>
        <ul className="list">
          {data.courses.map((course) => (
            <li key={course.id} className="list-item">
              <span>{course.name}</span>
              <div>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Courses;