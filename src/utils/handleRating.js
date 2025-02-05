import updateStarsUI from './updateStarsUI'
import { fetchDrinkById } from './api'
import formatDrinks from './formatDrinks'
import addToFaves from './addToFaves'

const handleRating = async (event) => {
  if (!event.target.classList.contains('star')) return

  let favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []

  const drinkId = event.target.dataset.id
  const ratingValue = parseInt(event.target.dataset.value, 10)

  const unformattedDrink = await fetchDrinkById(drinkId)
  const drink = formatDrinks(unformattedDrink)
  let favedDrink = favouritesArray.find((fav) => fav.id === drinkId)

  if (!favedDrink) {
    drink[0].rating = ratingValue
    addToFaves(drink)
  } else {
    // If clicked on an already selected rating, reduce it
    favedDrink.rating =
      drink.rating === ratingValue ? ratingValue - 1 : ratingValue
    localStorage.setItem('favourites', JSON.stringify(favouritesArray))
  }

  // Re-render stars
  updateStarsUI(drinkId, ratingValue)
}

export default handleRating
