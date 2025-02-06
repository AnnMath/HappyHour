// Format the drink object to only have relevant data
const formatDrinks = (drinks) => {
  const favouritesArray = JSON.parse(localStorage.getItem('favourites')) || []
  return drinks.map((drink) => {
    const isFavourited = favouritesArray.some((fav) => fav.id === drink.idDrink)
    const favouriteDrink = favouritesArray.find(
      (fav) => fav.id === drink.idDrink
    )
    const ingredients = []

    for (let i = 1; i <= 15; i++) {
      // using optional chaining here to make sure that trim() isn't called on 'null'
      // using nullish coalescing to ensure that if strMeasure is null or undefined, it is replaced with an empty string
      const ingredient = drink[`strIngredient${i}`]?.trim() ?? ''
      const measure = drink[`strMeasure${i}`]?.trim() ?? ''

      // As far as I can tell, there is always at least one strIngredient, but sometimes fewer measures than ingredients, or no measures at all
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`.trim())
      }
    }
    return {
      id: drink.idDrink,
      thumbnail: drink.strDrinkThumb,
      name: drink.strDrink,
      ingredients,
      instructions: drink.strInstructions,
      isFavourited: isFavourited,
      rating: favouriteDrink ? favouriteDrink.rating || 0 : 0,
      isAlcoholic: drink.strAlcoholic === 'Alcoholic' ? true : false
    }
  })
}

export default formatDrinks
