import { supabase } from '../supabaseClient';

export async function createUser(email, fName, lName, address, dob, password, role) {
    try {
        const hashedPassword = await hashPassword(password);
        const { data, error } = await supabase.rpc('create_user', {
            p_email: email,
            p_f_name: fName,
            p_l_name: lName,
            p_address: address, 
            p_dob: dob,
            p_password: hashedPassword,
            p_role: role
        });
    }
    catch (error) {
        // Replace with error message in future
        console.error('Error creating user:', error);
    }
}

export async function getPasswords(){
    const { data, error } = await supabase.rpc('get_userpasswords');

    if (error) {
    console.error(error);
    } else {
    console.log(data);
    }
}
