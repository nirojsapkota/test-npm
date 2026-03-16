(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('styled-components'), require('@rtm-ui/layout'), require('@rtm-ui/tracker'), require('@rtm-ui/typography'), require('@rtm-ui/theme')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'styled-components', '@rtm-ui/layout', '@rtm-ui/tracker', '@rtm-ui/typography', '@rtm-ui/theme'], factory) :
  (global = global || self, factory(global.button = {}, global.React, global.PropTypes, global.styled, global.layout, global.tracker, global.typography, global.theme));
}(this, (function (exports, React, PropTypes, styled, layout, tracker, typography, theme) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;
  var styled__default = 'default' in styled ? styled['default'] : styled;

  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  const base = styled.css`
  &:disabled {
    cursor: not-allowed;
  }
`;
  const primary = styled.css`
  color: ${props => theme.getColor('inverseText', props.theme)};
  background: ${props => theme.getColor('accent', props.theme)};
  border-bottom-color: ${props => theme.tintColor(theme.getColor('accent', props.theme), -10)};

  &:hover {
    color: ${props => theme.getColor('inverseText', props.theme)};
    background: ${props => theme.tintColor(theme.getColor('accent', props.theme), -5)};
    border-bottom-color: ${props => theme.tintColor(theme.getColor('accent', props.theme), -10)};
  }
`;
  const secondary = styled.css`
  color: ${props => props.theme.colors.grayscale.white};
  background: ${props => props.theme.colors.grayscale.slightlyDarker};
  border-bottom-color: ${props => props.theme.colors.grayscale.darker};

  &:hover {
    color: ${props => props.theme.colors.grayscale.white};
    background: ${props => props.theme.colors.grayscale.darker};
    border-bottom-color: ${props => props.theme.colors.grayscale.slightlyDarker};
  }
`;
  const contentStyling = styled.css`
  display: ${props => props.block ? 'flex' : 'inline-flex'};
  ${props => props.block && 'flex: 1'};
  align-self: center;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
  const ContentWrapper = styled__default(layout.Box)`
  ${contentStyling}
`;
  const tertiary = styled.css`
  color: ${props => theme.getColor('inverseText', props.theme)};
  background: ${props => theme.getColor('tertiary', props.theme)};
  border-bottom-color: ${props => theme.tintColor(theme.getColor('tertiary', props.theme), -5)};

  &:hover {
    color: ${props => theme.getColor('inverseText', props.theme)};
    background: ${props => theme.tintColor(theme.getColor('tertiary', props.theme), -5)};
    border-bottom-color: ${props => theme.tintColor(theme.getColor('tertiary', props.theme), -10)};
  }
`;
  const resetStyling = styled.css`
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  text-decoration: none;
`;
  const buttonStyling = styled.css`
  ${resetStyling};
  ${base};
  ${typography.labelTextStyles};
  display: ${props => props.block ? 'block' : 'inline-block'};
  width: ${props => props.width || 'inherit'};
  ${props => props.block && 'flex: 1'};
  padding: 18px 30px;
  white-space: nowrap;
  word-break: keep-all;
  border: none;
  border-radius: ${props => props.theme.button.borderRadius};
  border-bottom-width: ${props => props.theme.button.bottomBorderWidth};
  border-bottom-style: solid;

  ${props => props.tertiary ? tertiary : props.secondary ? secondary : primary};
`;
  const ButtonLink = styled__default.a`
  ${buttonStyling};
  ${contentStyling};
`;
  const StyledButton = styled__default.button`
  ${buttonStyling};
  opacity: ${props => props.appearDisabled === true ? '0.5' : '1'};
`;
  const WrapperButton = styled__default.button`
  ${resetStyling};
`;
  const WrapperLink = styled__default.a`
  ${resetStyling};
`;
  ButtonLink.propTypes = {
    block: PropTypes.bool
  };

  const Base = ({
    track,
    onClick,
    children,
    asWrapper,
    block,
    href,
    ...buttonProps
  }) => {
    const {
      ref,
      trackEvent
    } = tracker.useTracker();
    const Component = asWrapper ? WrapperButton : buttonProps.as === 'a' ? ButtonLink : StyledButton;
    const content = asWrapper || buttonProps.as === 'a' ? /*#__PURE__*/React.createElement(React.Fragment, null, children) : /*#__PURE__*/React.createElement(ContentWrapper, null, children);
    let absoluteUrl = href;
    if (href) {
      absoluteUrl = layout.generateAbsoluteUrl(href);
    } else {
      absoluteUrl = href;
    }
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: ref,
      block: block,
      onClick: e => trackEvent(e, track, onClick),
      href: absoluteUrl
    }, buttonProps), content);
  };
  Base.propTypes = {
    track: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    block: PropTypes.bool,
    asWrapper: PropTypes.bool
  };

  const GroupWrapper = styled__default.div`
  display: flex;
  flex-wrap: ${props => props.flexWrap || 'wrap'};

  > * {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  > *:last-child {
    margin-right: 0px;
  }
`;
  const ButtonGrid = styled__default(layout.Box)`
  display: grid;
  grid-gap: 10px 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: auto;
`;
  const ButtonGroup = ({
    children,
    ...flexProps
  }) => {
    return /*#__PURE__*/React.createElement(GroupWrapper, flexProps, children);
  };
  const Button = props => /*#__PURE__*/React.createElement(Base, props);
  ButtonGroup.propTypes = {
    children: PropTypes.node.isRequired
  };
  Button.propTypes = {
    track: PropTypes.string,
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['submit', 'reset', 'button']),
    onClick: PropTypes.func,
    asWrapper: PropTypes.bool,
    block: PropTypes.bool,
    secondary: PropTypes.bool,
    appearDisabled: PropTypes.bool
  };

  exports.Button = Button;
  exports.ButtonGrid = ButtonGrid;
  exports.ButtonGroup = ButtonGroup;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
