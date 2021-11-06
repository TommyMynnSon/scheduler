# Interview Scheduler
Single-page React application for booking, editing, and cancelling interviews.

## Deployment

### Client (Hosted by Netlify):
- https://inspiring-agnesi-6e8281.netlify.app/

### Server (Hosted by Heroku):
Provided for evaluators to see working updates to server as they use the application:
- https://lhl-interview-scheduler-spa.herokuapp.com/api/appointments

<b>Note</b>: Since the server is hosted with the free plan from Heroku, the server instance will shutdown after thirty minutes of inactivity. However, once a request is made, it will take a few seconds to start up again. Once the server is revived, it will behave as expected until it notices that it is inactive for thirty minutes.

### Pipeline Used
!["Pipeline Used"](https://github.com/TommyMynnSon/scheduler/blob/master/docs/pipeline.png)

## Setup for Local Use

- Install dependencies with `npm install`.
- Clone https://github.com/TommyMynnSon/scheduler-api into a separate directory and follow the README.md instructions to configure and run the API server.
- Run `npm start` (make sure the API server is running).

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Demonstration
!["Application Demo"](https://github.com/TommyMynnSon/scheduler/blob/master/docs/ezgif.com-gif-maker.gif)

A demonstration of booking, editing, and cancelling interviews with a persistent connection to an API server via use of web sockets (WebSocket API).

## Dependencies

!["#f03c15"](https://via.placeholder.com/15/f03c15/000000?text=+) `Node.js v10.16.1`

```javascript
"dependencies": {
  "axios": "^0.24.0",
  "classnames": "^2.2.6",
  "normalize.css": "^8.0.1",
  "react": "^16.9.0",
  "react-dom": "^16.9.0",
  "react-scripts": "3.0.0"
}
```
