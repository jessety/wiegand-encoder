'use strict';

const wiegand = require('../');

describe('decode function', () => {

  // Test error situations not possible in TypeScript

  test('throws an error when decoding nothing', () => {
    expect(() => wiegand.decode()).toThrow();
  });

  test('throws an error when decoding a non-string', () => {
    expect(() => wiegand.decode(256)).toThrow();
  });

  test('throws an error when sent an invalid card number length', () => {
    expect(() => wiegand.decode('01111111111111111111111111', 'string', 8)).toThrow();
  });

  test('throws an error when sent an invalid facility code length', () => {
    expect(() => wiegand.decode('01111111111111111111111111', 16, 'string')).toThrow();
  });

  test('throws an error when sent a credential string that does not match the default expected length', () => {
    expect(() => wiegand.decode('0111111111111111111111111')).toThrow();
  });

  test('throws an error when sent a credential string shorter than the specified card number / facility code lengths', () => {
    expect(() => wiegand.decode('0111111111111111111111111', 16, 8)).toThrow();
  });

  test('throws an error when sent a credential string longer than the specified card number / facility code lengths', () => {
    expect(() => wiegand.decode('0111111111111111111111111111111', 16, 8)).toThrow();
  });

  test('throws an error when sent a non-binary string', () => {
    expect(() => wiegand.decode('01111111111112111111111111')).toThrow();
  });
});
