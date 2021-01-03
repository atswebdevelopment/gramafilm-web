import axios, * as others from 'axios';
export default async function getRoutes() {
  const data = []
  const schemaPath = process.env.NODE_ENV === 'production' ? 'https://admin.gramafilm.com/graphql' : 'http://localhost:1337/graphql'

  await axios({
    url: schemaPath,
    method: 'post',
    data: {
      query: `{    articles {      url published   }  }`
    }
  })
  .then((response) => {
    const items = response.data.data.articles
    items.forEach((e, i) => {
      if (e.published) {
        data.push(`journal/${e.url}`)
      }
    })
  })
  .catch((error) => {
    console.log(error)
  })

  await axios({
    url: schemaPath,
    method: 'post',
    data: {
      query: `{     caseStudies {       url published   }   }`
    }
  })
  .then((response) => {
    const items = response.data.data.caseStudies
    items.forEach((e, i) => {
      if (e.published) {
        data.push(`work/${e.url}`)
      }
    })
  })
  .catch((error) => {
    console.log(error)
  })

  return data
}