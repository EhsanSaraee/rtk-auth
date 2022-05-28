import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from 'redux/features/auth/authSlice';
import { useLoginMutation } from 'redux/services/authService';

export const Login = () => {
   const userRef = useRef();
   const errorRef = useRef();

   const [user, setUser] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const navigate = useNavigate();
   const [login, { isLoading }] = useLoginMutation();
   const dispatch = useDispatch();

   useEffect(() => {
      userRef.current.focus();
   }, []);

   useEffect(() => {
      setError('');
   }, [user, password]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const userData = await login({ user, password }).unwrap();
         dispatch(setCredentials({ ...userData, user }));
         setUser('');
         setPassword('');
         navigate('/dashboard');
      } catch (err) {
         if (!err?.originalStatus) setError('No Server Response');
         if (err.originalStatus?.status === 400)
            setError('Missing username or password');
         if (err.originalStatus?.status === 401) setError('Unauthorized');
         setError('Login Failed');
         errorRef.current.focus();
      }
   };

   const handleUserInput = (event) => setUser(event.target.value);

   const handlePasswordInput = (event) => setPassword(event.target.value);

   return isLoading ? (
      <h1>Loading...</h1>
   ) : (
      <section className="login">
         <p
            ref={errorRef}
            className={error ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
         >
            {error}
         </p>

         <h1>Employee Login</h1>

         <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
               type="text"
               id="username"
               ref={userRef}
               value={user}
               onChange={handleUserInput}
               autoComplete="off"
               required
            />

            <label htmlFor="password">Password:</label>
            <input
               type="password"
               id="password"
               onChange={handlePasswordInput}
               value={password}
               required
            />
            <button>Sign In</button>
         </form>
      </section>
   );
};
