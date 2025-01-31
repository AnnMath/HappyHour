import formatDrinks from './utils/formatDrinks.js'
import renderCards from './utils/renderCards.js'
import confetti from './utils/confetti.js'
import { fetchRandom } from './utils/api.js'
import { fetchDrinkById } from './utils/api.js'
import addToFaves from './utils/addToFaves.js'

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

document
  .querySelector('.random-drinks-container')
  .addEventListener('click', (event) => {
    // Use event delegation to check if the clicked element is the heart icon
    // The heart icon does not exist in the DOM until the cards are created
    if (event.target.id === 'fave-button') {
      getDrinkById(event.target.dataset.id)
    } else return
  })

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
