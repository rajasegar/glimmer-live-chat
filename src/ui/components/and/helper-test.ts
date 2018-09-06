import and from './helper';

const { module, test } = QUnit;

module('Helper: and', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(and([]), undefined);
  });
});
