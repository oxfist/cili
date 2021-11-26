const sinon = require('sinon');
const { firestore } = require('./firebase');

const { createPlanning } = require('./solver');

sinon.stub(firestore.collection, 'add');

describe('planning creation', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should send a reply when creating planning', async () => {
    const fakeEvent = { text: 'crea planning @Violeta @Javiera @Martina' };
    const say = jest.fn();

    await createPlanning([], fakeEvent.text, say);

    expect(say).toHaveBeenCalled();
  });

  it('should create a sequence document when creating planning', async () => {
    const fakeEvent = { text: 'crea plnning @Violeta @Javiera @Martina' };
    const say = jest.fn();
    const fakeAdd = sinon.fake();
    firestore.db.collection = [{ add: fakeAdd }];

    await createPlanning([], fakeEvent.text, say);

    sinon.assert.calledOnce(fakeAdd);
  });
});
