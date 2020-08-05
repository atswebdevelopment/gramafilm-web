export const state = () => ({
  defaultColor: 'white',
  color: 'white',
  hideLogo: true
})

export const mutations = {
  setDefaultColor (state, color) {
    state.defaultColor = color
    state.color = color
  },
  setColor (state, color) {
    state.color = color
  },
  hideLogo (state, hideLogo) {
    state.hideLogo = hideLogo
  }
}
