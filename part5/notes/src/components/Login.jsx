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
 
 LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

 export default LoginForm