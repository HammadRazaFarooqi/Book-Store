import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

function CreateBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !author || !publishedYear) {
            alert("Please fill all fields!");
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5555/books', { title, author, publishedYear });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <BackButton />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700">Title:</label>
                <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                
                <label className="block text-gray-700 mt-3">Author:</label>
                <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                />

                <label className="block text-gray-700 mt-3">Published Year:</label>
                <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={publishedYear} 
                    onChange={(e) => setPublishedYear(e.target.value)} 
                />

                <button 
                    type="submit" 
                    className="w-full bg-green-500 text-white mt-4 py-2 rounded cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>
    );
}

export default CreateBook;
