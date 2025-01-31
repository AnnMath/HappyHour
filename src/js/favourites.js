import renderCards from '../utils/renderCards.js'
import makeItRain from '../utils/confetti.js'

document.addEventListener('DOMContentLoaded', () => {
  checkFavourites()
})

const checkFavourites = () => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []
  const favouritesContainer = document.querySelector('.favourites-container')
  const scrollbutton = document.querySelector('.scroll-button')
  scrollbutton.addEventListener('click', () => {
    favouritesContainer.scrollIntoView({ behavior: 'smooth' })
    scrollbutton.classList.remove('animate-bounce')
  })
  const faveMessage = document.querySelector('.fave-message')

  if (favouritesArray.length === 0) {
    faveMessage.textContent =
      "You don't have any favourites yet :( Try the randomiser or click on the explore tab to find your next drink!"
    scrollbutton.classList.add('invisible')
  } else {
    faveMessage.textContent = `Yay! You've faved ${favouritesArray.length} ${
      favouritesArray.length === 1 ? `cocktail` : `cocktails`
    } so far!`
    scrollbutton.classList.remove('invisible')
  }
  renderCards(favouritesArray, favouritesContainer)
}

document
  .querySelector('.favourites-container')
  .addEventListener('click', (event) => {
    if (event.target.id === 'fave-button') {
      removeFavourite(event.target.dataset.id)
    } else return
  })

const removeFavourite = (id) => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites'))
  const updatedArray = favouritesArray.filter((fav) => fav.id !== id)

  localStorage.setItem('favourites', JSON.stringify(updatedArray))
  checkFavourites()
}

// :)
document.querySelector('.click-me').addEventListener('click', (e) => {
  e.preventDefault()
  makeItRain()
})
