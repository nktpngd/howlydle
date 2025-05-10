import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { employees } from '../src/lib/users';

// Create Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Convert camelCase to snake_case
function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// Convert object keys from camelCase to snake_case
function convertKeysToSnakeCase(obj: Record<string, any>): Record<string, any> {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
        newObj[toSnakeCase(key)] = obj[key];
    }
    return newObj;
}

async function migrateEmployees() {
    console.log('Starting employee migration...');

    // Verify environment variables are loaded
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

    try {
        // Test connection first
        console.log('Testing Supabase connection...');
        const { data: testData, error: testError } = await supabase
            .from('employees')
            .select('count')
            .limit(1);

        if (testError) {
            console.error('Connection test failed:', testError);
            throw testError;
        }
        console.log('Connection test successful');

        // Delete existing employees
        console.log('Deleting existing employees...');
        const { error: deleteError } = await supabase
            .from('employees')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

        if (deleteError) {
            console.error('Error deleting existing employees:', deleteError);
            throw deleteError;
        }
        console.log('Successfully deleted existing employees');

        // Insert all employees
        console.log(`Attempting to insert ${employees.length} employees...`);

        const { data, error } = await supabase
            .from('employees')
            .insert(
                employees.map((employee) =>
                    convertKeysToSnakeCase({
                        ...employee,
                        id: `${employee.id.padStart(8, '0')}-0000-0000-0000-000000000000`,
                    })
                )
            )
            .select();

        if (error) {
            console.error('Supabase error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            });
            throw error;
        }

        console.log(`Successfully inserted ${data.length} employees`);
    } catch (error: any) {
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
        });
        process.exit(1);
    }
}

migrateEmployees();
