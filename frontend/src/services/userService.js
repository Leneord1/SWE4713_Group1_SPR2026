import { supabase } from '../supabaseClient';
import { hashPassword } from '../utils/passwordHash';
import { sendNewAccountRequest } from './emailService';

export async function createUser(
  email,
  fName,
  lName,
  address,
  dob,
  password,
  role,
  questionId1 = null,
  answer1 = null,
  questionId2 = null,
  answer2 = null,
  questionId3 = null,
  answer3 = null
) {
  try {
    const hashedPassword = await hashPassword(password);

    const hashedAnswer1 = answer1 ? await hashPassword(answer1) : null;
    const hashedAnswer2 = answer2 ? await hashPassword(answer2) : null;
    const hashedAnswer3 = answer3 ? await hashPassword(answer3) : null;

    const { data, error } = await supabase.rpc('create_user', {
      p_email:       email,
      p_f_name:      fName,
      p_l_name:      lName,
      p_address:     address,
      p_dob:         dob,
      p_password:    hashedPassword,
      p_role:        role,  // REQUIRED: pass 'administrator' | 'manager' | 'accountant'
      p_questionid1: questionId1,
      p_secanswer1:  hashedAnswer1,
      p_questionid2: questionId2,
      p_secanswer2:  hashedAnswer2,
      p_questionid3: questionId3,
      p_secanswer3:  hashedAnswer3,
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

export async function createUserRequest(
  email,
  fName,
  lName,
  address,
  dob,
  password,
  questionId1,
  answer1,
  questionId2,
  answer2,
  questionId3,
  answer3
) {
    try {
        const hashedPassword = await hashPassword(password);
        const hashedAnswer1 = answer1 ? await hashPassword(answer1) : null;
        const hashedAnswer2 = answer2 ? await hashPassword(answer2) : null;
        const hashedAnswer3 = answer3 ? await hashPassword(answer3) : null;

        const { data, error } = await supabase.rpc('create_user_request', {
          p_email:       email,
          p_f_name:      fName,
          p_l_name:      lName,
          p_address:     address,
          p_dob:         dob,
          p_password:    hashedPassword,
          p_questionid1: questionId1,
          p_secanswer1:  hashedAnswer1,
          p_questionid2: questionId2,
          p_secanswer2:  hashedAnswer2,
          p_questionid3: questionId3,
          p_secanswer3:  hashedAnswer3,
        });

        console.log('User request JSON:', data);
        const fullName = `${fName} ${lName}`;
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

export async function getUser(userId) {
  try {
    const { data, error } = await supabase.rpc('get_user', {
      p_userid: userId,
    });

    if (error) {
      console.error('Error getting user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getUser:', error);
    throw error;
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

    return data;
  } catch (error) {
    console.error('Error in getUserSecurityQuestions:', error);
    throw error;
  }
}

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

    return !!data;
  } catch (error) {
    console.error('Error in verifySecurityAnswers:', error);
    return false;
  }
}
export async function getAllUserRequests() {
  try {
    const { data, error } = await supabase.rpc('get_all_user_requests');

    if (error) {
      console.error('Error getting user requests (RPC):', error);
      throw error;
    }
    return data || [];
  } catch (err) {
    console.error('Error in getAllUserRequests:', err);
    throw err;
  }
}

export async function approveUserRequest(userRequestId, role) {
  try {
    const { data, error } = await supabase.rpc('approve_user_request', {
      p_userrequest_id: userRequestId,
      p_role: role,
    });

    if (error) {
      console.error('Error approving user request (RPC):', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in approveUserRequest:', err);
    throw err;
  }
}

export async function rejectUserRequest(userRequestId) {
  try {
    const { data, error } = await supabase.rpc('reject_user_request', {
      p_userrequest_id: userRequestId,
    });

    if (error) {
      console.error('Error rejecting user request (RPC):', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in rejectUserRequest:', err);
    throw err;
  }
}