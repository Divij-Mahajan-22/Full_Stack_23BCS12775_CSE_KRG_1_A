import React from 'react';

interface Student {
  name: string;
  roll: string;
  branch: string;
  year: string;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="bg-white shadow p-4 rounded mb-4 border border-gray-200">
      <div className="font-bold text-lg mb-2">{student.name}</div>
      <div>Roll: {student.roll}</div>
      <div>Branch: {student.branch}</div>
      <div>Year: {student.year}</div>
    </div>
  );
};

export default StudentCard;
