const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object', () => {
    let from = 'Joel';
    let text = 'hello';
    let message = generateMessage(from, text);

    expect(5).toBe(5);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  })
})
