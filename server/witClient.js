'use strict';

const request = require('superagent');

function handleWitResponse(res) {
    console.log(res);
}

module.exports = function witClient(token) {
    const ask = function ask(message, cb) {

        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + process.env.WHIT_TOKEN)
            .query({ v: '20171121'})
            .query({q: message})
            .end((err,res) => {
                if(err) return cb(err);

                if(res.statusCode != 200) return cb('Expected status 200 but got ' + res.statusCode);

                const witResponse = handleWitResponse(res.body);
                return cb(null, witResponse);
            })


        console.log('ask: ' + message);
        console.log('token: ' + token);
    }

    return {
        ask: ask
    }
}