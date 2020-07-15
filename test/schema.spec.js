import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/pages/index'
import FollowUs from '@/components/content/FollowUs'
import requestPromise from 'request-promise'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Schema', () => {
  let store
  let mutations = {
    'header/setDefaultColor' () {},
    'header/setColor' () {}
  }
  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      mutations
    })
  })

  // Test a page that renders content based on dummy API data
  test('Home renders page with data', () => {
    const wrapper = mount(Home, {
      localVue,
      store,
      stubs: {
        NuxtLink: true,
        Home: true
      },
      data() {
        return {
          home: {
            id: 1
          }
        }
      }
    })
    expect(wrapper.find('.page').exists()).toBe(true)
  })

  // Test a general component render with column stubs
  test('Follow us renders newsletter', () => {
    const wrapper = mount(FollowUs, {
      stubs: {
        ColumnContainer: true,
        Column: true
      }
    })
    expect(wrapper.find('.newsletter').exists()).toBe(true)
  })

  // Test a call to the Graphql API
  test('Graphql API returns a Home ID of 1', async () => {
    const query = `
      query Home {
        home {
          id
        }
      }
    `
    const API = process.env.SCHEMA_PATH
    const response = await requestPromise({method: 'POST', uri: API, body: {query}, json: true})
    expect(response.data.home.id).toBe('1')
  })
})
