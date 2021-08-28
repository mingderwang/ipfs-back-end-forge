const fetch = require('node-fetch')
const { buffer, text, json } = require('micro')
const post = require('micro-post')
const qs = require('querystring')
const url = require('url')
const { toGatewayURL, NFTStorage, Blob } = require('nft.storage')
const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkwNTFBMGQ5MjIyMzk5QzYzOUE5MmVERTQ2MjVmODQ2N2FCMUVENjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODM0ODMwOTE1MywibmFtZSI6IueOi-mKmOW-tyJ9.UeBtSr36q57vKmHq3PrGZTbDEhwtKzgngW-MF_7sPfM'
const client = new NFTStorage({ token: apiKey })

const options = {
  errorCode: 404,
  contentType: 'text/plain',
}

module.exports = post(options, async (req, res) => {
  console.log(
    '\n 🔥 Usage: curl -X POST http://mars.muzamint.com:5001/ -d @data.json -H "Content-Type: application/json"\n'  )
  const buf = await buffer(req)
  console.log(buf)
  // <Buffer 7b 22 70 72 69 63 65 22 3a 20 39 2e 39 39 7d>
  const txt = await text(req)
  console.log(txt)

  const js = await json(req)
  console.log(js.superxerox)

  const jsonse = txt
  var blob = new Blob([jsonse], { type: 'application/json' })
  const cid = await client.storeBlob(blob)
  const forwardURL = toGatewayURL('ipfs://' + cid).href
  return forwardURL
})
