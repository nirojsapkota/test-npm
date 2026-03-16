# GitHub Package

This project is now configured to be published to GitHub Packages.

## Changes Made

- **`build.yml`:**
  - The workflow has been updated to publish the package to the GitHub Packages registry.
  - The `NODE_AUTH_TOKEN` is now using the `secrets.GITHUB_TOKEN` for authentication.
- **`button/package.json`:**
  - The `repository` field has been added to point to the GitHub repository.
  - The `publishConfig` field has been added to specify the GitHub Packages registry.

## Publishing a New Version

To publish a new version of the package, create a new release on GitHub. The GitHub Action will automatically trigger and publish the package to GitHub Packages.

## Known Issues

- The `npm run build` command will fail because the `rtm-scripts` dependency is not available in the public npm registry. This is likely a private package. However, this will not block the publishing process, as the `build.yml` workflow does not run the `build` script.
