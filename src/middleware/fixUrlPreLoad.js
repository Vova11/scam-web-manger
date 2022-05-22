function extractHostname(url) {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];
  return hostname;
}
function removeHttp(url) {
  return url
    .replace('http://', '')
    .replace('https://', '')
    .replace(/^www\./, '')
    .split('.')
    .slice(0, -1)
    .join('.');
}

const fixUrl = (e) => {
  console.log(extractHostname(e))
  return removeHttp(extractHostname(e))
}

module.exports = fixUrl;