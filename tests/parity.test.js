'use strict';

const wiegand = require('../');

// Test error situations not possible in TypeScript

describe('parity.calculate function', () => {

  test('throws an error when sent no parameters', () => {
    expect(() => wiegand.parity.calculate()).toThrow();
  });
});

describe('parity.wrap function', () => {

  test('throws an error when sent invalid input', () => {
    expect(() => wiegand.parity.wrap('123')).toThrow();
  });
});

describe('parity.validate function', () => {

  test('throws an error when sent invalid input', () => {
    expect(() => wiegand.parity.validate('1234')).toThrow();
  });
});
