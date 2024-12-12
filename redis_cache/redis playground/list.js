const client = require('./client');

async function init() {
  await client.lpush('messages', 'hello');
  await client.lpush('messages', 'hi');
  await client.lpush('messages', 'hey');
  const result = await client.rpop('messages');
  console.log(result);
  const result2 = await client.llen('messages');
  console.log(result2);
}

init();