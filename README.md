# wiegand-encoder

Lightweight module that encodes and decodes 26, 34, or 38 bit Wiegand protocol credentials for communication with access control systems.

[![test](https://github.com/jessety/wiegand-encoder/workflows/test/badge.svg)](https://github.com/jessety/wiegand-encoder/actions?query=workflow%3Atest)
[![test](https://github.com/jessety/wiegand-encoder/workflows/lint/badge.svg)](https://github.com/jessety/wiegand-encoder/actions?query=workflow%3Alint)
[![license](https://img.shields.io/github/license/jessety/wiegand-encoder.svg)](https://github.com/jessety/wiegand-encoder/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/wiegand-encoder.svg)](https://www.npmjs.com/package/wiegand-encoder)

## Installation

```bash
npm install wiegand-encoder
```

## Usage

```javascript
// Modules
import wiegand from 'wiegand-encoder';

// CommonJS
const wiegand = require('wiegand-encoder');
```

### Encoding

The `encode()` function converts a card number and facility code into binary, counts the bit parity of each half of the message, and wraps it in parity bits.

```javascript
const encoded = wiegand.encode(cardNumber, facilityCode);

wiegand.encode(wiegand.encode(324, 90));
// 00101101000000001010001000
```

If the specified card number or facility code are too high for the standard bit length, it will throw an exception. The largest possible card number in 26-bit protocol is `65535`, and the largest possible facility code is `255`.

### Decoding

The `decode()` function validates the parity bits on either side of the message, then parses the message content from binary back into integers.

```javascript
const { cardNumber, facilityCode } = wiegand.decode('00101101000000001010001000');
// { cardNumber: 324, facilityCode: 90 }
```

If the parity bits are invalid, `decode()` will throw an exception.

To check parity on a message without decoding it, use `parity.validate()`.

```javascript
try {
  wiegand.parity.validate('00101101000000001010001000');
} catch (error) {
  console.error(error);
}
```

### Alternate bit length

By default, `encode()` encodes all messages as 26-bit.

To encode a larger message (e.g. 34-bit, 38-bit, etc.) send the bit length for the card number and facility code to the `encode()` function.

26-bit credentials use a card number length of `16` and a facility code length of `8`. To encode a 34-bit message, use a card number length of `22` and a facility code length fo `10`.

```javascript
wiegand.encode(cardNumber, facilityCode, cardNumberLength, facilityCodeLength);

wiegand.encode(wiegand.encode(324, 90, 22, 10));
// 0000101101000000000000001010001000
```

The `decode()` function also supports optional `cardNumberLength` and `facilityCodeLength` parameters, but will attempt to infer them based on the content of the length of the message if omitted.

```javascript
const { cardNumber, facilityCode } = wiegand.decode('0000101101000000000000001010001000');
// { cardNumber: 324, facilityCode: 90 }
```

## License

MIT © Jesse Youngblood
