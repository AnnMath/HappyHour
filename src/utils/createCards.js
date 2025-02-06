const createCards = ({
  id,
  thumbnail,
  name,
  ingredients,
  instructions,
  isFavourited,
  rating = 0,
  isAlcoholic
}) => {
  // Who knew you could format template literals? 🧐
  return /* HTML */ ` <section
    class="card border-deep-blue shadow-solid-big group relative my-8 mt-10 flex w-96 flex-col items-center border bg-neutral-100 px-4 py-6 dark:bg-slate-800"
  >
    <img
      src=${thumbnail}
      alt=""
      class="size-80 rounded-sm transition-transform duration-500 ease-in-out group-hover:scale-105"
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
      class="absolute top-10 right-12 h-8 w-8 rounded-sm bg-slate-900/50 p-1 transition ease-in-out hover:scale-110 hover:cursor-pointer"
      alt=""
    />
    ${!isAlcoholic
      ? `
      <div
      class="non-alcoholic-badge absolute top-70 right-4 flex h-18 w-18 rotate-315 items-center justify-center rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700"
    >
      <p
        class="font-montserrat text-persian-pink-100 text-center text-xs font-bold uppercase [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]"
      >
        No<br />alcohol
      </p>
    </div>
      
      `
      : ''}

    <div
      class="absolute top-73 left-12 flex items-center justify-center gap-1 rounded-sm bg-slate-900/50 p-2 text-slate-200"
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
    <h2 class="cocktail-name font-cabin mt-4 text-2xl dark:text-slate-200">
      ${name}
    </h2>
    <h3
      class="ingredients-header font-montserrat text-persian-pink-900 dark:text-persian-pink-300 mt-2 text-xs font-bold uppercase"
    >
      Ingredients
    </h3>
    <ul class="cocktail-ingredients font-roboto-mono mb-2 dark:text-slate-200">
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
    </ul>
    <h3
      class="instructions-header font-montserrat text-persian-pink-900 dark:text-persian-pink-300 mt-2 text-xs font-bold uppercase"
    >
      Instructions
    </h3>
    <p class="cocktail-instructions font-roboto-mono dark:text-slate-200">
      ${instructions}
    </p>
  </section>`
}

export default createCards
