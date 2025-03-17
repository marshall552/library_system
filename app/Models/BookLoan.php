<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookLoan extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'issue_date',
        'due_date',
        'return_date'
    ];

    protected $casts = [
        'issue_date' => 'date',
        'due_date' => 'date',
        'return_date' => 'date'
    ];

    // A book loan belongs to a user
    public function users()
    {
        return $this->belongsTo(Users::class, 'user_id');
    }

    // A book loan belongs to a book
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
