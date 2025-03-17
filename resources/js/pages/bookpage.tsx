import Navbar from '@/components/navbar';
import { Book } from '@/types';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    books: Book[];
}

export default function BookPage({ books }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm<Book>({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        publication_date: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBook) {
            put(route('books.update', editingBook.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingBook(null);
                    reset();
                }
            });
        } else {
            post(route('books.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const openCreateModal = () => {
        setEditingBook(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (book: Book) => {
        setEditingBook(book);
        setData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            genre: book.genre,
            publication_date: book.publication_date
        });
        setIsModalOpen(true);
    };

    const handleDelete = (bookId: number) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(route('books.destroy', bookId));
        }
    };

    return (
        <div className="min-h-screen bg-red-800">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Book Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add New Book
                    </button>
                </div>

                {/* Book Table */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publication Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td className="px-6 py-4 text-gray-900">{book.title}</td>
                                    <td className="px-6 py-4 text-gray-900">{book.author}</td>
                                    <td className="px-6 py-4 text-gray-900">{book.isbn}</td>
                                    <td className="px-6 py-4 text-gray-900">{book.genre}</td>
                                    <td className="px-6 py-4 text-gray-900">{book.publication_date}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => openEditModal(book)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id!)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Create/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    {editingBook ? 'Edit Book' : 'Create New Book'}
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder="Enter book title"
                                    />
                                    {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Author</label>
                                    <input
                                        type="text"
                                        value={data.author}
                                        onChange={e => setData('author', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder="Enter author name"
                                    />
                                    {errors.author && <div className="text-red-500 text-sm">{errors.author}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ISBN</label>
                                    <input
                                        type="text"
                                        value={data.isbn}
                                        onChange={e => setData('isbn', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder="Enter book ISBN"
                                    />
                                    {errors.isbn && <div className="text-red-500 text-sm">{errors.isbn}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                                    <input
                                        type="text"
                                        value={data.genre}
                                        onChange={e => setData('genre', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder="Enter book genre"
                                    />
                                    {errors.genre && <div className="text-red-500 text-sm">{errors.genre}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Publication Date</label>
                                    <input
                                        type="date"
                                        value={data.publication_date}
                                        onChange={e => setData('publication_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                        placeholder='choose date'
                                    />
                                    {errors.publication_date && <div className="text-red-500 text-sm">{errors.publication_date}</div>}
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        {editingBook ? 'Update Book' : 'Create Book'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}