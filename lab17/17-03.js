const redis = require('redis');

const client = redis.createClient('//redis-17140.c89.us-east-1-3.ec2.cloud.redislabs.com:17140', {password: '7mgvkXPlXuKWzVj1FOgoyzWTCA1k8vLW'});

client.on('ready', ()=>{console.log('ready');});
client.on('error', (err)=>{console.log('error: ' + err);});
client.on('connect', ()=>{console.log('connect');});
client.on('end', ()=>{console.log('end');});

console.time('FirstWay');
for(let n = 1; n<=10000; n++) {
    client.incr('incr'); //+1
}
console.timeEnd('FirstWay');

console.time('SecondWay');
for(let n = 1; n<=10000; n++) {
    client.decr('decr'); //-1
}
console.timeEnd('SecondWay');

client.quit();
