export const imports = {
  'packages/bootstrap/doc.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-bootstrap-doc" */ 'packages/bootstrap/doc.mdx'),
  'packages/button/doc.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-button-doc" */ 'packages/button/doc.mdx'),
  'packages/img/doc.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-img-doc" */ 'packages/img/doc.mdx'),
  'packages/layout/doc.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-layout-doc" */ 'packages/layout/doc.mdx'),
  'packages/theme/doc.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-theme-doc" */ 'packages/theme/doc.mdx'),
  'packages/typography/docs/blurb.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-typography-docs-blurb" */ 'packages/typography/docs/blurb.mdx'),
  'packages/typography/docs/doc.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-typography-docs-doc" */ 'packages/typography/docs/doc.mdx'),
  'packages/typography/docs/headers.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-typography-docs-headers" */ 'packages/typography/docs/headers.mdx'),
  'packages/typography/docs/markdown.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-typography-docs-markdown" */ 'packages/typography/docs/markdown.mdx'),
  'packages/typography/docs/usage.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "packages-typography-docs-usage" */ 'packages/typography/docs/usage.mdx'),
}
