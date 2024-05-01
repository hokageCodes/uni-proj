"use client"
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const PastQuestionsPage = () => {
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/faculties')
      .then(res => {
        console.log(res.data);  // Log the data to see what you received
        setFaculties(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch faculties');
        console.error(err);
        setIsLoading(false);
      });
  }, []);
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center py-36">Faculties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {faculties.map(faculty => (
  <div key={faculty._id} className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-semibold mb-4">{faculty.name}</h2>
    <Link href={`/faculties/${faculty.slug}`}> {/* Confirm slug is not undefined */}
      <a className="text-blue-500 hover:text-blue-700 font-semibold">View Departments</a>
    </Link>
  </div>
))}

      </div>
    </div>
  );
};

export default PastQuestionsPage;

