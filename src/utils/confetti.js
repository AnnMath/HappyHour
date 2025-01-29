import JSConfetti from 'js-confetti'
const makeItRain = () => {
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    emojis: ['🍸', '🍹'],
    emojiSize: 150,
    confettiNumber: 80,
  })
}

export default makeItRain
