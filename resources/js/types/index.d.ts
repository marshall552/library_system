import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Users {
    id?: number;
    username: string;
    user_email: string;
    contact_number: string;
    role: 'admin' | 'staff' | 'student';
    [key: string]: any; // Add index signature
}

export interface Book {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    genre: string;
    publication_date: string;
    [key: string]: any; // Add index signature
}

export interface BookLoan {
    id?: number;
    user_id: number;
    book_id: number;
    issue_date: string;
    due_date: string;
    return_date: string | null;
    [key: string]: any; // Add index signature
}   
