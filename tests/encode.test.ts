import wiegand from '../src';

describe('encode function', () => {

  // 26 bit

  test('correctly encodes card "65535" with facility code "255" in 26-bit format', () => {
    expect(wiegand.encode(65535, 255)).toBe('01111111111111111111111111');
  });

  test('correctly encodes card "0" with facility code "0" in 26-bit format', () => {
    expect(wiegand.encode(0, 0)).toBe('00000000000000000000000001');
  });

  test('correctly encodes card "324" with facility code "90" in 26-bit format', () => {
    expect(wiegand.encode(324, 90)).toBe('00101101000000001010001000');
  });

  test('correctly encodes card "1227" with facility code "91" in 26-bit format', () => {
    expect(wiegand.encode(1227, 91)).toBe('10101101100000100110010111');
  });

  test('correctly encodes card "711" with facility code "14" in 26-bit format', () => {
    expect(wiegand.encode(711, 14)).toBe('10000111000000010110001111');
  });

  // 38 bit

  test('correctly encodes card "16777215" with facility code "4095" in 38-bit format', () => {
    expect(wiegand.encode(16777215, 4095, 24, 12)).toBe('01111111111111111111111111111111111111');
  });

  test('correctly encodes card "0" with facility code "0" in 38-bit format', () => {
    expect(wiegand.encode(0, 0, 24, 12)).toBe('00000000000000000000000000000000000001');
  });

  test('correctly encodes card "324" with facility code "90" in 38-bit format', () => {
    expect(wiegand.encode(324, 90, 24, 12)).toBe('00000010110100000000000000001010001000');
  });

  test('correctly encodes card "1227" with facility code "91" in 38-bit format', () => {
    expect(wiegand.encode(1227, 91, 24, 12)).toBe('10000010110110000000000000100110010111');
  });

  test('correctly encodes card "711" with facility code "14" in 38-bit format', () => {
    expect(wiegand.encode(711, 14, 24, 12)).toBe('10000000011100000000000000010110001111');
  });

  // Use 26-bit as the default

  test('defaults to 26-bit format', () => {

    const defaultFormatted = wiegand.encode(65535, 255);
    const twentySixBitFormatted = wiegand.encode(65535, 255, 16, 8);

    expect(defaultFormatted).toBe(twentySixBitFormatted);
  });

  // Error handling

  test('throws an error when sent a credential number too high for the card number bit length', () => {

    // The max card number for 26-bit is 65535
    expect(() => wiegand.encode(65536, 1)).toThrow();
  });

  test('throws an error when sent a facility code too high for the card number bit length', () => {

    // The max faclity code for 26-bit is 255
    expect(() => wiegand.encode(1, 256)).toThrow();
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
