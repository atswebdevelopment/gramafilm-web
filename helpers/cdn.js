const setResponsive = (url, size) => {
  if (!process.client) {
    return url
  }
  if (!url.includes('cloudinary')) {
    return url
  }
  const pathArray = url.split('upload/')
  let resize = size || window.innerWidth < 767 ? 767 : window.innerWidth < 1200 ? 1600 : 3000
  resize = `w_${resize},c_limit`
  const newPath = `${pathArray[0]}upload/${resize}/${pathArray[1]}`
  return newPath
}

const setCDNPath = (file) => {
  return file
  // const relativeFilePath = file.split('.com/')[1]
  // return `http://d3d28hohp6gw8h.cloudfront.net/${relativeFilePath}`
}

export default setCDNPath
export { setResponsive }
