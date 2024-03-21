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
function getCurrentTemperature(weatherData) {
    return __awaiter(this, void 0, void 0, function () {
        var currentDate, currentHour, closestHour, closestTemperature, _i, _a, day, _b, _c, hour, hourOfDay;
        return __generator(this, function (_d) {
            currentDate = new Date();
            currentHour = currentDate.getHours();
            closestHour = null;
            closestTemperature = null;
            for (_i = 0, _a = weatherData.days; _i < _a.length; _i++) {
                day = _a[_i];
                for (_b = 0, _c = day.hours; _b < _c.length; _b++) {
                    hour = _c[_b];
                    hourOfDay = parseInt(hour.datetime.substr(0, 2));
                    // Verificamos si la hora del día está más cerca de la hora actual que la hora más cercana actualmente registrada
                    if (closestHour === null || Math.abs(hourOfDay - currentHour) < Math.abs(closestHour - currentHour)) {
                        closestHour = hourOfDay;
                        closestTemperature = hour.temp;
                    }
                }
            }
            return [2 /*return*/, closestTemperature]; // Retornamos la temperatura correspondiente a la hora más cercana
        });
    });
}
function displayWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var weatherDiv, weatherData, currentTemperature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weatherDiv = document.querySelector('.weather');
                    if (!(weatherDiv !== null)) return [3 /*break*/, 5];
                    return [4 /*yield*/, getWeatherData()];
                case 1:
                    weatherData = _a.sent();
                    if (!(weatherData && weatherData.days && weatherData.days.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getCurrentTemperature(weatherData)];
                case 2:
                    currentTemperature = _a.sent();
                    if (currentTemperature !== null) {
                        weatherDiv.textContent = "".concat(currentTemperature, "\u00B0C");
                    }
                    else {
                        weatherDiv.textContent = 'Temperature data not available for the current hour';
                    }
                    return [3 /*break*/, 4];
                case 3:
                    weatherDiv.textContent = 'Failed to fetch weather data';
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    console.error('Element with class "weather" not found');
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getWeatherData() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, cityName, url, response, weatherData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = 'KH9EVX2QDQVJJARZZAJGTHJZK';
                    cityName = 'Barcelona';
                    url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/".concat(cityName, "/today?unitGroup=metric&key=").concat(apiKey, "&contentType=json");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, window.fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error fetching data: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    weatherData = _a.sent();
                    return [2 /*return*/, weatherData];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
displayWeather();
