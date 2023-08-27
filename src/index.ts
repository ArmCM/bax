import axios from "axios";

const url = 'https://challenge.bax-dev.com/challenge';

async function getChallengeToken() {
    return (await axios.get(`${url}/token`)).data.token;
}

async function getWords() {
    let index: number = 0;
    const token = await getChallengeToken();
    const words: string[] = [];

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

    return (await axios.post(`${url}/apply`, {
        name: "Armando Calderon Monreal",
        email: "acalderon.root@gmail.com",
        key: accessKey,
        source: 'aW1wb3J0IGF4aW9zIGZyb20gImF4aW9zIjsKCmNvbnN0IHVybCA9ICdodHRwczovL2NoYWxsZW5nZS5iYXgtZGV2LmNvbS9jaGFsbGVuZ2UnOwoKYXN5bmMgZnVuY3Rpb24gZ2V0Q2hhbGxlbmdlVG9rZW4oKSB7CiAgICByZXR1cm4gKGF3YWl0IGF4aW9zLmdldChgJHt1cmx9L3Rva2VuYCkpLmRhdGEudG9rZW47Cn0KCmFzeW5jIGZ1bmN0aW9uIGdldFdvcmRzKCkgewogICAgbGV0IGluZGV4OiBudW1iZXIgPSAwOwogICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRDaGFsbGVuZ2VUb2tlbigpOwogICAgY29uc3Qgd29yZHM6IHN0cmluZ1tdID0gW107CgogICAgd2hpbGUgKHRydWUpIHsKICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHt1cmx9L3dvcmRgLCB7CiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7CiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsCiAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICB9KTsKCiAgICAgICAgICAgIHdvcmRzLnB1c2gocmVzcG9uc2UuZGF0YS53b3JkKTsKCiAgICAgICAgICAgIGluZGV4Kys7CiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkgewogICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQoKICAgIHJldHVybiB3b3JkczsKfQoKYXN5bmMgZnVuY3Rpb24gc29ydEFscGhhYmV0aWNhbElnbm9yZWRUaGVGaXJzdExldHRlcigpIHsKICAgIGNvbnN0IHdvcmRzOiBzdHJpbmdbXSA9IGF3YWl0IGdldFdvcmRzKCk7CgogICAgcmV0dXJuIHdvcmRzLnNvcnQoKGEsIGIpID0+IGEuc2xpY2UoMSkubG9jYWxlQ29tcGFyZShiLnNsaWNlKDEpKSk7Cn0KCmFzeW5jIGZ1bmN0aW9uIGpvaW5Xb3JkcygpIHsKICAgIHJldHVybiAoYXdhaXQgc29ydEFscGhhYmV0aWNhbElnbm9yZWRUaGVGaXJzdExldHRlcigpKS5qb2luKCcnKTsKfQoKZnVuY3Rpb24gZmlib25hY2NpQmluZXQobnVtYmVyOiBudW1iZXIpOiBudW1iZXIgewogICAgY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjsKICAgIGNvbnN0IHBzaSA9ICgxIC0gTWF0aC5zcXJ0KDUpKSAvIDI7CgogICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgucG93KHBoaSwgbnVtYmVyKSAtIE1hdGgucG93KHBzaSwgbnVtYmVyKSkgLyBNYXRoLnNxcnQoNSkpOwp9Cgphc3luYyBmdW5jdGlvbiBjcmVhdGVBY2Nlc3NLZXkoKSB7CiAgICBjb25zdCBpbml0aWFsU3RyaW5nID0gKGF3YWl0IGpvaW5Xb3JkcygpKTsKCiAgICBjb25zdCBzZXF1ZW5jZUxlbmd0aCA9IGluaXRpYWxTdHJpbmcubGVuZ3RoOwoKICAgIGNvbnN0IGZpYm9uYWNjaVNlcXVlbmNlID0gW107CgogICAgZm9yIChsZXQgaSA9IDA7IDsgaSsrKSB7CiAgICAgICAgY29uc3QgZmliVmFsdWUgPSBmaWJvbmFjY2lCaW5ldChpKTsKCiAgICAgICAgaWYgKGZpYlZhbHVlID49IHNlcXVlbmNlTGVuZ3RoKSB7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KCiAgICAgICAgZmlib25hY2NpU2VxdWVuY2UucHVzaChmaWJWYWx1ZSk7CiAgICB9CgogICAgcmV0dXJuIGZpYm9uYWNjaVNlcXVlbmNlLm1hcChpbmRleCA9PiBpbml0aWFsU3RyaW5nW2luZGV4XSkuam9pbignJyk7Cn0KCmFzeW5jIGZ1bmN0aW9uIHNlbmRDb250YWN0SW5mb3JtYXRpb24oKSB7CiAgICBjb25zdCBhY2Nlc3NLZXkgPSBhd2FpdCBjcmVhdGVBY2Nlc3NLZXkoKTsKCiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldENoYWxsZW5nZVRva2VuKCk7CgogICAgcmV0dXJuIChhd2FpdCBheGlvcy5wb3N0KGAke3VybH0vYXBwbHlgLCB7CiAgICAgICAgbmFtZTogIkFybWFuZG8gQ2FsZGVyb24gTW9ucmVhbCIsCiAgICAgICAgZW1haWw6ICJhY2FsZGVyb24ucm9vdEBnbWFpbC5jb20iLAogICAgICAgIGtleTogYWNjZXNzS2V5LAogICAgICAgIHNvdXJjZTogJycsCiAgICB9LCB7CiAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCwKICAgICAgICB9LAogICAgfSkpLmRhdGE7Cn0KCmFzeW5jIGZ1bmN0aW9uIGFwcCgpIHsKICAgIHRyeSB7CiAgICAgICAgYXdhaXQgc2VuZENvbnRhY3RJbmZvcm1hdGlvbigpOwogICAgfSBjYXRjaCAoZXJyb3I6IGFueSkgewogICAgICAgIGNvbnN0IHsgbWVzc2FnZSwgcmVzcG9uc2UgfSA9IGVycm9yOwoKICAgICAgICByZXR1cm4geyByZXNwb25zZTogbWVzc2FnZSwgbWVzc2FnZTogcmVzcG9uc2UuZGF0YS5lcnJvciB9OwogICAgfQp9CgphcHAoKQogICAgLnRoZW4ocmVzcG9uc2UgPT4gewogICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTsKICAgIH0pOwo=',
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).data;
}

async function app() {
    try {
        await sendContactInformation();
    } catch (error: any) {
        const { message, response } = error;

        return { response: message, message: response.data.error };
    }
}

app()
    .then(response => {
        console.log(response);
    });
