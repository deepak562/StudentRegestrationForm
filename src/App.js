import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';
import { initialData } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('courseTypes');
  const [data, setData] = useState(initialData);

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        {activeTab === 'courseTypes' && (
          <CourseTypes data={data} updateData={updateData} />
        )}
        {activeTab === 'courses' && (
          <Courses data={data} updateData={updateData} />
        )}
        {activeTab === 'courseOfferings' && (
          <CourseOfferings data={data} updateData={updateData} />
        )}
        {activeTab === 'studentRegistrations' && (
          <StudentRegistrations data={data} updateData={updateData} />
        )}
      </div>
    </div>
  );
}

export default App;