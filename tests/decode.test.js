'use strict';

const wiegand = require('../');

describe('decode function', () => {

  test('correctly decodes "01111111111111111111111111"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('01111111111111111111111111');

    expect(facilityCode).toBe(255);
    expect(cardNumber).toBe(65535);
  });

  test('correctly decodes "00000000000000000000000001"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('00000000000000000000000001');

    expect(facilityCode).toBe(0);
    expect(cardNumber).toBe(0);
  });

  test('correctly decodes "00000011101111110111010101"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('00000011101111110111010101');

    expect(facilityCode).toBe(7);
    expect(cardNumber).toBe(32490);
  });

  test('throws an error when decoding a credential with an incorrect left parity bit', () => {

    try {
      wiegand.decode('10000000000000000000000001');
    } catch (error) {
      return;
    }

    throw new Error(`Failed to catch incorrect left parity bit`);
  });

  test('throws an error when decoding a credential with an incorrect right parity bit', () => {

    try {
      wiegand.decode('00000000000000000000000000');
    } catch (error) {
      return;
    }

    throw new Error(`Failed to catch incorrect right parity bit`);
  });

  test('does not throw an invalid parity bit error when parity bit validation is disabled', () => {

    try {
      wiegand.decode('00000000000000000000000000', false);
    } catch (error) {
      throw new Error(`Threw parity bit error even though parity bit validation is disabled: ${error.message}`);
    }
  });

  test('throws an error when decoding an invalid Wiegand credential string', () => {

    try {
      wiegand.decode('000');
    } catch (error) {
      return;
    }

    throw new Error(`Failed to catch invalid Wiegand credential string`);
  });
});
