const showApiErrorMessage = (error) => {
  const errorDialog = document.querySelector('.error-dialog')
  const errorDialogText = document.querySelector('.error-dialog__text')
  const errorDialogCloseBtn = document.querySelector('.error-dialog__closeBtn')
  errorDialogText.textContent = `Oh no! Something went wrong ${
    error === 'fetchDrinkByIdError'
      ? `saving to/removing from favourites. `
      : `on our end. `
  }Please try again later.`
  errorDialog.showModal()
  errorDialogCloseBtn.addEventListener('click', () => {
    errorDialog.close()
  })
}

export default showApiErrorMessage
