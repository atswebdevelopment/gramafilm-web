export const state = () => ({
  events: {},
  design: {},
  film: {}
})

export const mutations = {
  setEvents (state, events) {
    state.events = events
  },
  setDesign (state, design) {
    state.design = design
  },
  setFilm (state, film) {
    state.film = film
  }
}
