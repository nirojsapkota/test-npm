(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('@rtm-ui/tracker'), require('@rtm-ui/theme')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', '@rtm-ui/tracker', '@rtm-ui/theme'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.React, global.PropTypes, global.tracker, global.theme));
}(this, (function (exports, React, PropTypes, tracker, theme) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false
      };
    }
    static getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
    componentDidCatch(error, errorInfo) {
      if (this.props.onError) {
        this.props.onError();
      }
      // FIXME: Log this somewhere
      console.error(error, errorInfo);
    }
    render() {
      if (this.state.hasError) {
        return /*#__PURE__*/React.createElement("div", null, "We're sorry, something went wrong. Please try again.");
      }
      return this.props.children;
    }
  }

  const Bootstrap = ({
    overrides,
    children,
    trackingData = {
      category: 'default'
    },
    cssReset,
    ...props
  }) => {
    const [useDefaultTheme, setUseDefaultTheme] = React.useState(false);
    const Tracking = props.trackingProvider ? props.trackingProvider : tracker.TrackingProvider;
    const theme$1 = theme.themeMap[props.themeName || trackingData.brand];
    const themeWithOverrides = overrides ? Object.keys(overrides).reduce((acc, cv, ci) => theme.setIn(acc, cv, Object.values(overrides)[ci]), theme$1) : theme$1;
    return /*#__PURE__*/React.createElement(ErrorBoundary, {
      onError: setUseDefaultTheme
    }, /*#__PURE__*/React.createElement(Tracking, {
      trackingData: trackingData
    }, /*#__PURE__*/React.createElement(theme.BootstrapTheme, {
      useDefaultTheme: useDefaultTheme,
      theme: themeWithOverrides,
      cssReset: cssReset
    }, children)));
  };
  Bootstrap.propTypes = {
    children: PropTypes.node.isRequired,
    trackingData: PropTypes.shape({
      brand: PropTypes.string
    }),
    trackingProvider: PropTypes.func
  };

  exports.Bootstrap = Bootstrap;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
