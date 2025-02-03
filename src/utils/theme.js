document.addEventListener('DOMContentLoaded', () => {
  const themeRadios = document.querySelectorAll("input[name='theme-select']")
  const root = document.documentElement

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      // OS preference
      localStorage.removeItem('theme')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      applyTheme(savedTheme)
      const selectedRadio = document.getElementById(savedTheme)
      if (selectedRadio) selectedRadio.checked = true
    } else {
      const systemRadio = document.getElementById('system')
      if (systemRadio) systemRadio.checked = true
      applyTheme('system')
    }
  }

  // Event listener on the radio buttons
  themeRadios.forEach((radio) => {
    radio.addEventListener('change', () => applyTheme(radio.id))
  })

  // Load the theme on page load
  loadTheme()
})
