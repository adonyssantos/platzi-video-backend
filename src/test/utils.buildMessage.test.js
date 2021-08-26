const assert = require('assert');
const buildMessage = require('../utils/schemas/buildMessages');

describe.only('util - buildMessage', () => {
  describe('when receives an entity and and action', () => {
    it('should return the respective message', () => {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and and action and is a list', () => {
    it('should return the respective message with the entity in plural', () => {
      const result = buildMessage('movie', 'list');
      const expect = 'movies listed';
      assert.strictEqual(result, expect);
    });
  });
});
