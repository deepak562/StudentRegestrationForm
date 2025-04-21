import React, { useState } from 'react';

const CourseTypes = ({ data, updateData }) => {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Course type name is required');
      return;
    }

    if (editingId) {
      // Update existing course type
      const updatedCourseTypes = data.courseTypes.map((type) =>
        type.id === editingId ? { ...type, name } : type
      );
      updateData({ ...data, courseTypes: updatedCourseTypes });
      setEditingId(null);
    } else {
      // Add new course type
      const newId = Math.max(...data.courseTypes.map((t) => t.id), 0) + 1;
      const newCourseType = { id: newId, name };
      updateData({
        ...data,
        courseTypes: [...data.courseTypes, newCourseType],
      });
    }
    setName('');
    setError('');
  };

  const handleEdit = (courseType) => {
    setName(courseType.name);
    setEditingId(courseType.id);
  };

  const handleDelete = (id) => {
    // Check if course type is used in any offerings
    const isUsed = data.courseOfferings.some(
      (offering) => offering.courseTypeId === id
    );
    if (isUsed) {
      setError('This course type is used in course offerings and cannot be deleted');
      return;
    }

    const updatedCourseTypes = data.courseTypes.filter(
      (type) => type.id !== id
    );
    updateData({ ...data, courseTypes: updatedCourseTypes });
    setError('');
  };

  return (
    <div className="section">
      <h2>Course Types</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Type Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Individual, Group, Special"
          />
        </div>
        <button type="submit" className="btn">
          {editingId ? 'Update' : 'Add'} Course Type
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="list-container">
        <h3>Existing Course Types</h3>
        <ul className="list">
          {data.courseTypes.map((type) => (
            <li key={type.id} className="list-item">
              <span>{type.name}</span>
              <div>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(type)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(type.id)}
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

export default CourseTypes;