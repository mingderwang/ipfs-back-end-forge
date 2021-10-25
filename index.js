const { buffer, text, json } = require('micro')
const post = require('micro-post')
const qs = require('querystring')
const url = require('url')
const { toGatewayURL, NFTStorage, Blob } = require('nft.storage')
const { nftStorageApiKey } = require('./secrets.json')
const client = new NFTStorage({ token: nftStorageApiKey })

const options = {
  errorCode: 404,
  contentType: 'text/plain',
}

module.exports = post(options, async (req, res) => {
  console.log(
    '\n 🔥 Usage: curl -X POST https://ipfs-proxy-server.muzamint.com/ -d @data.json -H "Content-Type: application/json"\n',
  )
  const buf = await buffer(req)
  console.log(buf)
  // <Buffer 7b 22 70 72 69 63 65 22 3a 20 39 2e 39 39 7d>
  //const txt = await text(req)
  //console.log(txt)

  const js = await json(req)
  console.log(js)

  const jsonse = js
  var blob = new Blob([jsonse], { type: 'application/json' })
  const cid = await client.storeBlob(blob)
  const forwardURL = toGatewayURL('ipfs://' + cid).href
  return { ipfs_url: forwardURL }
})
