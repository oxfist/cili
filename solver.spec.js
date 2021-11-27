const { firestore } = require('./firebase');
const {
  createPlanning,
  planningCreationRequest,
  extractUsers,
} = require('./solver');

const sinon = require('sinon');

sinon.stub(firestore, 'collection');

describe('planning creation', () => {
  let fakeAdd;
  const fakeProperEvent = {
    text: '<@ciliUser> crea planning <@Violeta> <@Javiera> <@Martina>',
  };
  const fakeMentionedUsers = ['<@Violeta>', '<@Javiera>', '<@Martina>'];

  beforeEach(() => {
    fakeAdd = sinon.fake.returns({ id: 'fakeId' });
    firestore.collection = () => {
      return { add: fakeAdd };
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should send a reply when creating planning', async () => {
    const say = jest.fn();

    await createPlanning(
      fakeMentionedUsers,
      fakeProperEvent.text,
      say,
      'fake channel'
    );

    expect(say).toHaveBeenCalled();
  });

  it('should create a sequence document when creating planning', async () => {
    const say = jest.fn();

    await createPlanning(
      fakeMentionedUsers,
      fakeProperEvent.text,
      say,
      'fake channel'
    );

    sinon.assert.calledOnce(fakeAdd);
  });

  it('should not create a sequence document when no users are mentioned', async () => {
    const fakeEvent = { text: '<@ciliUser> crea planning' };

    const say = jest.fn();

    await createPlanning([], fakeEvent.text, say, 'fake channel');

    sinon.assert.notCalled(fakeAdd);
  });
});

describe('planning creation request', () => {
  it('should return true if planning creation command is correct', () => {
    const request = '<@ciliUser> crea planning <@testUser>';

    const actualResult = planningCreationRequest(request);

    expect(actualResult).toBeTruthy();
  });

  it('should return false if planning creation command is not correct', () => {
    const request = 'foobar';

    const actualResult = planningCreationRequest(request);

    expect(actualResult).toBeFalsy();
  });
});

describe('user sequence parsing', () => {
  it('should return array of mentioned users in planning creation request', () => {
    const request = '<@ciliUser> crea planning <@testUser> <@anotherUser>';
    const expectedUserArray = ['<@testUser>', '<@anotherUser>'];

    const actualUserArray = extractUsers(request);

    expect(actualUserArray).toEqual(expect.arrayContaining(expectedUserArray));
  });

  it('should return empty array when no users are mentioned in request', () => {
    const request = '<@ciliUser> crea planning';
    const expectedEmptyArray = [];

    const actualUserArray = extractUsers(request);

    expect(actualUserArray).toEqual(expect.arrayContaining(expectedEmptyArray));
  });
});
