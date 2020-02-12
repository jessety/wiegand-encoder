'use strict';

const wiegand = require('../');

describe('decode function', () => {

  // 26 bit

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

  test('correctly decodes "00101101000000001010001000"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('00101101000000001010001000');

    expect(facilityCode).toBe(90);
    expect(cardNumber).toBe(324);
  });

  test('correctly decodes "10101101100000100110010111"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('10101101100000100110010111');

    expect(facilityCode).toBe(91);
    expect(cardNumber).toBe(1227);
  });

  test('correctly decodes "10000111000000010110001111"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('10000111000000010110001111');

    expect(facilityCode).toBe(14);
    expect(cardNumber).toBe(711);
  });

  // 38 bit

  test('correctly decodes "01111111111111111111111111111111111111"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('01111111111111111111111111111111111111');

    expect(facilityCode).toBe(4095);
    expect(cardNumber).toBe(16777215);
  });

  test('correctly decodes "00000000000000000000000000000000000001"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('00000000000000000000000000000000000001');

    expect(facilityCode).toBe(0);
    expect(cardNumber).toBe(0);
  });

  test('correctly decodes "00000010110100000000000000001010001000"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('00000010110100000000000000001010001000');

    expect(facilityCode).toBe(90);
    expect(cardNumber).toBe(324);
  });

  test('correctly decodes "10000010110110000000000000100110010111"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('10000010110110000000000000100110010111');

    expect(facilityCode).toBe(91);
    expect(cardNumber).toBe(1227);
  });

  test('correctly decodes "10000000011100000000000000010110001111"', () => {

    const { cardNumber, facilityCode } = wiegand.decode('10000000011100000000000000010110001111');

    expect(facilityCode).toBe(14);
    expect(cardNumber).toBe(711);
  });

  // Card number and facility code length

  test('infers component length for a 26-bit message ', () => {

    const inferred = wiegand.decode('01111111111111111111111111');
    const declared = wiegand.decode('01111111111111111111111111', 16, 8);

    expect(inferred).toStrictEqual(declared);
  });

  test('infers component length for a 34-bit message ', () => {

    const inferred = wiegand.decode('0111111111111111111111111111111111');
    const declared = wiegand.decode('0111111111111111111111111111111111', 22, 10);

    expect(inferred).toStrictEqual(declared);
  });

  test('infers component length for a 38-bit message ', () => {

    const inferred = wiegand.decode('01111111111111111111111111111111111111');
    const declared = wiegand.decode('01111111111111111111111111111111111111', 24, 12);

    expect(inferred).toStrictEqual(declared);
  });

  // Parity checks

  test('throws an error when decoding a credential with an incorrect left parity bit', () => {
    expect(() => wiegand.decode('10000000000000000000000001')).toThrow();
  });

  test('throws an error when decoding a credential with an incorrect right parity bit', () => {
    expect(() => wiegand.decode('00000000000000000000000000')).toThrow();
  });

  test('does not throw an invalid parity bit error when parity bit validation is disabled', () => {

    try {
      wiegand.decode('00000000000000000000000000', undefined, undefined, false);
    } catch (error) {
      throw new Error(`Threw parity bit error even though parity bit validation is disabled: ${error.message}`);
    }
  });

  // Error handling

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
