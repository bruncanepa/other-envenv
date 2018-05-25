# envenv !

envenv is module that loads environment variables from a .env file into process.env variable, that has no dependencies.

## Install

```bash
npm install envenv
 or
yarn add envenv
```

## Usage
```javascript
const envenv = require('envenv');

// all default values are set to false
const options = {
  check: false, // when set to true, checks if path exists before trying to load file
  force: false // when set to true, overrides the key value even though it exists in process.env
};

const result = envenv('./file/absolute/path/.env', options);

const {success, addedVariables, notAddedVariables} = result;
/**
 * success: indicates the result of the process
 * addedVariables: map with the keys and values that were added to process.env
 * notAddedVariables: map with the keys and values that not were added to process.env
 */
```

### .env file should have this format:
```
FIRST_VARIABLE=FIRST_VALUE
SECOND_VARIABLE=SECOND_VALUE
THIRD_VARIABLE=THIRD_VALUE
...