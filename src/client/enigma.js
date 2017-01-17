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
// rotorStep[6] = 'ZM';
// rotorStep[7] = 'ZM';
// rotorStep[8] = 'ZM';

const reflector  = "YRUHQSLDPXNGOKMIEBFZCWVJAT yruhqsldpxngokmiebfzcwvjat"; // M3 B

function checkSettings(settings) {
  return true;
}

function shiftRotor(rotor, ammount) {
  let caught = rotors[rotor].substr(0, ammount).includes(rotorStep[rotor]);
  return [ caught, rotors[rotor].slice(ammount) + rotors[rotor].substr(0, ammount) ];
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
  if(!checkSettings(settings)) return message;
  let setRotors = [settings.rightRotor, settings.middleRotor, settings.leftRotor];
  let positions = [ settings.rightShift, settings.middleShift, settings.leftShift ];
  console.log(positions);
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
