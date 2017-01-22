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

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
let rotors = {};
rotors[1] = "EKMFLGDQVZNTOWYHXUSPAIBRCJ ekmflgdqvzntowyhxuspaibrcj"; // Rotor I
rotors[2] = "AJDKSIRUXBLHWTMCQGZNPYFVOE ajdksiruxblhwtmcqgznpyfvoe"; // Rotor II
rotors[3] = "BDFHJLCPRTXVZNYEIWGAKMUSQO bdfhjlcprtxvznyeiwgakmusqo"; // Rotor III
rotors[4] = "ESOVPZJAYQUIRHXLNFTGKDCMWB esovpzjayquirhxlnftgkdcmwb"; // Rotor IV
rotors[5] = "VZBRGITYUPSDNHLXAWMJQOFECK vzbrgityupsdnhlxawmjqofeck"; // Rotor V
rotors[6] = "JPGVOUMFYQBENHZRDKASXLICTW jpgvoumfyqbenhzrdkasxlictw"; // Rotor VI
rotors[7] = "NZJHGRCXMYSWBOUFAIVLPEKQDT nzjhgrcxmyswboufaivlpekqdt"; // Rotor VII
rotors[8] = "FKQHTLXOCBJSPDZRAMEWNIUYGV fkqhtlxocbjspdzramewniuygv"; // Rotor VIII

let rotorStep = {};
rotorStep[1] = 'Q';
rotorStep[2] = 'E';
rotorStep[3] = 'V';
rotorStep[4] = 'J';
rotorStep[5] = 'Z';
rotorStep[6] = 'Z';
rotorStep[7] = 'Z';
rotorStep[8] = 'M';

const reflector  = "YRUHQSLDPXNGOKMIEBFZCWVJAT yruhqsldpxngokmiebfzcwvjat"; // M3 B

function verifiedSettings(settings) {
  return {
    leftRotor: settings.leftRotor <= 8 && settings.leftRotor > 0 ? 
      settings.leftRotor : 1,
    leftShift: Math.abs(settings.leftShift) % alphabet.length,
    middleRotor: settings.middleRotor <= 8 && settings.middleRotor > 0 ? 
      settings.middleRotor : 1,
    middleShift: Math.abs(settings.middleShift) % alphabet.length,
    rightRotor: settings.rightRotor <= 8 && settings.rightRotor > 0 ? 
      settings.rightRotor : 1,
    rightShift: Math.abs(settings.rightShift) % alphabet.length,
  };
}

function shiftRotor(rotor, ammount) {
  let correctShift = ammount % alphabet.length;
  let caught = rotors[rotor].substr(0, correctShift).includes(rotorStep[rotor]);
  return [ caught, 
    rotors[rotor].slice(correctShift) + rotors[rotor].substr(0, correctShift) ];
}

function invertRotor(rotor) {
  let invArr = new Array();
  let rotArr = rotor.split('');
  for(var i = 0; i < rotArr.length; ++i){
    let x = alphabet.split('').indexOf(rotArr[i]);
    invArr[x] = alphabet[i];
  }
  return invArr.join('');
}

function mapThroughWheel(rotor, letter) {
  return alphabet[rotor.indexOf(letter)];
}

function translateInput(message, settings) {
  let goodSettings = verifiedSettings(settings);
  let setRotors = [
    goodSettings.rightRotor, 
    goodSettings.middleRotor, 
    goodSettings.leftRotor
  ];

  let positions = [ 
    goodSettings.rightShift, 
    goodSettings.middleShift, 
    goodSettings.leftShift 
  ];

  let decodedMessage = message.split('').reduce(
    (accum, curr) => {
      if(alphabet.indexOf(curr) < 0) {
        return accum.concat(curr);
      }
      positions[0]++;
      let caught = false;
      let travelingChar = curr;

      setRotors.forEach((elem, i) => {
        positions[i] = caught ? positions[i] + 1 : positions[i];
        let [ caught, shiftedRotor ] = shiftRotor(elem, positions[i]);
        travelingChar = mapThroughWheel(shiftedRotor, travelingChar);
      });

      travelingChar = alphabet[reflector.indexOf(travelingChar)];

      let reverseRotors = Array.prototype.slice.call(setRotors);
      reverseRotors.reverse().forEach((elem, i) => {
        let [_, shiftedRotor] = shiftRotor(elem, positions[positions.length - 1 - i]);
        travelingChar = mapThroughWheel(invertRotor(shiftedRotor), travelingChar);
      });

      return accum.concat(travelingChar);
    },
    ''
  );

  return decodedMessage;;
}

export { translateInput };
