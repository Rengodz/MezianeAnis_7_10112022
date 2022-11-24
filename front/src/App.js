import React, { useState } from 'react';
import LoginForm from "./components/login/LoginForm";


function App() {
  
  const [user, setUser] = useState({name:"" , email:""});
  const [error,setError] = useState("");

  const Login = details => {
    console.log(details);
  }

  const Logout = () => {
    console.log("Logout");
  }

  return (
    <div className="App">
      {(user.email !== "")}
          <h1 className="text-3xl font-bold underline">Groupomania</h1>
        <LoginForm></LoginForm>
      
    </div>
  );
}

export default App;
