export default function isHttp(url) {
  return url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0 || url.indexOf('./') >= 0 || url.indexOf('../') >= 0
}
