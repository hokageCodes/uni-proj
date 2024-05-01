"use client"
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();
  const { facultyId } = router.query;

  useEffect(() => {
    if (!facultyId) return;

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/departments?facultyId=${facultyId}`);
        setDepartments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load departments');
        setLoading(false);
        console.error(err);
      }
    };

    fetchDepartments();
  }, [facultyId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!departments.length) return <p>No departments found.</p>;

  return (
    <div>
      <h1>Departments</h1>
      {departments.map(dept => (
        <p key={dept._id}>{dept.name}</p>
      ))}
    </div>
  );
};

export default DepartmentPage;
