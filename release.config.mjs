export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    // The npm package lives in the mirror's `npm/` subfolder (option A:
    // the repo root holds the Claude marketplace tree). `pkgRoot` points
    // the npm plugin at it for both the version bump and `npm publish`.
    ['@semantic-release/npm', { access: 'public', pkgRoot: 'npm' }],
    '@semantic-release/github',
  ],
};
