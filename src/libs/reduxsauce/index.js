Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex; }

const { 
  isNil,
  is,
  has,
  any,
  equals,
  keys,
  pipe,
  trim,
  merge,
  split,
  reject,
  map,
  fromPairs,
  anyPass,
  isEmpty,
  join,
  mapObjIndexed,
  pick,
  replace,
  toUpper,
  zipObj,
  curry,
} = require('../ramda');

const DEFAULT = 'REDUXSAUCE.DEFAULT';

const Types = Object.freeze({
  DEFAULT,
});

/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
const cr = (function (initialState, handlers) {
  // initial state is required
  if (initialState === undefined) {
    throw new Error('initial state is required');
  }

  // handlers must be an object
  if (isNil(handlers) || !is(Object, handlers)) {
    throw new Error('handlers must be an object');
  }

  // handlers cannot have an undefined key
  if (any(equals('undefined'))(keys(handlers))) {
    throw new Error('handlers cannot have an undefined key');
  }

  // create the reducer function
  return function () {
    const state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    const action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    // wrong actions, just return state
    if (isNil(action)) return state;
    if (!has('type', action)) return state;

    // look for the handler
    const handler = handlers[action.type] || handlers[DEFAULT];

    // no handler no cry
    if (isNil(handler)) return state;

    // execute the handler
    return handler(state, action);
  };
});

const isNilOrEmpty = anyPass([isNil, isEmpty]);

const defaultOptions = {
  prefix: '',
};

const createTypes$1 = (function (types) {
  const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isNilOrEmpty(types)) throw new Error('valid types are required');

  const _merge = merge(defaultOptions, options);
  const { prefix } = _merge;

  return pipe(trim, split(/\s/), map(trim), reject(isNilOrEmpty), map((x) => [x, prefix + x]), fromPairs)(types);
});

const _extends = Object.assign || function (target) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

const defaultOptions$1 = {
  prefix: '',

  // matches each word in a camelCaseString (except the first)
  // consecutive capitals are treated as one word
}; const RX_CAPS = /(?!^)([A-Z][a-z0-9]+|[A-Z][A-Z0-9]*(?=[A-Z]|\b))/g;

// converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
const camelToScreamingSnake = pipe(replace(RX_CAPS, '_$1'), toUpper);

// build Action Types out of an object
const convertToTypes = function convertToTypes(config, options) {
  const opts = merge(defaultOptions$1, options);
  return pipe(keys, // just the keys
    map(camelToScreamingSnake), // CONVERT_THEM
    join(' '), // space separated
    (types) => createTypes$1(types, opts), // make them into Redux Types
  )(config);
};

// an action creator with additional properties
const createActionCreator = function createActionCreator(name, extraPropNames, options) {
  const _merge = merge(defaultOptions$1, options);
  const { prefix } = _merge;
  // types are upcase and snakey

  const type = `${prefix}${camelToScreamingSnake(name)}`;

  // do we need extra props for this?
  const noKeys = isNil(extraPropNames) || isEmpty(extraPropNames);

  // a type-only action creator
  if (noKeys) {
    return function () {
      return { type };
    };
  }

  // an action creator with type + properties
  // "properties" is defined as an array of prop names
  if (is(Array, extraPropNames)) {
    return function () {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      const extraProps = zipObj(extraPropNames, values);
      return { type, ...extraProps };
    };
  }

  // an action creator with type + properties
  // "properties" is defined as an object of {prop name: default value}
  if (is(Object, extraPropNames)) {
    const defaultProps = extraPropNames;
    return function () {
      const valueObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      const providedProps = pick(Object.keys(defaultProps), valueObject);
      return { type, ...defaultProps, ...providedProps };
    };
  }

  throw new Error('action props must be a null/array/object/function');
};

// build Action Creators out of an object
const convertToCreators = function convertToCreators(config, options) {
  return mapObjIndexed((num, key, value) => {
    if (typeof value[key] === 'function') {
      // the user brought their own action creator
      return value[key];
    }
    // lets make an action creator for them!
    return createActionCreator(key, value[key], options);
  })(config);
};

const ca = (function (config, options) {
  if (isNil(config)) {
    throw new Error('an object is required to setup types and creators');
  }
  if (isEmpty(config)) {
    throw new Error('empty objects are not supported');
  }

  return {
    Types: convertToTypes(config, options),
    Creators: convertToCreators(config, options),
  };
});

/**
 * Allows your reducers to be reset.
 *
 * @param {string} typeToReset - The action type to listen for.
 * @param {function} originalReducer - The reducer to wrap.
 */
function resettableReducer$1(typeToReset, originalReducer) {
  // a valid type is required
  if (!is(String, typeToReset) || typeToReset === '') {
    throw new Error('A valid reset type is required.');
  }

  // an original reducer is required
  if (typeof originalReducer !== 'function') {
    throw new Error('A reducer is required.');
  }
  // run it through first to get what the default state should be
  const resetState = originalReducer(undefined, {});

  // create our own reducer that wraps the original one and hijacks the reset
  function reducer() {
    const state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : resetState;
    const action = arguments[1];

    if (action && action.type === typeToReset) {
      return resetState;
    }
    return originalReducer(state, action);
  }
  return reducer;
}

const rr = curry(resettableReducer$1);

const createReducer = cr;
const createTypes = createTypes$1;
const createActions = ca;
const resettableReducer = rr;

exports.createReducer = createReducer;
exports.createTypes = createTypes;
exports.createActions = createActions;
exports.resettableReducer = resettableReducer;
exports.Types = Types;
