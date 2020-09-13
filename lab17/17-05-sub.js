const redis = require('redis');

const client = redis.createClient('//redis-17140.c89.us-east-1-3.ec2.cloud.redislabs.com:17140', {password: '7mgvkXPlXuKWzVj1FOgoyzWTCA1k8vLW'});


sub_client.on('subscribe', (channel, count)=>{console.log('subscribe: ', 'channel = ', channel, 'count = ', count);});
sub_client.on('message', (channel, message)=>{console.log('sub channel: ' + channel + ': ' + message);});

sub_client.subscribe('channel-01');

setTimeout(() => {
    sub_client.unsubscribe();
    sub_client.quit();
}, 60000);
