import axios from "axios";

const baseUrl = 'https://challenge.bax-dev.com';

async function getChallengeToken()
{
    return (await axios.get(`${baseUrl}/challenge/token`)).data.token;
}

async function getWords() {
    let index: number = 0;
    const token = await getChallengeToken();
    const words: string[] = [];
    const start = performance.now();
    const timeLimitInSeconds = 10000/1000;
    const startTime = Date.now();

    while (true) {
        if (Date.now() - startTime >= timeLimitInSeconds) {
            console.log('Tiempo límite alcanzado.');
            break;
        }

        try {
            const response = await axios.get(`${baseUrl}/challenge/word`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            words.push(response.data.word);

            index++;
        } catch (error: any) {
            if (error.response.status === 404) {
                break;
            }
        }
    }

    const end = performance.now();

    const result = (end - start) / 1000;
    console.log(':::Tiempo de demora::::', result);

    return words;
}

async function sortAlphabeticalIgnoredTheFirstLetter() {
    const words: string[] = await getWords();

    return words.sort((a, b) => a.slice(1).localeCompare(b.slice(1)));
}

async function joinWords() {
    return (await sortAlphabeticalIgnoredTheFirstLetter()).join('');
}

function fibonacciBinet(number: number): number {
    const phi = (1 + Math.sqrt(5)) / 2;
    const psi = (1 - Math.sqrt(5)) / 2;

    return Math.round((Math.pow(phi, number) - Math.pow(psi, number)) / Math.sqrt(5));
}

async function getFibonacciNumbers() {
    const initialString = (await joinWords());
    const sequenceLength = initialString.length;
    const fibonacciSequence = [];

    for (let i = 0; ; i++) {
        const fibValue = fibonacciBinet(i);

        if (fibValue >= sequenceLength) {
            break;
        }

        fibonacciSequence.push(fibValue);
    }

    return fibonacciSequence.map(index => initialString[index]).join('');
}

getFibonacciNumbers()
    .then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error);
    });
