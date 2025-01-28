const formatDrinks = (drinks) => {
  return drinks.map((drink) => {
    const ingredients = []

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`] || ''
      const measure = drink[`strMeasure${i}`] || ''

      ingredients.push(`${measure.trim()} ${ingredient}`.trim())
    }
    return {
      id: drink.idDrink,
      thumbnail: drink.strDrinkThumb,
      name: drink.strDrink,
      ingredients,
      instructions: drink.strInstructions,
    }
  })
}

export default formatDrinks
