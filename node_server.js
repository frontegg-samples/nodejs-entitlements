const http = require('http');
const { withAuthentication, FronteggContext, IdentityClient, EntitlementsClient} = require('@frontegg/client');
var cors = require('cors');
var express = require('express');
const {json} = require('express');
var app = express();


app.listen(8001, function () {
  console.log('Frontegg Node app listening on port 8001!');
});

const accessTokensOptions = {
  cache: {
    type: 'ioredis',
    options: {
      host: 'localhost',
      port: 6379,
      password: '',
      db: 10,
    },
  },
};

// Initiating Frontegg with relevant enviorment credantials
FronteggContext.init(
  {
  FRONTEGG_CLIENT_ID: process.env.FRONTEGG_CLIENT_ID,
  FRONTEGG_API_KEY: process.env.FRONTEGG_API_KEY,
  FRONTEGG_API_GATEWAY_URL:'https://api.frontegg.com/'
},

{
  accessTokensOptions,
},
);

const identityClient = new IdentityClient({ FRONTEGG_CLIENT_ID: process.env.FRONTEGG_CLIENT_ID, FRONTEGG_API_KEY: process.env.FRONTEGG_API_KEY });

// Creating a safe route that is using entitelemnts
app.get('/safe', withAuthentication(), async function (req, res) {
  try{
    const token  = req.get('Authorization')
    const userOrTenantEntity = await identityClient.validateToken(token);
    const client = await EntitlementsClient.init( /* */ );
    await client.ready();
    const userEntitlementsClient = client.forUser(userOrTenantEntity);
    let result;
    result = await userEntitlementsClient.isEntitledToFeature('test1');
    res.send(`is user entiteled? ${JSON.stringify(result)}`);
    res.status(200);

  }
  catch(error){
    res.send(`Failed due to ${JSON.stringify(error)}`);
  }

});
