const createCards = ({
  id,
  thumbnail,
  name,
  ingredients,
  instructions,
  isFavourited,
}) => {
  return `       
          <section
            class="card flex flex-col w-96 mt-10 px-4 py-6 border border-deep-blue bg-neutral-100 dark:bg-slate-900 items-center shadow-solid-big dark:shadow-dark-mode group relative my-8"
          >
            <img
              src=${thumbnail}
              alt=""
              class="size-80 group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-sm"
            />
            <img
              src=${
                isFavourited
                  ? `"/src/img/heart-fill.svg"`
                  : `"/src/img/heart-gray.svg"`
              }  
              
              id="fave-button"
              tabindex=0
              role="button"
              aria-label=${
                isFavourited
                  ? `"remove ${name} from favourites"`
                  : `"add ${name} to favourites"`
              }
              data-id=${id}
              class="absolute top-10 right-12 h-8 w-8 transition ease-in-out hover:scale-110 hover:cursor-pointer p-1 bg-slate-900/50 rounded-sm"
              alt=""
            />
            <h2 class="cocktail-name text-2xl font-cabin mt-4 dark:text-slate-200">${name}</h2>
            <h3
              class="ingredients-header font-montserrat text-xs font-bold uppercase text-persian-pink-900 dark:text-persian-pink-300 mt-2"
            >
              Ingredients
            </h3>
            <ul class="cocktail-ingredients font-roboto-mono mb-2 dark:text-slate-200">
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join('')}
            </ul>
            <h3
              class="instructions-header font-montserrat text-xs font-bold uppercase text-persian-pink-900 dark:text-persian-pink-300 mt-2"
            >
              Instructions
            </h3>
            <p class="cocktail-instructions font-roboto-mono dark:text-slate-200">${instructions}</p>
          </section>`
}

export default createCards
