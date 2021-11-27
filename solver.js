const { firestore } = require('./firebase');

const PLANNING_CREATION_COMMAND = 'crea planning';
const PLANNING_SEQUENCE_COLLECTION = 'planning_sequences';
const USER_MENTION_REGEXP = /<@\w+>/g;

function planningCreationRequest(message) {
  return message.includes(PLANNING_CREATION_COMMAND);
}

function extractUsers(message) {
  const usersIncludingApp = [...message.matchAll(USER_MENTION_REGEXP)].map(
    (match) => match[0]
  );
  return usersIncludingApp.slice(1);
}

async function createPlanning(people, message, say, channel) {
  if (people.length === 0) return;

  const responseText = `Hello there! You just said "${message}"`;
  const sequenceRef = firestore.collection(PLANNING_SEQUENCE_COLLECTION);

  await sequenceRef.add({
    channel: channel,
    sequence: people,
  });

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
  extractUsers,
};
