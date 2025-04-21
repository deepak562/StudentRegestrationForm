export const initialData = {
    courseTypes: [
      { id: 1, name: 'Individual' },
      { id: 2, name: 'Group' },
      { id: 3, name: 'Special' }
    ],
    courses: [
      { id: 1, name: 'Hindi' },
      { id: 2, name: 'English' },
      { id: 3, name: 'Urdu' }
    ],
    courseOfferings: [
      { id: 1, courseId: 1, courseTypeId: 1, name: 'Individual-Hindi' },
      { id: 2, courseId: 2, courseTypeId: 2, name: 'Group-English' }
    ],
    studentRegistrations: [
      { id: 1, studentName: 'John Doe', email: 'john@example.com', courseOfferingId: 1 },
      { id: 2, studentName: 'Jane Smith', email: 'jane@example.com', courseOfferingId: 2 }
    ]
  };