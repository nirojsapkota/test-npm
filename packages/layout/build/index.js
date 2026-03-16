(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('styled-components'), require('@rebass/grid'), require('@rtm-ui/theme'), require('react-scroll')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'styled-components', '@rebass/grid', '@rtm-ui/theme', 'react-scroll'], factory) :
  (global = global || self, factory(global.layout = {}, global.React, global.PropTypes, global.styled, global.RebassGrid, global.theme, global.ReactScroll));
}(this, (function (exports, React, PropTypes, styled, grid, theme, reactScroll) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;
  styled = styled && Object.prototype.hasOwnProperty.call(styled, 'default') ? styled['default'] : styled;

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  const Wrapper = styled(grid.Box)`
  ${props => props.showBackground && theme.backgroundStyle};
  ${props => props.backgroundColor && `background: ${theme.getColor(props.backgroundColor, props.theme)}`};
  ${props => props.scale && `font-size: ${props.theme.basePx * props.scale}px`};
  color: ${props => theme.getColor(props.backgroundColor, props.theme)};
`;
  const Box = ({
    variant,
    ...gridProps
  }) => {
    return variant ? /*#__PURE__*/React__default.createElement(theme.Theme, {
      variant: variant
    }, /*#__PURE__*/React__default.createElement(Wrapper, _extends({
      showBackground: true
    }, gridProps))) : /*#__PURE__*/React__default.createElement(Wrapper, gridProps);
  };
  Box.propTypes = {
    variant: PropTypes.string,
    backgroundColor: PropTypes.string
  };

  const Wrapper$1 = styled(Box)`
  border-radius: ${({
  rounded,
  theme
}) => rounded ? theme.borderRadius : '0'};
  box-shadow: ${({
  elevation,
  theme
}) => elevation ? theme.elevation[elevation] : 'none'};
`;
  const Pane = props => /*#__PURE__*/React__default.createElement(Wrapper$1, props);
  Pane.propTypes = {
    children: PropTypes.node.isRequired
  };

  const StyledBlock = styled(Box)`
  ${props => props.showAt ? `display: none` : null};

  @media (min-width: ${props => props.theme.grid[props.hideAt]}em) {
    display: none;
  }
  @media (min-width: ${props => props.theme.grid[props.showAt]}em) {
    display: inherit;
  }
`;
  const Block = ({
    hideAt,
    showAt,
    children,
    ...rest
  }) => /*#__PURE__*/React__default.createElement(StyledBlock, _extends({
    hideAt: hideAt,
    showAt: showAt
  }, rest), children);
  Block.propTypes = {
    hideAt: PropTypes.oneOf(['sm', 'md', 'lg']),
    showAt: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node.isRequired
  };

  const Wrapper$2 = styled(Pane)`
  border-radius: ${({
  theme
}) => theme.borderRadius};
  box-shadow: ${({
  theme
}) => theme.boxShadow};
`;
  const Card = ({
    children,
    ...boxProps
  }) => /*#__PURE__*/React__default.createElement(Wrapper$2, _extends({
    rounded: true,
    showBackground: true,
    elevation: "2"
  }, boxProps), children);
  Card.propTypes = {
    children: PropTypes.node.isRequired
  };

  const Wrapper$3 = styled(grid.Flex)`
  ${props => props.showBackground && theme.backgroundStyle};
  ${props => props.backgroundColor && `background: ${theme.getColor(props.backgroundColor, props.theme)}`};
`;
  const Flex = ({
    children,
    variant,
    ...gridProps
  }) => {
    return variant ? /*#__PURE__*/React__default.createElement(theme.Theme, {
      variant: variant
    }, /*#__PURE__*/React__default.createElement(Wrapper$3, _extends({
      showBackground: true
    }, gridProps), children)) : /*#__PURE__*/React__default.createElement(Wrapper$3, gridProps, children);
  };
  Flex.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string
  };

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState(getSize());
    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener('resize', handleResize);
    React.useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowSize]);
    return windowSize;
  }

  /**
   * ScrollTo functionality with added config option.
   *
   * Note: the passed "ref" needs to match the "name" tag for the specific item being scrolled to
   *
   * e.g. `ref = "itemA"` | `<div name="itemA" />`
   *
   * See https://github.com/fisshy/react-scroll for more information on configuration options
   *
   * @param {*} e
   * @param {string} ref
   * @param {{DURATION? : number, smooth?: boolean, offsetY?: number, delay?: number}} config
   *
   *
   */
  function scrollToElementExtended(e, ref, config) {
    if (e) {
      e.preventDefault();
    }
    if (config == undefined) {
      // Prevents expection being throwning in the event of "config" not being supplied
      // Assumes default values in this case.
      config = {};
    }
    // react-scroll
    reactScroll.scroller.scrollTo(ref, {
      duration: config.DURATION || 750,
      smooth: config.smooth || true,
      offset: config.offsetY || -100,
      delay: config.delay || 0
    });
  }
  function scrollToElement(e, ref) {
    if (e) {
      e.preventDefault();
    }
    const anchor = document.querySelector(`[scroll-target='${ref}']`);
    let offset = window.scrollY + anchor.getBoundingClientRect().top; // Y

    window.scrollTo({
      left: 0,
      top: offset - 100,
      behavior: 'smooth'
    });
  }
  function useElementVisible(elem) {
    const [visible, setVisible] = React.useState();

    // for inital setup
    React.useEffect(() => {
      handleScroll();
    });
    function handleScroll() {
      setVisible(elementIsVisible(elem));
    }
    window.addEventListener('scroll', handleScroll);
    React.useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [visible]);
    return visible;
  }

  /**
   * Check if the element is inside the visible viewport
   * return true/false
   * element passed is a dom element and not an object
   */

  /* istanbul ignore next */
  function elementIsVisible(element) {
    const elem = document.querySelector(element);
    if (!elem) {
      return 'invalid element';
    }
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = elem.getBoundingClientRect().top + scroll;
    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight
    };
    const bounds = {
      top: boundsTop,
      bottom: boundsTop + elem.clientHeight
    };
    return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
  }
  function generateAbsoluteUrl(href) {
    if (href && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
      // do nothing
      return href;
    } else if (href && href.indexOf('www.') === 0) {
      return `//${href}`;
    } else {
      return href;
    }
  }

  const Wrapper$4 = styled(Card)`   
  border-top-width: 7px;
  border-top-color: ${props => theme.getColor(props.bordercolor, props.theme)};
  border-top-style: solid;
`;
  const TopBorderCard = props => /*#__PURE__*/React__default.createElement(Wrapper$4, _extends({
    bordercolor: "primary"
  }, props));
  TopBorderCard.propTypes = {
    children: PropTypes.node.isRequired
  };

  exports.Block = Block;
  exports.Box = Box;
  exports.Card = Card;
  exports.Flex = Flex;
  exports.Pane = Pane;
  exports.TopBorderCard = TopBorderCard;
  exports.generateAbsoluteUrl = generateAbsoluteUrl;
  exports.scrollToElement = scrollToElement;
  exports.scrollToElementExtended = scrollToElementExtended;
  exports.useElementVisible = useElementVisible;
  exports.useWindowSize = useWindowSize;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
