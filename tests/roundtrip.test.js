'use strict';

const wiegand = require('../');

describe('encode / decode roundtrip', () => {

  // Encode a card number & facility code, then compare the result to an exemplar
  // Finally, decode the encoded result and compare against the original card number and facility code

  const run = (cardNumber, facilityCode, encodedExemplar) => {

    test(`matches results for card number "${cardNumber}" with facility code "${facilityCode}"`, () => {
      const input = { facilityCode, cardNumber };

      const encoded = wiegand.encode(input.cardNumber, input.facilityCode);

      expect(encoded).toBe(encodedExemplar);

      const output = wiegand.decode(encoded);

      expect(output.facilityCode).toBe(input.facilityCode);
      expect(output.cardNumber).toBe(input.cardNumber);
    });
  };

  run(65535, 255, '01111111111111111111111111');
  run(0, 0, '00000000000000000000000001');
  run(32490, 7, '00000011101111110111010101');
  run(1227, 91, '10101101100000100110010111');
  run(1, 1, '10000000100000000000000010');
});
