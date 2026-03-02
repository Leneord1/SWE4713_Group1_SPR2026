import bcrypt from 'bcrypt';
import { supabase } from '../supabaseClient';

async function hashPassword(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

