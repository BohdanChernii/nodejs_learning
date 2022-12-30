import {useEffect, useState} from "react";
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log(users);
    axios.get('/api/users').then(value => setUsers(value.data))
  }, [])
  return (
    <div className="App">

      <header className="App-header">
        <h1>Learn React!!!!</h1>
      </header>

      <div className="users">
        {users.map(user => (
          <div className='user' key={user._id}>
            <p className="user__name">{user.name}</p>
            <p className="user__name">{user.age}</p>
          </div>))}
      </div>
    </div>
  );
}

export default App;
