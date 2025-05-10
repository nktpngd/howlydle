import { supabase } from './supabase';
import { Employee } from '@/types/types';

export async function getEmployees(): Promise<Employee[]> {
    const { data, error } = await supabase.from('employees').select('*');

    if (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }

    // Convert snake_case to camelCase for frontend use
    return data.map((employee: any) => ({
        id: employee.id,
        avatar: employee.avatar,
        name: employee.name,
        gender: employee.gender,
        zone: employee.zone,
        affiliation: employee.affiliation,
        age: employee.age,
        startYear: employee.start_year,
    }));
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
    const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();

    if (error) {
        console.error('Error fetching employee:', error);
        throw error;
    }

    if (!data) return null;

    return {
        id: data.id,
        avatar: data.avatar,
        name: data.name,
        gender: data.gender,
        zone: data.zone,
        affiliation: data.affiliation,
        age: data.age,
        startYear: data.start_year,
    };
}
