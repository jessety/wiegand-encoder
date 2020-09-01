'use strict';

const wiegand = require('../');

describe('encode function', () => {

  // Test error situations not possible in TypeScript

  test('throws an error when sent an empty card number and facility code', () => {
    expect(() => wiegand.encode()).toThrow();
  });

  test('throws an error when sent an empty card number', () => {
    expect(() => wiegand.encode(undefined, 1)).toThrow();
  });

  test('throws an error when sent an empty facility code', () => {
    expect(() => wiegand.encode(1)).toThrow();
  });

  test('throws an error when sent a string facility code', () => {
    expect(() => wiegand.encode(1, 'abc')).toThrow();
  });

  test('throws an error when sent a string card number length', () => {
    expect(() => wiegand.encode(1, 1, 'string')).toThrow();
  });

  test('throws an error when sent a string facility code length', () => {
    expect(() => wiegand.encode(1, 1, 8, 'string')).toThrow();
  });

  test('throws an error when sent a negative card number', () => {
    expect(() => wiegand.encode(-1, 1)).toThrow();
  });

  test('throws an error when sent a negative facility code', () => {
    expect(() => wiegand.encode(1, -1));
  });

  test('throws an error when sent a negative card number length', () => {
    expect(() => wiegand.encode(1, 1, -1)).toThrow();
  });

  test('throws an error when sent a negative facility code length', () => {
    expect(() => wiegand.encode(1, 1, 1, -1)).toThrow();
  });
});
