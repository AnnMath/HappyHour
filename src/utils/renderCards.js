import createCards from './createCards.js'

const renderCards = (drinks, container) => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []

  container.innerHTML = drinks
    .map((drink) => {
      const isFavourited = favouritesArray.some((fav) => fav.id === drink.id)

      return createCards({
        ...drink,
        isFavourited, // Pass this to the card generator to show correct heart icon
      })
    })
    .join('')
}

export default renderCards
