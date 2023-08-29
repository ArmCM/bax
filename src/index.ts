import axios from "axios";

const url = 'https://challenge.bax-dev.com/challenge';

async function getChallengeToken() {
    return (await axios.get(`${url}/token`)).data.token;
}

async function getWords() {
    let index: number = 0;
    const words: string[] = [];
    const MAX_CONCURRENT_REQUESTS = 8;
    const token = await getChallengeToken();

    const start = performance.now();

    while (true) {
        console.log('numero de veces que se repite la peticion:::::', index);
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

            index++;

            const responses = await Promise.allSettled(requests);
            console.log('num respuestas', responses.length);
            for (const response of responses) {
                console.log('status:::::', response.status);
                if (response.status == 'fulfilled') {
                    words.push(response.value.data.word);
                }
            }
        } catch (error: any) {
            console.log('404 - sale del ciclo while::::::');
            console.log(error.response.status);
            console.log(error.response.status === 404);
            if (error.response.status === 404) {
                break;
            }
        }
    }

    const end = performance.now();

    const result = (end - start) / 1000;
    console.log(':::Tiempo de demora::::', result);
    console.log('unsorted words:::', words);

    return words;
}

async function sortAlphabeticalIgnoredTheFirstLetter() {
    const words: string[] = await getWords();

    const a = words.sort((a, b) => a.slice(1).localeCompare(b.slice(1)));
    console.log('sorted word:::', words);
    return a;
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
    console.log('join words:::', initialString);
    const sequenceLength = initialString.length;
    console.log('length:::', sequenceLength);
    const fibonacciSequence = [];

    for (let i = 0; ; i++) {
        const fibValue = fibonacciBinet(i);

        if (fibValue >= sequenceLength) {
            break;
        }

        fibonacciSequence.push(fibValue);
    }

    console.log('numeros Fib::::', fibonacciSequence
    )

    return fibonacciSequence.map(index => initialString[index]).join('');
}

async function sendContactInformation() {
    const accessKey = await createAccessKey();
    const token = await getChallengeToken();

    console.log(accessKey);
    console.log(token);

    const a = (await axios.post("https://challenge.bax-dev.com/challenge/apply", {
        name: "Armando Calderon Monreal",
        email: "acalderon.root@gmail.com",
        key: String(accessKey),
        source: "aW1wb3J0IGF4aW9zIGZyb20gImF4aW9zIjsKCmNvbnN0IHVybCA9ICdodHRwczovL2NoYWxsZW5nZS5iYXgtZGV2LmNvbS9jaGFsbGVuZ2UnOwoKYXN5bmMgZnVuY3Rpb24gZ2V0Q2hhbGxlbmdlVG9rZW4oKSB7CiAgICByZXR1cm4gKGF3YWl0IGF4aW9zLmdldChgJHt1cmx9L3Rva2VuYCkpLmRhdGEudG9rZW47Cn0KCmFzeW5jIGZ1bmN0aW9uIGdldFdvcmRzKCkgewogICAgbGV0IGluZGV4OiBudW1iZXIgPSAwOwogICAgY29uc3Qgd29yZHM6IHN0cmluZ1tdID0gW107CiAgICBjb25zdCBNQVhfQ09OQ1VSUkVOVF9SRVFVRVNUUyA9IDg7CiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldENoYWxsZW5nZVRva2VuKCk7CgogICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTsKCiAgICB3aGlsZSAodHJ1ZSkgewogICAgICAgIGNvbnNvbGUubG9nKCdudW1lcm8gZGUgdmVjZXMgcXVlIHNlIHJlcGl0ZSBsYSBwZXRpY2lvbjo6Ojo6JywgaW5kZXgpOwogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RzID0gW107CgogICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9DT05DVVJSRU5UX1JFUVVFU1RTOyBpKyspIHsKICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBheGlvcy5nZXQoYCR7dXJsfS93b3JkYCwgewogICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsKICAgICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsCiAgICAgICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgIH0pOwoKICAgICAgICAgICAgICAgIHJlcXVlc3RzLnB1c2gocmVxdWVzdCk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGluZGV4Kys7CgogICAgICAgICAgICBjb25zdCByZXNwb25zZXMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQocmVxdWVzdHMpOwogICAgICAgICAgICBjb25zb2xlLmxvZygnbnVtIHJlc3B1ZXN0YXMnLCByZXNwb25zZXMubGVuZ3RoKTsKICAgICAgICAgICAgZm9yIChjb25zdCByZXNwb25zZSBvZiByZXNwb25zZXMpIHsKICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGF0dXM6Ojo6OicsIHJlc3BvbnNlLnN0YXR1cyk7CiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09ICdmdWxmaWxsZWQnKSB7CiAgICAgICAgICAgICAgICAgICAgd29yZHMucHVzaChyZXNwb25zZS52YWx1ZS5kYXRhLndvcmQpOwogICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gJ3JlamVjdGVkJykgewogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkgewogICAgICAgICAgICBjb25zb2xlLmxvZygnNDA0IC0gc2FsZSBkZWwgY2ljbG8gd2hpbGU6Ojo6OjonKTsKICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBjb25zdCBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTsKCiAgICBjb25zdCByZXN1bHQgPSAoZW5kIC0gc3RhcnQpIC8gMTAwMDsKICAgIGNvbnNvbGUubG9nKCc6OjpUaWVtcG8gZGUgZGVtb3JhOjo6OicsIHJlc3VsdCk7CiAgICBjb25zb2xlLmxvZygndW5zb3J0ZWQgd29yZHM6OjonLCB3b3Jkcyk7CgogICAgcmV0dXJuIHdvcmRzOwp9Cgphc3luYyBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsSWdub3JlZFRoZUZpcnN0TGV0dGVyKCkgewogICAgY29uc3Qgd29yZHM6IHN0cmluZ1tdID0gYXdhaXQgZ2V0V29yZHMoKTsKCiAgICByZXR1cm4gd29yZHMuc29ydCgoYSwgYikgPT4gYS5zbGljZSgxKS5sb2NhbGVDb21wYXJlKGIuc2xpY2UoMSkpKTsKfQoKYXN5bmMgZnVuY3Rpb24gam9pbldvcmRzKCkgewogICAgcmV0dXJuIChhd2FpdCBzb3J0QWxwaGFiZXRpY2FsSWdub3JlZFRoZUZpcnN0TGV0dGVyKCkpLmpvaW4oJycpOwp9CgpmdW5jdGlvbiBmaWJvbmFjY2lCaW5ldChudW1iZXI6IG51bWJlcik6IG51bWJlciB7CiAgICBjb25zdCBwaGkgPSAoMSArIE1hdGguc3FydCg1KSkgLyAyOwogICAgY29uc3QgcHNpID0gKDEgLSBNYXRoLnNxcnQoNSkpIC8gMjsKCiAgICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5wb3cocGhpLCBudW1iZXIpIC0gTWF0aC5wb3cocHNpLCBudW1iZXIpKSAvIE1hdGguc3FydCg1KSk7Cn0KCmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUFjY2Vzc0tleSgpIHsKICAgIGNvbnN0IGluaXRpYWxTdHJpbmcgPSAoYXdhaXQgam9pbldvcmRzKCkpOwogICAgY29uc3Qgc2VxdWVuY2VMZW5ndGggPSBpbml0aWFsU3RyaW5nLmxlbmd0aDsKICAgIGNvbnN0IGZpYm9uYWNjaVNlcXVlbmNlID0gW107CgogICAgZm9yIChsZXQgaSA9IDA7IDsgaSsrKSB7CiAgICAgICAgY29uc3QgZmliVmFsdWUgPSBmaWJvbmFjY2lCaW5ldChpKTsKCiAgICAgICAgaWYgKGZpYlZhbHVlID49IHNlcXVlbmNlTGVuZ3RoKSB7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KCiAgICAgICAgZmlib25hY2NpU2VxdWVuY2UucHVzaChmaWJWYWx1ZSk7CiAgICB9CgogICAgcmV0dXJuIGZpYm9uYWNjaVNlcXVlbmNlLm1hcChpbmRleCA9PiBpbml0aWFsU3RyaW5nW2luZGV4XSkuam9pbignJyk7Cn0KCmFzeW5jIGZ1bmN0aW9uIHNlbmRDb250YWN0SW5mb3JtYXRpb24oKSB7CiAgICBjb25zdCBhY2Nlc3NLZXkgPSBhd2FpdCBjcmVhdGVBY2Nlc3NLZXkoKTsKICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0Q2hhbGxlbmdlVG9rZW4oKTsKCiAgICBjb25zb2xlLmxvZyhhY2Nlc3NLZXkpOwogICAgY29uc29sZS5sb2codG9rZW4pOwoKICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7CiAgICAgICAgIm5hbWUiOiAiQXJtYW5kbyBDYWxkZXJvbiBNb25yZWFsIiwKICAgICAgICAiZW1haWwiOiAiYWNhbGRlcm9uLnJvb3RAZ21haWwuY29tIiwKICAgICAgICAia2V5IjogU3RyaW5nKGFjY2Vzc0tleSksCiAgICAgICAgInNvdXJjZSI6ICIiLAogICAgfSk7CgogICAgY29uc3QgYSA9IChhd2FpdCBheGlvcy5wb3N0KCJodHRwczovL2NoYWxsZW5nZS5iYXgtZGV2LmNvbS9jaGFsbGVuZ2UvYXBwbHkiLCBib2R5LCB7CiAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwKICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICJhcHBsaWNhdGlvbi9qc29uIgogICAgICAgIH0sCiAgICB9KSkuZGF0YTsKICAgIGNvbnNvbGUubG9nKCdyZXNwdWVzdGE6Ojo6Ojo6JywgYSk7CiAgICByZXR1cm4gYTsKfQoKYXN5bmMgZnVuY3Rpb24gYXBwKCkgewogICAgdHJ5IHsKICAgICAgICBhd2FpdCBzZW5kQ29udGFjdEluZm9ybWF0aW9uKCk7CiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7CiAgICAgICAgY29uc3QgeyBtZXNzYWdlLCByZXNwb25zZSB9ID0gZXJyb3I7CgogICAgICAgIHJldHVybiB7IHJlc3BvbnNlLCBtZXNzYWdlIH07CiAgICB9Cn0KCmFwcCgpCiAgICAudGhlbihyZXNwb25zZSA9PiB7CiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpOwogICAgfSk7Cg==",
    }, {
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
    })).data;
    console.log('respuesta:::::::', a);
    return a;
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
