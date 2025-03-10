import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then(response => {
                setBooks(response.data.data.filter(book => book.title && book.author));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
                <h1 className="text-3xl font-bold text-gray-700">📚 Book Library</h1>
                <Link to='/books/create' className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md transition-all">
                    <MdOutlineAddBox className='mr-2 text-xl' /> Add Book
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center mt-10">
                    <Spinner />
                </div>
            ) : (
                <div className="mt-6">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <table className="w-full text-left bg-white rounded-lg">
                            <thead>
                                <tr className="bg-blue-500 text-white text-lg">
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Author</th>
                                    <th className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => (
                                    <tr key={book._id} className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="px-6 py-4 font-medium text-gray-800">{book.title}</td>
                                        <td className="px-6 py-4 text-gray-700">{book.author}</td>
                                        <td className="px-6 py-4 flex justify-center gap-3">
                                            <Link to={`/books/${book._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center shadow-md transition-all">
                                                <BsInfoCircle className='mr-1' /> Show
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center shadow-md transition-all">
                                                <AiOutlineEdit className='mr-1' /> Edit
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center shadow-md transition-all">
                                                <MdOutlineDelete className='mr-1' /> Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
