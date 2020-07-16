import cache from './cache'

export default function (ctx) {
  return {
    httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://18.132.131.54/graphql' : 'http://localhost:1337/graphql',
    cache
  }
}
