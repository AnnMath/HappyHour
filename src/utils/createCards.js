const createCards = ({
  id,
  thumbnail,
  name,
  ingredients,
  instructions,
  isFavourited,
  rating = 0,
}) => {
  // Who knew you could format template literals? 🧐
  return /* HTML */ ` <section
    class="card flex flex-col w-96 mt-10 px-4 py-6 border border-deep-blue bg-neutral-100 dark:bg-slate-800 items-center shadow-solid-big  group relative my-8"
  >
    <img
      src=${thumbnail}
      alt=""
      class="size-80 group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-sm"
    />
    <img
      src=${isFavourited
        ? `"/src/img/star-fill.svg"`
        : `"/src/img/star-gray.svg"`}
      id="fave-button"
      tabindex="0"
      role="button"
      aria-label=${isFavourited
        ? `"remove ${name} from saved"`
        : `"add ${name} to saved"`}
      data-id=${id}
      class="absolute top-10 right-12 h-8 w-8 transition ease-in-out hover:scale-110 hover:cursor-pointer p-1 bg-slate-900/50 rounded-sm"
      alt=""
    />
    <div
      class="flex items-center absolute top-75 gap-1 left-12 justify-center bg-slate-900/50 text-slate-200 p-2 rounded-sm"
      data-id="${id}"
    >
      ${[1, 2, 3, 4, 5]
        .map(
          (star) => `
          <i class="star ph-star ${
            star <= rating ? 'ph-fill' : 'ph'
          } text-yellow-400 text-xl cursor-pointer"
             data-value="${star}"
             data-id="${id}"></i>
        `
        )
        .join('')}
    </div>
    <h2 class="cocktail-name text-2xl font-cabin mt-4 dark:text-slate-200">
      ${name}
    </h2>
    <h3
      class="ingredients-header font-montserrat text-xs font-bold uppercase text-persian-pink-900 dark:text-persian-pink-300 mt-2"
    >
      Ingredients
    </h3>
    <ul class="cocktail-ingredients font-roboto-mono mb-2 dark:text-slate-200">
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
    </ul>
    <h3
      class="instructions-header font-montserrat text-xs font-bold uppercase text-persian-pink-900 dark:text-persian-pink-300 mt-2"
    >
      Instructions
    </h3>
    <p class="cocktail-instructions font-roboto-mono dark:text-slate-200">
      ${instructions}
    </p>
  </section>`
}

export default createCards
