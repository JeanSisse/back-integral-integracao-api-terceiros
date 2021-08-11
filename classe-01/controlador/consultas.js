const instanciaAxios = require('../servicos/abstract');
const fs = require('fs/promises');

const getInfoDaEmpresa = async (req, res) => {
    const dominio = req.params.dominioEmpresa;

    try {
        const consulta = await instanciaAxios.get(`?api_key=34a8499969c4401daf6a685935323c1d&domain=${dominio}`);
        
        if(consulta.data.name){
            const arrayEmpresas = JSON.parse(await fs.readFile("empresas.json"));
            console.log(arrayEmpresas);
            arrayEmpresas.push(consulta.data);
            await fs.writeFile("empresas.json", JSON.stringify(arrayEmpresas, null, 2));
        }
        return res.send(consulta.data);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

module.exports = {getInfoDaEmpresa};