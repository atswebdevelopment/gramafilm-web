const fadeIn = () => {
  if (process.client) {
    setTimeout(() => {
      findFades()
    }, 200)
    window.addEventListener('scroll', () => {
      findFades()
    })
  }
}

const findFades = () => {
  document.querySelectorAll('.fadeIn').forEach((e, i) => {
    const offsetter = window.innerWidth < 767 ? 4 : 2
    if (window.innerHeight > e.getBoundingClientRect().top + (e.offsetHeight / offsetter)) {
      e.classList.remove('fadeIn')
    }
  })
}

export default fadeIn
