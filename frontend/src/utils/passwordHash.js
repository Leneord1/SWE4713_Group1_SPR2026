import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';

export async function hashPassword(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
}
