const updateStarsUI = (drinkId, rating) => {
  const stars = document.querySelectorAll(`.star[data-id="${drinkId}"]`)

  stars.forEach((star) => {
    const starValue = parseInt(star.dataset.value, 10)

    if (starValue <= rating) {
      star.classList.add('ph-fill')
      star.classList.remove('ph')
    } else {
      star.classList.add('ph')
      star.classList.remove('ph-fill')
    }
  })
}

export default updateStarsUI
