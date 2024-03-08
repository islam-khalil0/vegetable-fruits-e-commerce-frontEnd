"use client";

import React, { useState } from 'react';
import Styles from './page.module.css';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState(false)
  const router = useRouter();

  const truthEmail = "mohamed@fkha.com";
  const truthPass = "mohamed2005";
  const totalPath = truthEmail + truthPass ;

  const handleForm = (e) => {
    e.preventDefault();
    if (email === truthEmail && password === truthPass) {
      router.push(`/admin/${totalPath}`)
    } else {
      setErrMessage(true);
    }
  };

  return (
    <div className={Styles.container}>
      <form onSubmit={handleForm}>
        <h1>سجل الدخول</h1>
        <input
          type='email'
          placeholder='اكتب البريد هنا'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='اكتب الباسورد هنا'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          errMessage &&
          <p>غلط يا معلم, اتاكد انك كاتبهم صح</p>
        }
        <button type='submit'>يلا بينا</button>
      </form>
    </div>
  );
};

export default Admin;
