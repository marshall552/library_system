<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'genre',
        'publication_date'
    ];

    // A book can have many loans
    public function bookLoans()
    {
        return $this->hasMany(BookLoan::class, 'book_id');
    }
}
