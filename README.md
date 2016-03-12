## Getting Started

### Backend
Backend must be running for frontend to work properly.  **Note** - make sure to
put a valid `DITTO_CLIENT_ID` in the .env file.
```sh
git clone git@github.com:SpencerCDixon/imagery-backend.git
cd imagery-backend
bundle
ruby server.rb
```

### Frontend
Make sure you have nvm installed.  Nvm is a node package manager like rubies
rvm.  [Nvm github page can be found here](https://github.com/creationix/nvm) OR
you can install with:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Once nvm is setup:

```sh
git clone git@github.com:SpencerCDixon/imagery-frontend.git
cd imagery-frontend
nvm install 5.1 && nvm use 5.1
npm install

npm start                    # will start the app with Redux Devtools inline
# OR
npm run dev:nw               # this will run app with Redux Devtools in a new window

# finally:
open http://localhost:3000   # NOTE: make sure backend is running successfully on port 4567
```
If you use npm start there are some hotkeys for the redux devtools.  `ctrl + h`
will toggle their visibility and `ctrl + q` will move them to different parts of
the screen.

Have fun with the DevTools!  You can click on the action names being dispatched
to travel back in time.

To run the test suite:
```
npm test          # run it once with test coverage reporting
npm run test:dev  # run it in watch mode, you can edit tests and they re-run super fast
```

## Testing
All tests require a `test-bundler` before running (similar to rails_helper) that
sets a bunch of globals to reduce boilerplate.  [That file can be found here](https://github.com/SpencerCDixon/imagery-frontend/blob/master/tests/test-bundler.js).
It's what makes it so I don't need to `import chai` in every test file.

One convention I have found to be very useful in scaling tests is creating a
renderComponent function that abstracts away default props/the rendering
process.  You can find that Higher Order Function [here](https://github.com/SpencerCDixon/imagery-frontend/blob/master/tests/helpers/createFactory.js).
It allows me to create a function with a bunch of defaults set up (almost like
using something like Factory Girl) so that way if in the future a Component
needs more default props I can just add them in **one** place instead of having to
find every place in the tests where I'm rendering the component and making sure
to add that required prop.

I generally don't test styling unless it is state specific.  For example, if a
component should be a different color based on some state then I want to make
assertions that it's getting the proper styling.  Since layout styling and
purely aesthetic styling changes so often I don't usually make assertions on
those because it forces developers to change tests too frequently.

When testing the redux logic I tend to make sure my reducers are tested no
matter what since they house the main logic for determining what my UI will look
like.  Testing action creators seems somewhat redundant to me since they're just
functions that return an object.  If an action creator is ever doing something
out of the ordinary I will definitely write a test for it.

The main benefits of Action Creators is it alows you to decouple additional logic around dispatching
an action.  For example, if you only wanted to let an action get dispatched to
fetch photos if the last fetch occured greater than 5 seconds ago.  In those
cases, tests for ACreators are a must!

[Here is an example of a more complicated ACreator that I tested.](https://github.com/SpencerCDixon/imagery-frontend/blob/master/tests/redux/modules/photos.spec.js#L94-L158)

## Redux
I use the concept of a 'Duck' in redux.  [Here is a link to the proposal](https://github.com/erikras/ducks-modular-redux).
By using Ducks you avoid name collisions in action creators making it easier to
work with other developers/scale a big app.  It also promotes good redux code where you take
advantage of functional composition and never let Reducers get too unweildy.  It puts all redux related logic
in one file opposed to three which I've found makes me a happier developer/more
efficient.  When all redux code is in one file if the file ever starts to get
bigger than 200-300 LOC then you know it's time to probably refactor into
smaller pieces.

When using Redux everything needs to be immutable.  There are really two options
to comply with this: use a library like [Immutable.js](https://facebook.github.io/immutable-js/) OR make sure you just
never mutate objects in your reducers.  I'm generally in favor of not using
Immutable if it's a small/medium sized application and instead using this piece
of [middleware](https://github.com/leoasis/redux-immutable-state-invariant)
which enforces immutability and throws warnings if you ever mess up (like using
`splice()` instead of `slice()`).  I only use that middleware in development but
it's useful if you have developers who arn't as familiar with JS and don't know which
methods mutate vs. return new arrays/objects.

## Middleware
I built middleware to deal with interacting with the API even though it was
totally overkill for such a small example app.  I just wanted to show you the
power of middleware and how much boilerplate it can reduce. [The middleware can
be found here](https://github.com/SpencerCDixon/imagery-frontend/blob/master/src/redux/middleware/api.js).
It's pretty well commented but it also deals with a lot of complex topics that
might be somewhat confusing.  [The Redux docs do a good job explaining
middleware if you want to check it
out](http://redux.js.org/docs/advanced/Middleware.html).  The main benefit of this middleware is it prevents
a big piece of boilerplate and can do a lot of normalization/processing of your
API.  Here is an example of the boilerplate reduction:

Before middleware to interact with API:
```javascript
// Using JQuery Ajax since your team should all be familiar with that

export function requestPhotos() {
  return { type: REQUEST_PHOTOS };
}

export function receivePhotos(data) {
  return {
    type: RECEIVE_PHOTOS,
    offers: data.photos,
    pagination: data.meta.pagination,
  };
}

export function failPhotos() {
  return { type: FAIL_PHOTOS };
}

export function fetchPhotos(payload) {
  return (dispatch) => {
    dispatch(requestPhotos());

    return $.getJSON('/api/v1/stream?' + payload, (data) => {
      dispatch(receivePhotos(data));
    }).fail(() => {
      dispatch(failPhotos());
    });
  };
}
```

With the middleware it can be reduced to this:
```javascript
export const function fetchPhotos(payload) {
  return {
    [CALL_API]: {
      endpoint: '/stream',
      types: [PHOTO_REQUEST, PHOTO_SUCCESS, PHOTO_FAILURE],
      payload,
    },
  };
};
```

## ES6 & Arrow Functions
Sometimes the use of arrow functions is a stylistic preference but sometimes
it's actually very important.  The lexical binding of `this` is different in arrow
functions.  [Read more here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
When I use an arrow function for a handler inside a React component it is
binding `this` to the component since with ES6 syntax there is no auto-binding
like in es5's React.createClass.  Alternatively I could bind them in the
constructor like so.

```javascript
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this)
}

handleClick() {
  ...
}

vs.

handleClick = () => {
  ...
}
```
Unless I need the constructor to setup other things I avoid it.

In some cases like in the HomeView you can see
it would appear to be better to bind the function in the `render()` function with
their required arguments, ie.  instead of having `handleListView` AND `handleGridView` I could have bound the
argument in the render like this:

```javascript
<Toggle
  handleClick={this.props.changePhotoView.bind(this, 'list')
  ...
/>

AND
<Toggle
  handleClick={this.props.changePhotoView.bind(this, 'grid')
  ...
/>
```

This is bad for performance though.  Because now on every re-render the
handleClick for those components will have a new reference and the === will fail
forcing a re-render.  By creating specific handlers for each callback they will
be the same function and our === will pass so the Toggle's won't need to
re-render.  Again, this is over optimized since this is such a small app and
React will render things fine, but I still think it's important to point out
concepts that should be followed on an app at scale.

## Import Conventions
I tend to use a few import conventions to make life easier in development.
First noticeable one is in components that require a lot of imports I split them
up into sections.  The first section is always library specific imports and the
second is internal imports.  If its a Smart/Container component dealing with
Redux I will have a section for those as well.  Like so:

```javascript
// library imports
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

// redux imports
import { actions as brandActions } from 'redux/modules/brands';
import { actions as photoActions } from 'redux/modules/photos';

// internal imports
import BrandFilters from 'components/BrandFilters';
import Spinner from 'components/Spinner';
import PhotoGallery from 'components/PhotoGallery';
import Toggle from 'components/Toggle';
```

## Library Decisions That Arn't Standard/Required

`classnames` - makes adding css classnames based on conditional logic much cleaner.

`axios` - promise basted AJAX library with a nice API that I enjoy.  Vanilla
fetch is also a good option but you need to manually setup polyfills to use.

`humps` - lightweight text processing library adapted from ember-cli string
utils.  I like using it to normalize api data to be javascript friendly (ie no_snake_case_in_var_names)

`react-pure-render` - allows for EXTREME perf benefits.  When using Redux you
can do a === equality check on props to determine whether or not to re-render.
By using this it increases speed of app drastically.  Overkill for such a small
app but definitely required for react apps at scale.

`react-flip-move` - honestly, just a cool library I wanted to use for some animations

`lodash.shuffle` - just needed a shuffle function for react-flip-move and didn't
want to pull in a huge dependency like lodash to just use one function.
Luckily, they now distribute lodash in independent modules so you can get just
what you need and not add a lot of bloat to your bundle.js that gets served to
the client.

`react-waypoint` - library I like to use for implementing infinite scroll.
Allows you to dispatch some function when the scrolling gets to a specific part
of the screen.

## Time Break Down

* `~15 min` getting boilerplate setup with my preferences (used my redux-cli to make things go quicker)

* `~60 min` waisted trying to get the Ditto API to work with CORS.

* `~10 min` making a sinatra api that proxies requests to Ditto API

* `~15 min` trying to debug the sinatra proxy to properly pass params through, was
working in postman but not the app (was missing a silly `query` key for httparty)

* `~2.5 hours` to get all components/redux written for the basic requirements of the coding challenge with tests

* `~1.5 hours` writing up documentation on READMEs

* `~60 min` list/grid view of images with shuffle feature and infinite scroll
    that maintains filters.

* `~30 min` fixing up lint errors and debugging issue where Ditto api doesn't
    actually return proper HTTP Status Code on error. IMO should return 422 for
    invalid params, not 200 with error message.

* `~10 min` picking good colors for highlighting image matches

* `~30 min` building component for rendering images with matches

* `~20 min` figuring out how to fix aspect ratio for when I reduce original
    image size to 250px

## Critiques/Unlimited Time
If I had more time I would make the styling look nice instead of basic
bootstrap.  Didn't really want to waste my time on that since I figured I would
be given design mockups anyways in the real world.

I definitely over-engineered a lot of aspects of the code challenge but it was
in the hopes of displaying to you how production React/Redux apps should work.

If I had more time I would create schemas and normalize your API client side
using [this](https://github.com/gaearon/normalizr).  Since the amount of data I
was dealing with was minimal it didn't seem worth it.

I would also extract the `ImageMatch` component and put all the logic for
scaling and calculating the match dimensions in a utility file.  I feel like
that logic shouldn't belong in the component and it would be easier to unit test
all the calculations if it was extracted.  I'm pretty sure I have pixel rounding
issues in the current implementation.

I'm sure there is a lot of other things that I could change to be more
expressive and am definitely open to feedback from you guys!

==================

Redux starter kit I prefer in case you're interested in how it works/project
structure:

Table of Contents
-----------------
1. [Requirements](#requirements)
1. [Features](#features)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [CLI Generators](#cli-generators)
1. [Structure](#structure)
1. [Webpack](#webpack)
1. [Server](#server)
1. [Styles](#styles)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Troubleshooting](#troubleshooting)

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Features
--------

* [React](https://github.com/facebook/react) (`^0.14.0`)
* [Redux](https://github.com/rackt/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-devtools
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^2.0.0`)
* [react-router-redux](https://github.com/rackt/react-router-redux) (`^4.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * Bundle splitting and CSS extraction
  * Sass w/ CSS modules, autoprefixer, and minification
* [Koa](https://github.com/koajs/koa) (`^2.0.0-alpha`)
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ chai, sinon-chai, and chai-as-promised, and [chai-enzyme](https://github.com/producthunt/chai-enzyme)
  * PhantomJS
  * Code coverage reports/instrumentation with [isparta](https://github.com/deepsweet/isparta-loader)
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [react-transform-hmr](https://github.com/gaearon/react-transform-hmr) hot reloading for React components
  * [redbox-react](https://github.com/KeywordBrain/redbox-react) visible error reporting for React components
  * [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined
  * [babel-plugin-transform-react-constant-elements](https://babeljs.io/docs/plugins/transform-react-constant-elements/) save some memory allocation
  * [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) remove `PropTypes`
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this.

Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/davezuko/react-redux-starter-kit.git
$ cd react-redux-starter-kit
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```

### Starting a New Project

First, I highly suggest checking out a new project by
[SpencerCDixon](https://github.com/SpencerCDixon):
[redux-cli](https://github.com/SpencerCDixon/redux-cli). This tool integrates
extremely well with this project and offers added benefits such as generators
(components, redux modules, etc.) and config/template management. It's still a
work in progress, but give it a shot and file bugs to help make the project more
robust.

Alternatively, if you just want to stick with this project and want to start a fresh project without having to clean up the example code in `master`, you can do the following after cloning the repo:

```shell
git fetch origin new-project                      # Make sure you've fetched the latest copy of this branch from remote
git checkout new-project                          # Checkout the new-project branch
git checkout -b <your-project-name> new-project   # Create a branch based on the new-project branch
$ npm install                                     # There are a few npm dependencies in this branch that aren't in master
$ npm run make:project                            # Make your new project
$ rm -rf .git && git init                         # Start a new git repository
```

Usage
-----

Before delving into the descriptions of each available npm script, here's a brief summary of the three which will most likely be your bread and butter:

* Doing live development? Use `npm start` to spin up the dev server.
* Compiling the application to disk? Use `npm run compile`.
* Deploying to an environment? `npm run deploy` can help with that.

**NOTE:** This package makes use of [debug](https://github.com/visionmedia/debug) to improve your debugging experience. For convenience, all of messages are prefixed with `app:*`. If you'd like to to change what debug statements are displayed, you can override the `DEBUG` environment variable via the CLI (e.g. `DEBUG=app:* npm start`) or tweak the npm scripts (`betterScripts` in `package.json`).

Great, now that introductions have been made here's everything in full detail:

|Script|Description|
|---|---|
|`npm start`|Spins up Koa server to serve your app at `localhost:3000`. HMR will be enabled in development.|
|`npm run compile`|Compiles the application to disk (`~/dist` by default).|
|`npm run dev`|Same as `npm start`, but enables nodemon to automatically restart the server when server-related code is changed.|
|`npm run dev:nw`|Same as `npm run dev`, but opens the redux devtools in a new window.|
|`npm run dev:no-debug`|Same as `npm run dev` but disables redux devtools.|
|`npm run test`|Runs unit tests with Karma and generates a coverage report.|
|`npm run test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`npm run deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`npm run lint`|Lint all `.js` files.|
|`npm run lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

**NOTE:** Deploying to a specific environment? Make sure to specify your target `NODE_ENV` so webpack will use the correct configuration. For example: `NODE_ENV=production npm run compile` will compile your application with `~/build/webpack/_production.js`.

### Configuration

Basic project configuration can be found in `~/config/_base.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), create a file with the name of target `NODE_ENV` prefixed by an `_` in `~/config` (e.g. `~/config/_production.js`). This can be entirely arbitrary, such as `NODE_ENV=staging` where the config file is `~/config/_staging.js`.

Common configuration options:

|Key|Description|
|---|---|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Koa server|
|`server_port`|port for the Koa server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|

CLI Generators
--------------

This project integrates with [Redux CLI](https://github.com/SpencerCDixon/redux-cli) out of the box. If you used it to generate this project you have immediate access to the generators listed below (if you cloned/forked the project you have these features as well, but make sure to install the CLI first!).

|Script|Description|Options|
|---|---|---|
|`redux g dumb <comp name>`|generates a dumb component and test file||
|`redux g smart <smart name>`|generates a smart connected component and test file||
|`redux g layout <comp name>`|generates functional layout component||
|`redux g view <comp name>`|generates a view component||
|`redux g form <form name>`|generates a form component (assumes redux-form)||
|`redux g duck <duck name>`|generates a redux duck and test file||
|`redux g blueprint <new blueprint>`|generates an empty blueprint for you to make||
**NOTE**: `redux-form` is not a dependency by default. If you wish to use it make sure to `npm i --save redux-form`, or if you wish to modify the skeleton you can update the blueprint in `~/blueprints/form/files/...`.

All of these blueprints are available (and can be overriden) in the `~/blueprints` folder so you can customize the
default generators for your project's specific needs. If you have an existing app you can run `redux init` to set up the CLI, then
make sure to copy over the `blueprints` folder in this project for starter-kit specific generators.

[See the Redux CLI github repo](https://github.com/SpencerCDixon/redux-cli#creating-blueprints) for more information on how to create and use blueprints.

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── bin                      # Build/Start scripts
├── blueprints               # Blueprint files for redux-cli
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── interfaces               # Type declarations for Flow
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── components           # Generic React Components (generally Dumb components)
│   ├── containers           # Components that provide context (e.g. Redux Provider)
│   ├── layouts              # Components that dictate major page structure
│   ├── redux                # Redux-specific pieces
│   │   ├── modules          # Collections of reducers/constants/actions
│   │   └── utils            # Redux-specific helpers
│   ├── routes               # Application route definitions
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── views                # Components that live at a route
│   └── main.js              # Application bootstrap and rendering
└── tests                    # Unit tests
```

### Components vs. Views vs. Layouts

**TL;DR:** They're all components.

This distinction may not be important for you, but as an explanation: A **Layout** is something that describes an entire page structure, such as a fixed navigation, viewport, sidebar, and footer. Most applications will probably only have one layout, but keeping these components separate makes their intent clear. **Views** are components that live at routes, and are generally rendered within a **Layout**. What this ends up meaning is that, with this structure, nearly everything inside of **Components** ends up being a dumb component.

Webpack
-------

### Vendor Bundle
You can redefine which packages to bundle separately by modifying `compiler_vendor` in `~/config/_base.js`. These default to:

```js
[
  'history',
  'react',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
]
```

### Webpack Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js

// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/_base.js`. When adding new globals, also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

Server
------

This starter kit comes packaged with an Koa server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Using a custom Koa app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) will hopefully make it easier for users to extend the starter kit to include functionality such as back-end API's, isomorphic/universal rendering, and more -- all without bloating the base boilerplate. Because of this, it should be noted that the provided server is **not** production-ready. If you're deploying to production, take a look at [the deployment section](#deployment).

Styles
------

Both `.scss` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

**NOTE:** If you're importing styles from a base styles directory (useful for generic, app-wide styles), you can make use of the `styles` alias, e.g.:

```js
// current file: ~/src/components/some/nested/component/index.jsx
import 'styles/core.scss' // this imports ~/src/styles/core.scss
```

Furthermore, this `styles` directory is aliased for sass imports, which further eliminates manual directory traversing; this is especially useful for importing variables/mixins.

Here's an example:

```scss
// current file: ~/src/styles/some/nested/style.scss
// what used to be this (where base is ~/src/styles/_base.scss):
@import '../../base';

// can now be this:
@import 'base';
```

Testing
-------

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module (duck).

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/_base.js`.

Deployment
----------

Out of the box, this starter kit is deployable by serving the `~/dist` folder generated by `npm run compile` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the starter kit. However, if you do need help with more advanced deployment strategies, here are a few tips:

If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. The Koa server that comes with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.

Have more questions? Feel free to submit an issue or join the Gitter chat!

Troubleshooting
---------------

### `npm run dev:nw` produces `cannot read location of undefined.`

This is most likely because the new window has been blocked by your popup blocker, so make sure it's disabled before trying again.

Reference: [issue 110](https://github.com/davezuko/react-redux-starter-kit/issues/110)

### Babel Issues

Running into issues with Babel? Babel 6 can be tricky, please either report an issue or try out the [stable v0.18.1 release](https://github.com/davezuko/react-redux-starter-kit/tree/v0.18.1) with Babel 5. If you do report an issue, please try to include relevant debugging information such as your node, npm, and babel versions.

### Babel Polyfill

By default this repo does not bundle the babel polyfill in order to reduce bundle size. If you want to include it, you can use [this commit](https://github.com/jokeyrhyme/react-redux-starter-kit/commit/f3f095b547ee63474b9361128bb95d370da04b35) from [jokeyrhyme](https://github.com/jokeyrhyme) as a reference.

### Internationalization Support

In keeping with the goals of this project, no internationalization support is provided out of the box. However, [juanda99](https://github.com/juanda99) has been kind enough to maintain a fork of this repo with internationalization support, [check it out!](https://github.com/juanda99/react-redux-starter-kit)

### High editor CPU usage after compilation

While this is common to any sizable application, it's worth noting for those who may not know: if you happen to notice higher CPU usage in your editor after compiling the application, you may need to tell your editor not to process the dist folder. For example, in Sublime you can add:

```
	"folder_exclude_patterns": [".svn",	".git",	".hg", "CVS",	"node_modules",	"dist"]
```
