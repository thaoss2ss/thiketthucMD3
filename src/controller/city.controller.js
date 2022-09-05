const fs = require('fs')
const url = require('url')
const qs = require('qs')
const CityModel = require('../model/city.model')

class CityController{
    cityModel;
    constructor(){
        this.cityModel = new CityModel();
    }
    showCreateCity(req, res){
        fs.readFile('./views/createCity.html',"utf-8",function(err,data){
            if(err){
                console.log(err);
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    }

    createCity(req, res){
        let data ='';
        req.on('data',chunk => data += chunk);
        req.on('end',async () =>{
            let city = qs.parse(data);
            await this.cityModel.createNewCity(city);
            res.writeHead(301,{'Location':'/city'});
            res.end();
        })
    }
    async showCity(req, res){
        let city = await this.cityModel.getCity();
        fs.readFile('./views/list.html',"utf-8", function(err, data){
            if (err) {
                throw new Error(err.message);
            }
            let html = '';
            city.forEach((item, index) => {
                html += `<tr>`;
                html += `<td>${index+1}</td>`
                html += `<td><a href="/details?index=${item.id}" class=> ${item.nameCity}</a></td>`
                html += `<td>${item.nation}</td>`
                html += `<td><a href="/deleteCity?index=${item.id}" onclick="confirm('Are you sure you want to delete this city')" class="btn btn-danger">Xóa</a></td>`
                html += `<td><a href="/updateCity?index=${item.id}" class="btn btn-primary">Chỉnh sửa</a></td>`
                html += `</tr>`
            })
            data = data.replace('{list-city}',html)
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        })
    }

    editCity(req, res) {
        let index = qs.parse(url.parse(req.url).query).index;
        let data = '';
        req.on('data', chunk => data += chunk)
        req.on('end', async () => {
            let city = qs.parse(data)
                await this.cityModel.updateCity(city,index);
            res.writeHead(301,{'Location': '/city'});
            res.end();
        })
    }
    showFormUpdate(req, res) {
        fs.readFile('./views/updateCity.html',"utf-8",function(err, data){
            if(err) {
                console.log(err.message);
            }
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    async deleteCity(req, res){
        let index = qs.parse(url.parse(req.url).query).index;
        await this.cityModel.deleteCity(index);
        res.writeHead(301,{'Location': '/city'})
        res.end();
    }


    async showDetail(req, res) {
        let index = qs.parse(url.parse(req.url).query).index;
        let city = await this.cityModel.getCityDetail(index);

        fs.readFile('./views/details.html', 'utf8', function (err, datahtml) {
            if (err) {
                console.log(err);
            }
            datahtml = datahtml.replace('{nameCityMain}', city[0].nameCity);
            datahtml = datahtml.replace('{nameCity}', city[0].nameCity);
            datahtml = datahtml.replace('{nation}', city[0].nation);
            datahtml = datahtml.replace('{Area}', city[0].Area);
            datahtml = datahtml.replace('{Population}', city[0].Population);
            datahtml = datahtml.replace('{GDP}', city[0].GDP);
            datahtml = datahtml.replace('{Describes}', city[0].Describes);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(datahtml);
            return res.end();
        });
    }

}
module.exports = CityController;
