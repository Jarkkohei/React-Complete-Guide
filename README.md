# This branch include the `redux-saga` bonus section of the course.

## Add these two lines into your `.env` -file with your own Firebase credentials:

```sh
REACT_APP_FIREBASE_BASE_URL=<YOUR_FIREBASE_BASE_URL HERE>
REACT_APP_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY_HERE>
```

## Add this configuration object to your Firebase Database rules:

```js
{
  "rules": {
    "ingredients": {
      ".read": "true",
      ".write": "true"
    },
    "orders": {
    	".read": "auth != null",
    	".write": "auth != null",
      ".indexOn": ["userId"]
    }
  }
}
```

## Install dependencies

### `npm install`


## Start development server

### `npm start`

