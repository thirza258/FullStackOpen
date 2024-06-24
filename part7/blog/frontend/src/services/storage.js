const KEY = 'secret'

const saveUser = (user) => {
  console.log('Saving user:', user);
  localStorage.setItem(KEY, JSON.stringify(user));
}

const loadUser = () => {
  const user = localStorage.getItem(KEY);
  console.log('Loaded user:', user);
  return user ? JSON.parse(user) : null;
}

const me = () => {
  const user = loadUser()
  return user ? user.username : null
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

export default { saveUser, loadUser, removeUser, me }