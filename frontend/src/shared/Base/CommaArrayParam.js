import {
    encodeDelimitedArray,
    decodeDelimitedArray
} from 'use-query-params';
  
/** Uses a comma to delimit entries. e.g. ['a', 'b'] => qp?=a,b */
const CommaArrayParam = {
    encode: (array) =>
        encodeDelimitedArray(array, ','),

    decode: (arrayStr) =>
        decodeDelimitedArray(arrayStr, ',')
};

export default CommaArrayParam