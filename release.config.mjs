export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    // The npm package lives in the mirror's `npm/` subfolder (option A:
    // the repo root holds the Claude marketplace tree). `pkgRoot` points
    // the npm plugin at it for the version bump in package.json.
    //
    // `npmPublish: false` is load-bearing: it skips `@semantic-release/npm`'s
    // `verifyConditions` step (which would demand NPM_TOKEN even when we
    // intend to publish via OIDC) and skips the publish itself. The actual
    // `npm publish` runs below via `@semantic-release/exec`, which in turn
    // lets npm 11.5.1+ discover the GitHub Actions OIDC environment and
    // exchange a short-lived publish token via Trusted Publishing.
    ['@semantic-release/npm', { pkgRoot: 'npm', npmPublish: false }],
    [
      '@semantic-release/exec',
      { publishCmd: 'cd npm && npm publish --provenance --access public' },
    ],
    '@semantic-release/github',
  ],
};
