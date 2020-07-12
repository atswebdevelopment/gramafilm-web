const setResponsive = (url) => {
  if (!process.client) {
    return url
  }
  if (!url.includes('cloudinary')) {
    return url
  }
  const pathArray = url.split('upload/')
  let size = window.innerWidth < 767 ? 767 : window.innerWidth < 1200 ? 1600 : 3000
  size = `w_${size},c_limit`
  const newPath = `${pathArray[0]}upload/${size}/${pathArray[1].split('/')[1]}`
  console.log(newPath)
  return newPath
}

const setCDNPath = (file) => {
  return file
  // const relativeFilePath = file.split('.com/')[1]
  // return `http://d3d28hohp6gw8h.cloudfront.net/${relativeFilePath}`
}

export default setCDNPath
export { setResponsive }
