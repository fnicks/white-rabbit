// ip 172.24.201.194:5672

import { WhiteRabbit } from '../lib.js';

const client = new WhiteRabbit('amqp://172.24.201.194:5672');
setTimeout(async () => {
  const users = await client.getData(services.userservice.name, services.userservice.methods.getUsers);
  console.log(users);
}, 1000);

const services = {
  userservice: { name: 'userservice', methods: { getUsers: 'getUsers' } },
  dictionaryservice: { name: 'userservice', methods: { getCountries: 'getCountries' } },
};
