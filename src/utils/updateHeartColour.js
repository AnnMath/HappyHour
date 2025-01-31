const updateHeartColour = (id, isFavourited) => {
  const heartIcon = document.querySelector(`[data-id="${id}"]`)
  if (heartIcon) {
    if (isFavourited) {
      heartIcon.src = '/src/img/heart-fill.svg'
    } else {
      heartIcon.src = '/src/img/heart-gray.svg'
    }
  }
}

export default updateHeartColour
