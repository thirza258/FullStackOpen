import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      // Optionally, save user to local storage if needed
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, possibly show a notification
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          data-testid='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          data-testid='password'
          onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Login" />
    </form>
  )
}

export default Login