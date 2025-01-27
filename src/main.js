const getData = async () => {
  const url = import.meta.env.VITE_RANDOM_URL
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    formatDrinks(json.drinks)
  } catch (error) {
    console.error(error.message)
  }
}

getData()

const renderDrinks = (formattedDrinks) => {
  //obviously make this into cards and change the names, but the premise is there
  // consider using innerHTML, to make tailwind easier
  const container = document.querySelector('.random-drinks-container')

  formattedDrinks.forEach((drink) => {
    const ingredients = drink.ingredients

    const drinkImg = document.createElement('img')
    drinkImg.src = drink.thumbnail

    const drinkName = document.createElement('h2')
    drinkName.textContent = drink.name

    const ingredientList = document.createElement('ul')
    ingredients.forEach((ingredient) => {
      const drinkIngredients = document.createElement('li')
      drinkIngredients.textContent = ingredient
      ingredientList.appendChild(drinkIngredients)
    })

    const instructions = document.createElement('p')
    instructions.textContent = drink.instructions

    // container.appendChild(drinkImg)
    // container.appendChild(drinkName)
    // container.appendChild(ingredientList)
    // container.appendChild(instructions)
  })
}

const formatDrinks = (drinks) => {
  const formattedDrinks = drinks.map((drink) => {
    const ingredients = []

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`]
      const measure = drink[`strMeasure${i}`]

      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`.trim())
      }
    }
    return {
      id: drink.idDrink,
      thumbnail: drink.strDrinkThumb,
      name: drink.strDrink,
      ingredients,
      instructions: drink.strInstructions,
    }
  })
  renderDrinks(formattedDrinks)
}
