import axios from "axios";

const url = 'https://challenge.bax-dev.com/challenge';

async function getChallengeToken() {
    return (await axios.get(`${url}/token`)).data.token;
}

async function getWords() {
    const words: string[] = [];
    const MAX_CONCURRENT_REQUESTS = 8;
    const token = await getChallengeToken();

    while (true) {
        try {
            const requests = [];

            for (let i = 0; i < MAX_CONCURRENT_REQUESTS; i++) {
                const request = await axios.get(`${url}/word`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                requests.push(request);
            }

            const responses = await Promise.allSettled(requests);

            for (const response of responses) {

                if (response.status == 'fulfilled') {
                    words.push(response.value.data.word);
                }
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                break;
            }
        }
    }

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

async function createAccessKey() {
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

async function sendContactInformation() {
    const accessKey = await createAccessKey();
    const token = await getChallengeToken();

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
        await sendContactInformation();
    } catch (error: any) {
        const { message, response } = error;

        return { response: response.data, message };
    }
}

app()
    .then(response => {
        console.log(response);
    });
