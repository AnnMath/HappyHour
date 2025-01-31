import updateHeartColour from './updateHeartColour'

const addToFaves = (cocktail) => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []

  const [drink] = cocktail

  const isFavourited = favouritesArray.some((fav) => fav.id === drink.id)

  if (isFavourited) {
    // Remove from favourites
    const updatedFaves = favouritesArray.filter((fav) => fav.id !== drink.id)
    localStorage.setItem('favourites', JSON.stringify(updatedFaves))
  } else {
    // Add to favourites
    favouritesArray.push(drink)
    localStorage.setItem('favourites', JSON.stringify(favouritesArray))
  }
  updateHeartColour(drink.id, !isFavourited)
}

export default addToFaves
