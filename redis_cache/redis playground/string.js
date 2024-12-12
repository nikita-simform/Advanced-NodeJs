const client = require('./client');

async function init() {
  await client.set('user:1', 'Nikita');
  const result = await client.get('user:1');
  console.log(result);
  // await client.expire('user:1', 10); // key will expire in 10 seconds
}

init();