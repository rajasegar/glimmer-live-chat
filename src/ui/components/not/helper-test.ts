import not from './helper';

const { module, test } = QUnit;

module('Helper: not', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(not([]), undefined);
  });
});
