export const printEmoji = code => String.fromCodePoint('0x' + code)

export const signUpEmojis = [
  {emoji: '1F47D', desc: "Alien"},
  {emoji: '1F4A9', desc: "Poop"},
  {emoji: '1F451', desc: "Crown"},
  {emoji: '1F496', desc: "Sparkle-Heart"},
  {emoji: '1F436', desc: "Dog"},
  {emoji: '1F98A', desc: "Fox"},
  {emoji: '1F431', desc: "Cat"},
  {emoji: '1F984', desc: "Unicorn"},
  {emoji: '1F427', desc: "Penguin"},
  {emoji: '1F31E', desc: "Sun"},
  {emoji: '26C4', desc: "Snowman"}
]

export const emojiChoices = (emojiList, componentData, handleChange) => {
  while (componentData.emojis.length < 5) {let emojiIDX = Math.floor(Math.random() * (emojiList.length - 1))
    if (!componentData.emojis.includes(emojiList[emojiIDX])) {
      componentData.emojis.push(emojiList[emojiIDX])
    }
  }

  return componentData.emojis.map((choice, idx) => (
    <div key={idx}>
      <input
        type="radio"
        onChange={handleChange}
        className="emoji"
        id={choice.desc}
        value={printEmoji(choice.emoji)}
        name="emoji" />
      <label htmlFor={choice.desc} key={idx} id='emojilabel'>
        {printEmoji(choice.emoji)}
      </label>
    </div>
  ))
}