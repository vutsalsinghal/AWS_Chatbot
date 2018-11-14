# [DiningConcierge](https://vutsalsinghal.github.io/AWS_Chatbot)

## Install
```
$ git clone https://github.com/vutsalsinghal/AWS_Chatbot.git
$ npm install
$ npm run start
```

## Configure
- Create a file config.js inside `./src` directory with the following structure:
```
const config = {
    accessKeyId: '<access-ID>',
    secretAccessKey: '<access-key>',
    apiKey:'<API-KEY>',
    cognito:{
        userPoolId: '<user-pool-ID>',
        identityPoolId:"<pool-ID>",
        region:'us-east-1',
        clientId:'<client-ID>'
    }
};

export default config;
```

