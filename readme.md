# Plugin Fastify AWS SNS

Este plugin tem como objetivo, inscrever-se, validar a inscrição e receber eventos de um determinado tópico AWS SNS, anexando o conteúdo da mensagem no body da request e permitindo a utilização no controller.

## Installation

```bash
npm i
```

## Usage
Na AWS SNS é necessário a configuração do endpoint que contém o plugin fastify-aws-sns. 

Quando a request de subscription chegar no endpoint, o plugin irá confirmar automaticamente a assinatura, assim sendo possível começar a receber os eventos. 


```javascript
const fastify = require('fastify')
const fastify_aws_sns = require('./src/fastify-aws-sns')

const server = fastify({
    logger: false
})

server.register(fastify_aws_sns)

server.listen({ port: 4000 }, (err, address) => {
    if(err) console.error(err);
})
```