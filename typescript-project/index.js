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
var reportJokes = [];
function fetchJokeFromChuckNorris() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://api.chucknorris.io/jokes/random')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.value];
            }
        });
    });
}
function fetchJokeFromDadJokes() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://icanhazdadjoke.com/', {
                        headers: {
                            'Accept': 'application/json'
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.joke];
            }
        });
    });
}
function fetchRandomJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var random;
        return __generator(this, function (_a) {
            random = Math.random();
            if (random < 0.5) {
                return [2 /*return*/, fetchJokeFromChuckNorris()];
            }
            else {
                return [2 /*return*/, fetchJokeFromDadJokes()];
            }
            return [2 /*return*/];
        });
    });
}
function displayJoke(joke) {
    console.log("Joke: ", joke);
    var jokeElement = document.getElementById('joke');
    if (jokeElement) {
        jokeElement.textContent = joke;
    }
    else {
        console.error('Element with id "joke" not found.');
    }
}
function addJokeToReport(joke, score) {
    var date = new Date().toISOString();
    var jokeReport = {
        joke: joke,
        score: score,
        date: date
    };
    reportJokes.push(jokeReport);
    console.log('Updated joke report:');
    console.log(reportJokes);
}
function setupNextJokeButton() {
    var _this = this;
    var nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var joke, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchRandomJoke()];
                    case 1:
                        joke = _a.sent();
                        displayJoke(joke);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching joke:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        console.error('Element with id "nextButton" not found.');
    }
}
function setupScoreButtons() {
    var scoreButtons = document.querySelectorAll('.score-button');
    scoreButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var _a;
            var score = parseInt(button.getAttribute('data-score') || '0');
            var currentJoke = ((_a = document.getElementById('joke')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
            var existingReport = reportJokes.find(function (report) { return report.joke === currentJoke; });
            if (!existingReport) {
                addJokeToReport(currentJoke, score);
            }
            else {
                existingReport.score = score;
                console.log('Updated joke score:');
                console.log(existingReport);
            }
        });
    });
}
function init() {
    setupNextJokeButton();
    setupScoreButtons();
    fetchRandomJoke().then(function (joke) {
        displayJoke(joke);
    }).catch(function (error) {
        console.error('Error fetching joke:', error);
    });
}
// Iniciar la aplicación
init();
