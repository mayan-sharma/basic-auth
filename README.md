# basic-auth
Basic auth template for express

## Setup locally
- Clone the repo using `git clone https://github.com/mayan-sharma/basic-auth.git`
- cd `basic-auth`
- RUN `npm run start`

## API Reference

### test
    - `/api/`
        - Allowed Methods: `GET`
        - Returns a welcome message

    - `/api/secured/token`
        - Allowed Methods: `GET`
        - Verifies the JWT token

    - `/api/secured/session`
        - Allowed Methods: `GET`
        - Verifies the session cookie

### user
    - `/api/user/login`
        - Allowed Methods: `POST`
        - Required fields: `{ email, password }`
        - Authenticates user and returns a JWT token and a session cookie.

    - `/api/user/register`
        - Allowed Methods: `POST`
        - Required fields: `{ name, email, password }`
        - Registers a user
        