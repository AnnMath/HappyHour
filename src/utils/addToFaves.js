import updateStarColour from './updateStarColour'
import updateStarsUI from './updateStarsUI'

const addToFaves = (cocktail) => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []

  const [drink] = cocktail

  const isFavourited = favouritesArray.some((fav) => fav.id === drink.id)

  if (isFavourited) {
    // Remove from favourites
    const updatedFaves = favouritesArray.filter((fav) => fav.id !== drink.id)
    drink.isFavourited = false
    drink.rating = 0
    localStorage.setItem('favourites', JSON.stringify(updatedFaves))
  } else {
    // Add to favourites
    drink.isFavourited = true
    favouritesArray.push(drink)
    localStorage.setItem('favourites', JSON.stringify(favouritesArray))
  }
  updateStarColour(drink.id, !isFavourited)
  updateStarsUI(drink.id, drink.rating)
}

export default addToFaves
