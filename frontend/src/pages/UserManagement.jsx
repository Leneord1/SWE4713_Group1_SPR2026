import React, { useState } from 'react';
import '../global.css';
import './adminUsers.css';

// renamed component to UserManagement for clarity
function UserManagement() {
  const [users, setUsers] = useState([
    // sample users (username generated as f + lastname + 0326)
    { id: 1, fname: 'Alice', lname: 'Smith', address: '', dob: '1990-01-01', username: 'asmith0326', role: 'administrator', active: true },
    { id: 2, fname: 'Bob', lname: 'Jones', address: '', dob: '1985-03-12', username: 'bjones0326', role: 'manager', active: true },
    { id: 3, fname: 'Charlie', lname: 'Brown', address: '', dob: '1992-07-22', username: 'cbrown0326', role: 'accountant', active: false },
  ]);

  const [form, setForm] = useState({ fname: '', lname: '', address: '', dob: '', role: 'accountant', active: true });
  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createUser = (e) => {
    e.preventDefault();
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const generatedUsername =
      form.fname.charAt(0).toLowerCase() +
      form.lname.toLowerCase() +
      mm +
      yy;
    const next = { ...form, id: Date.now(), username: generatedUsername };
    setUsers((u) => [next, ...u]);
    setForm({ fname: '', lname: '', address: '', dob: '', role: 'accountant', active: true });
  };

  const toggleActive = (id) => {
    setUsers((u) => u.map(x => (x.id === id ? { ...x, active: !x.active } : x)));
  };

  const updateRole = (id, role) => {
    setUsers((u) => u.map(x => (x.id === id ? { ...x, role } : x)));
  };

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (user) => {
    setEditId(user.id);
    setEditForm({
      fname: user.fname,
      lname: user.lname,
      address: user.address,
      dob: user.dob,
      username: user.username,
      role: user.role,
    });
  };

  const handleEditInput = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const saveEdit = (id) => {
    setUsers((u) => u.map(x => (x.id === id ? { ...x, ...editForm } : x)));
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
          <input name="fname" value={form.fname} onChange={handleInput} placeholder="First name" required />
          <input name="lname" value={form.lname} onChange={handleInput} placeholder="Last name" required />
          <input name="address" value={form.address} onChange={handleInput} placeholder="Address" required />
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
                      <td><textarea value={editForm.address || ''} name="address" onChange={handleEditInput} rows={2} /></td>
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
