import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try{
      const { data } = await api.post('/auth/signup', form);
      login(data);
      nav('/');
    }catch(ex){ setErr(ex?.response?.data?.message || 'Signup failed'); }
  };
  return (
    <div style={{maxWidth:420, margin:'60px auto'}}>
      <h2>Create account</h2>
      {err && <p style={{color:'red'}}>{err}</p>}
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required style={{width:'100%',padding:10,margin:'8px 0'}}/>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required style={{width:'100%',padding:10,margin:'8px 0'}}/>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required style={{width:'100%',padding:10,margin:'8px 0'}}/>
        <button type="submit" style={{padding:10,width:'100%'}}>Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
export default Signup;
