# AppChat Premium API Wrapper for NodeJS

Esta biblioteca foi desenvolvida no intuito de facilitar a integração com a API do produto Premium, para acelerar e facilitar quaisquer integrações ou novos projetos. 


## Primeiro uso

Primeiramente, adicione a biblioteca ao seu projeto Node usando:
~~~Bash
npm install @appchat/premium-node-lib
~~~

Exemplo de uso:
~~~Node
// import ESM
import Premium from "@appchat/premium-node-lib";
// import CJS
const Premium = require("@appchat/premium-node-lib").default;

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
