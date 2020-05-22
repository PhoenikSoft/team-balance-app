## Configuration

In `client_react\src\config.js` set `prod_url` and `dev_url` variables to production and dev BE url respectively.

## dev version start up

* Install [Node v9.4.0](https://nodejs.org/download/release/v9.4.0/)
* Execute commands
```
npm i
npm run start
```

Open browser on http://localhost:3000.

## build and serve at production

* Install [Node v9.4.0](https://nodejs.org/download/release/v9.4.0/)
* Execute commands
```
npm run build
npm install -g serve
serve -s build
```

The app will be up and running at http://localhost:5000, to change the default port see [doc](https://create-react-app.dev/docs/deployment/#static-server)
