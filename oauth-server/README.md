# Zoom OAuth server

Zoom OAuth applications need an OAuth token for authorization. For the following
instructions, it is assumed that an OAuth app has already been created. For
instructions how to create one, see Zoom's
[Create an OAuth app](https://marketplace.zoom.us/docs/guides/build/oauth-app#create-an-oauth-app).

## Steps to get an OAuth token

1. Supply your `CLIENT_ID` and `REDIRECT_URI` from your OAuth app's credentials
   to the `.env`. See [.env.example](./env.example) as reference

2. Input a port for the server to listen to in `.env`'s `SERVER_PORT` field

3. Run `$ yarn start` and go to `http://localhost:{SERVER_PORT}` on your browser

4. Click on the link and authorize your account

5. Take note of the generated OAuth token which will be needed on the main
   integration
