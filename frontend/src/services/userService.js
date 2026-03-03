import { supabase } from '../supabaseClient';
import { hashPassword } from '../utils/passwordHash';
import { sendNewAccountRequest } from './emailService';
export async function createUser(email, fName, lName, address, dob, password, role) {
  try {
    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabase.rpc('create_user', {
      p_email:    email,
      p_f_name:   fName,
      p_l_name:   lName,
      p_address:  address,
      p_dob:      dob,
      p_password: hashedPassword,
      p_role:     role,  // REQUIRED: pass 'administrator' | 'manager' | 'accountant'
    });

    if (error) {
      console.error('Error creating user (RPC):', error);
      throw error;
    }

    console.log('Created user JSON:', data);
    return data;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}

export async function createUserRequest(email, fName, lName, address, dob, password, questionId1, answer1, questionId2, answer2, questionId3, answer3){
    try {
        const hashedPassword = await hashPassword(password);
        const { data, error } = await supabase.rpc('create_user_request', {
            p_email:       email,
            p_f_name:      fName,
            p_l_name:      lName,
            p_address:     address,
            p_dob:         dob,           // 'YYYY-MM-DD'
            p_password:    hashedPassword,
            p_questionid1: questionId1,
            p_secanswer1:  answer1,
            p_questionid2: questionId2,
            p_secanswer2:  answer2,
            p_questionid3: questionId3,
            p_secanswer3:  answer3,
          });
        
        console.log('User request JSON:', data);
        const fullName = `${fName} ${lName}`
        //sendNewAccountRequest(fullName);
        return data;    
    } 
    catch (error) {
        console.error('Error creating user request:', error);
        throw error;
    }
}

export async function updateUser({
  userId,
  email,
  username,
  passwordHash,
  fName,
  lName,
  dob,
  address,
  picturePath,
  status,
  passwordExpires,
  role,
  suspendedTill,
  loginAttempts,
}) {
  if (userId == null) {
    throw new Error('updateUser: userId is required');
  }

  const { data, error } = await supabase.rpc('update_user', {
    p_userid:          userId,
    p_email:           email ?? null,
    p_username:        username ?? null,
    p_password_hash:   passwordHash ?? null,
    p_fname:           fName ?? null,
    p_lname:           lName ?? null,
    p_dob:             dob ?? null,
    p_address:         address ?? null,
    p_picture_path:    picturePath ?? null,
    p_status:          typeof status === 'boolean' ? status : null,
    p_passwordExpires: passwordExpires ?? null,
    p_role:            role ?? null,
    p_suspendedTill:   suspendedTill ?? null,
    p_loginAttempts:   loginAttempts ?? null,
  });

  if (error) {
    console.error('Error updating user (RPC):', error);
    throw error;
  }

  console.log('Updated user JSON:', data);
  return data;
}

export async function getPasswords(){
    const { data, error } = await supabase.rpc('get_userpasswords');

    if (error) {
    console.error(error);
    } else {
    console.log(data);
    }
}

export async function checkEmail(email){
  try {
    const { data, error } = await supabase.rpc('check_email', { p_email: email });
    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}

/**
 * Get security questions for a user by email and userID
 * Returns an object with question1, question2, question3 (the question text)
 */
export async function getUserSecurityQuestions(email, userId) {
  try {
    const { data, error } = await supabase.rpc('get_user_security_questions', {
      p_email: email,
      p_userid: parseInt(userId, 10),
    });

    if (error) {
      console.error('Error getting security questions:', error);
      throw error;
    }

    return data; // { question1: "...", question2: "...", question3: "..." }
  } catch (error) {
    console.error('Error in getUserSecurityQuestions:', error);
    throw error;
  }
}

/**
 * Verify security answers for a user
 * Returns true if all answers match, false otherwise
 */
export async function verifySecurityAnswers(email, userId, answer1, answer2, answer3) {
  try {
    const { data, error } = await supabase.rpc('verify_security_answers', {
      p_email: email,
      p_userid: parseInt(userId, 10),
      p_answer1: answer1.trim(),
      p_answer2: answer2.trim(),
      p_answer3: answer3.trim(),
    });

    if (error) {
      console.error('Error verifying security answers:', error);
      throw error;
    }

    return !!data; // true if all match, false otherwise
  } catch (error) {
    console.error('Error in verifySecurityAnswers:', error);
    return false;
  }
}
