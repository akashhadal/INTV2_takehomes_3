import './App.css';
// import xLogin from './component/login';
import React,{useState} from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState(true);
  const [msg, setMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'user' && password === 'password') {
      setMsg('Welcome, user!');
      setDisplay(false);
    } else {
      setMsg('Invalid username or password');
      setDisplay(true);
    }
  };

  

  return (
    <div style={{display:'flex', justifyContent:"center", alignItems:'center' , flexDirection:'column'}}>
      <h1>Login Page</h1>
      {display ? <><form onSubmit={handleSubmit}>
        <div>
          <label for="username">Username: </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='Username'
            required
          />
        </div>
        <div>
          <label for="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password'
            required
          />
          <br/>
          <button type="submit">Submit</button>
        </div>
      </form>
      {msg && <div className="message">{msg}</div>}</> : <div className="message">{msg}</div>}
      
    </div>
  );
}

export default App;
