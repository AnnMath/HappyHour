import createCards from '../utils/createCards.js'
import confetti from '../utils/confetti.js'

document.addEventListener('DOMContentLoaded', () => {
  checkFavourites()
})

const renderCards = () => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []

  const container = document.querySelector('.favourites-container')
  container.innerHTML = favouritesArray
    .map((drink) => {
      const isFavourited = favouritesArray.some((fav) => fav.id === drink.id)

      return createCards({
        ...drink,
        isFavourited,
      })
    })
    .join('')
}

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
      "You don't have any favourites yet :( Try the randomiser!"
    scrollbutton.classList.add('invisible')
  } else {
    faveMessage.textContent = `Yay! You've faved ${favouritesArray.length} ${
      favouritesArray.length === 1 ? `cocktail` : `cocktails`
    } so far!`
    scrollbutton.classList.remove('invisible')
  }
  renderCards()
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
  confetti()
})
