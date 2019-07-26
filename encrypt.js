const encrypt = (string, salt) => {
	// weak one way encryption which converts characters to numbers, adds salt, and recombines 
   let a = string.split('')
   textArray = []
   a.forEach((char, index) => {
   	textArray.push(char.charCodeAt(0) + salt[index].charCodeAt(0))
	})
   return textArray.join("")
}

const salt = "ji3j339dk30dk30d"

module.exports = {
	encrypt: encrypt,
	salt: salt
}