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
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
let rotors = {};
rotors[1] = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // Rotor I
rotors[2] = "AJDKSIRUXBLHWTMCQGZNPYFVOE"; // Rotor II
rotors[3] = "BDFHJLCPRTXVZNYEIWGAKMUSQO"; // Rotor III
// rotors[1] = "EKMFLGDQVZNTOWYHXUSPAIBRCJ ekmflgdqvzntowyhxuspaibrcj"; // Rotor I
// rotors[2] = "AJDKSIRUXBLHWTMCQGZNPYFVOE ajdksiruxblhwtmcqgznpyfvoe"; // Rotor II
// rotors[3] = "BDFHJLCPRTXVZNYEIWGAKMUSQO bdfhjlcprtxvznyeiwgakmusqo"; // Rotor III
// rotors[4] = "ESOVPZJAYQUIRHXLNFTGKDCMWB esovpzjayquirhxlnftgkdcmwb"; // Rotor IV
// rotors[5] = "VZBRGITYUPSDNHLXAWMJQOFECK vzbrgityupsdnhlxawmjqofeck"; // Rotor V
// rotors[6] = "JPGVOUMFYQBENHZRDKASXLICTW jpgvoumfyqbenhzrdkasxlictw"; // Rotor VI
// rotors[7] = "NZJHGRCXMYSWBOUFAIVLPEKQDT nzjhgrcxmyswboufaivlpekqdt"; // Rotor VII
// rotors[8] = "FKQHTLXOCBJSPDZRAMEWNIUYGV fkqhtlxocbjspdzramewniuygv"; // Rotor VIII
// rotors["b"] = "LEYJVCNIXWPBQMDRTAKZGFUHOS"; // M4 Greek Rotor "b" (beta)
// rotors["g"] = "FSOKANUERHMBTIYCWLQPZXVGJD"; // M4 Greek Rotor "g" (gama)
let rotorStep = {};
rotorStep[1] = 'Q';
rotorStep[2] = 'E';
rotorStep[3] = 'V';
rotorStep[4] = 'J';
rotorStep[5] = 'Z';
rotorStep[6] = 'ZM';
rotorStep[7] = 'ZM';
rotorStep[8] = 'ZM';

let reflector  = "YRUHQSLDPXNGOKMIEBFZCWVJAT"; // M3 B
// let reflector  = "YRUHQSLDPXNGOKMIEBFZCWVJAT yruhqsldpxngokmiebfzcwvjat"; // M3 B

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

function decode(message, settings) {
  if(!checkSettings(settings)) return message;
  let setRotors = [settings.rightRotor, settings.middleRotor, settings.leftRotor];
  let positions = [ settings.rightShift, settings.middleShift, settings.leftShift ];
  let decodedMessage = message.split('').reduce(
    (accum, curr) => {
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
  // let decodePackage = setupMachine(settings);
  // let splitMessage = message.split('');
  // let decodedMessage = '';
  // console.log(decodePackage);

  // splitMessage.forEach((letter) => {
  //   decodePackage[0].push(decodePackage[0].shift());
  //   decodePackage[decodePackage.length-1].unshift(
  //     decodePackage[decodePackage.length-1].pop());
  //   if (alphabet.indexOf(letter) < 0) {
  //     decodedMessage = decodedMessage.concat(letter);
  //     return;
  //   }

  //   let decodedChar = letter;
  //   decodePackage.forEach((rotor) => {
  //     let decodeIndex = alphabet.indexOf(decodedChar);
  //     decodedChar = rotor[decodeIndex];
  //   });
  //   decodedMessage = decodedMessage.concat(decodedChar);
  // });

  return decodedMessage;;
}

function encode(message, settings) {
  return message;
}

export { decode, encode };
