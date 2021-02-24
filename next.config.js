const withPlugins = require('next-compose-plugins');
const rehypePrism = require('@mapbox/rehype-prism');
const path = require('path');

const mdx = require('next-mdx-enhanced')({
  fileExtensions: ['mdx', 'md'],
  rehypePlugins: [rehypePrism],
});

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
};
module.exports = withPlugins([mdx], nextConfig);
