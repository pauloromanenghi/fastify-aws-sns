const fp = require('fastify-plugin')
const axios = require('axios')

async function fastify_aws_sns(fastify, opts, next) {

    fastify.addHook('preHandler', async(request, reply) => await preHandler(request, reply))
    
    fastify.addHook('preValidation', async(request) => {

        if('x-amz-sns-message-type' in request.headers){

            if(request.headers['content-type'].includes('text/plain'))
                request.body = JSON.parse(request.body)

        }

        return
    })

    next()
}

async function preHandler(request, reply) {

    const message_type = request.headers['x-amz-sns-message-type']
    
    switch(message_type){

        case 'SubscriptionConfirmation':

            await subscriptionConfirmation(request.body)
            reply.send()
            
            break

        case 'Notification':
            request.body = JSON.parse(request.body.Message)
            break
    }

    return
}

async function subscriptionConfirmation(data) {

    await axios({
        method: 'get',
        url: data.SubscribeURL,
    })

}

module.exports = fp(fastify_aws_sns, {
    name: 'fastify-aws-sns'
})