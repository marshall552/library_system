<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'user';

    protected $fillable = [
        'username',
        'user_email',
        'contact_number',
        'role'
    ];

    // A user can have many book loans
    public function bookLoans()
    {
        return $this->hasMany(BookLoan::class, 'user_id');
    }
}
