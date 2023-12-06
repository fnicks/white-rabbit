import { WhiteRabbit } from '../lib.js';

const client = new WhiteRabbit('amqp://172.24.201.194:5672');

setTimeout(async () => {
 console.log(await client.receive('hello'));
}, 1000);
