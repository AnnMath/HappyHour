document.addEventListener('DOMContentLoaded', () => {
  const themeRadios = document.querySelectorAll("input[name='theme-select']")
  const root = document.documentElement
  const isDark = window.matchMedia('(prefers-color-scheme: dark)')

  const applyTheme = (theme) => {
    isDark.removeEventListener('change', handleSystemThemeChange)
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      // OS preference
      localStorage.removeItem('theme')
      syncWithSystemTheme()
      isDark.addEventListener('change', handleSystemThemeChange) // Listen for OS changes
    }
  }

  const syncWithSystemTheme = () => {
    if (isDark.matches) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const handleSystemThemeChange = () => {
    if (!localStorage.getItem('theme')) {
      // Only update if 'system' is selected ie. no theme is saved in localStorage
      syncWithSystemTheme()
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

  if (!localStorage.getItem('theme')) {
    isDark.addEventListener('change', handleSystemThemeChange) // Only fires if 'system' is checked *on page load*
  }

  // Load the theme on page load
  loadTheme()
})
