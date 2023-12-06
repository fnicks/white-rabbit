// ip 172.24.201.194:5672

import amqp from 'amqplib/callback_api.js';

class WhiteRabbit {
  constructor(url) {
    this.url = url;
    this.connection = null;
    this.channel = null;
    this.init();
  }

  async init() {
    this.connection = await new Promise((resolve, reject) => {
      amqp.connect(this.url, (err, connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });
    this.channel = await this.connection.createChannel();
  }

  send(queue, msg) {
    this.channel.assertQueue(queue, {
      durable: false,
    });
    this.channel.sendToQueue(queue, Buffer.from(msg));
  }

  async receive(queue) {
    return new Promise((resolve, reject) => {
      this.channel.consume(
        queue,
        function (msg) {
          if (msg) {
            resolve(msg.content.toString());
          } else {
            reject(new Error('No message received'));
          }
        },
        {
          noAck: true,
        }
      );
    });
  }

  async getData(service, method) {
    const setSendMethod= `${send}|${method}`
    const setReceiveService= `${receive}|${service}`
    this.send(service, setSendMethod);
    return this.receive(setReceiveService);
  }

  async listen(service) {
    
  }
}

export { WhiteRabbit };
