<?php

namespace App\Http\Controllers;

use App\Models\BookLoan;
use App\Models\Book;
use App\Models\Users;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookLoanController extends Controller
{
    public function index()
    {
        $bookLoans = BookLoan::with(['users', 'book'])->get();
        $user = Users::all();
        $books = Book::all();

        return Inertia::render('bookloanpage', [
            'bookLoans' => $bookLoans,
            'users' => $user,
            'books' => $books
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:user,id',
            'book_id' => 'required|exists:books,id',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after:issue_date'
        ]);

        BookLoan::create($validated);

        return redirect()->back();
    }

    public function return(BookLoan $bookLoan)
    {
        $bookLoan->update([
            'return_date' => now()
        ]);

        return redirect()->back();
    }

    public function destroy(BookLoan $bookLoan)
    {
        $bookLoan->delete();
        return redirect()->back();
    }
} 