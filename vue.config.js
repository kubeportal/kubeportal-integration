module.exports = {
  configureWebpack: {
    performance: { hints: false }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    compress: false,
    disableHostCheck: true,
    port: 8086,
    host: '0.0.0.0'
  }
}

