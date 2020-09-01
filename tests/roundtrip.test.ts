import wiegand from '../';

describe('encode / decode roundtrip', () => {

  // Encode a card number & facility code, then compare the result to an exemplar
  // Finally, decode the encoded result and compare against the original card number and facility code

  const run = (cardNumber: number, facilityCode: number, encodedExemplar: string, cardNumberLength = 16, facilityCodeLength = 8) => {

    const name = `matches for card number "${cardNumber}" and facility code "${facilityCode}" with ${cardNumberLength}-bit card number and ${facilityCodeLength}-bit facility code.`;

    test(name, () => {
      const input = { facilityCode, cardNumber };

      const encoded = wiegand.encode(input.cardNumber, input.facilityCode, cardNumberLength, facilityCodeLength);

      expect(encoded).toBe(encodedExemplar);

      const output = wiegand.decode(encoded, cardNumberLength, facilityCodeLength);

      expect(output.facilityCode).toBe(input.facilityCode);
      expect(output.cardNumber).toBe(input.cardNumber);
    });
  };

  // 26-bit
  run(65535, 255, '01111111111111111111111111');
  run(0, 0, '00000000000000000000000001');
  run(1, 1, '10000000100000000000000010');
  run(324, 90, '00101101000000001010001000');
  run(1227, 91, '10101101100000100110010111');
  run(711, 14, '10000111000000010110001111');

  // 38-bit
  run(16777215, 4095, '01111111111111111111111111111111111111', 24, 12);
  run(0, 0, '00000000000000000000000000000000000001', 24, 12);
  run(1, 1, '10000000000010000000000000000000000010', 24, 12);
  run(324, 90, '00000010110100000000000000001010001000', 24, 12);
  run(1227, 91, '10000010110110000000000000100110010111', 24, 12);
  run(711, 14, '10000000011100000000000000010110001111', 24, 12);
});
