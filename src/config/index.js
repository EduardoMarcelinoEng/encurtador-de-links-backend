const env = 'develop';
let httpPort = '';
let httpsPort = '';

switch(env){
    case 'develop':
        httpPort = 80;
    break;
    case 'production':
        httpPort = 80;
        httpsPort = 443;
}

module.exports = {
    httpPort,
    httpsPort,
    env
}