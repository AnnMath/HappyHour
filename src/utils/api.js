export const fetchRandom = async () => {
  const URL =
    'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php'
  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json()
    const drinks = result.drinks
    return drinks
  } catch (error) {
    console.error(error.message)
  }
}

export const fetchDrinkById = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`

  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json()
    const drinks = result.drinks
    return drinks
  } catch (error) {
    console.error(error.message)
  }
}

export const fetchDrinksByName = async (cocktailName) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`

  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json()
    const drinks = result.drinks
    return drinks
  } catch (error) {
    console.error(error.message)
  }
}

export const fetchIngredient = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`

  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json()
    const ingredients = result.ingredients
    return ingredients
  } catch (error) {
    console.error(error.message)
  }
}
