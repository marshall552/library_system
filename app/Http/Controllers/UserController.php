<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = Users::all();
        return Inertia::render('userpage', [
            'users' => $user
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'user_email' => 'required|email|unique:user,user_email',
            'contact_number' => 'required|string',
            'role' => 'required|in:student,staff,admin'
        ]);

        Users::create($validated);

        return to_route('users.index');
    }

    public function update(Request $request, Users $user)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'user_email' => 'required|email|unique:user,user_email,'.$user->id,
            'contact_number' => 'required|string',
            'role' => 'required|in:student,staff,admin'
        ]);

        $user->update([
            'username' => $validated['username'],
            'user_email' => $validated['user_email'],
            'contact_number' => $validated['contact_number'],
            'role' => $validated['role']
        ]);

        return redirect()->back();
    }

    public function destroy(Users $user)
    {
        $user->delete();
        return redirect()->back();
    }
} 