(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('styled-components'), require('prop-types'), require('lodash.clonedeep'), require('lodash.topath')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'styled-components', 'prop-types', 'lodash.clonedeep', 'lodash.topath'], factory) :
  (global = global || self, factory(global.theme = {}, global.React, global.styled, global.PropTypes, global.LodashClonedeep, global.LodashTopath));
}(this, (function (exports, React, styledComponents, PropTypes, cloneDeep, toPath) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;
  cloneDeep = cloneDeep && Object.prototype.hasOwnProperty.call(cloneDeep, 'default') ? cloneDeep['default'] : cloneDeep;
  toPath = toPath && Object.prototype.hasOwnProperty.call(toPath, 'default') ? toPath['default'] : toPath;

  const black = '#000';
  const darkest = '#333';
  const dark = '#565656';
  const normal = '#ccc';
  const light = '#eee';
  const lightest = '#f5f5f5';
  const white = '#FFF';
  const darker = '#898989';
  const slightlyDarker = '#acacac';
  const grayscale = {
    black,
    darkest,
    dark,
    normal,
    light,
    lightest,
    white,
    darker,
    slightlyDarker
  };
  const notices = {
    error: 'red',
    warning: 'orange',
    success: 'green',
    notice: 'blue'
  };

  const sm = '32';
  const md = '46';
  const lg = '76';
  const xlg = '255';
  const wsm = 750;
  const wmd = 990;
  const wlg = 1200;
  const wxlg = 4081;

  // eslint-disable-next-line
  const base = {
    breakpoints: [`${sm}em`, `${md}em`, `${lg}em`, `${xlg}em`],
    width: [wsm, wmd, wlg, wxlg],
    grid: {
      sm,
      md,
      lg,
      xlg
    },
    elevation: ['0 0 1px rgba(67, 90, 111, 0.3), 0 2px 4px -2px rgba(67, 90, 111, 0.47)', '0 0 1px rgba(67, 90, 111, 0.3), 0 5px 8px -4px rgba(67, 90, 111, 0.47)', '0 0 1px rgba(67, 90, 111, 0.3), 0 8px 10px -4px rgba(67, 90, 111, 0.47)', '0 0 1px rgba(67, 90, 111, 0.3), 0 16px 24px -8px rgba(67, 90, 111, 0.47)'],
    variant: 'a',
    fonts: {
      serif: 'Museo',
      sansSerif: 'MuseoSans'
    },
    colors: {
      grayscale,
      social: {
        facebook: '#3B5998',
        twitter: '#00ACED'
      }
    },
    borderRadius: '4px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    button: {
      borderRadius: '3px',
      bottomBorderWidth: '4px'
    },
    basePx: 16
  };

  const colors = {
    green: '#22b24e',
    orange: '#ef8612',
    orangeAccent: '#e56209',
    navy: '#1566ad',
    blue: '#2d9dd6',
    blueAccent: '#82c1e0',
    yellow: '#ffed00',
    footerDark: '#0B4892',
    lightBlue: '#083d87',
    darkBlue: '#1b1d39',
    ...grayscale,
    ...notices
  };
  const baseVariants = {
    a: {
      primary: colors.navy,
      secondary: colors.blue,
      tertiary: colors.green,
      accent: colors.orange,
      accentAccent: colors.orangeAccent,
      background: colors.white,
      text: colors.dark,
      link: colors.navy,
      inverseText: colors.white,
      linkHover: colors.orangeAccent,
      shape: colors.lightBlue,
      ...grayscale,
      ...notices
    },
    b: {
      primary: colors.white,
      secondary: colors.white,
      tertiary: colors.white,
      accent: colors.blue,
      accentAccent: colors.blueAccent,
      background: colors.navy,
      text: colors.white,
      link: colors.lightest,
      inverseText: colors.white,
      linkHover: colors.orange,
      shape: colors.lightBlue,
      ...grayscale,
      ...notices
    },
    c: {
      primary: colors.yellow,
      secondary: colors.white,
      tertiary: colors.white,
      accent: colors.orange,
      accentAccent: colors.orangeAccent,
      background: colors.blue,
      text: colors.white,
      link: colors.lightest,
      inverseText: colors.white,
      linkHover: colors.orangeAccent,
      shape: colors.lightBlue,
      ...grayscale,
      ...notices
    },
    d: {
      primary: colors.navy,
      secondary: colors.blue,
      tertiary: colors.green,
      accent: colors.orange,
      accentAccent: colors.orangeAccent,
      background: colors.footerDark,
      text: colors.white,
      link: colors.lightest,
      inverseText: colors.white,
      linkHover: colors.orange,
      shape: colors.lightBlue,
      ...grayscale,
      ...notices
    }
  };
  const variants = Object.assign(baseVariants, {
    e: {
      ...baseVariants.a,
      text: colors.orange,
      secondary: colors.orangeAccent
    },
    f: {
      ...baseVariants.a,
      secondary: colors.orange
    },
    g: {
      ...baseVariants.a,
      accent: '#1566ad',
      link: '#1566ad',
      linkHover: '#ef8612'
    },
    h: {
      ...baseVariants.a,
      background: colors.orange,
      text: colors.white,
      primary: colors.white
    },
    i: {
      ...baseVariants.a,
      background: colors.navy,
      primary: colors.orange,
      text: colors.white
    },
    j: {
      ...baseVariants.a,
      background: '#f7a91c',
      primary: colors.white,
      text: '#0b4892'
    },
    regular: {
      ...baseVariants.a,
      text: '#1566ad',
      tertiary: '#565656'
    }
  });
  var obs = {
    logoGlyph: 'obs',
    loadingLogo: 'https://digital-au.s3.ap-southeast-2.amazonaws.com/obs-au/website-assets/Obs-loading-unlock.gif',
    ...base,
    colors: {
      ...base.colors,
      variants
    },
    button: {
      borderRadius: '3px'
    }
  };

  const colors$1 = {
    lightBlue: '#083d87',
    darkBlue: '#1b1d39',
    ...grayscale,
    ...notices
  };
  const iconColors = {
    iconPrimary: '#f4b534'
  };
  const baseVariants$1 = {
    a: {
      primary: '#00005e',
      secondary: '#cacaca',
      tertiary: '#1b1d39',
      accent: '#f4b534',
      accentAccent: '#bc8a23',
      background: '#FFF',
      text: colors$1.dark,
      link: colors$1.darkest,
      inverseText: colors$1.white,
      linkHover: '#bc8a23',
      shape: colors$1.darkBlue,
      ...grayscale,
      ...notices,
      ...iconColors
    },
    b: {
      primary: '#FFF',
      secondary: '#FFF',
      tertiary: '#FFF',
      accent: '#eab039',
      accentAccent: '#c59531',
      background: '#1b1d39',
      text: colors$1.white,
      link: colors$1.lightest,
      inverseText: colors$1.white,
      linkHover: '#eab039',
      shape: colors$1.darkBlue,
      ...grayscale,
      ...notices,
      ...iconColors
    },
    c: {
      primary: '#1b1d39',
      secondary: '#FFF',
      tertiary: '#FFF',
      accent: '#1b1d39',
      accentAccent: '#111224',
      background: '#eab039',
      text: colors$1.white,
      link: colors$1.lightest,
      inverseText: colors$1.white,
      linkHover: '#ef8612',
      shape: colors$1.darkBlue,
      ...grayscale,
      ...notices,
      ...iconColors
    },
    d: {
      primary: '#00005e',
      secondary: '#cacaca',
      tertiary: '#1b1d39',
      accent: '#f4b534',
      accentAccent: '#bc8a23',
      background: '#171831',
      link: colors$1.lightest,
      text: colors$1.white,
      inverseText: colors$1.white,
      linkHover: '#eab039',
      shape: colors$1.darkBlue,
      ...grayscale,
      ...notices,
      ...iconColors
    }
  };
  const variants$1 = Object.assign(baseVariants$1, {
    e: {
      ...baseVariants$1.a,
      accent: '#f4b534',
      accentAccent: '#bc8a23',
      text: '#00005e',
      secondary: '#00005e'
    },
    f: {
      ...baseVariants$1.a,
      secondary: '#00005e'
    },
    g: {
      ...baseVariants$1.a,
      linkHover: '#f4b534',
      accent: '#f4b534'
    },
    h: {
      ...baseVariants$1.a
    },
    i: {
      ...baseVariants$1.a
    },
    j: {
      ...baseVariants$1.b,
      primary: '#f4b534'
    },
    regular: {
      ...baseVariants$1.a,
      secondary: '#1b1d39',
      text: '#1b1d39',
      tertiary: '#646464'
    }
  });
  var fiftyup = {
    logoGlyph: 'fiftyup',
    loadingLogo: 'https://digital-au.s3.ap-southeast-2.amazonaws.com/fiftyup/website-assets/LOADING-50-up.gif',
    ...base,
    colors: {
      ...base.colors,
      variants: variants$1
    }
  };

  const iconColors$1 = {
    iconPrimary: '#00b1ff'
  };
  const baseVariants$2 = {
    a: {
      primary: '#00b1ff',
      secondary: '#00b1ff',
      tertiary: '#00b1ff',
      accent: '#e0107b',
      accentAccent: '#b91067',
      background: '#FFF',
      text: '#565656',
      link: '#333',
      inverseText: '#FFF',
      linkHover: '#b91067',
      shape: '#e1107b',
      ...grayscale,
      ...notices,
      ...iconColors$1
    },
    b: {
      primary: '#ffffff',
      secondary: '#FFF',
      tertiary: '#FFF',
      accent: '#e0107b',
      accentAccent: '#b91067',
      background: '#00b1ff',
      text: '#FFF',
      link: '#EEE',
      inverseText: '#FFF',
      linkHover: '#b91067',
      shape: '#e1107b',
      ...grayscale,
      ...notices,
      ...iconColors$1
    },
    c: {
      primary: '#ffffff',
      secondary: '#FFF',
      tertiary: '#FFF',
      accent: '#e0107b',
      accentAccent: '#b91067',
      background: '#00b1ff',
      text: '#FFF',
      link: '#f5f5f5',
      inverseText: '#FFF',
      linkHover: '#b91067',
      shape: '#e1107b',
      ...grayscale,
      ...notices,
      ...iconColors$1
    },
    d: {
      primary: '#00b1ff',
      secondary: '#00b1ff',
      tertiary: '#00b1ff',
      accent: '#e0107b',
      accentAccent: '#b91067',
      background: '#ffffff',
      text: '#565656',
      link: '#333',
      inverseText: '#FFF',
      linkHover: '#b91067',
      shape: '#e1107b',
      ...grayscale,
      ...notices,
      ...iconColors$1
    }
  };
  const variants$2 = Object.assign(baseVariants$2, {
    e: {
      ...baseVariants$2.a,
      text: '#e0107b',
      secondary: '#00b1ff'
    },
    f: {
      ...baseVariants$2.a,
      secondary: '#e0107b'
    },
    g: {
      ...baseVariants$2.a,
      accent: '#00b1ff',
      linkHover: '#00b1ff'
    },
    h: {
      ...baseVariants$2.a,
      background: '#e0107b'
    },
    i: {
      ...baseVariants$2.a
    },
    j: {
      ...baseVariants$2.b,
      primary: '#e0107b'
    },
    regular: {
      ...baseVariants$2.a,
      text: '#000',
      tertiary: '#616461'
    }
  });
  var ninesaver = {
    ...base,
    logoGlyph: 'ninesaver',
    loadingLogo: 'https://digital-au.s3.ap-southeast-2.amazonaws.com/9Saver/website-assets/9saver-loading-unlock.gif',
    fonts: {
      serif: 'Proxima',
      sansSerif: 'Proxima'
    },
    colors: {
      ...base.colors,
      variants: variants$2
    },
    button: {
      ...base.button,
      borderRadius: '50px',
      bottomBorderWidth: '2px'
    }
  };

  const colors$2 = {
    green: '#22b24e',
    orange: '#5292c6',
    orangeAccent: '#e56209',
    navy: '#5292c6',
    blue: '#2d9dd6',
    blueAccent: '#82c1e0',
    yellow: '#ffed00',
    footerDark: '#0B4892',
    lightBlue: '#95b3de',
    darkBlue: '#1b1d39',
    ...grayscale,
    ...notices
  };
  const baseVariants$3 = {
    a: {
      primary: colors$2.navy,
      secondary: colors$2.blue,
      tertiary: colors$2.lightBlue,
      accent: colors$2.lightBlue,
      accentAccent: colors$2.lightBlue,
      background: colors$2.white,
      text: colors$2.dark,
      link: colors$2.navy,
      inverseText: colors$2.white,
      linkHover: colors$2.lightBlue,
      shape: colors$2.lightBlue,
      ...grayscale,
      ...notices
    },
    b: {
      primary: colors$2.white,
      secondary: colors$2.white,
      tertiary: colors$2.white,
      accent: colors$2.blue,
      accentAccent: colors$2.blueAccent,
      background: colors$2.navy,
      text: colors$2.white,
      link: colors$2.lightest,
      inverseText: colors$2.white,
      linkHover: colors$2.orange,
      shape: colors$2.lightBlue,
      ...grayscale,
      ...notices
    },
    c: {
      primary: colors$2.yellow,
      secondary: colors$2.white,
      tertiary: colors$2.white,
      accent: colors$2.orange,
      accentAccent: colors$2.orangeAccent,
      background: colors$2.blue,
      text: colors$2.white,
      link: colors$2.lightest,
      inverseText: colors$2.white,
      linkHover: colors$2.orangeAccent,
      shape: colors$2.lightBlue,
      ...grayscale,
      ...notices
    },
    d: {
      primary: colors$2.navy,
      secondary: colors$2.blue,
      tertiary: colors$2.green,
      accent: colors$2.orange,
      accentAccent: colors$2.orangeAccent,
      background: colors$2.footerDark,
      text: colors$2.white,
      link: colors$2.lightest,
      inverseText: colors$2.white,
      linkHover: colors$2.orange,
      shape: colors$2.lightBlue,
      ...grayscale,
      ...notices
    }
  };
  const variants$3 = Object.assign(baseVariants$3, {
    e: {
      ...baseVariants$3.a,
      text: colors$2.orange,
      secondary: colors$2.orangeAccent
    },
    f: {
      ...baseVariants$3.a,
      secondary: colors$2.orange
    },
    g: {
      ...baseVariants$3.a,
      accent: '#1566ad',
      link: '#1566ad',
      linkHover: '#ef8612'
    },
    h: {
      ...baseVariants$3.a,
      background: colors$2.orange,
      text: colors$2.white,
      primary: colors$2.white
    },
    i: {
      ...baseVariants$3.a,
      background: colors$2.navy,
      primary: colors$2.orange,
      text: colors$2.white
    },
    j: {
      ...baseVariants$3.a,
      background: '#f7a91c',
      primary: colors$2.white,
      text: '#0b4892'
    },
    regular: {
      ...baseVariants$3.a,
      text: '#1566ad',
      tertiary: '#565656'
    }
  });
  var gpml = {
    logoGlyph: 'obs',
    ...base,
    colors: {
      ...base.colors,
      variants: variants$3
    },
    button: {
      borderRadius: '3px'
    }
  };

  const colors$3 = {
    green: '#dedede',
    orange: '#dedede',
    orangeAccent: '#585858',
    navy: '#6b6b6b',
    blue: '#6b6b6b',
    blueAccent: '#545454',
    yellow: '#e8e8e8',
    footerDark: '#545454',
    lightBlue: '#adadad',
    darkBlue: '#545454',
    ...grayscale,
    ...notices
  };
  const baseVariants$4 = {
    a: {
      primary: colors$3.navy,
      secondary: colors$3.blue,
      tertiary: colors$3.green,
      accent: colors$3.orange,
      accentAccent: colors$3.orangeAccent,
      background: colors$3.white,
      text: colors$3.dark,
      link: colors$3.navy,
      inverseText: colors$3.white,
      linkHover: colors$3.orangeAccent,
      shape: colors$3.lightBlue,
      ...grayscale,
      ...notices
    },
    b: {
      primary: colors$3.white,
      secondary: colors$3.white,
      tertiary: colors$3.white,
      accent: colors$3.blue,
      accentAccent: colors$3.blueAccent,
      background: colors$3.navy,
      text: colors$3.white,
      link: colors$3.lightest,
      inverseText: colors$3.white,
      linkHover: colors$3.orange,
      shape: colors$3.lightBlue,
      ...grayscale,
      ...notices
    },
    c: {
      primary: colors$3.yellow,
      secondary: colors$3.white,
      tertiary: colors$3.white,
      accent: colors$3.orange,
      accentAccent: colors$3.orangeAccent,
      background: colors$3.blue,
      text: colors$3.white,
      link: colors$3.lightest,
      inverseText: colors$3.white,
      linkHover: colors$3.orangeAccent,
      shape: colors$3.lightBlue,
      ...grayscale,
      ...notices
    },
    d: {
      primary: colors$3.navy,
      secondary: colors$3.blue,
      tertiary: colors$3.green,
      accent: colors$3.orange,
      accentAccent: colors$3.orangeAccent,
      background: colors$3.footerDark,
      text: colors$3.white,
      link: colors$3.lightest,
      inverseText: colors$3.white,
      linkHover: colors$3.orange,
      shape: colors$3.lightBlue,
      ...grayscale,
      ...notices
    }
  };
  const variants$4 = Object.assign(baseVariants$4, {
    e: {
      ...baseVariants$4.a,
      text: colors$3.orange,
      secondary: colors$3.orangeAccent
    },
    f: {
      ...baseVariants$4.a,
      secondary: colors$3.orange
    },
    g: {
      ...baseVariants$4.a,
      accent: '#545454',
      link: '#fff',
      linkHover: '#fff'
    },
    h: {
      ...baseVariants$4.a,
      background: colors$3.orange,
      text: colors$3.white,
      primary: colors$3.white
    },
    i: {
      ...baseVariants$4.a,
      background: colors$3.navy,
      primary: colors$3.orange,
      text: colors$3.white
    },
    j: {
      ...baseVariants$4.a,
      background: '#545454',
      primary: colors$3.white,
      text: '#fff'
    },
    regular: {
      ...baseVariants$4.a,
      text: '#333',
      tertiary: '#545454'
    }
  });
  var defaultTheme = {
    logoGlyph: 'defaultTheme',
    loadingLogo: 'https://digital-au.s3.ap-southeast-2.amazonaws.com/web/LOADING-UNLOCK-ALL-up.gif',
    ...base,
    colors: {
      ...base.colors,
      variants: variants$4
    },
    button: {
      borderRadius: '3px'
    }
  };

  const themeMap = {
    obs,
    fiftyup,
    ninesaver,
    gpml
  };

  // eslint-disable-next-line import/prefer-default-export
  const CssReset = styledComponents.createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style-position: inside;
  }
  
  em, i {
    font-style: italic;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 1;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: white;
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    font-variant-ligatures: none;
    -webkit-font-variant-ligatures: none;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  img {
    display: block;
    max-width: 100%;
  }

  p {
    line-height: 1.6;
  }
`;

  const Museo500Woff = 'https://fonts.resources.revtech.media/museo500-regular-webfont.woff';
  const Museo500Ttf = 'https://fonts.resources.revtech.media/museo500-regular-webfont.ttf';
  const Museo900Woff = 'https://fonts.resources.revtech.media/museo900-regular-webfont.woff';
  const Museo900Ttf = 'https://fonts.resources.revtech.media./museo900-regular-webfont.ttf';
  const MuseoSans300Woff = 'https://fonts.resources.revtech.media/museosans_300-webfont.woff';
  const MuseoSans300Ttf = 'https://fonts.resources.revtech.media/museosans_300-webfont.ttf';
  const MuseoSans500Woff = 'https://fonts.resources.revtech.media/museosans_500-webfont.woff';
  const MuseoSans500Ttf = 'https://fonts.resources.revtech.media/museosans_500-webfont.ttf';
  const MuseoSans900Woff = 'https://fonts.resources.revtech.media/museosans_900-webfont.woff';
  const MuseoSans900Ttf = 'https://fonts.resources.revtech.media/museosans_900-webfont.ttf';
  const Proxima100 = 'https://fonts.resources.revtech.media/proxima-100.woff2';
  const Proxima400 = 'https://fonts.resources.revtech.media/proxima-400.woff2';
  const Proxima500 = 'https://fonts.resources.revtech.media/proxima-500.woff2';
  const Proxima900 = 'https://fonts.resources.revtech.media/proxima-900.woff2';

  //fast.fonts.net/cssapi/65b28d40-7441-49fe-a5df-39461d67aeca.css
  // eslint-disable-next-line import/prefer-default-export
  const Fonts = styledComponents.createGlobalStyle`
  @font-face {
    font-family: Museo;
    src:  url('${Museo500Woff}') format("woff"),
          url('${Museo500Ttf}') format("truetype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: Museo;
    src:  url('${Museo900Woff}') format("woff"),
          url('${Museo900Ttf}') format("truetype");
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: MuseoSans;
    src:  url('${MuseoSans300Woff}') format("woff"),
          url('${MuseoSans300Ttf}') format("truetype");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: MuseoSans;
    src:  url('${MuseoSans500Woff}') format("woff"),
          url('${MuseoSans500Ttf}') format("truetype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: MuseoSans;
    src:  url('${MuseoSans900Woff}') format("woff"),
          url('${MuseoSans900Ttf}') format("truetype");
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: Proxima;
    src:  url('${Proxima100}') format("woff");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: Proxima;
    src:  url('${Proxima100}') format("woff");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: Proxima;
    src:  url('${Proxima400}') format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: Proxima;
    src:  url('${Proxima500}') format("woff");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: Proxima;
    src:  url('${Proxima900}') format("woff");
    font-weight: 900;
    font-style: normal;
  }
`;

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }

  function _inheritsLoose(t, o) {
    t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
  }

  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }

  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }

  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
      return !!t;
    })();
  }

  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }

  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function _wrapNativeSuper(t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  // based on https://github.com/styled-components/styled-components/blob/fcf6f3804c57a14dd7984dfab7bc06ee2edca044/src/utils/error.js

  /**
   * Parse errors.md and turn it into a simple hash of code: message
   * @private
   */
  var ERRORS = {
    "1": "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
    "2": "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
    "3": "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
    "4": "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
    "5": "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
    "6": "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
    "7": "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
    "8": "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
    "9": "Please provide a number of steps to the modularScale helper.\n\n",
    "10": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
    "11": "Invalid value passed as base to modularScale, expected number or em string but got \"%s\"\n\n",
    "12": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got \"%s\" instead.\n\n",
    "13": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got \"%s\" instead.\n\n",
    "14": "Passed invalid pixel value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
    "15": "Passed invalid base value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
    "16": "You must provide a template to this method.\n\n",
    "17": "You passed an unsupported selector state to this method.\n\n",
    "18": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
    "19": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
    "20": "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
    "21": "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
    "22": "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
    "23": "fontFace expects a name of a font-family.\n\n",
    "24": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
    "25": "fontFace expects localFonts to be an array.\n\n",
    "26": "fontFace expects fileFormats to be an array.\n\n",
    "27": "radialGradient requries at least 2 color-stops to properly render.\n\n",
    "28": "Please supply a filename to retinaImage() as the first argument.\n\n",
    "29": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
    "30": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
    "31": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
    "32": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
    "33": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
    "34": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
    "35": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
    "36": "Property must be a string value.\n\n",
    "37": "Syntax Error at %s.\n\n",
    "38": "Formula contains a function that needs parentheses at %s.\n\n",
    "39": "Formula is missing closing parenthesis at %s.\n\n",
    "40": "Formula has too many closing parentheses at %s.\n\n",
    "41": "All values in a formula must have the same unit or be unitless.\n\n",
    "42": "Please provide a number of steps to the modularScale helper.\n\n",
    "43": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
    "44": "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
    "45": "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
    "46": "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
    "47": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
    "48": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
    "49": "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
    "50": "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
    "51": "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
    "52": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
    "53": "fontFace expects localFonts to be an array.\n\n",
    "54": "fontFace expects fileFormats to be an array.\n\n",
    "55": "fontFace expects a name of a font-family.\n\n",
    "56": "linearGradient requries at least 2 color-stops to properly render.\n\n",
    "57": "radialGradient requries at least 2 color-stops to properly render.\n\n",
    "58": "Please supply a filename to retinaImage() as the first argument.\n\n",
    "59": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
    "60": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
    "61": "Property must be a string value.\n\n",
    "62": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
    "63": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
    "64": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
    "65": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
    "66": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
    "67": "You must provide a template to this method.\n\n",
    "68": "You passed an unsupported selector state to this method.\n\n",
    "69": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got %s instead.\n\n",
    "70": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got %s instead.\n\n",
    "71": "Passed invalid pixel value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
    "72": "Passed invalid base value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
    "73": "Please provide a valid CSS variable.\n\n",
    "74": "CSS variable not found.\n\n",
    "75": "fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.\n"
  };
  /**
   * super basic version of sprintf
   * @private
   */

  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var a = args[0];
    var b = [];
    var c;
    for (c = 1; c < args.length; c += 1) {
      b.push(args[c]);
    }
    b.forEach(function (d) {
      a = a.replace(/%[a-z]/, d);
    });
    return a;
  }
  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   * @private
   */

  var PolishedError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(PolishedError, _Error);
    function PolishedError(code) {
      var _this;
      if (process.env.NODE_ENV === 'production') {
        _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
      } else {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(args))) || this;
      }
      return _assertThisInitialized(_this);
    }
    return PolishedError;
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  function colorToInt(color) {
    return Math.round(color * 255);
  }
  function convertToInt(red, green, blue) {
    return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
  }
  function hslToRgb(hue, saturation, lightness, convert) {
    if (convert === void 0) {
      convert = convertToInt;
    }
    if (saturation === 0) {
      // achromatic
      return convert(lightness, lightness, lightness);
    } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV

    var huePrime = (hue % 360 + 360) % 360 / 60;
    var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    var red = 0;
    var green = 0;
    var blue = 0;
    if (huePrime >= 0 && huePrime < 1) {
      red = chroma;
      green = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      red = secondComponent;
      green = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      green = chroma;
      blue = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      green = secondComponent;
      blue = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      red = secondComponent;
      blue = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      red = chroma;
      blue = secondComponent;
    }
    var lightnessModification = lightness - chroma / 2;
    var finalRed = red + lightnessModification;
    var finalGreen = green + lightnessModification;
    var finalBlue = blue + lightnessModification;
    return convert(finalRed, finalGreen, finalBlue);
  }
  var namedColorMap = {
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aqua: '00ffff',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '000',
    blanchedalmond: 'ffebcd',
    blue: '0000ff',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgreen: '006400',
    darkgrey: 'a9a9a9',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkslategrey: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1e90ff',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    fuchsia: 'ff00ff',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    gray: '808080',
    green: '008000',
    greenyellow: 'adff2f',
    grey: '808080',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred: 'cd5c5c',
    indigo: '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgray: 'd3d3d3',
    lightgreen: '90ee90',
    lightgrey: 'd3d3d3',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslategray: '789',
    lightslategrey: '789',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    lime: '0f0',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'f0f',
    maroon: '800000',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370db',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    navy: '000080',
    oldlace: 'fdf5e6',
    olive: '808000',
    olivedrab: '6b8e23',
    orange: 'ffa500',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'db7093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    purple: '800080',
    rebeccapurple: '639',
    red: 'f00',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    silver: 'c0c0c0',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    slategrey: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    teal: '008080',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    wheat: 'f5deb3',
    white: 'fff',
    whitesmoke: 'f5f5f5',
    yellow: 'ff0',
    yellowgreen: '9acd32'
  };
  /**
   * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
   * @private
   */

  function nameToHex(color) {
    if (typeof color !== 'string') return color;
    var normalizedColorName = color.toLowerCase();
    return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
  }
  var hexRegex = /^#[a-fA-F0-9]{6}$/;
  var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
  var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
  var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
  var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
  var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
  var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
  var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
  /**
   * Returns an RgbColor or RgbaColor object. This utility function is only useful
   * if want to extract a color component. With the color util `toColorString` you
   * can convert a RgbColor or RgbaColor object back to a string.
   *
   * @example
   * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
   * const color1 = parseToRgb('rgb(255, 0, 0)');
   * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
   * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
   */

  function parseToRgb(color) {
    if (typeof color !== 'string') {
      throw new PolishedError(3);
    }
    var normalizedColor = nameToHex(color);
    if (normalizedColor.match(hexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
      };
    }
    if (normalizedColor.match(hexRgbaRegex)) {
      var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
        alpha: alpha
      };
    }
    if (normalizedColor.match(reducedHexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
      };
    }
    if (normalizedColor.match(reducedRgbaHexRegex)) {
      var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
        alpha: _alpha
      };
    }
    var rgbMatched = rgbRegex.exec(normalizedColor);
    if (rgbMatched) {
      return {
        red: parseInt("" + rgbMatched[1], 10),
        green: parseInt("" + rgbMatched[2], 10),
        blue: parseInt("" + rgbMatched[3], 10)
      };
    }
    var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
    if (rgbaMatched) {
      return {
        red: parseInt("" + rgbaMatched[1], 10),
        green: parseInt("" + rgbaMatched[2], 10),
        blue: parseInt("" + rgbaMatched[3], 10),
        alpha: parseFloat("" + rgbaMatched[4])
      };
    }
    var hslMatched = hslRegex.exec(normalizedColor);
    if (hslMatched) {
      var hue = parseInt("" + hslMatched[1], 10);
      var saturation = parseInt("" + hslMatched[2], 10) / 100;
      var lightness = parseInt("" + hslMatched[3], 10) / 100;
      var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
      var hslRgbMatched = rgbRegex.exec(rgbColorString);
      if (!hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, rgbColorString);
      }
      return {
        red: parseInt("" + hslRgbMatched[1], 10),
        green: parseInt("" + hslRgbMatched[2], 10),
        blue: parseInt("" + hslRgbMatched[3], 10)
      };
    }
    var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
    if (hslaMatched) {
      var _hue = parseInt("" + hslaMatched[1], 10);
      var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
      var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
      var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
      var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
      if (!_hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, _rgbColorString);
      }
      return {
        red: parseInt("" + _hslRgbMatched[1], 10),
        green: parseInt("" + _hslRgbMatched[2], 10),
        blue: parseInt("" + _hslRgbMatched[3], 10),
        alpha: parseFloat("" + hslaMatched[4])
      };
    }
    throw new PolishedError(5);
  }
  function rgbToHsl(color) {
    // make sure rgb are contained in a set of [0, 255]
    var red = color.red / 255;
    var green = color.green / 255;
    var blue = color.blue / 255;
    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var lightness = (max + min) / 2;
    if (max === min) {
      // achromatic
      if (color.alpha !== undefined) {
        return {
          hue: 0,
          saturation: 0,
          lightness: lightness,
          alpha: color.alpha
        };
      } else {
        return {
          hue: 0,
          saturation: 0,
          lightness: lightness
        };
      }
    }
    var hue;
    var delta = max - min;
    var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        // blue case
        hue = (red - green) / delta + 4;
        break;
    }
    hue *= 60;
    if (color.alpha !== undefined) {
      return {
        hue: hue,
        saturation: saturation,
        lightness: lightness,
        alpha: color.alpha
      };
    }
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness
    };
  }

  /**
   * Returns an HslColor or HslaColor object. This utility function is only useful
   * if want to extract a color component. With the color util `toColorString` you
   * can convert a HslColor or HslaColor object back to a string.
   *
   * @example
   * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
   * const color1 = parseToHsl('rgb(255, 0, 0)');
   * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
   * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
   */
  function parseToHsl(color) {
    // Note: At a later stage we can optimize this function as right now a hsl
    // color would be parsed converted to rgb values and converted back to hsl.
    return rgbToHsl(parseToRgb(color));
  }

  /**
   * Reduces hex values if possible e.g. #ff8866 to #f86
   * @private
   */
  var reduceHexValue = function reduceHexValue(value) {
    if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
      return "#" + value[1] + value[3] + value[5];
    }
    return value;
  };
  function numberToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function colorToHex(color) {
    return numberToHex(Math.round(color * 255));
  }
  function convertToHex(red, green, blue) {
    return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
  }
  function hslToHex(hue, saturation, lightness) {
    return hslToRgb(hue, saturation, lightness, convertToHex);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: hsl(359, 0.75, 0.4),
   *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${hsl(359, 0.75, 0.4)};
   *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#b3191c";
   *   background: "#b3191c";
   * }
   */
  function hsl(value, saturation, lightness) {
    if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
      return hslToHex(value, saturation, lightness);
    } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
      return hslToHex(value.hue, value.saturation, value.lightness);
    }
    throw new PolishedError(1);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: hsla(359, 0.75, 0.4, 0.7),
   *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
   *   background: hsla(359, 0.75, 0.4, 1),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${hsla(359, 0.75, 0.4, 0.7)};
   *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
   *   background: ${hsla(359, 0.75, 0.4, 1)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(179,25,28,0.7)";
   *   background: "rgba(179,25,28,0.7)";
   *   background: "#b3191c";
   * }
   */
  function hsla(value, saturation, lightness, alpha) {
    if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
      return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
    } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
      return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
    }
    throw new PolishedError(2);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: rgb(255, 205, 100),
   *   background: rgb({ red: 255, green: 205, blue: 100 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${rgb(255, 205, 100)};
   *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#ffcd64";
   *   background: "#ffcd64";
   * }
   */
  function rgb(value, green, blue) {
    if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
      return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
    } else if (typeof value === 'object' && green === undefined && blue === undefined) {
      return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
    }
    throw new PolishedError(6);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
   *
   * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: rgba(255, 205, 100, 0.7),
   *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
   *   background: rgba(255, 205, 100, 1),
   *   background: rgba('#ffffff', 0.4),
   *   background: rgba('black', 0.7),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${rgba(255, 205, 100, 0.7)};
   *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
   *   background: ${rgba(255, 205, 100, 1)};
   *   background: ${rgba('#ffffff', 0.4)};
   *   background: ${rgba('black', 0.7)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(255,205,100,0.7)";
   *   background: "rgba(255,205,100,0.7)";
   *   background: "#ffcd64";
   *   background: "rgba(255,255,255,0.4)";
   *   background: "rgba(0,0,0,0.7)";
   * }
   */
  function rgba(firstValue, secondValue, thirdValue, fourthValue) {
    if (typeof firstValue === 'string' && typeof secondValue === 'number') {
      var rgbValue = parseToRgb(firstValue);
      return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
    } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
      return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
    } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
      return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
    }
    throw new PolishedError(7);
  }
  var isRgb = function isRgb(color) {
    return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
  };
  var isRgba = function isRgba(color) {
    return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
  };
  var isHsl = function isHsl(color) {
    return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
  };
  var isHsla = function isHsla(color) {
    return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
  };
  /**
   * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
   * This util is useful in case you only know on runtime which color object is
   * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: toColorString({ red: 255, green: 205, blue: 100 }),
   *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
   *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
   *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
   *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
   *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
   *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#ffcd64";
   *   background: "rgba(255,205,100,0.72)";
   *   background: "#00f";
   *   background: "rgba(179,25,25,0.72)";
   * }
   */

  function toColorString(color) {
    if (typeof color !== 'object') throw new PolishedError(8);
    if (isRgba(color)) return rgba(color);
    if (isRgb(color)) return rgb(color);
    if (isHsla(color)) return hsla(color);
    if (isHsl(color)) return hsl(color);
    throw new PolishedError(8);
  }

  // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-redeclare
  function curried(f, length, acc) {
    return function fn() {
      // eslint-disable-next-line prefer-rest-params
      var combined = acc.concat(Array.prototype.slice.call(arguments));
      return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
    };
  } // eslint-disable-next-line no-redeclare

  function curry(f) {
    // eslint-disable-line no-redeclare
    return curried(f, f.length, []);
  }
  function guard(lowerBoundary, upperBoundary, value) {
    return Math.max(lowerBoundary, Math.min(upperBoundary, value));
  }

  /**
   * Returns a string value for the darkened color.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: darken(0.2, '#FFCD64'),
   *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${darken(0.2, '#FFCD64')};
   *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#ffbd31";
   *   background: "rgba(255,189,49,0.7)";
   * }
   */

  function darken(amount, color) {
    if (color === 'transparent') return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
    }));
  } // prettier-ignore

  var curriedDarken = /*#__PURE__*/curry
  /* ::<number | string, string, string> */(darken);

  /**
   * Returns a string value for the lightened color.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: lighten(0.2, '#CCCD64'),
   *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${lighten(0.2, '#FFCD64')};
   *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#e5e6b1";
   *   background: "rgba(229,230,177,0.7)";
   * }
   */

  function lighten(amount, color) {
    if (color === 'transparent') return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
    }));
  } // prettier-ignore

  var curriedLighten = /*#__PURE__*/curry
  /* ::<number | string, string, string> */(lighten);

  /* eslint-disable */
  const getColor = (color, theme) => {
    const variantColor = theme.colors.variants[theme.variant][color];
    return variantColor || theme.colors.grayscale[color] || theme.colors.social[color];
  };
  const backgroundStyle = styledComponents.css`
  background: ${props => getColor('background', props.theme)};
`;
  function getIn(obj, key, def = null, p = 0) {
    const path = toPath(key);
    while (obj && p < path.length) {
      obj = obj[path[p++]];
    }
    return obj;
  }
  function setIn(obj, path, value) {
    let res = {};
    let resVal = res;
    let i = 0;
    let pathArray = toPath(path);
    for (; i < pathArray.length - 1; i++) {
      const currentPath = pathArray[i];
      let currentObj = getIn(obj, pathArray.slice(0, i + 1));
      if (resVal[currentPath]) {
        resVal = resVal[currentPath];
      } else {
        resVal = resVal[currentPath] = cloneDeep(currentObj);
      }
    }
    resVal[pathArray[i]] = value;
    const result = {
      ...obj,
      ...res
    };
    return result;
  }
  function getWeight(weight) {
    const weightMap = {
      thin: '100',
      normal: '400',
      bold: '900'
    };
    return weightMap[weight] || '400';
  }
  const tintColor = (colorHex, amt) => {
    if (amt > 0) {
      return curriedLighten(amt / 100, colorHex);
    } else {
      return curriedDarken(amt / 100 * -1, colorHex);
    }
  };

  const Variant = ({
    theme,
    variant,
    children
  }) => {
    return /*#__PURE__*/React.createElement(styledComponents.ThemeProvider, {
      theme: {
        ...theme,
        variant
      }
    }, children);
  };
  const BootstrapTheme = ({
    children,
    theme,
    variant,
    cssReset
  }) => {
    const realTheme = theme || defaultTheme;
    return /*#__PURE__*/React.createElement(Variant, {
      variant: variant,
      theme: realTheme
    }, /*#__PURE__*/React.createElement(React.Fragment, null, cssReset && /*#__PURE__*/React.createElement(CssReset, null), /*#__PURE__*/React.createElement(Fonts, null), children));
  };
  BootstrapTheme.propTypes = {
    children: PropTypes.node.isRequired,
    brand: PropTypes.string,
    cssReset: PropTypes.bool
  };
  BootstrapTheme.defaultProps = {
    cssReset: true
  };
  Variant.defaultProps = {
    variant: 'a'
  };
  const variantShape = PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    accent: PropTypes.string,
    accentAccent: PropTypes.string,
    background: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    inverseText: PropTypes.string
  }).isRequired;
  const variantPropTypes = {
    theme: PropTypes.shape({
      breakpoints: PropTypes.array,
      grid: PropTypes.shape({
        sm: PropTypes.string,
        md: PropTypes.string,
        lg: PropTypes.string
      }),
      variant: PropTypes.string,
      fonts: PropTypes.shape({
        serif: PropTypes.string,
        sansSerif: PropTypes.string
      }),
      colors: PropTypes.shape({
        variants: PropTypes.shape({
          a: variantShape,
          b: variantShape,
          c: variantShape
        }).isRequired,
        grayscale: PropTypes.shape({
          black: PropTypes.string,
          darkest: PropTypes.string,
          dark: PropTypes.string,
          normal: PropTypes.string,
          light: PropTypes.string,
          lightest: PropTypes.string,
          white: PropTypes.string
        }).isRequired,
        social: PropTypes.shape({
          facebook: PropTypes.string,
          twitter: PropTypes.string
        }).isRequired
      }).isRequired
    }),
    variant: PropTypes.string,
    children: PropTypes.node.isRequired
  };
  Variant.propTypes = variantPropTypes;
  const Theme = styledComponents.withTheme(Variant);

  exports.BootstrapTheme = BootstrapTheme;
  exports.Theme = Theme;
  exports.backgroundStyle = backgroundStyle;
  exports.defaultTheme = defaultTheme;
  exports.fiftyup = fiftyup;
  exports.getColor = getColor;
  exports.getWeight = getWeight;
  exports.ninesaver = ninesaver;
  exports.obs = obs;
  exports.setIn = setIn;
  exports.themeMap = themeMap;
  exports.tintColor = tintColor;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
