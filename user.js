const users = [
  {
    id: 1, 
    email: "alexwhite5d@gmail.com",
    passwordDigest: "210207214214217"
  }
]

const find = (email) => {
  let foundUser
  users.forEach( (user) => {
    if(user.email === email) {
      foundUser = user
    } 
  })
  return foundUser
}

module.exports = {
	users: users, 
	find: find
}
