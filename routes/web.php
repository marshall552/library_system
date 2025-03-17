<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookLoanController;

// Public routes - no authentication required
Route::get('/', function () {
    return Inertia::render('userpage', [
        'user' => \App\Models\Users::all()
    ]);
})->name('home');

// User routes
Route::resource('users', UserController::class);

// Book routes
Route::resource('books', BookController::class);

// Book Loan routes
Route::resource('book-loans', BookLoanController::class);
Route::put('book-loans/{bookLoan}/return', [BookLoanController::class, 'return'])->name('book-loans.return');

// Protected routes that require authentication
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
