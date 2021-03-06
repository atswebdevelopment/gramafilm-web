import cache from './cache'

export default function (ctx) {
  return {
    httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://admin.gramafilm.com/graphql' : 'http://localhost:1337/graphql',
    cache
  }
}
