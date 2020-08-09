const htmlMinTransform = require('./src/transforms/html-min-transform');

module.exports = (config) => {
  config.addTransform('htmlmin', htmlMinTransform);

  // Set directories to pass through to the dist folder
  // config.addPassthroughCopy('./src/css/');

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
