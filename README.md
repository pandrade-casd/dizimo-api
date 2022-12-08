# Nodejs-Api
An API RESTful with Nodejs

Environment Variables
- DB_USER
- DB_PASS
- DB_HOST
- JWTSECRET

Create a .env file with the values as KEY=VALUE and execute this:

```
export $(cat .env | egrep -v "(^#.*|^$)" | xargs)