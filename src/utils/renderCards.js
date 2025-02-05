import createCards from './createCards.js'

const renderCards = (drinks, container) => {
  container.innerHTML = drinks
    .map((drink) => {
      return createCards(drink)
    })
    .join('')
}

export default renderCards
