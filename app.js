require('dotenv-flow').config();

const { App } = require('@slack/bolt');
const {
  createPlanning,
  planningCreationRequest,
  extractUsers,
} = require('./solver');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const registerEvents = () => {
  app.event('app_mention', async ({ event, say }) => {
    const messageText = event.text;
    if (planningCreationRequest(messageText)) {
      const users = extractUsers(messageText);
      createPlanning(users, messageText, say, event.channel);
    } else {
      console.log('nope');
    }
  });
};

registerEvents();

// Start main process
(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
