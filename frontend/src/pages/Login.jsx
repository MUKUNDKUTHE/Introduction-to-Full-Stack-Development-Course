import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault(); setErr('');
    try{
      const { data } = await api.post('/auth/login', form);
      login(data);
      nav('/');
    }catch(ex){ setErr(ex?.response?.data?.message || 'Login failed'); }
  };
  return (
    <div style={{maxWidth:420, margin:'60px auto'}}>
      <h2>Login</h2>
      {err && <p style={{color:'red'}}>{err}</p>}
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required style={{width:'100%',padding:10,margin:'8px 0'}}/>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required style={{width:'100%',padding:10,margin:'8px 0'}}/>
        <button type="submit" style={{padding:10,width:'100%'}}>Login</button>
      </form>
      <p>New here? <Link to="/signup">Create account</Link></p>
    </div>
  );
};
export default Login;
