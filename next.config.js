const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = '/'
let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })
    // https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    }

    return config
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  publicRuntimeConfig: {
    database_token: process.env.DATABASE_TOKEN
  }
}
