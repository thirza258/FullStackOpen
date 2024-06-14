const LoginForm = ({
  props
   }) => {
   return (
     <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            value={props.username}
            onChange={props.handleChange}
            name="username"
          />
        </div>
         <div>
           password
           <input
             type="password"
             value={props.password}
             onChange={props.handlePasswordChange}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }
 
 export default LoginForm