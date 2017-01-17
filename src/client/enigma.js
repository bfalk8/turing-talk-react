/**
 * Functions to allow the encoding and decoding of messages for
 * passed in enigma machine settings
 * Settings object takes the form of
 * {
 *  leftRotor: int,   // (range 1-8)
 *  leftShift: int,   // (range 0-25)
 *  middleRotor: int, // (range 1-8)
 *  middleShift: int, // (range 0-25)
 *  rightRotor: int,  // (range 1-8)
 *  rightShift: int,  // (range 0-25)
 *  plugboard: [char] // list of chars in order of mappings from letter to letter placed
 *                       in alphabetic order from A->Z
 * }
 */
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
let rotors = new Array();
rotors[1] = "EKMFLGDQVZNTOWYHXUSPAIBRCJ ekmflgdqvzntowyhxuspaibrcj"; // Rotor I
rotors[2] = "AJDKSIRUXBLHWTMCQGZNPYFVOE ajdksiruxblhwtmcqgznpyfvoe"; // Rotor II
rotors[3] = "BDFHJLCPRTXVZNYEIWGAKMUSQO bdfhjlcprtxvznyeiwgakmusqo"; // Rotor III
rotors[4] = "ESOVPZJAYQUIRHXLNFTGKDCMWB esovpzjayquirhxlnftgkdcmwb"; // Rotor IV
rotors[5] = "VZBRGITYUPSDNHLXAWMJQOFECK vzbrgityupsdnhlxawmjqofeck"; // Rotor V
rotors[6] = "JPGVOUMFYQBENHZRDKASXLICTW jpgvoumfyqbenhzrdkasxlictw"; // Rotor VI
rotors[7] = "NZJHGRCXMYSWBOUFAIVLPEKQDT nzjhgrcxmyswboufaivlpekqdt"; // Rotor VII
rotors[8] = "FKQHTLXOCBJSPDZRAMEWNIUYGV fkqhtlxocbjspdzramewniuygv"; // Rotor VIII
// rotors["b"] = ".LEYJVCNIXWPBQMDRTAKZGFUHOS"; // M4 Greek Rotor "b" (beta)
// rotors["g"] = ".FSOKANUERHMBTIYCWLQPZXVGJD"; // M4 Greek Rotor "g" (gama)
let rotorStep = {};
rotorStep[1] = 'Qq';
rotorStep[2] = 'Ee';
rotorStep[3] = 'Vv';
rotorStep[4] = 'Jj';
rotorStep[5] = 'Zz';
rotorStep[6] = 'ZMzm';
rotorStep[7] = 'ZMzm';
rotorStep[8] = 'ZMzm';

let reflector  = "YRUHQSLDPXNGOKMIEBFZCWVJAT yruhqsldpxngokmiebfzcwvjat"; // M3 B

function checkSettings(settings) {
  return true;
}

function setupMachine(settings) {
  let leftRotor = rotors[settings.leftRotor];
  let middleRotor = rotors[settings.middleRotor];
  let rightRotor = rotors[settings.rightRotor];

  function shiftArray(arr, ammount) {
    return (arr.slice(ammount) + arr.substr(0, ammount)).split('');
  }

  function invertArray(arr) {
    let invArr = new Array();
    for(var i = 0; i < arr.length; ++i){
      let x = alphabet.split('').indexOf(arr[i]);
      invArr[x] = alphabet[i];
    }
    return invArr;
  }

  leftRotor = shiftArray(leftRotor, settings.leftShift);
  middleRotor = shiftArray(middleRotor, settings.middleShift);
  rightRotor = shiftArray(rightRotor, settings.rightShift);
  let leftRotorInv = invertArray(leftRotor);
  let middleRotorInv = invertArray(middleRotor);
  let rightRotorInv = invertArray(rightRotor);

  return new Array ( rightRotor, middleRotor, leftRotor, reflector.split(''), 
    leftRotorInv, middleRotorInv, rightRotorInv );
}

function decode(message, settings) {
  if(!checkSettings(settings)) return message;
  let decodePackage = setupMachine(settings);
  let splitMessage = message.split('');
  let decodedMessage = '';

  splitMessage.forEach((letter) => {
    decodePackage[0].push(decodePackage[0].shift());
    decodePackage[decodePackage.length-1].push(
      decodePackage[decodePackage.length-1].shift());
    if (alphabet.indexOf(letter) < 0) {
      decodedMessage = decodedMessage.concat(letter);
      return;
    }

    let decodedChar = letter;
    decodePackage.forEach((rotor) => {
      let decodeIndex = alphabet.indexOf(decodedChar);
      decodedChar = rotor[decodeIndex];
    });
    decodedMessage = decodedMessage.concat(decodedChar);
  });

  return decodedMessage;;
}

function encode(message, settings) {
  return message;
}

export { decode, encode };
