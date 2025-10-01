import React from 'react';
import StudentCard from './components/StudentCard';

const students = [
  { name: 'Vanshit Kumar', roll: '23BCS10087', branch: 'CSE', year: '1st' },
  { name: 'Tarun', roll: '23BCS10002', branch: 'CSE', year: '1st' },
  { name: 'Piyush', roll: '23BCS10003', branch: 'CSE', year: '1st' },
  { name: 'Divij', roll: '23BCS10004', branch: 'CSE', year: '1st' },
];

const StudentList: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      {students.map((student) => (
        <StudentCard key={student.roll} student={student} />
      ))}
    </div>
  );
};

export default StudentList;
