// import { PRODUCTION, NODE_ENV } from '../constants';

// class TrackerConstructor {
//   segmentEvent = (event, properties = {}, options = {}) => {
//     if (NODE_ENV !== PRODUCTION) {
//       console.log({ event, properties, options });
//     } else {
//       window.analytics.track(event, properties, options);
//     }
//   };

//   segmentIdentify = (userId, traits = {}, options = {}) => {
//     if (NODE_ENV !== PRODUCTION) {
//       console.log('segmentIdentify', { userId, traits, options });
//     } else {
//       window.analytics.identify(userId, traits, options);
//     }
//   };

//   segmentAlias = (userId, previousId = '', options = {}) => {
//     if (NODE_ENV !== PRODUCTION) {
//       console.log('segmentAlias', { userId, previousId, options });
//     } else {
//       window.analytics.alias(userId, previousId, previousId, options);
//     }
//   };
// }

// export const Tracker = new TrackerConstructor();
