import {
  fetchDrinksByName,
  fetchIngredient,
  fetchDrinkById,
} from '../utils/api'
import makeItRain from '../utils/confetti'
import formatDrinks from '../utils/formatDrinks'
import renderCards from '../utils/renderCards'
import addToFaves from '../utils/addToFaves'

const form = document.querySelector('#search-form')
const input = document.querySelector('#search-input')
const select = document.querySelector('#search-by')

const getCocktails = async (searchString) => {
  const container = document.querySelector('.explore-container')
  const noneFound = document.querySelector('.none-found')

  const drinks = await fetchDrinksByName(searchString)
  if (drinks !== null) {
    noneFound.textContent = ''
    const formattedDrinks = formatDrinks(drinks)
    renderCards(formattedDrinks, container)
    container.scrollIntoView({ behavior: 'smooth' })
  } else {
    container.innerHTML = ''
    noneFound.textContent = `Sorry, we couldn't find any cocktail with "${searchString}" in its name. Try another search.`
  }
}

const renderIngredient = (ingredient) => {
  const ingredientDialog = document.querySelector('.ingredient-dialog')
  const ingredientHeading = document.querySelector('.ingredient-heading')
  const isAlcoholic = document.querySelector('.alcoholic')
  const ingredientDesc = document.querySelector('.ingredient-desc')
  const closeButtonTop = document.querySelector('.close-button-top')
  const closeButtonBottom = document.querySelector('.close-button-bottom')

  ingredientHeading.textContent = ingredient.strIngredient
  isAlcoholic.textContent = `Alcoholic? ${ingredient.strAlcohol}`
  ingredientDesc.textContent = ingredient.strDescription
  closeButtonTop.addEventListener('click', () => ingredientDialog.close())
  closeButtonBottom.addEventListener('click', () => ingredientDialog.close())
  ingredientDialog.showModal()
}

const checkIngredient = async (searchString) => {
  const noneFound = document.querySelector('.none-found')

  const ingredients = await fetchIngredient(searchString)
  if (ingredients !== null) {
    noneFound.textContent = ''
    const [ingredient] = ingredients
    renderIngredient(ingredient)
  } else {
    noneFound.textContent = `Sorry, we couldn't find any ingredient with "${searchString}" in its name. Try another search.`
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (select.value === 'search-name') {
    getCocktails(input.value)
  } else {
    checkIngredient(input.value)
  }
  input.value = ''
})

select.addEventListener('change', () => {
  document.querySelector('.none-found').textContent = ''
})

document
  .querySelector('.explore-container')
  .addEventListener('click', (event) => {
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
  makeItRain()
})
