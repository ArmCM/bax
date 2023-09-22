import axios from "axios";

const url = 'https://challenge.bax-dev.com/challenge';

async function getChallengeToken() {
    return (await axios.get(`${url}/token`)).data.token;
}

async function getWords(token: string) {
    const words: string[] = [];
    let index = 0;

    while (true) {
        try {
            const response = await axios.get(`${url}/word`, {
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

    return words;
}

async function sortAlphabeticalIgnoredTheFirstLetter(token: string) {
    const words: string[] = await getWords(token);

    return words.sort((a, b) => a.slice(1).localeCompare(b.slice(1)));
}

async function joinWords(token: string) {
    return (await sortAlphabeticalIgnoredTheFirstLetter(token)).join('');
}

function fibonacciBinet(number: number): number {
    const phi = (1 + Math.sqrt(5)) / 2;
    const psi = (1 - Math.sqrt(5)) / 2;

    return Math.round((Math.pow(phi, number) - Math.pow(psi, number)) / Math.sqrt(5));
}

async function createAccessKey(token: string) {
    const initialString = (await joinWords(token));
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

async function sendContactInformation(token: string) {
    const accessKey = await createAccessKey(token);

    return (await axios.post("https://challenge.bax-dev.com/challenge/apply", {
        name: "Armando Calderon Monreal",
        email: "acalderon.root@gmail.com",
        key: String(accessKey),
        source: "",
    }, {
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
    })).data;
}

async function app() {
    try {
        const token: Promise<string> = await getChallengeToken();

        return await sendContactInformation(await token);
    } catch (error: any) {
        const { message, response } = error;

        return { response: response.data, message };
    }
}

app()
    .then(response => {
        console.info(response);
    });
