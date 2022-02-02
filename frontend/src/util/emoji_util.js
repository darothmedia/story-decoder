export const printEmoji = code => String.fromCodePoint('0x' + code)

export const signUpEmojis = [
  //Alien
  '1F47D',
  //Poop
  '1F4A9',
  //Crown 
  '1F451',
  //Sparkle Heart
  '1F496',
  //Dog
  '1F436',
  //Fox
  '1F98A',
  //Cat
  '1F431',
  //Unicorn
  '1F984',
  //Penguin
  '1F427',
  //Sun
  '1F31E',
  //Snowman
  '26C4'
]

export const emojiChoices = (emojiList, componentData, handleChange) => {
  while (componentData.emojis.length < 5) {
    let emojiIDX = Math.floor(Math.random() * (emojiList.length - 1))
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
        id={choice}
        value={printEmoji(choice)}
        name="emoji" />
      <label htmlFor={choice} key={idx} id='emojilabel'>
        {printEmoji(choice)}
      </label>
    </div>
  ))
}