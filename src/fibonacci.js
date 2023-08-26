// function matrixMultiply(A, B) {
//     const result = [];
//     const rowsA = A.length;
//     const colsA = A[0].length;
//     const colsB = B[0].length;
//
//     for (let i = 0; i < rowsA; i++) {
//         result[i] = [];
//         for (let j = 0; j < colsB; j++) {
//             result[i][j] = 0;
//             for (let k = 0; k < colsA; k++) {
//                 result[i][j] += A[i][k] * B[k][j];
//             }
//         }
//     }
//
//     return result;
// }
//
// function matrixPower(matrix, exponent) {
//     let result = [[1, 0], [0, 1]]; // Identity matrix
//
//     while (exponent > 0) {
//         if (exponent % 2 === 1) {
//             result = matrixMultiply(result, matrix);
//         }
//         matrix = matrixMultiply(matrix, matrix);
//         exponent = Math.floor(exponent / 2);
//     }
//
//     return result;
// }
//
// function fibonacci(n) {
//     if (n <= 0) {
//         return 0;
//     }
//
//     const baseMatrix = [[1, 1], [1, 0]];
//     const resultMatrix = matrixPower(baseMatrix, n - 1);
//     return resultMatrix[0][0];
// }
//
// const n = 100;
// const fibValue = fibonacci(n);
// console.log(`El número ${n} de Fibonacci es: ${fibValue}`);
function fibonacciBinet(n) {
    var phi = (1 + Math.sqrt(5)) / 2;
    var psi = (1 - Math.sqrt(5)) / 2;
    return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
}
var n = 15;
var fibValue = fibonacciBinet(n);
console.log("El n\u00FAmero ".concat(n, " de Fibonacci es: ").concat(fibValue));
