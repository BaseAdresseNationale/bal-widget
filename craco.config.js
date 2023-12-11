module.exports = {
  webpack: {
    configure: (config) => {
      // Remove scope plugin to allow importing from outside of src folder
      const scopePluginIndex = config.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      config.output.filename = 'bal-widget.js'
      config.output.publicPath = process.env.PUBLIC_URL || '/'
      config.output.chunkFilename = 'bal-widget.chunk.[id].js'

      config.resolve.plugins.splice(scopePluginIndex, 1);

      return config;
    },
  },
};
