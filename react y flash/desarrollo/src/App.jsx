import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [users, setUser] = useState([]);

  useEffect (()=>{
    fetch("http://localhost:5000/api/users")
    .then(res => res.json())
    .then(data => setUser(data.users))
    
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>REACT + FLASK</h1>
      <div className="card">
        <h2>USER</h2>
        <ul>
          {users.map((user)=>(
            <li key={user.id}>
              {user.first_name}{user.lastname}
            </li>
          ))}
        </ul>
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
