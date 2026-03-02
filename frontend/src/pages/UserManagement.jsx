import React, { useState, useEffect } from 'react';
import '../global.css';
import './adminUsers.css';
import { supabase } from '../supabaseClient';

// renamed component to UserManagement for clarity
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ fname: '', lname: '', dob: '', role: 'accountant', address: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const loadUsers = async () => {
    const { data, error } = await supabase.from('user').select('*');
    console.debug('loadUsers result', { data, error });
    if (error) {
      // Log more info for debugging
      console.error('Error loading users:', error.message || error);
      return;
    }
    if (!data || data.length === 0) {
      console.warn('loadUsers: no users returned');
    }
    setUsers(
      data.map((u) => ({
        id: u.userID,
        fname: u.fName,
        lname: u.lName,
        dob: u.dob,
        username: u.username,
        role: u.role,
        active: u.status,
        address: u.address || '',
      }))
    );
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      if (!form.fname.trim() || !form.lname.trim()) {
        throw new Error('First and last name are required');
      }
      // username generation stays local before sending
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yy = String(now.getFullYear()).slice(-2);
      const generatedUsername =
        form.fname.charAt(0).toLowerCase() +
        form.lname.toLowerCase() +
        mm +
        yy;

      const { data, error } = await supabase.from('user').insert({
        username: generatedUsername,
        fName: form.fname,
        lName: form.lname,
        dob: form.dob || null,
        role: form.role,
        status: true,
        address: form.address || null,
      }).select().single();

      if (error || !data) {
        throw error || new Error('Insert returned no data');
      }

      // append new record to state
      setUsers((u) => [
        {
          id: data.userID,
          fname: data.fName,
          lname: data.lName,
          dob: data.dob,
          username: data.username,
          role: data.role,
          active: data.status,
          address: data.address || '',
        },
        ...u,
      ]);

      setForm({ fname: '', lname: '', dob: '', role: 'accountant', address: '' });
    } catch (ex) {
      console.error('createUser exception', ex);
      setErrorMsg(ex.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    const user = users.find((u) => u.id === id);
    const { error } = await supabase
      .from('user')
      .update({ status: !user.active })
      .eq('userID', id);
    if (error) {
      console.error('toggleActive error', error);
      return;
    }
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
  };

  const updateRole = async (id, role) => {
    const { error } = await supabase
      .from('user')
      .update({ role })
      .eq('userID', id);
    if (error) {
      console.error('updateRole error', error);
      return;
    }
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, role } : x)));
  };

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (user) => {
    setEditId(user.id);
    setEditForm({
      fname: user.fname,
      lname: user.lname,
      dob: user.dob,
      username: user.username,
      role: user.role,
      address: user.address || '',
    });
  };

  const handleEditInput = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    const { error } = await supabase
      .from('user')
      .update({
        fName: editForm.fname,
        lName: editForm.lname,
        dob: editForm.dob || null,
        role: editForm.role,
        address: editForm.address || null,
      })
      .eq('userID', id);
    if (error) {
      console.error('saveEdit error', error);
      return;
    }
    setUsers((u) =>
      u.map((x) => (x.id === id ? { ...x, ...editForm } : x))
    );
    cancelEdit();
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>User Management</h1>
        <p className="muted">Create and manage administrators, managers, and accountants.</p>
      </header>

      <section className="admin-actions">
        <form className="create-user-form" onSubmit={createUser}>
          {errorMsg && <div style={{color:'red',marginBottom:'8px'}}>{errorMsg}</div>}
          {loading && <div style={{marginBottom:'8px'}}>Saving...</div>}
          <input name="fname" value={form.fname} onChange={handleInput} placeholder="First name" required />
          <input name="lname" value={form.lname} onChange={handleInput} placeholder="Last name" required />
          <input name="address" value={form.address} onChange={handleInput} placeholder="Address" />
          <input name="dob" type="date" value={form.dob} onChange={handleInput} placeholder="DOB" required />
          <select name="role" value={form.role} onChange={handleInput}>
            <option value="administrator">Administrator</option>
            <option value="manager">Manager</option>
            <option value="accountant">Regular User (Accountant)</option>
          </select>
          <button type="submit" className="btn btn-primary">Create User</button>
        </form>
      </section>

      <section className="user-list">
        <h2>Existing Users</h2>
        <table>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const editing = editId === u.id;
              return (
                <tr key={u.id} className={u.active ? '' : 'inactive'}>
                  {editing ? (
                    <>
                      <td><input value={editForm.fname} name="fname" onChange={handleEditInput} /></td>
                      <td><input value={editForm.lname} name="lname" onChange={handleEditInput} /></td>
                      <td><input value={editForm.address || ''} name="address" onChange={handleEditInput} /></td>
                      <td><input type="date" value={editForm.dob || ''} name="dob" onChange={handleEditInput} /></td>
                      <td>{u.username}</td>
                      <td>
                        <select value={editForm.role} name="role" onChange={handleEditInput}>
                          <option value="administrator">Administrator</option>
                          <option value="manager">Manager</option>
                          <option value="accountant">Regular User (Accountant)</option>
                        </select>
                      </td>
                      <td>{u.active ? 'Active' : 'Inactive'}</td>
                      <td>
                        <button className="btn" onClick={() => saveEdit(u.id)}>Save</button>
                        <button className="btn" onClick={cancelEdit}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{u.fname}</td>
                      <td>{u.lname}</td>
                      <td>{u.address}</td>
                      <td>{u.dob}</td>
                      <td>{u.username}</td>
                      <td>
                        <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value)}>
                          <option value="administrator">Administrator</option>
                          <option value="manager">Manager</option>
                          <option value="accountant">Regular User (Accountant)</option>
                        </select>
                      </td>
                      <td>{u.active ? 'Active' : 'Inactive'}</td>
                      <td>
                        <button className="btn" onClick={() => toggleActive(u.id)}>{u.active ? 'Deactivate' : 'Activate'}</button>
                        {u.role !== 'administrator' && (
                          <button className="btn" onClick={() => startEdit(u)}>Edit</button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserManagement;
