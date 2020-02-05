//
//  src/parity.js
//  Created by Jesse Youngblood on 02/02/20
//  Copyright (c) 2020 Jesse Youngblood. All rights reserved.
//

'use strict';

/**
 * Calculate left and right parity for a given credential
 * @param {string} contents - Wiegand credential
 * @throws
 * @returns {{left: number, right: number}}
 */
function calculate(contents) {

  if (typeof contents !== 'string' || contents.length < 2) {
    throw new Error(`Invalid message. Received: "${contents}"`);
  }

  if (contents.length % 2 === 1) {
    throw new Error(`Cannot calculate parity for message with an odd number of bits.`);
  }

  // Split the string in half

  const leftHalf = contents.substring(0, contents.length / 2);
  const rightHalf = contents.substring(contents.length / 2);

  // Calculate how many digits are '1' in each half of the string

  const leftBitCount = leftHalf.split('').filter(bit => bit === '1').length;
  const rightBitCount = rightHalf.split('').filter(bit => bit === '1').length;

  // If the left digit count is odd, set the left parity count to '1'. Otherwise, set it to '0'.

  let left = 0;

  if (leftBitCount % 2 === 1) {
    left = 1;
  }

  // If the right digit count is odd, set the right parity to '0'. Otherwise, set it to '1'.

  let right = 1;

  if (rightBitCount % 2 === 1) {
    right = 0;
  }

  return { left, right };
}

/**
 * Confirm left and right parity bits. Throws an exception if they are not valid.
 * @param {string} message - a Wiegand credential message
 * @throws
 */
function validate(message) {

  if (typeof message !== 'string' || message.length < 26) {
    throw new Error(`Invalid wiegand message. Received: "${message}"`);
  }

  // Pull out the declared right and left parity bits

  const declaredLeftParity = Number(message.substring(0, 1));
  const declaredRightParity = Number(message.substring(message.length - 1));

  // Calculate the parity bits based on the contents of the message

  const credential = message.substring(1, message.length - 1);

  const {
    left: calculatedLeftParity,
    right: calculatedRightParity
  } = calculate(credential);

  // Compare the declared parity bits to their calculated counterparts

  if (declaredLeftParity !== calculatedLeftParity) {
    throw new Error(`Left parity bit (${declaredLeftParity}) does not match calculated left parity bit (${calculatedLeftParity}) in: "${message}"`);
  }

  if (declaredRightParity !== calculatedRightParity) {
    throw new Error(`Right parity bit (${declaredRightParity}) does not match calculated right parity bit (${calculatedRightParity}) in: "${message}"`);
  }

  return true;
}

/**
 * Wrap a Wiegand credential in parity bits
 * @param {string} credential - Wiegand credential
 * @throws
 * @returns {string} - The credential wrapped in parity bits
 */
function wrap(contents) {

  const { left, right } = calculate(contents);

  return [left, contents, right].join('');
}

module.exports = { calculate, validate, wrap };
