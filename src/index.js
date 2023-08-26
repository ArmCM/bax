"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var baseUrl = 'https://challenge.bax-dev.com';
function getChallengeToken() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(baseUrl, "/challenge/token"))];
                case 1: return [2 /*return*/, (_a.sent()).data.token];
            }
        });
    });
}
function getWords() {
    return __awaiter(this, void 0, void 0, function () {
        var index, token, words, start, timeLimitInSeconds, startTime, response, error_1, end, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    return [4 /*yield*/, getChallengeToken()];
                case 1:
                    token = _a.sent();
                    words = [];
                    start = performance.now();
                    timeLimitInSeconds = 10000 / 1000;
                    startTime = Date.now();
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 7];
                    if (Date.now() - startTime >= timeLimitInSeconds) {
                        console.log('Tiempo límite alcanzado.');
                        return [3 /*break*/, 7];
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, axios_1.default.get("".concat(baseUrl, "/challenge/word"), {
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                        })];
                case 4:
                    response = _a.sent();
                    words.push(response.data.word);
                    index++;
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    if (error_1.response.status === 404) {
                        return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 2];
                case 7:
                    end = performance.now();
                    result = (end - start) / 1000;
                    console.log(':::Tiempo de demora::::', result);
                    return [2 /*return*/, words];
            }
        });
    });
}
function sortAlphabeticalIgnoredTheFirstLetter() {
    return __awaiter(this, void 0, void 0, function () {
        var words;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWords()];
                case 1:
                    words = _a.sent();
                    return [2 /*return*/, words.sort(function (a, b) { return a.slice(1).localeCompare(b.slice(1)); })];
            }
        });
    });
}
function joinWords() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sortAlphabeticalIgnoredTheFirstLetter()];
                case 1: return [2 /*return*/, (_a.sent()).join('')];
            }
        });
    });
}
function fibonacciBinet(number) {
    var phi = (1 + Math.sqrt(5)) / 2;
    var psi = (1 - Math.sqrt(5)) / 2;
    return Math.round((Math.pow(phi, number) - Math.pow(psi, number)) / Math.sqrt(5));
}
function getFibonacciNumbers() {
    return __awaiter(this, void 0, void 0, function () {
        var initialString, sequenceLength, fibonacciSequence, i, fibValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, joinWords()];
                case 1:
                    initialString = (_a.sent());
                    sequenceLength = initialString.length;
                    fibonacciSequence = [];
                    for (i = 0;; i++) {
                        fibValue = fibonacciBinet(i);
                        if (fibValue >= sequenceLength) {
                            break;
                        }
                        fibonacciSequence.push(fibValue);
                    }
                    return [2 /*return*/, fibonacciSequence.map(function (index) { return initialString[index]; }).join('')];
            }
        });
    });
}
getFibonacciNumbers()
    .then(function (result) {
    console.log(result);
}).catch(function (error) {
    console.log(error);
});
