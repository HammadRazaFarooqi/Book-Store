import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function ShowBook() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105">
                <BackButton />
                <h1 className="text-xl font-bold text-center text-gray-800 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg shadow-md">Book Details</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-6">
                        <div className="p-1 border-l-4 border-blue-500 bg-gray-50 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800">Title</h2>
                            <p className="text-sm text-gray-700">{book.title}</p>
                        </div>
                        <div className="p-1 border-l-4 border-green-500 bg-gray-50 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800">Author</h2>
                            <p className="text-sm text-gray-700">{book.author}</p>
                        </div>
                        <div className="p-1 border-l-4 border-yellow-500 bg-gray-50 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800">Publish Year</h2>
                            <p className="text-sm text-gray-700">{book.publishedYear}</p>
                        </div>
                        <div className="p-1 border-l-4 border-indigo-500 bg-gray-50 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800">Created At</h2>
                            <p className="text-sm text-gray-700">{new Date(book.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="p-1 border-l-4 border-red-500 bg-gray-50 rounded-md shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800">Last Updated</h2>
                            <p className="text-sm text-gray-700">{new Date(book.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowBook;
