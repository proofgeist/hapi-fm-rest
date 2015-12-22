module.exports.register = function (server, options, next) {

    server.route([
        {
            method: 'Get',
            path: '/',
            handler: function (request, reply) {
                reply('Hello, world!');
            }
        },
        {
            method : 'GET',
            path : '/{DB}/{layout}'
        }


    ])

    next()
};

exports.register.attributes = {
    name: 'FMSProxy',
    version: '0.0.1'
};