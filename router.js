const User = require('./user')
const EncryptionHelper = require('./encrypt')

module.exports = (request,response) =>{
	if(request.url === "/users" && request.method === "GET") {
		response.writeHead(200,{'Content-Type':'application/json'});
	  response.write(JSON.stringify(User.users));
	  response.end();
	  return
	}
	if(request.url === "/users" && request.method === "POST") {
		let body = []
		request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      user = JSON.parse(body)
      user.id = User.users.length + 1
      user.passwordDigest = EncryptionHelper.encrypt(user.password, EncryptionHelper.salt)
      delete user.password
      console.log(user)
      User.users.push(user)
      response.writeHead(200,{'Content-Type':'application/json'});
		  response.write(JSON.stringify(user));
		  response.end();
		})
	} else if(request.url === "/login" && request.method === "POST") {
		let body = []
		request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      credentials = JSON.parse(body)
      let user = User.find(credentials.email)
      if(user && user.passwordDigest === EncryptionHelper.encrypt(credentials.password, EncryptionHelper.salt)) {
      	response.writeHead(200,{'Content-Type':'application/json'});
			  response.write(JSON.stringify({loggedIn: true}));
			  response.end();
      } else {
      	response.writeHead(401,{'Content-Type':'application/json'});
			  response.write(JSON.stringify({loggedIn: false}));
			  response.end();
      }
		})
  }
}