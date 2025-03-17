<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return Inertia::render('bookpage', [
            'books' => $books
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books',
            'genre' => 'required|string',
            'publication_date' => 'required|date'
        ]);

        Book::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn,' . $book->id,
            'genre' => 'required|string',
            'publication_date' => 'required|date'
        ]);

        $book->update($validated);

        return redirect()->back();
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->back();
    }
} 