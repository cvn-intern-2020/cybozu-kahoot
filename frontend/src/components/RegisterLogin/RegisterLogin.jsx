import React, { useState } from 'react';

const RegisterLogin = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const authenticate = async () => {
    const result = await fetch(
      'http://localhost:6969/api/auth/register_login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
        credentials: 'include',
      }
    ).then((res) => res.json());
    if (result.success) return (window.location.href = '/');
  };
  return (
    <div>
      <h1>Register/Login</h1>
      <input
        placeholder="email"
        onChange={(e) => setEmailValue(e.target.value)}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => setPasswordValue(e.target.value)}
      ></input>
      <button onClick={authenticate}>Submit</button>
    </div>
  );
};

export default RegisterLogin;
