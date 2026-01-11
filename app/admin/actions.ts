'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { projectSubmissions } from '@/db/schema';
import { desc } from 'drizzle-orm';

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@zenitholabs.com';
const ADMIN_PASSWORD = 'ZenithoAdmin@2026';

// Session token (simple implementation)
const ADMIN_SESSION_TOKEN = 'zenitho_admin_authenticated_v1';

export type LoginState = {
    success: boolean;
    message: string | null;
};

export async function adminLogin(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { success: false, message: 'Please enter both email and password' };
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set authentication cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_session', ADMIN_SESSION_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        redirect('/admin');
    }

    return { success: false, message: 'Invalid email or password' };
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function checkAdminAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session?.value === ADMIN_SESSION_TOKEN;
}

export async function getSubmissions() {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
        redirect('/admin/login');
    }

    try {
        const submissions = await db
            .select()
            .from(projectSubmissions)
            .orderBy(desc(projectSubmissions.createdAt));

        return submissions;
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return [];
    }
}

export type Submission = {
    id: number;
    name: string;
    phone: string | null;
    email: string;
    company: string | null;
    interest: string | null;
    projectDetails: string | null;
    timeline: string | null;
    createdAt: Date;
};
