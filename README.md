## Prerequisites
The minimum required Node.js SDK version for Entitlements is 5.3.0
  

## Usage

```EntitlementsClient
const {EntitlementsClient} = require('@frontegg/client');

# initiating client
const client = await EntitlementsClient.init( /* */ );
await client.ready();

# returns validated user entity
# token - Same token from Authorization header
const userOrTenantEntity = await identityClient.validateToken(token);


# returns userEntitlements
const userEntitlementsClient = client.forUser(userOrTenantEntity);

# returns if user entitled for a feature
result = await userEntitlementsClient.isEntitledToFeature('feature-name');

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
