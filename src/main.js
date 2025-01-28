import formatDrinks from './utils/formatDrinks.js'
import createCards from './utils/createCards.js'

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

document
  .querySelector('.random-drinks-container')
  .addEventListener('click', (event) => {
    // Use event delegation to check if the clicked element is the heart icon
    // The heart icon does not exist in the DOM until the cards are created
    if (event.target.id === 'fave-button') {
      fetchDrinkById(event.target.dataset.id)
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

const fetchDrinkById = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()
    const cocktail = formatDrinks(result.drinks)
    addToFaves(cocktail)
  } catch (error) {
    console.error(error.message)
  }
}
