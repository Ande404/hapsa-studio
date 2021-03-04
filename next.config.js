const withPlugins = require('next-compose-plugins');
const rehypePrism = require('@mapbox/rehype-prism');

const mdx = require('next-mdx-enhanced')({
  defaultLayout: true,
  fileExtensions: ['mdx', 'md'],
  rehypePlugins: [rehypePrism],
});

const nextConfig = { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'] };

module.exports = withPlugins([mdx], nextConfig);
