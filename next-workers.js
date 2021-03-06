// This is a temporary fix for the next-workers plugin until
// https://github.com/vercel/next-plugins/pull/594 is merged.

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      config.module.rules.unshift({
        test: /\.worker\.(js|ts)$/,
        loader: "worker-loader",
        options: nextConfig.workerLoaderOptions || {
          name: "static/[hash].worker.js",
          publicPath: "/_next/",
        },
      });

      // Overcome webpack referencing `window` in chunks
      config.output.globalObject = "self";

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
