export const createID = length => {
  let string = '';
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let caps = Array.from(characters)
  for (let i = 0; i < length; i++) {
    string += caps[Math.floor(Math.random() * (characters.length - 1))]
  }
  return string
}