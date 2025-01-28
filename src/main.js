import formatDrinks from './utils/formatDrinks.js'
import createCards from './utils/createCards.js'

document.addEventListener('DOMContentLoaded', () => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || []
})

const randomButton = document.querySelector('.random-button')
randomButton.addEventListener('click', () => {
  getRandomDrinks()
})

const renderCards = (drinks) => {
  const container = document.querySelector('.random-drinks-container')
  container.innerHTML = drinks.map(createCards).join('')
  container.scrollIntoView({ behavior: 'smooth' })
}

const getRandomDrinks = async () => {
  const URL =
    'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php'
  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()
    const formattedDrinks = formatDrinks(result.drinks)
    renderCards(formattedDrinks)
  } catch (error) {
    console.error(error.message)
  }
}

const addToFaves = (id) => {
  URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
}

document
  .querySelector('.random-drinks-container')
  .addEventListener('click', (event) => {
    // Use event delegation to check if the clicked element is the heart icon
    // The heart icon does not exist in the DOM until the cards are created
    if (event.target.id === 'fave-button') {
      console.log(event.target.dataset.id)
    }
  })
