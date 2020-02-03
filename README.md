# wiegand-encoder

Lightweight module for encoding and decoding 26-bit Wiegand protocol credentials

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

Encode a card number and facility code, then compute and append the left and right parity bits:

```javascript
const encoded = wiegand.encode(cardNumber, facilityCode);

wiegand.encode(wiegand.encode(324, 90));
// 00101101000000001010001000
```

Validate the parity bits, then decode the card number and facility code from a given credential message:

```javascript
const { cardNumber, facilityCode } = wiegand.decode('00101101000000001010001000');
// { cardNumber: 324, facilityCode: 90 }
```

Validate the parity bits of a message:

```javascript
try {
  wiegand.parity.validate('00101101000000001010001000');
} catch (error) {
  console.error(error);
}
```

## License

MIT © Jesse Youngblood
