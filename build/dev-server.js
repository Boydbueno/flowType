'use strict'

const config = require('../config')

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const launchMiddleware = require('launch-editor-middleware')
const webpackConfig = require('./webpack.dev.conf')

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// enable opening file in editor from vue devtools
app.use('/__open-in-editor', launchMiddleware())

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  const uri = 'http://localhost:' + config.dev.port
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
  _resolve()
})

const server = app.listen(config.dev.port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
