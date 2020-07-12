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
    if (window.innerHeight > e.getBoundingClientRect().top + (e.offsetHeight / 2)) {
      e.classList.remove('fadeIn')
    }
  })
}

export default fadeIn
