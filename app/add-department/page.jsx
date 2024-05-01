"use client"
import axios from 'axios';
import { useState } from 'react';

const AddDepartment = () => {
    const [name, setName] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/api/departments', {
                name,
                facultyId
            });
            setMessage('Department added successfully!');
            setName('');
            setFacultyId('');
        } catch (error) {
            setMessage('Failed to add department.');
            console.error('Adding department error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto pt-36 p-5">
            <h2 className="text-2xl font-bold mb-6">Add a New Department</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Department Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700">Faculty ID</label>
                    <input
                        type="text"
                        id="facultyId"
                        value={facultyId}
                        onChange={(e) => setFacultyId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? 'Adding...' : 'Add Department'}
                </button>
                {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
            </form>
        </div>
    );
};

export default AddDepartment;
