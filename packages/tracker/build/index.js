(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('axios'), require('universal-cookie')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'axios', 'universal-cookie'], factory) :
  (global = global || self, factory(global.tracker = {}, global.React, global.PropTypes, global.Axios, global.UniversalCookie));
}(this, (function (exports, React, PropTypes, axios$1, Cookies) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  var PropTypes__default = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
  axios$1 = axios$1 && Object.prototype.hasOwnProperty.call(axios$1, 'default') ? axios$1['default'] : axios$1;
  Cookies = Cookies && Object.prototype.hasOwnProperty.call(Cookies, 'default') ? Cookies['default'] : Cookies;

  /* eslint-disable no-console */
  const categoryKeys = {
    signin: ['category', 'action', 'hybrid_nonhybrid'],
    energy: ['category', 'campaign_type', 'action', 'internal_external', 'state', 'fuel_type', 'solar_nonsolar', 'existing_customer'],
    car: ['category', 'campaign_type', 'action', 'renewal_month'],
    home: ['category', 'campaign_type', 'action', 'renewal_month'],
    broadband: ['category', 'campaign_type', 'action', 'existing_customer'],
    mobile: ['category', 'campaign_type', 'action', 'existing_customer'],
    genericEnergy: ['category', 'campaign_type', 'action', 'existing_customer'],
    generic: ['category', 'campaign_type', 'action', 'existing_customer', 'offer_type'],
    health: ['category', 'campaign_type', 'action', 'family_type'],
    default: ['category', 'campaign_type', 'action', 'offer_type'],
    'dashboard-preferences': ['category', 'action', 'products']
  };
  const optionalKeys = {
    signin: [],
    energy: ['campaign_type', 'solar_nonsolar', 'internal_external', 'existing_customer', 'fuel_type'],
    generic: ['campaign_type', 'existing_customer', 'offer_type'],
    genericEnergy: ['campaign_type', 'existing_customer'],
    home: ['campaign_type', 'renewal_month'],
    car: ['campaign_type', 'renewal_month'],
    broadband: ['campaign_type', 'existing_customer'],
    mobile: ['campaign_type', 'existing_customer'],
    health: ['campaign_type', 'family_type'],
    'dashboard-preferences': ['products']
  };
  const getTrackingValues = (keys, tracking, requiredOnly = false) => {
    if (requiredOnly) {
      keys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
    }
    return keys.map(key => tracking[key] || tracking.meta && tracking.meta[key] || undefined);
  };
  const energyTrackingValues = (keys, tracking) => {
    const fuelTypes = {
      E: 'Electricity',
      EG: 'DualFuel',
      G: 'Gas'
    };
    const solarValue = typeof tracking.meta.is_solar === 'boolean' ? tracking.meta.is_solar ? 'solar' : 'nonsolar' : undefined;
    const energyTracking = {
      ...tracking,
      fuel_type: fuelTypes[tracking.meta.plan_type] || undefined,
      solar_nonsolar: solarValue
    };
    return getTrackingValues(keys, energyTracking);
  };
  const getValuesMap = {
    energy: energyTrackingValues,
    generic: getTrackingValues
  };
  const getValues = (keys, tracking, requiredOnly = false) => {
    // FIXME: energy presignup hybrid doesn't have plan's info cause not match required values of energy category
    if (tracking.category === 'energy' && (tracking.action === 'presignup' || tracking.action === 'preoffer' || tracking.action === 'signin' || tracking.page === 'landing_page')) {
      return getTrackingValues(categoryKeys.genericEnergy, tracking, requiredOnly);
    }
    const getValuesFunc = getValuesMap[tracking.category] || getValuesMap.generic;
    return getValuesFunc(keys, tracking);
  };
  const getKeys = category => {
    return categoryKeys[category] || categoryKeys.generic;
  };
  const reformatDefault = (keys, values, meta) => {
    const categoryIndex = keys.indexOf('category');
    if (categoryIndex === -1) {
      return values;
    } else if (!meta || !meta.defaultProduct) {
      return values;
    } else {
      values[categoryIndex] = meta.defaultProduct;
      return values;
    }
  };
  const getOptionalKeys = category => {
    return optionalKeys[category] || optionalKeys.generic;
  };

  class Google {
    static sendData(tracking) {
      const keys = getKeys(tracking.category);
      let values = getValues(keys, tracking);
      const requiredKeys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
      const requiredValues = getValues(requiredKeys, tracking, true);
      if (!requiredValues.every(value => value && value !== '') && process.env.NODE_ENV !== 'test') {
        console.log('Missing keys for google analytics pageview');
      } else {
        if (tracking.category === 'default') {
          values = reformatDefault(keys, values, tracking.meta);
        }
        // Remove empty or null values in the eventPath
        const eventPath = values.filter(e => e && e !== '').join('/');
        console.log('GOOGLE EventPath: ', eventPath);
        if (typeof window.ga === 'function') {
          window.ga('send', {
            hitType: 'pageview',
            page: `virtual/${eventPath}`
          });
        }
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'pageview', {
            page: `virtual/${eventPath}`
          });
        }
      }
    }
  }

  const sendToConversionAPI = async (tracking, fullEventPath) => {
    console.log('sendToConversionAPI data ', tracking);
    const fbpValue = getFbClientId();
    const conversionUrl = window.facebook_conversion_url;
    const pixelId = window.facebook_pixel_id;
    if (pixelId && conversionUrl) {
      const result = await axios$1.post(conversionUrl, {
        event_name: fullEventPath,
        email: tracking.meta.email,
        postcode: tracking.meta.postcode,
        state: tracking.meta.state,
        pixel_id: pixelId,
        fbp: fbpValue,
        category: tracking.category,
        plan_type: tracking.meta.plan_type,
        tracking_id: tracking.meta.tracking_id
      }).then(response => {
        return response.data;
      }).catch(ex => {
        console.error(ex);
        return false;
      });
      return result;
    } else {
      return false;
    }
  };
  function getFbClientId() {
    let result = /_fbp=(fb\.1\.\d+\.\d+)/.exec(window.document.cookie);
    if (!(result && result[1])) {
      return null;
    }
    return result[1];
  }

  /* eslint-disable no-console */
  // import Cookies from 'universal-cookie';

  // const cookies = new Cookies();

  // const setCookie = name => {
  //   const expires = new Date();
  //   expires.setMinutes(expires.getMinutes() + 5);
  //   cookies.set(name, true, {
  //     expires,
  //   });
  // };

  const trackCustomEvent = (eventName, data) => {
    // const eventCookieName = `${eventName}-facebook-pixel-${data.tracking_id}`;
    if (window.fbq) {
      // if (!cookies.get(eventCookieName)) {
      window.fbq('trackCustom', eventName, data);
      // setCookie(eventCookieName);
      // }
    }
  };
  const actionMap = {
    get_started: 'getStarted',
    signin: 'SignUp' // keeping this as SingUp for tracking purposes
  };
  const genericPlanKeys = tracking => {
    return {
      action: tracking.action,
      tracking_id: tracking.meta && tracking.meta.tracking_id,
      merchant_name: tracking.meta && tracking.meta.merchant_name,
      product: tracking.category
    };
  };
  const energyPlanKeys = tracking => {
    return {
      ...genericPlanKeys(tracking),
      state: tracking.meta && tracking.meta.state,
      plan_type: tracking.meta && tracking.meta.plan_type,
      is_solar: tracking.meta && tracking.meta.solar_nonsolar
    };
  };
  const categoryKeys$1 = {
    energy: energyPlanKeys,
    generic: genericPlanKeys
  };

  // TODO: Extract this to a util function
  const filterObject = obj => Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) _acc[key] = obj[key];
    return _acc;
  }, {});
  const chooseCategoryKeys = category => categoryKeys$1[category] || categoryKeys$1.generic;
  class Facebook {
    static async sendData(tracking) {
      const categoryKeys = chooseCategoryKeys(tracking.category);
      const keys = getKeys(tracking.category);
      let values = getValues(keys, tracking);
      if (tracking.category === 'default') {
        values = reformatDefault(keys, values, tracking.meta);
        tracking.category = tracking.meta && tracking.meta.defaultProduct ? tracking.meta.defaultProduct : 'default';
      }
      trackCustomEvent(actionMap[tracking.action] || tracking.action, filterObject(categoryKeys(tracking)));
      const requiredKeys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
      const requiredValues = getValues(requiredKeys, tracking, true);
      if (!requiredValues.every(value => value && value !== '') && process.env.NODE_ENV !== 'test') {
        console.log('Missing keys for facebook conversion event');
      } else {
        // Remove empty or null values in the eventPath
        const eventPath = values.filter(e => e && e !== '').join('/');
        console.log('FACEBOOK EventPath: ', eventPath);
        await sendToConversionAPI(tracking, `virtual/${eventPath}`);
      }
    }
  }

  const axios = require('axios');
  const sendDataToServer = (data, authenticityToken) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': authenticityToken
      }
    };
    axios.post('/ajax/funnel-report/track-step', data, config).catch(_error => {
      // Log errors here
    });
  };
  const defaultCategoryKeys = (category = '') => {
    return {
      get_started: tracking => {
        return {
          step_code: `${category.replace(/-/g, '_')}_click_get_started`,
          plan_id: tracking.meta.tracking_id,
          product: `${category.replace(/-/g, '_')}`,
          get_started: true
        };
      }
    };
  };

  // Returns a key value pairs that we will send to the server
  // step_code: the funnel step code
  // plan_id: can be the id of the plan, campaign, etc. (this is a bit confusing, doule check in rails funnel_report_controller)
  // product: product mapped to the user profile (e.g life = life_insurance_profile in the server)
  // get_started: whether we want to record the last get started event or not
  const categoryKeys$2 = {
    'life-insurance': {
      get_quote: tracking => {
        return {
          step_code: 'life_get_a_quote_page',
          plan_id: tracking.meta.tracking_id,
          product: 'life',
          get_started: true
        };
      },
      call_me_back: tracking => {
        return {
          step_code: 'life_submit_call_me_back_page',
          plan_id: tracking.meta.tracking_id,
          product: 'life',
          get_started: false
        };
      }
    },
    energy: {
      get_started: tracking => {
        if (tracking.meta.internal_external === 'external') {
          // FIXME: for now we are just adding 'click_get_started' as our
          // funnel reporting doesn't know any different.
          return {
            step_code: 'click_get_started',
            plan_id: tracking.meta.tracking_id,
            product: 'energy',
            get_started: true
          };
        }
        return {
          step_code: 'click_get_started',
          plan_id: tracking.meta.tracking_id,
          product: 'energy',
          get_started: true
        };
      },
      switch_confirm: tracking => {
        return {
          step_code: 'energy_click_switch_confirm',
          plan_id: tracking.meta.tracking_id,
          product: 'energy',
          get_started: false
        };
      }
    },
    'health-insurance': {
      get_started: tracking => {
        return {
          step_code: 'health_click_get_started',
          plan_id: tracking.meta.tracking_id,
          product: 'health',
          get_started: true
        };
      }
    },
    'car-insurance': {
      get_started: tracking => {
        return {
          step_code: 'car_click_get_started',
          plan_id: tracking.meta.tracking_id,
          product: 'car',
          get_started: true
        };
      }
    },
    'home-and-contents-insurance': {
      get_started: tracking => {
        return {
          step_code: 'home_and_contents_click_get_started',
          plan_id: tracking.meta.tracking_id,
          product: 'home',
          get_started: true
        };
      }
    }
  };
  class Funnel {
    static sendData(tracking) {
      const categoryKey = categoryKeys$2[tracking.category] || defaultCategoryKeys(tracking.category);
      if (categoryKey !== undefined) {
        const actionKey = categoryKey[tracking.action];
        if (actionKey !== undefined) {
          const {
            authenticityToken
          } = tracking;
          const data = actionKey(tracking);
          sendDataToServer(data, authenticityToken);
        }
      }
    }
  }

  class Twitter {
    static sendData(tracking) {
      const keys = getKeys(tracking.category);
      let values = getValues(keys, tracking);
      const requiredKeys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
      const requiredValues = getValues(requiredKeys, tracking, true);
      if (!requiredValues.every(value => value && value !== '') && process.env.NODE_ENV !== 'test') {
        console.log('Missing keys for twitter analytics pageview');
      } else {
        if (tracking.category === 'default') {
          values = reformatDefault(keys, values, tracking.meta);
        }
        // Remove empty or null values in the eventPath
        const eventPath = values.filter(e => e && e !== '').join('/');
        console.log('TWITTER EventPath: ', eventPath);
        if (typeof window.twq === 'function') {
          window.twq('track', 'PageView', {
            page: `virtual/${eventPath}`
          });
        }
      }
    }
  }

  class Bing {
    static sendData(tracking) {
      const keys = getKeys(tracking.category);
      let values = getValues(keys, tracking);
      const requiredKeys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
      const requiredValues = getValues(requiredKeys, tracking, true);
      if (!requiredValues.every(value => value && value !== '')) ; else {
        if (tracking.category === 'default') {
          values = reformatDefault(keys, values, tracking.meta);
        }
        const eventPath = values.filter(e => e && e !== '').join('/');
        console.log('BING EventPath: ', eventPath);
        if (window.uetq) {
          window.uetq.push('event', 'page_view', {
            page_path: `/virtual/${eventPath}`
          });
        }
      }
    }
  }

  const cookies = new Cookies();
  const eventCode = fullEventPath => {
    const viewContent = /^(virtual\/general\/)(onebigswitch\.com\.au|onebigswitch\.ie|fiftyupclub\.com)---campaigns$/;
    const clickbutton = /\/signin\/submit/;
    const search = /virtual\/mobile\/signin\/submit/;
    const submitForm = /virtual\/energy\/get_started/;
    const download = /virtual\/travel\/get_started/;
    const contact = /virtual\/health-insurance\/signin\/submit/;
    const initiateCheckout = /virtual\/car-insurance\/signin\/submit/;
    const addPaymentInfo = /virtual\/home-and-contents-insurance\/signin\/submit/;
    const addToCart = /virtual\/travel\/signin\/submit/;
    const completePayment = /virtual\/health\/get_started/;
    const completeRegistration = /virtual\/car\/get_started/;
    const placeAnOrder = /virtual\/home\/get_started/;
    const addToWishlist = /virtual\/energy\/signin\/submit/;
    const subscribe = /virtual\/mobile\/get_started/;

    /* istanbul ignore next */
    if (viewContent.test(fullEventPath)) {
      return 'ViewContent';
    } else if (clickbutton.test(fullEventPath)) {
      return 'Clickbutton';
    } else if (search.test(fullEventPath)) {
      return 'Search';
    } else if (submitForm.test(fullEventPath)) {
      return 'SubmitForm';
    } else if (download.test(fullEventPath)) {
      return 'Download';
    } else if (contact.test(fullEventPath)) {
      return 'Contact';
    } else if (initiateCheckout.test(fullEventPath)) {
      return 'InitiateCheckout';
    } else if (addPaymentInfo.test(fullEventPath)) {
      return 'AddPaymentInfo';
    } else if (addToCart.test(fullEventPath)) {
      return 'AddToCart';
    } else if (completePayment.test(fullEventPath)) {
      return 'CompletePayment';
    } else if (completeRegistration.test(fullEventPath)) {
      return 'CompleteRegistration';
    } else if (placeAnOrder.test(fullEventPath)) {
      return 'PlaceAnOrder';
    } else if (addToWishlist.test(fullEventPath)) {
      return 'AddToWishlist';
    } else if (subscribe.test(fullEventPath)) {
      return 'Subscribe';
    } else {
      return fullEventPath.replace(/\//g, '-');
    }
  };

  // Need to send email from browser track, may be through context
  //https://business-api.tiktok.com/portal/docs?id=1741601162187777
  const sendToTiktokEventsAPI = async (tracking, fullEventPath) => {
    console.log('sendToTiktokEventsAPI data ', tracking);
    var currentURL = window.location.href;
    const ttclid = cookies.get('ttclid');
    const tiktokEventUrl = window.tiktok_events_url;
    const pixelId = window.tiktok_pixel_id;
    // https://business-api.tiktok.com/portal/docs?id=1771100879787009
    // https://www.simoahava.com/analytics/custom-templates-guide-for-google-tag-manager/
    if (pixelId && tiktokEventUrl) {
      // https://business-api.tiktok.com/portal/docs?id=1771100865818625
      const eventTime = +new Date();
      const result = await axios$1.post(tiktokEventUrl, {
        event_source: 'web',
        event_source_id: pixelId,
        event_id: `${cookies.get('user_email')}_${eventCode(fullEventPath)}`,
        data: [{
          /* istanbul ignore next */
          event: eventCode(fullEventPath),
          event_time: eventTime,
          user: {
            ttclid: ttclid,
            email: cookies.get('user_email_sha256'),
            external_id: cookies.get('user_external_id_sha256')
          },
          page: {
            url: currentURL
          },
          properties: {
            contents: [{
              content_category: tracking.category,
              content_name: tracking.meta.plan_type,
              brand: tracking.entity
            }]
          }
        }]
      }).then(response => {
        return response.data;
      }).catch(ex => {
        console.error(ex);
        return false;
      });
      return result;
    } else {
      return false;
    }
  };
  class TikTok {
    static async sendData(tracking) {
      const keys = getKeys(tracking.category);
      let values = getValues(keys, tracking);
      if (tracking.category === 'default') {
        values = reformatDefault(keys, values, tracking.meta);
        tracking.category = tracking.meta && tracking.meta.defaultProduct ? tracking.meta.defaultProduct : 'default';
      }
      const requiredKeys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
      const requiredValues = getValues(requiredKeys, tracking, true);
      if (!requiredValues.every(value => value && value !== '') && process.env.NODE_ENV !== 'test') {
        console.log('Missing keys for tiktok events api');
      } else {
        // Remove empty or null values in the eventPath
        const eventPath = values.filter(e => e && e !== '').join('/');
        console.log('TIKTOK EventPath: ', eventPath);
        const res = await sendToTiktokEventsAPI(tracking, `virtual/${eventPath}`);
        console.log('res: ', res);
      }
    }
  }

  /* eslint-disable no-template-curly-in-string */
  const cookies$1 = new Cookies();
  const safeSendTo = (service, data) => {
    try {
      service.sendData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const track = (action, trackingData) => {
    const data = {
      ...trackingData,
      action
    };
    safeSendTo(Google, data);
    safeSendTo(Facebook, data);
    safeSendTo(Funnel, data);
    safeSendTo(Bing, data);
    safeSendTo(TikTok, data);
    safeSendTo(Twitter, data);
  };
  const trackEvent = (e, action, trackingData, callback) => {
    track(action, trackingData);
    if (typeof callback === 'function') {
      callback(e);
    }
  };
  const TrackingContext = /*#__PURE__*/React.createContext({
    trackingData: {},
    trackEvent
  });
  const mungeHref = url => {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.hostname}${parsedUrl.pathname.replace(/\//g, '---')}`;
    } catch (e) {
      // console.error(e);
    }
  };
  const useTracker = () => {
    const {
      trackingData
    } = React.useContext(TrackingContext);
    return {
      trackEvent: (e, action, callback) => {
        let realAction = action;
        const aTag = e && e.target.closest('a');
        // If we don't receive an action, grab the href out of the
        // DOM node and clean it up so it can be sent as a virtual page view
        if (aTag && aTag.href && !action) {
          realAction = mungeHref(aTag.href);
          console.log(realAction);
        }
        trackEvent(e, realAction, trackingData, callback);
      }
    };
  };
  const TrackingProvider = ({
    children,
    trackEventOverride,
    trackingData
  }) => {
    /* istanbul ignore next */
    const realTrackEvent = trackEventOverride || trackEvent;
    return /*#__PURE__*/React.createElement(TrackingContext.Provider, {
      value: {
        trackingData,
        trackEvent: realTrackEvent
      }
    }, children);
  };
  class TrackerRegistration extends React.Component {
    componentDidMount() {
      // Load ga config defaults
      let ga_config = document.createElement('script');
      ga_config.innerHTML = `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `;
      this.instance.appendChild(ga_config);
      const setupTrackings = () => {
        // Tiktok events
        window.tiktok_events_url = this.props.tiktok_events_url || window.current_entity && window.current_entity.entity.tiktok_events_url;
        window.tiktok_pixel_id = this.props.tiktok_pixel_id || window.current_entity && window.current_entity.entity.tiktok_pixel_id;

        // Twitter Business Conversion tracking
        if (this.props.twitter_analytics_id) {
          let twitter_tracker = document.createElement('script');
          twitter_tracker.innerHTML = `!(function(e, t, n, s, u, a) {
          e.twq ||
            ((s = e.twq = function() {
              s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }),
            (s.version = '1.1'),
            (s.queue = []),
            (u = t.createElement(n)),
            (u.async = !0),
            (u.src = '//static.ads-twitter.com/uwt.js'),
            (a = t.getElementsByTagName(n)[0]),
            a.parentNode.insertBefore(u, a));
        })(window, document, 'script');
        twq('init', '${this.props.twitter_analytics_id}');`;
          this.instance.appendChild(twitter_tracker);
        }

        // Google Tag Manager
        if (this.props.google_tag_mgr_id) {
          let gtag_mgr = document.createElement('script');
          gtag_mgr.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${this.props.google_tag_mgr_id}');`;
          this.instance.appendChild(gtag_mgr);
        }

        // Google Optimize Code starts
        if (this.props.google_optimize_id) {
          let g_optimze = document.createElement('script');
          let c_css = document.createElement('style');
          c_css.innerHTML = `.async-hide {opacity: 0 !important}`;
          // Anti - flicker snippet(recommended)
          const g_optimze_html = `(function(a,s,y,n,c,h,i,d,e){s.className += ' ' + y;h.start=1*new Date;
        h.end=i=function(){s.className = s.className.replace(RegExp(' ?' + y), '')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
        {'${this.props.google_optimize_id}':true});`;
          g_optimze.innerHTML = g_optimze_html;
          this.instance.appendChild(g_optimze);
          let g_optimize_source = document.createElement('script');
          g_optimize_source.src = `https://www.googleoptimize.com/optimize.js?id=${this.props.google_optimize_id}`;
          g_optimize_source.setAttribute('onerror', `dataLayer.hide.end && dataLayer.hide.end()`);
          this.instance.appendChild(c_css);
          this.instance.appendChild(g_optimize_source);
          // Google Optimize Code ends
        }

        //FOR UNIVERSAL GOOGLE ANALYTICS
        /* istanbul ignore next */
        if (this.props.universal_ga_code) {
          const googleAnalytics = document.createElement('script');
          googleAnalytics.type = 'text/javascript';
          googleAnalytics.innerHTML = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" + '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' + 'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' + "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" + "ga('create', '" + `${this.props.universal_ga_code}` + "', 'auto');" + "ga('send', 'pageview');";
          this.instance.appendChild(googleAnalytics);
        }

        //FOR GA4
        if (this.props.ga_code) {
          const googleAnalytics = document.createElement('script');
          googleAnalytics.async = true;
          googleAnalytics.src = `https://www.googletagmanager.com/gtag/js?id=${this.props.ga_code}`;
          this.instance.appendChild(googleAnalytics);
          let universalConfig = '';
          if (this.props.universal_ga_code) {
            universalConfig = "gtag('config', '" + `${this.props.universal_ga_code}` + "')";
          }
          const googleAnalytics2 = document.createElement('script');
          googleAnalytics2.innerHTML = "gtag('js', new Date());" + "gtag('config', '" + `${this.props.ga_code}` + "');" + universalConfig;
          this.instance.appendChild(googleAnalytics2);
        }
        if (this.props.bing_uet_tag_code) {
          //FOR BING
          const bing = document.createElement('script');
          bing.type = 'text/javascript';
          bing.innerHTML = '(function (w, d, t, r, u) { ' + 'var f, n, i;' + 'w[u] = w[u] || [], f = function () {' + " var o = {ti: '" + `${this.props.bing_uet_tag_code}` + "'};" + ' o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")' + ' }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {' + ' var s = this.readyState;' + ' s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)' + '}, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)' + '})(window, document, "script", "//bat.bing.com/bat.js", "uetq");' + 'window.uetq = window.uetq || [];' + " window.uetq.push ('event', 'pageview');";
          this.instance.appendChild(bing);
        }
        if (this.props.google_adwords_id) {
          //FOR GOOGLE ADWORDS
          const adwords1 = document.createElement('script');
          adwords1.async = true;
          adwords1.src = "https://www.googletagmanager.com/gtag/js?id='" + `${this.props.google_adwords_id}` + "'";
          this.instance.appendChild(adwords1);
        }
        if (this.props.google_adwords_id) {
          const adwords2 = document.createElement('script');
          adwords2.innerHTML = "gtag('js', new Date());" + "gtag('config', '" + `${this.props.google_adwords_id}` + "');";
          this.instance.appendChild(adwords2);
        }
        if (this.props.fullstory_id) {
          const fullstory = document.createElement('script');
          fullstory.innerHTML = `
        window['_fs_host'] = 'fullstory.com';
        window['_fs_org'] = '${this.props.fullstory_id}';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
            if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
            g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
            o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_host+'/s/fs.js';
            y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
            g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
            g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
            g.log = function(a,b) { g("log", [a,b]) };
            g.consent=function(a){g("consent",!arguments.length||a)};
            g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
            g.clearUserCookie=function(){};
        })(window,document,window['_fs_namespace'],'script','user');
      `;
          this.instance.appendChild(fullstory);
        }
        if (this.props.facebook_pixel_id) {
          //FOR FACEBOOK CONVERSION API
          window.facebook_pixel_id = this.props.facebook_pixel_id;
          //FOR FACEBOOK PIXEL
          const fb1 = document.createElement('script');
          fb1.innerHTML = '!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?' + 'n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;' + "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" + 't.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,' + "document,'script','https://connect.facebook.net/en_US/fbevents.js');" + "fbq('init', '" + `${this.props.facebook_pixel_id}` + "');" + "fbq('track', 'PageView');";
          this.instance.appendChild(fb1);
        }
        if (this.props.facebook_conversion_url) {
          window.facebook_conversion_url = this.props.facebook_conversion_url;
        }
        if (this.props.enable_trustpilot_js_script) {
          const tpilot = document.createElement('script');
          tpilot.type = 'text/javascript';
          tpilot.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
          tpilot.async = true;
          this.instance.appendChild(tpilot);
        }
        if (this.props.zendesk_id) {
          //FOR ZENDESK
          const zd1 = document.createElement('script');
          zd1.type = 'text/javascript';
          zd1.innerHTML = "window.zESettings = {webWidget: {contactOptions: { enabled: true, contactButton: { '*': 'Contact Button' }, chatLabelOnline: { '*': 'Live Chat' },    chatLabelOffline: { '*': 'Chat is unavailable' },  contactFormLabel: { '*': 'Leave us a message' } } } };";
          this.instance.appendChild(zd1);
          const zd2 = document.createElement('script');
          zd2.id = 'ze-snippet';
          zd2.src = `https://static.zdassets.com/ekr/snippet.js?key=${this.props.zendesk_id}`;
          zd2.defer = true;
          this.instance.appendChild(zd2);
        }
        if (this.props.sfmc_business_account_id) {
          // SalesForce Marketting Cloud Collect code
          const sfmc = document.createElement('script');
          let sfmc_script_html = `(function (n, i, r, o, j, s, p) {
        s = i.createElement(r),p = i.getElementsByTagName(r)[0];
        s.async = 1;s.src = o;p.parentNode.insertBefore(s, p);
        s.onload = s.onreadystatechange = function () {
        _etmc.push(['setOrgId', '${this.props.sfmc_business_account_id}']);`;
          if (this.props.user && this.props.user.email) {
            sfmc_script_html = sfmc_script_html + `_etmc.push(['setUserInfo', { 'email': '${this.props.user.email}' }]);`;
          }
          sfmc_script_html = sfmc_script_html + `_etmc.push(["updateItem",
          {
            "item_type": "content",
            "item": "${window.location.origin + window.location.pathname}",
            "url": "${window.location.href}",
            "available": "Y",
          },
        ]);`;
          sfmc_script_html = sfmc_script_html + `_etmc.push(['trackPageView', { "item" : "${window.location.origin + window.location.pathname}" }]);}})(window, document, 'script', 'https://${this.props.sfmc_business_account_id}.collect.igodigital.com/collect.js', '_etmc');`;
          sfmc.innerHTML = sfmc_script_html;
          this.instance.appendChild(sfmc);
        }
        if (this.props.outbrain_tracking_id) {
          // Outbrain Pixel tracking
          const outbrain = document.createElement('script');
          let outbrain_script_html = `
        !function(_window, _document) {
          const OB_ADV_ID = '${this.props.outbrain_tracking_id}';
          if (_window.obApi) {var toArray = function(object) {return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];};
          _window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));
          return;
          }
          var api = _window.obApi = function() {api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);};
          api.version = '1.1';
          api.loaded = true;
          api.marketerId = OB_ADV_ID;
          api.queue = [];
          var tag = _document.createElement('script');
          tag.async = true;
          tag.src = '//amplify.outbrain.com/cp/obtp.js';
          tag.type = 'text/javascript';var script = _document.getElementsByTagName('script')[0];script.parentNode.insertBefore(tag, script);}(window, document);
          obApi('track', 'PAGE_VIEW');
        `;
          outbrain.innerHTML = outbrain_script_html;
          this.instance.appendChild(outbrain);
        }

        /* Jackmedia pixel */
        if (this.props.jackmedia_pixel_id) {
          const jackmedia_pixel = document.createElement('script');
          jackmedia_pixel.id = 'jackmedia_pixel';
          const jackmedia_pixel_html = `
        window._tfa = window._tfa || [];
        window._tfa.push({notify: 'event', name: 'page_view', id: ${this.props.jackmedia_pixel_id}});
        !function (t, f, a, x) {
        if (!document.getElementById(x)) {
        t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
        }
        }(document.createElement('script'),
        document.getElementsByTagName('script')[0],
        '//cdn.taboola.com/libtrc/unip/${this.props.jackmedia_pixel_id}/tfa.js',
        'tb_tfa_script');
      `;
          jackmedia_pixel.innerHTML = jackmedia_pixel_html;
          this.instance.appendChild(jackmedia_pixel);
        }
      };

      // When cookie consent option is enabled
      if (this.props.cookie_items && this.props.cookie_items.enable_new_cookie_consent) {
        // Load default consent
        let ga_consent_default = document.createElement('script');
        ga_consent_default.innerHTML = `
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      `;
        this.instance.appendChild(ga_consent_default);
        if (this.props.navigation_items && this.props.navigation_items.user && this.props.navigation_items.user.email || cookies$1.get('isUseCookie')) {
          // Load consent granted for logged in users or users with cookie consent
          let ga_consent_granted = document.createElement('script');
          ga_consent_granted.innerHTML = `gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });`;
          this.instance.appendChild(ga_consent_granted);
          setupTrackings();
        } else {
          // Otherwise deny ga tracking
          let ga_consent_denied = document.createElement('script');
          ga_consent_denied.innerHTML = `gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });`;
          this.instance.appendChild(ga_consent_denied);
        }
      } else {
        setupTrackings();
      }
    }
    render() {
      return /*#__PURE__*/React.createElement("div", {
        "data-testid": "TrackingRegister",
        ref: el => this.instance = el
      });
    }
  }
  TrackingProvider.propTypes = {
    children: PropTypes__default.node
  };
  TrackerRegistration.propTypes = {
    twitter_analytics_id: PropTypes.string,
    ga_code: PropTypes__default.string,
    bing_uet_tag_code: PropTypes__default.string,
    google_adwords_id: PropTypes__default.string,
    facebook_pixel_id: PropTypes__default.string,
    fullstory_id: PropTypes__default.string,
    zendesk_id: PropTypes__default.string,
    sfmc_business_account_id: PropTypes__default.string,
    facebook_conversion_url: PropTypes__default.string,
    tiktok_events_url: PropTypes__default.string
  };

  exports.TrackerRegistration = TrackerRegistration;
  exports.TrackingProvider = TrackingProvider;
  exports.track = track;
  exports.useTracker = useTracker;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
