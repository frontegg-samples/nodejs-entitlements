## Installation
# node 14+
Use the package manager [npm](npm install @frontegg/client) to install frontegg client.

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
