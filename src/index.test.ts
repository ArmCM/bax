function sortAlphabeticalIgnoredTheFirstLetter() {
    const words = ['lacrimator', 'wbfting', 'hfggardly', 'cckedma'];

    return words.sort((a, b) => a.slice(1).localeCompare(b.slice(1)));
}

const actual = JSON.stringify(sortAlphabeticalIgnoredTheFirstLetter());
const expected = JSON.stringify(['lacrimator', 'wbfting', 'cckedma', 'hfggardly']);

//console.log(actual, expected);
if (expected == actual) {
    console.log('son iguales.', actual);
} else {
    console.log('no son iguales.');
}

function joinWords() {
    return (sortAlphabeticalIgnoredTheFirstLetter()).join('');
}

const sortedActual = joinWords();
const sortedExpect = 'lacrimatorwbftingcckedmahfggardly';
if (sortedActual) {
    console.log('son iguales', sortedActual);
} else {
    console.log('son diferentes');
}

function fibonacciBinet(num) {
    const phi = (1 + Math.sqrt(5)) / 2;
    const psi = (1 - Math.sqrt(5)) / 2;

    return Math.round((Math.pow(phi, num) - Math.pow(psi, num)) / Math.sqrt(5));
}

function createAccessKey() {
    const initialString = 'lacrimator';
    const sequenceLength = initialString.length;
    console.log('longitud sequence:', sequenceLength);
    const fibonacciSequence = [];

    for (let i = 0; ; i++) {
        const fibValue = fibonacciBinet(i);
        console.log('i:::', i, ':::fbValue:::', fibValue);
        if (fibValue >= sequenceLength) {
            break;
        }

        fibonacciSequence.push(fibValue); // 0, 1,
    }

    console.log(fibonacciSequence);

    return fibonacciSequence.map(index => initialString[index]).join('');
}

createAccessKey();
