const { createPlanning } = require('./solver');

describe('planning creation', () => {
  it('should send a reply when creating planning', async () => {
    const fakeEvent = { text: 'crea planning @Violeta @Javiera @Martina' };
    const say = jest.fn();

    await createPlanning([], fakeEvent.text, say);

    expect(say).toHaveBeenCalled();
  });
});
