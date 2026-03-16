(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('styled-components'), require('@rtm-ui/layout'), require('@rtm-ui/theme'), require('@rtm-ui/tracker'), require('@rtm-ui/img'), require('rehype-stringify'), require('remark-align'), require('remark-parse'), require('unified')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'styled-components', '@rtm-ui/layout', '@rtm-ui/theme', '@rtm-ui/tracker', '@rtm-ui/img', 'rehype-stringify', 'remark-align', 'remark-parse', 'unified'], factory) :
  (global = global || self, factory(global.typography = {}, global.React, global.PropTypes, global.styled, global.layout, global.theme, global.tracker, global.img, global.RehypeStringify, global.RemarkAlign, global.RemarkParse, global.Unified));
}(this, (function (exports, React, PropTypes, styled, layout, theme, tracker, img, stringify, remarkAlign, markdown, unified) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;
  var styled__default = 'default' in styled ? styled['default'] : styled;
  stringify = stringify && Object.prototype.hasOwnProperty.call(stringify, 'default') ? stringify['default'] : stringify;
  remarkAlign = remarkAlign && Object.prototype.hasOwnProperty.call(remarkAlign, 'default') ? remarkAlign['default'] : remarkAlign;
  markdown = markdown && Object.prototype.hasOwnProperty.call(markdown, 'default') ? markdown['default'] : markdown;
  unified = unified && Object.prototype.hasOwnProperty.call(unified, 'default') ? unified['default'] : unified;

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  const colorStyles = styled.css`
  ${props => props.color ? `color: ${theme.getColor(props.color, props.theme)}` : null};
`;
  const subStyles = styled.css`
  sub {
    vertical-align: sub;
    font-size: smaller;
  }
  sup {
    vertical-align: super;
    font-size: smaller;
  }
`;
  const sizeChart = [{
    element: 'h1',
    sizes: [2, 2.2, 2.5, 4]
  }, {
    element: 'h2',
    sizes: [2, 2, 2.2, 2.2]
  }, {
    element: 'h3',
    sizes: [1.75, 1.75, 2, 2]
  }, {
    element: 'h4',
    sizes: [1.5, 1.5, 1.75, 1.75]
  }, {
    element: 'h5',
    sizes: [1.25, 1.25, 1.5, 1.5]
  }, {
    element: 'h6',
    sizes: [1, 1, 1.25, 1.25]
  }, {
    element: 'p',
    sizes: [1, 1, 1, 1]
  }, {
    element: 'input',
    sizes: [1, 1, 1, 1]
  }, {
    element: 'small',
    sizes: [0.75, 0.75, 0.75, 0.75]
  }, {
    element: 'label',
    sizes: [1, 1, 1, 1]
  }];
  const lineHeightChart = tag => {
    switch (tag) {
      case 'small':
        return [1.6, 1.6, 1.6, 1.6];
      case 'p':
        return [1.2, 1.2, 1.2, 1.2];
      default:
        return [1.2, 1.2, 1.2, 1.2];
    }
  };
  const labelTextStyles = styled.css`
  font-size: 0.85em;
  letter-spacing: 1px;
  line-height: 1;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.sansSerif};
  font-weight: 900;
`;
  function displayByEachScreen(tag) {
    const sizeItem = sizeChart.filter(({
      element
    }) => element === tag)[0];
    let sizes;
    if (sizeItem) {
      sizes = sizeItem.sizes;
    }
    const lineHeight = lineHeightChart(tag);
    return styled.css`
    ${sizes && `font-size: ${sizes[0]}em`};
    line-height: ${lineHeight[0]};
    @media (min-width: ${props => props.theme.grid.sm}em) {
      ${sizes && `font-size: ${sizes[0]}em`};
      line-height: ${lineHeight[1]};
    }
    @media (min-width: ${props => props.theme.grid.md}em) {
      ${sizes && `font-size: ${sizes[0]}em`};
      line-height: ${lineHeight[2]};
    }
    @media (min-width: ${props => props.theme.grid.lg}em) {
      ${sizes && `font-size: ${sizes[0]}em`};
      line-height: ${lineHeight[3]};
    }
  `;
  }
  const generalStyleForText = styled.css`
  font-family: ${props => props.font === 'serif' ? props.theme.fonts.serif : props.theme.fonts.sansSerif};
  ${props => props.weight ? `font-weight: ${theme.getWeight(props.weight)}` : null};
  ${props => props.align ? `text-align: ${props.align}` : null};
  ${colorStyles};
  ${subStyles};

  em,
  i {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }
`;
  function createMarkup(html) {
    return {
      __html: html
    };
  }
  const H1 = styled__default(({
    color,
    tag,
    weight,
    font,
    align,
    boxParams,
    ...rest
  }) => {
    return /*#__PURE__*/React.createElement(layout.Box, _extends({}, boxParams, rest, {
      as: tag
    }));
  })`
  ${generalStyleForText};
  ${rest => displayByEachScreen(rest.tag)};
`;
  const Text = /*#__PURE__*/React.forwardRef(({
    dangerousHTML,
    children,
    p,
    pl,
    pr,
    pt,
    pb,
    px,
    py,
    ...rest
  }, ref) => {
    const textValue = dangerousHTML ? {
      dangerouslySetInnerHTML: createMarkup(dangerousHTML)
    } : {
      children
    };
    const tagParams = {
      ...rest,
      ...textValue
    };
    const {
      trackEvent
    } = tracker.useTracker(ref);
    let onClickProps = {};
    // NOTE: we might want to replace this with a document-wide event listener
    if (rest.as === 'a') {
      let absoluteUrl = rest.href;
      if (rest.href) {
        absoluteUrl = layout.generateAbsoluteUrl(rest.href);
      } else {
        absoluteUrl = rest.href;
      }
      tagParams.href = absoluteUrl;
      onClickProps = {
        onClick: e => trackEvent(e, rest.track, rest.onClick)
      };
    }
    return /*#__PURE__*/React.createElement(H1, _extends({
      ref: ref,
      boxParams: {
        p,
        pl,
        pr,
        pt,
        pb,
        px,
        py
      }
    }, tagParams, onClickProps));
  });
  Text.defaultProps = {
    dangerousHTML: undefined,
    children: undefined,
    font: 'sansSerif',
    align: null,
    color: null,
    p: undefined,
    pl: undefined,
    pr: undefined,
    pt: undefined,
    pb: undefined,
    px: undefined,
    py: undefined
  };
  const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const primitiveTags = ['p', 'small', 'a', 'label', 'input', 'span', 'div', 'strong', 'em', 'ul', 'ol', 'li'];
  const weightProps = ['thin', 'normal', 'bold'];
  const fontStyles = ['serif', 'sansSerif'];
  const alignmentProps = ['left', 'center', 'right', 'justified', 'inherit'];
  Text.propTypes = {
    tag: PropTypes.oneOf([...headerTags, ...primitiveTags]).isRequired,
    dangerousHTML: PropTypes.string,
    align: PropTypes.oneOf(alignmentProps),
    weight: PropTypes.oneOf(weightProps),
    font: PropTypes.oneOf(fontStyles),
    color: PropTypes.string,
    p: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    pl: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    pr: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    pt: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    pb: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    px: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    py: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.number)])
  };

  const Header = props => /*#__PURE__*/React.createElement(Text, _extends({
    color: "primary"
  }, props));
  Header.defaultProps = {
    tag: 'h1',
    weight: 'bold',
    color: 'primary',
    font: 'sansSerif'
  };

  const Paragraph = props => /*#__PURE__*/React.createElement(Text, _extends({
    color: "text"
  }, props, {
    tag: "p"
  }));
  const defaultBodyProps = {
    weight: 'normal',
    color: 'text'
  };
  Paragraph.defaultProps = defaultBodyProps;

  const Wrapper = styled__default.div`
  background: ${props => theme.getColor('background', props.theme)};
  ${theme.backgroundStyle};

  ${props => props.fillContainer && styled.css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        ${theme.backgroundStyle};
      }
    `};
`;
  const Blurb = ({
    fillContainer,
    variant,
    header,
    body,
    right,
    center,
    ...rest
  }) => {
    const align = right ? 'right' : center ? 'center' : 'left';
    const textProps = {
      align,
      ...rest
    };
    return /*#__PURE__*/React.createElement(theme.Theme, {
      variant: variant
    }, /*#__PURE__*/React.createElement(Wrapper, {
      fillContainer: fillContainer,
      flexDirection: "column"
    }, /*#__PURE__*/React.createElement(layout.Box, {
      py: [2],
      px: [2, 3]
    }, header && /*#__PURE__*/React.createElement(Header, _extends({
      tag: rest.tag || 'h5',
      weight: "bold"
    }, textProps), header), body && /*#__PURE__*/React.createElement(Paragraph, textProps, body))));
  };
  Blurb.propTypes = {
    fillContainer: PropTypes.bool,
    header: PropTypes.string,
    body: PropTypes.string,
    right: PropTypes.bool,
    center: PropTypes.bool,
    variant: PropTypes.string
  };
  Blurb.defaultProps = {
    variant: 'a'
  };

  const Label = props => /*#__PURE__*/React.createElement(Text, _extends({
    color: "text"
  }, props, {
    tag: "label"
  }));
  const defaultBodyProps$1 = {
    weight: 'normal',
    color: 'text'
  };
  Label.defaultProps = defaultBodyProps$1;

  const identifier = ':::';
  function blockPlugin() {
    function blockTokenizer(eat, value) {
      const self = this;
      const lines = value.split(/\n/);

      // We only care about blocks that start with the identifier
      if (lines[0].startsWith(identifier)) {
        const ruleObject = {};
        lines[0].replace(identifier, '').split(' ').filter(item => item.includes(':')).map(item => {
          const rule = item.split(':');
          ruleObject[rule[0]] = rule[1];
        });

        // Now we only care about finding the lines that end with the identifier
        const [_first, ...remainingLines] = lines;
        const firstRemainingDots = remainingLines.findIndex(line => {
          return line.startsWith(identifier);
        });
        if (firstRemainingDots > 0) {
          const newLines = lines.slice(1, firstRemainingDots + 1);
          const eatValue = lines.slice(0, firstRemainingDots + 2).join('\n');
          const strippedValue = newLines.join('\n');
          eat(eatValue)({
            type: 'block',
            rules: ruleObject,
            // Pass the children back to the top-level tokenizer
            children: self.tokenizeBlock(strippedValue, eat.now())
          });
        }
      }
    }
    const Parser = this.Parser;
    const blockTokenizers = Parser.prototype.blockTokenizers;
    const blockMethods = Parser.prototype.blockMethods;
    blockTokenizers.blocks = blockTokenizer;
    blockMethods.splice(blockMethods.indexOf('newline'), 0, 'blocks');
  }

  var get = require('lodash.get');
  function locator(value, fromIndex) {
    let index = -1;
    const found = [];
    index = value.indexOf('{{', fromIndex);
    if (index !== -1) {
      found.push(index);
    }
    if (found.length) {
      found.sort((a, b) => a - b);
      return found[0];
    }
    return -1;
  }
  function inlinePlugin(referenceObject) {
    function inlineTokenizer(eat, value, silent) {
      if (!this.escape.includes('{{')) this.escape.push('{{');
      const now = eat.now();
      now.column += 1;
      now.offset += 1;

      // FIXME: locator function does not return the value
      // for the handlebar when it's nested inside a link.
      // I think this is a bug so have created a ticket in
      // here https://github.com/remarkjs/remark/issues/410
      // If that's resolved we can remove this code
      if (!value.startsWith('[^') && value.startsWith('[') && value.includes('{{')) {
        var endPosition = 0;
        if (value.includes('[!')) {
          endPosition = value.indexOf('})') + 2;
          console.log('endPosition: ', endPosition);
        } else {
          endPosition = value.indexOf(')') + 1;
        }
        const startHandlebarPosition = value.indexOf('{{') + 2;
        const endHandlebarPosition = value.indexOf('}}');
        const subbedValue = value.substring(startHandlebarPosition, endHandlebarPosition);
        const eatValue = value.substring(0, endPosition);
        const subValue = get(referenceObject, subbedValue);
        const linkValue = value.substring(value.indexOf('[') + 1, value.indexOf(']'));
        if (eatValue.indexOf('!') >= 0) {
          const imageValue = eatValue.substring(value.indexOf('(') + 1, value.indexOf(')]'));
          eat(eatValue)({
            type: 'link',
            url: subValue,
            title: '',
            children: [{
              type: 'image',
              url: imageValue,
              alt: imageValue
            }]
          });
        } else {
          eat(eatValue)({
            type: 'link',
            url: subValue,
            title: '',
            children: [{
              type: 'text',
              value: linkValue
            }]
          });
        }
      }
      // ENDFIXME

      if (value.startsWith('{{')) {
        // This will select the first one
        const endPosition = value.indexOf('}}');
        if (endPosition) {
          const innerValue = value.substring(2, endPosition);
          const eatValue = value.substring(0, endPosition + 2);
          const subValue = get(referenceObject, innerValue);
          const replacedText = subValue || 'undefined';
          eat(eatValue)({
            type: 'handlebars',
            children: [{
              type: 'text',
              value: replacedText
            }],
            data: {
              todo: 'Put some meaningful data here?'
            }
          });
        }
      }
    }
    inlineTokenizer.locator = locator;
    const Parser = this.Parser;

    // Inject inlineTokenizer
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;
    inlineTokenizers.interpolator = inlineTokenizer;
    // Getting in front of the link parser is key due to
    // https://github.com/remarkjs/remark/issues/410
    inlineMethods.splice(inlineMethods.indexOf('url'), 0, 'interpolator');
  }

  const toComponent = (ast, i) => {
    return renderComponent(ast, i);
  };
  const renderComponent = ({
    type,
    ...props
  }, i) => {
    const mappedType = primitiveMap[type];
    if (typeof mappedType !== 'function') {
      return null;
    }
    const intrinsicProps = mappedType(props);
    if (type == 'image') {
      return /*#__PURE__*/React.createElement(img.Img, _extends({
        key: `${type}-${i}`
      }, intrinsicProps));
    } else {
      return /*#__PURE__*/React.createElement(Text, _extends({
        key: `${type}-${i}`
      }, intrinsicProps));
    }
  };
  const renderChildren = children => children.map((child, i) => renderComponent(child, i));
  const primitiveMap = {
    heading: ({
      children,
      depth
    }) => ({
      ...Header.defaultProps,
      as: `h${depth}`,
      tag: `h${depth}`,
      mb: 30,
      children: renderChildren(children)
    }),
    paragraph: ({
      children
    }) => ({
      ...Paragraph.defaultProps,
      as: 'p',
      tag: 'p',
      children: renderChildren(children)
    }),
    strong: ({
      children
    }) => ({
      as: 'strong',
      tag: 'strong',
      weight: 'bold',
      children: renderChildren(children)
    }),
    list: ({
      children,
      ordered
    }) => ({
      as: ordered === true ? 'ol' : 'ul',
      tag: ordered === true ? 'ol' : 'ul',
      children: renderChildren(children)
    }),
    block: ({
      children,
      rules
    }) => {
      return {
        ...rules,
        tag: 'div',
        className: 'block-container',
        children: renderChildren(children)
      };
    },
    listItem: ({
      children
    }) => ({
      as: 'li',
      tag: 'li',
      children: renderChildren(children)
    }),
    emphasis: ({
      children
    }) => ({
      as: 'em',
      tag: 'em',
      children: renderChildren(children)
    }),
    footnoteReference: ({
      children,
      label
    }) => ({
      as: 'sup',
      tag: 'span',
      children: label
    }),
    handlebars: ({
      children
    }) => ({
      as: 'span',
      tag: 'span',
      // NOTE: For now this just casts the child item to a string. Not
      // sure if there's a use-case for an object or array or something
      // else here
      children: renderChildren(children)
    }),
    text: ({
      value
    }) => ({
      as: 'span',
      tag: 'span',
      children: value
    }),
    link: ({
      children,
      ...rest
    }) => {
      let props = {};
      // NOTE: If an image link
      if (children[0].type == 'image') {
        return {
          as: 'a',
          tag: 'a',
          color: 'link',
          href: rest.url,
          title: rest.title,
          children: renderChildren(children)
        };
      }
      // FIXME: we may want some sort of error when more than
      // just plaintext is dropped into a link tag
      if (children[0].value.split('|').length >= 1) {
        try {
          var otherAttrs = JSON.parse(children[0].value.split('|')[2]);
        } catch {
          var otherAttrs = {};
        }
        const track = children[0].value.split('|')[1] || null;
        const value = children[0].value.split('|')[0];
        props = {
          ...otherAttrs,
          track,
          children: value
        };
      } else {
        props = {
          children: renderChildren(children)
        };
      }
      return {
        as: 'a',
        tag: 'a',
        color: 'link',
        href: rest.url,
        title: rest.title,
        ...props
      };
    },
    centerAligned: ({
      children
    }) => ({
      ...Paragraph.defaultProps,
      style: {
        textAlign: 'center'
      },
      as: 'p',
      tag: 'p',
      children: renderChildren(children)
    }),
    rightAligned: ({
      children
    }) => ({
      ...Paragraph.defaultProps,
      style: {
        textAlign: 'right'
      },
      as: 'p',
      tag: 'p',
      children: renderChildren(children)
    }),
    leftAligned: ({
      children
    }) => ({
      ...Paragraph.defaultProps,
      style: {
        textAlign: 'left'
      },
      as: 'p',
      tag: 'p',
      children: renderChildren(children)
    }),
    image: ({
      children,
      value,
      ...rest
    }) => {
      return {
        ...img.Img.defaultProps,
        alt: rest.alt,
        src: rest.url
      };
    },
    html: ({
      value
    }) => {
      return {
        ...Paragraph.defaultProps,
        as: 'p',
        tag: 'p',
        dangerousHTML: value
      };
    }
  };

  // Add margin-bottom to each child except last
  const MarkdownBox = styled__default(layout.Box)`
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
  .block-container > *:not(:last-child) {
    margin-bottom: 10px;
  }

  ul,
  ol {
    li {
      &:not(:last-child) {
        margin-bottom: 20px;
      }

      p {
        display: inline;
      }
    }
  }
`;
  const Markdown = ({
    raw,
    referenceObject = {},
    ...boxProps
  }) => {
    const ast = unified().use(markdown, {
      commonmark: true,
      footnotes: true
    }).use(inlinePlugin, referenceObject).use(remarkAlign).use(blockPlugin).use(stringify).parse(raw.toString());
    return /*#__PURE__*/React.createElement(MarkdownBox, _extends({}, boxProps, {
      "data-testid": "markdown"
    }), ast.children.map((item, i) => toComponent(item, i)));
  };
  const ValidateMarkdown = (reference, raw) => {
    const ast = unified().use(markdown, {
      commonmark: true,
      footnotes: true
    }).use(inlinePlugin, reference).use(remarkAlign).use(blockPlugin).use(stringify).parse(raw.toString());
    if (has_undefined(ast)) {
      console.log(`Invalid: ${raw}`);
      return false;
    } else {
      return true;
    }
  };
  const has_undefined = (obj, contains_undefined = false) => {
    for (let i = 0; i < obj.children.length; i++) {
      if (obj.children[i].children) {
        contains_undefined = has_undefined(obj.children[i], contains_undefined);
      } else {
        if (obj.children[i].value == 'undefined') {
          contains_undefined = true;
          break;
        }
      }
    }
    return contains_undefined;
  };

  const Small = props => /*#__PURE__*/React.createElement(Text, _extends({
    color: "text"
  }, props, {
    tag: "small"
  }));
  const defaultBodyProps$2 = {
    weight: 'normal',
    color: 'text'
  };
  Small.defaultProps = defaultBodyProps$2;

  exports.Blurb = Blurb;
  exports.Header = Header;
  exports.Label = Label;
  exports.Markdown = Markdown;
  exports.Paragraph = Paragraph;
  exports.Small = Small;
  exports.Text = Text;
  exports.ValidateMarkdown = ValidateMarkdown;
  exports.labelTextStyles = labelTextStyles;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
