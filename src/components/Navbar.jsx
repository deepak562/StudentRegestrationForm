import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <ul>
        <li
          className={activeTab === 'courseTypes' ? 'active' : ''}
          onClick={() => setActiveTab('courseTypes')}
        >
          Course Types
        </li>
        <li
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </li>
        <li
          className={activeTab === 'courseOfferings' ? 'active' : ''}
          onClick={() => setActiveTab('courseOfferings')}
        >
          Course Offerings
        </li>
        <li
          className={activeTab === 'studentRegistrations' ? 'active' : ''}
          onClick={() => setActiveTab('studentRegistrations')}
        >
          Student Registrations
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;