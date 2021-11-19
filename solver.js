const CREATION_COMMAND = 'crea planning';

function creationRequest(message) {
  return message.includes(CREATION_COMMAND);
}

async function planningCreation(people, message, say) {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hello there! You just said "${message}"`,
        },
      },
    ],
    text: `Hello there, <@${message.user}>!`,
  });
}

module.exports = {
  creationRequest,
  planningCreation,
};
