import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const NewsCard = ({ title, label }) => {
  const color = label === 'fake' ? 'red' : 'green';
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, margin: '10px 0', borderRadius: 8 }}>
      <h3>{title}</h3>
      <span style={{ color, fontWeight:'bold' }}>{label.toUpperCase()}</span>
    </div>
  );
};

const Home = () => {
  const [items, setItems] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get('/news').then(res => setItems(res.data));
  }, []);

  return (
    <div style={{maxWidth:700, margin:'30px auto', padding:'0 16px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>📰 Fake News Detection</h2>
        <div>
          <span style={{marginRight:10}}>Hello, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      {items.map((n, i) => <NewsCard key={i} title={n.title} label={n.label} />)}
    </div>
  );
};
export default Home;
