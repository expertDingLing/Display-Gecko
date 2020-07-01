export default {
  env: process.env.REACT_APP_STAGE || "dev",
  apiGateway: {
    name: process.env.REACT_APP_API_GATEWAY_NAME,
    REGION: process.env.REACT_APP_API_GATEWAY_REGION,
    URL: process.env.REACT_APP_API_GATEWAY_REST_API,
    WEBSOCKET_URL: process.env.REACT_APP_API_GATEWAY_WEBSOCKET_API
  },
  cognito: {
    REGION: process.env.REACT_APP_COGNITO_REGION,
    USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID
  }
};