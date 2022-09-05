const  DBConnect = require("./DBConnect")


class CityModel{
    conn;
    constructor() {
        let db = new DBConnect();
        this.conn = db.connect();
    }
    querySQL(sql) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, result) => {
                if(err) {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    }
    async getCity(){
        const sql = `SELECT * from city`;
        return await this.querySQL(sql);
    }
    async createNewCity(data){
        const sql = `INSERT INTO city (citymd3.city.nameCity,citymd3.city.nation,citymd3.city.Area,citymd3.city.Population,citymd3.city.GDP,citymd3.city.Describes) VALUES ('${data.newNameCity}', '${data.newNation}', '${data.newArea}', '${data.newPopulation}', '${data.newGDP}', '${data.newDescribes}');`
        return await this.querySQL(sql);

    }
    async deleteCity(index) {
        const sql = `delete from city where id = '${index}'`;
        return await this.querySQL(sql);
    }
    async updateCity(data, index) {
        const sql = `UPDATE city
                     SET nameCity = '${data.nameCityUpdate}',nation = '${data.nationCityUpdate}',Area = '${data.AreaCityUpdate}', Population = '${data.PopulationCityUpdate}',GDP = '${data.GDPCityUpdate}',Describes='${data.DescribesCityUpdate}'
                     WHERE id = '${index}';`
        return await this.querySQL(sql);
    }

    async getCityDetail(index) {
        const sql = `select nameCity,nation,Area,Population,GDP,Describes
                     from city where id = '${index}' `;
        return await this.querySQL(sql);
    }
}
module.exports = CityModel;

