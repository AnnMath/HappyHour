const updateStarColour = (id, isFavourited) => {
  const starIcon = document.querySelector(`[data-id="${id}"]`)
  if (starIcon) {
    if (isFavourited) {
      starIcon.src = '/src/img/star-fill.svg'
    } else {
      starIcon.src = '/src/img/star-gray.svg'
    }
  }
}

export default updateStarColour
