'use strict';

const wiegand = require('../');

describe('encode function', () => {

  test('correctly encodes card "65535" with facility code "255"', () => {
    expect(wiegand.encode(65535, 255)).toBe('01111111111111111111111111');
  });

  test('correctly encodes card "0" with facility code "0"', () => {
    expect(wiegand.encode(0, 0)).toBe('00000000000000000000000001');
  });

  test('correctly encodes card "032490" with facility code "7"', () => {
    expect(wiegand.encode(32490, 7)).toBe('00000011101111110111010101');
  });

  test('correctly encodes card "1227" with facility code "7"', () => {
    expect(wiegand.encode(1227, 91)).toBe('10101101100000100110010111');
  });

  test('correctly encodes card "711" with facility code "14"', () => {
    expect(wiegand.encode(711, 14)).toBe('10000111000000010110001111');
  });

  test('throws an error when sent an invalid card number', () => {

    try {
      wiegand.encode();
    } catch (error) {
      return;
    }

    throw new Error('Failed to throw an error when sent an invalid card number');
  });

  test('throws an error when sent an invalid card number', () => {

    try {
      wiegand.encode(1, null);
    } catch (error) {
      return;
    }

    throw new Error('Failed to throw an error when sent an invalid card number');
  });
});
