import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

function DeleteBook() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:5555/books/${id}`);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <BackButton />
            <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Book</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this book? This action cannot be undone.</p>

            <div className="flex justify-between">
                <button 
                    onClick={() => navigate('/')}
                    className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Cancel
                </button>

                <button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}

export default DeleteBook;
