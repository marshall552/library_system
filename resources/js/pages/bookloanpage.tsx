import Navbar from '@/components/navbar';
import { BookLoan, Users, Book } from '@/types';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    bookLoans: BookLoan[];
    users: Users[];
    books: Book[];
}

export default function BookLoanPage({ bookLoans, users, books }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<BookLoan>({
        user_id: 0,
        book_id: 0,
        issue_date: '',
        due_date: '',
        return_date: null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('book-loans.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            }
        });
    };

    const handleReturn = (loanId: number) => {
        if (confirm('Confirm book return?')) {
            router.put(route('book-loans.return', loanId));
        }
    };

    return (
        <div className="min-h-screen bg-red-800">
            <Navbar />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Book Loan Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Issue New Book
                    </button>
                </div>

                {/* Book Loans Table */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookLoans.map((loan) => (
                                <tr key={loan.id}>
                                    <td className="px-6 py-4 text-gray-900">{loan.users?.username}</td>
                                    <td className="px-6 py-4 text-gray-900">{loan.book?.title}</td>
                                    <td className="px-6 py-4 text-gray-900">{new Date(loan.issue_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-900">{new Date(loan.due_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs
                                            ${loan.return_date 
                                                ? 'bg-green-100 text-green-800'
                                                : new Date(loan.due_date) < new Date()
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {loan.return_date 
                                                ? 'Returned'
                                                : new Date(loan.due_date) < new Date()
                                                    ? 'Overdue'
                                                    : 'Borrowed'
                                            }
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {!loan.return_date && (
                                            <button
                                                onClick={() => handleReturn(loan.id!)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Return Book
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Issue Book Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Issue New Book</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select User</label>
                                    <select
                                        value={data.user_id}
                                        onChange={e => setData('user_id', Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 bg-white"
                                    >
                                        <option value="">Select a user</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && <div className="text-red-500 text-sm">{errors.user_id}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Book</label>
                                    <select
                                        value={data.book_id}
                                        onChange={e => setData('book_id', Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 bg-white"
                                    >
                                        <option value="">Select a book</option>
                                        {books.map(book => (
                                            <option key={book.id} value={book.id}>
                                                {book.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.book_id && <div className="text-red-500 text-sm">{errors.book_id}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                                    <input
                                        type="date"
                                        value={data.issue_date}
                                        onChange={e => setData('issue_date', e.target.value)}
                                        placeholder='choose date'
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                    />
                                    {errors.issue_date && <div className="text-red-500 text-sm">{errors.issue_date}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        type="date"
                                        value={data.due_date}
                                        onChange={e => setData('due_date', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                                    />
                                    {errors.due_date && <div className="text-red-500 text-sm">{errors.due_date}</div>}
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        Issue Book
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