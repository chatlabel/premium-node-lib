# AppChat Premium API Wrapper for NodeJS

Esta biblioteca foi desenvolvida com o intuito de facilitar a integração com a API do produto Premium, para acelerar e simplificar quaisquer integrações ou novos projetos. 


## Primeiro uso

Primeiramente, adicione a biblioteca ao seu projeto Node usando:
~~~Bash
npm install @appchat-app/premium-node-lib
~~~
Ou utilizando Yarn:
~~~Bash
yarn add @appchat-app/premium-node-lib
~~~

Exemplo de uso:
~~~Node
// import ESM
import Premium from "@appchat-app/premium-node-lib";
// import CJS
const Premium = require("@appchat-app/premium-node-lib").default;

const api = new Premium({
    domainUrl: "appchat.app", // defaults to appchat.app
    channelId: "YOUR_CHANNEL_TOKEN" // defaults to null
});
api.getAllActionCards()
  .then((actionCards) => {
	const firstActionCard = actionCards[0];
    api.sendActionCard({ 
      number: "YOUR_NUMBER",
      action_card_id: firstActionCard.id,
      forceSend: true,
      verifyContact: false
	})
      .then((response) => {
        console.log(response.messageSentId || response.messagesSentIds);
      });
  })
  .catch((e) => console.error(e));
~~~
