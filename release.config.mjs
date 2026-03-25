export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', { access: 'restricted' }],
    '@semantic-release/github',
  ],
}
