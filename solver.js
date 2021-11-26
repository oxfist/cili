const CREATION_COMMAND = 'crea planning';

function planningCreationRequest(message) {
  return message.includes(CREATION_COMMAND);
}

async function createPlanning(people, message, say) {
  const responseText = `Hello there! You just said "${message}"`;
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: responseText,
        },
      },
    ],
    text: responseText,
  });
}

module.exports = {
  planningCreationRequest,
  createPlanning,
};
