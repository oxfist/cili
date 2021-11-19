require('dotenv-flow').config();

const { App } = require('@slack/bolt');
const { creationRequest, planningCreation } = require('./solver');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.event('app_mention', async ({ event, say }) => {
  if (creationRequest(event.text)) {
    planningCreation([], event.text, say);
  } else {
    console.log('nope');
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
