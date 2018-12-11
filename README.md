This is an attempt to meet lichess's chessground library with FICS (Free Internet Chess Server) for a better chess server experience

## Architecture

We're running an intermediary websocket server in the backend using [ws](https://github.com/websockets/ws) and a little front-end interface with [React](https://github.com/facebook/react/)

## Installation

### installing and running the websocket server

```
yarn install
```

```
yarn ws
```

### installing and running the react app

```
cd client && yarn install
```

```
yarn start
```

## Can i contrib?

Contributions are open to anyone, we'd like to see where this could go, so please help us.