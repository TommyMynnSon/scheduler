# Interview Scheduler
Single-page React application for booking, editing, and cancelling interviews.

## Deployment

### Client (Hosted by Netlify):
- https://inspiring-agnesi-6e8281.netlify.app/

### Server (Hosted by Heroku):
Provided for evaluators to see working updates to server as they use the application:
- https://lhl-interview-scheduler-spa.herokuapp.com/api/appointments

## Setup for Local Use

Install dependencies with `npm install`.

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
