const mysql = require('mysql');
const PORT = 8888;
const http = require('http');
const url = require("url");
const CityController = require("./src/controller/city.controller");

let cityController = new CityController();

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    switch (urlPath) {
        case '/city':
            cityController.showCity(req, res).catch((err) => {
                throw new Error(err.message);
            });
            break;
        case '/create':
            if (req.method === 'GET') {
                cityController.showCreateCity(req, res);
            } else {
                cityController.createCity(req, res)
            }
            break;
        case '/updateCity':
            if (req.method === 'GET') {
                cityController.showFormUpdate(req, res)
            } else {
                cityController.editCity(req, res)
            }
            break;
            case '/deleteCity':
                cityController.deleteCity(req, res).catch(function (err) {
                    throw new Error(err.message)
                })
            break;
                case '/details':
                    cityController.showDetail(req, res)
            break;
        default:
            res.end();
    }
})
server.listen(PORT, 'localhost', () => {
    console.log(`listening on http://localhost:${PORT}/city`);
})