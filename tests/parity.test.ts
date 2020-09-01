import wiegand from '../';

describe('parity.calculate function', () => {

  test('correctly calculates parity bits for "111111111111111111111111"', () => {
    const { left, right } = wiegand.parity.calculate('111111111111111111111111');
    expect(left).toBe(0);
    expect(right).toBe(1);
  });

  test('correctly calculates parity bits for "000000000000000000000000"', () => {
    const { left, right } = wiegand.parity.calculate('000000000000000000000000');
    expect(left).toBe(0);
    expect(right).toBe(1);
  });

  test('correctly calculates parity bits for "010110110000010011001011"', () => {
    const { left, right } = wiegand.parity.calculate('010110110000010011001011');
    expect(left).toBe(1);
    expect(right).toBe(1);
  });

  test('correctly calculates parity bits for "000000000001000000000001"', () => {
    const { left, right } = wiegand.parity.calculate('000000000001000000000001');
    expect(left).toBe(1);
    expect(right).toBe(0);
  });

  // 38 bit

  test('correctly calculates parity bits for "111111111111111111111111111111111111"', () => {
    const { left, right } = wiegand.parity.calculate('111111111111111111111111111111111111');
    expect(left).toBe(0);
    expect(right).toBe(1);
  });

  test('correctly calculates parity bits for "000000000000000000000000000000000000"', () => {
    const { left, right } = wiegand.parity.calculate('000000000000000000000000000000000000');
    expect(left).toBe(0);
    expect(right).toBe(1);
  });

  test('correctly calculates parity bits for "000000000000000001000000000000000000"', () => {
    const { left, right } = wiegand.parity.calculate('000000000000000001000000000000000000');
    expect(left).toBe(1);
    expect(right).toBe(1);
  });

  test('correctly calculates parity bits for "000000000000000001000000000000000001"', () => {
    const { left, right } = wiegand.parity.calculate('000000000000000001000000000000000001');
    expect(left).toBe(1);
    expect(right).toBe(0);
  });

  // Invalid input

  test('throws an error when an empty string', () => {
    expect(() => wiegand.parity.calculate('')).toThrow();
  });

  test('throws an error when a 1-character string', () => {
    expect(() => wiegand.parity.calculate('1')).toThrow();
  });

  test('throws an error when sent an odd-length string', () => {
    expect(() => wiegand.parity.calculate('123')).toThrow();
  });
});

describe('parity.wrap function', () => {

  test('correctly wraps "111111111111111111111111" in parity bits', () => {
    expect(wiegand.parity.wrap('111111111111111111111111')).toBe('01111111111111111111111111');
  });

  test('correctly wraps "000000000000000000000000" in parity bits', () => {
    expect(wiegand.parity.wrap('000000000000000000000000')).toBe('00000000000000000000000001');
  });

  test('correctly wraps "010110110000010011001011" in parity bits', () => {
    expect(wiegand.parity.wrap('010110110000010011001011')).toBe('10101101100000100110010111');
  });

  test('correctly wraps "000000000001000000000001" in parity bits', () => {
    expect(wiegand.parity.wrap('000000000001000000000001')).toBe('10000000000010000000000010');
  });

  test('throws an error when sent invalid input', () => {
    expect(() => wiegand.parity.wrap('123')).toThrow();
  });
});

describe('parity.validate function', () => {

  test('validates a credential with correct parity bits', () => {
    wiegand.parity.validate('00000011101111110111010101');
  });

  test('throws an error when decoding a credential with an incorrect left parity bit', () => {
    expect(() => wiegand.parity.validate('10000000000000000000000001')).toThrow();
  });

  test('throws an error when decoding a credential with an incorrect right parity bit', () => {
    expect(() => wiegand.parity.validate('00000000000000000000000000')).toThrow();
  });

  test('throws an error when sent invalid input', () => {
    expect(() => wiegand.parity.validate('1234')).toThrow();
  });
});
