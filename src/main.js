import formatDrinks from './utils/formatDrinks.js'
import renderCards from './utils/renderCards.js'
import makeItRain from './utils/confetti.js'
import { fetchRandom, fetchDrinkById } from './utils/api.js'
import addToFaves from './utils/addToFaves.js'
import handleRating from './utils/handleRating.js'

// Get a random selection of 10 cocktails on button click
const randomButton = document.querySelector('.random-button')
randomButton.addEventListener('click', () => {
  getRandomDrinks()
})

const getRandomDrinks = async () => {
  const container = document.querySelector('.random-drinks-container')
  const drinks = await fetchRandom()
  const formattedDrinks = formatDrinks(drinks)
  renderCards(formattedDrinks, container)
  container.scrollIntoView({ behavior: 'smooth' })
}

// Event listener for the 'heart' button (and the rating stars)
document
  .querySelector('.random-drinks-container')
  .addEventListener('click', (event) => {
    // Use event delegation to check if the clicked element is the star icon (or the rating stars)
    // The star icon (and the rating stars) does not exist in the DOM until the cards are created
    if (event.target.id === 'fave-button') {
      getDrinkByIdForFaves(event.target.dataset.id)
    } else if (event.target.classList.contains('star')) {
      handleRating(event)
    } else return
  })

const getDrinkByIdForFaves = async (id) => {
  const drinks = await fetchDrinkById(id)
  const cocktail = formatDrinks(drinks)
  addToFaves(cocktail)
}

// :)
document.querySelector('.click-me').addEventListener('click', (e) => {
  e.preventDefault()
  makeItRain()
})
