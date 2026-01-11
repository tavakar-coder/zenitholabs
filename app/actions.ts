'use server';

import { db } from '@/db';
import { projectSubmissions } from '@/db/schema';

export type State = {
    success: boolean;
    message: string | null;
    errors?: {
        name?: string[];
        email?: string[];
        interest?: string[];
        projectDetails?: string[];
    };
};

export async function submitProjectForm(prevState: State, formData: FormData): Promise<State> {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const interest = formData.get('interest') as string;
    const projectDetails = formData.get('projectDetails') as string;
    const timeline = formData.get('timeline') as string;

    // Basic validation
    if (!name || name.trim().length === 0) {
        return { success: false, message: 'Name is required' };
    }
    if (!email || email.trim().length === 0) {
        return { success: false, message: 'Email is required' };
    }

    try {
        await db.insert(projectSubmissions).values({
            name,
            phone,
            email,
            company,
            interest,
            projectDetails,
            timeline,
        });

        return { success: true, message: 'Thanks! We will be in touch shortly.' };
    } catch (error) {
        console.error('Database Error:', error);
        return { success: false, message: `Something went wrong: ${error instanceof Error ? error.message : String(error)}` };
    }
}
