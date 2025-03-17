import { Link } from '@inertiajs/react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-red-800">
                            Library System
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('users.index')}
                            className={`px-3 py-2 rounded-md text-sm font-medium 
                                ${route().current('users.*') 
                                    ? 'bg-red-800 text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Users
                        </Link>

                        <Link
                            href={route('books.index')}
                            className={`px-3 py-2 rounded-md text-sm font-medium 
                                ${route().current('books.*') 
                                    ? 'bg-red-800 text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Books
                        </Link>

                        <Link
                            href={route('book-loans.index')}
                            className={`px-3 py-2 rounded-md text-sm font-medium 
                                ${route().current('book-loans.*') 
                                    ? 'bg-red-800 text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Book Loans
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

