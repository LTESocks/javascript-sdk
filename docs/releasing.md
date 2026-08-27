# Release checklist

No release or registry publication is performed from the initial repository commit.

When a release is approved:

1. Synchronize and regenerate the OpenAPI surface.
2. Update `version`, `SDK_VERSION`, and `CHANGELOG.md` together.
3. Run `npm run verify` and the browser tests.
4. Confirm the `vX.Y.Z` tag matches `package.json`.
5. Create the tag from the reviewed `main` commit.
6. Let the trusted publishing workflow publish with npm provenance.

Never run the publish workflow from an unreviewed branch or expose an npm token in repository secrets when trusted publishing is available.
