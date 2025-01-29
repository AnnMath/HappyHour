import formatDrinks from './utils/formatDrinks.js'
import createCards from './utils/createCards.js'
import confetti from './utils/confetti.js'
import { fetchRandom } from './utils/api.js'
import { fetchDrinkById } from './utils/api.js'

// Get a random selection of 10 cocktails on button click
const randomButton = document.querySelector('.random-button')
randomButton.addEventListener('click', () => {
  getRandomDrinks()
})

const renderCards = (drinks) => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []

  const container = document.querySelector('.random-drinks-container')
  container.innerHTML = drinks
    .map((drink) => {
      const isFavourited = favouritesArray.some((fav) => fav.id === drink.id)

      return createCards({
        ...drink,
        isFavourited, // Pass this to the card generator to show correct heart icon
      })
    })
    .join('')

  container.scrollIntoView({ behavior: 'smooth' })
}

const getRandomDrinks = async () => {
  const drinks = await fetchRandom()
  const formattedDrinks = formatDrinks(drinks)
  renderCards(formattedDrinks)
}

document
  .querySelector('.random-drinks-container')
  .addEventListener('click', (event) => {
    // Use event delegation to check if the clicked element is the heart icon
    // The heart icon does not exist in the DOM until the cards are created
    if (event.target.id === 'fave-button') {
      getDrinkById(event.target.dataset.id)
    } else return
  })

const updateHeartColour = (id, isFavourited) => {
  const heartIcon = document.querySelector(`[data-id="${id}"]`)
  if (heartIcon) {
    if (isFavourited) {
      heartIcon.src = '/src/img/heart-fill.svg'
    } else {
      heartIcon.src = '/src/img/heart-gray.svg'
    }
  }
}

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

const getDrinkById = async (id) => {
  const drinks = await fetchDrinkById(id)
  const cocktail = formatDrinks(drinks)
  addToFaves(cocktail)
}

// :)
document.querySelector('.click-me').addEventListener('click', (e) => {
  e.preventDefault()
  confetti()
})
