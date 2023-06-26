///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const symbols = ["⬛", "🍇", "🍏", "🟦", "🔑","❤️"];

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const LZ4 = require("lz4");
const Buffer = require("buffer").Buffer;

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.$";

function _compress(data) {
  const input = Buffer.from(data);
  const output = Buffer.alloc(LZ4.encodeBound(input.length));
  const compressedSize = LZ4.encodeBlock(input, output);
  const result = output.slice(0, compressedSize);
  return result;
}

function _base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function _decompress(compressedData, { dataSize }) {
  const uncompressed = Buffer.alloc(dataSize);
  const uncompressedSize = LZ4.decodeBlock(compressedData, uncompressed);
  return uncompressed.slice(0, uncompressedSize);
}

function _reshape(array, numRows, numCols) {
  const result = [];
  let count = 0;
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(array[count++]);
    }
    result.push(row);
  }
  return result;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function compressMap(arr2d) {
  const data = arr2d.flat().map((emoji) => symbols.indexOf(emoji));

  // data is a 1d array of numbers, with numbers between 0 and 7 (3 bits each)
  // will convert every adjacent pair (6 bit sequence) into a base64 char

  let result = "";
  for (let i = 0; i < data.length; i += 2) {
    const one = data[i];
    const two = data[i + 1];
    result += alphabet[(one << 3) + two];
  }

  // now let's compress our base64 result,
  // and represent the output as... base64 again.

  const compressed = btoa(String.fromCharCode(..._compress(result)));
  return `${arr2d.length}x${arr2d[0].length}|${compressed}`;
}

function unzipMap(mazeString) {
  const pipePdx = mazeString.indexOf("|");
  const [numRows, numCols] = mazeString.substring(0, pipePdx).split("x").map(Number);
  const gibberish = mazeString.substring(pipePdx + 1);

  const uint8Arr = _base64ToUint8Array(gibberish);
  const asciis = _decompress(uint8Arr, { dataSize: numRows * numCols / 2 });
  const second_b64 = [...asciis].map((ascii) => String.fromCharCode(ascii));

  const indices = second_b64.flatMap((letter) => {
    const bits = alphabet.indexOf(letter);
    return [bits >> 3, bits & 0b000111];
  });

  const flatEmojis = indices.map((idx) => symbols[idx]);

  return _reshape(flatEmojis, numRows, numCols);
}
