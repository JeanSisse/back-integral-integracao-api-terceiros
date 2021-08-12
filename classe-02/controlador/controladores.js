const instanciaAxios = require('../servicos/ipgeolocation');
const fs = require('fs/promises');

async function salvarVotos(ip, voto){

    const arrayVotos = JSON.parse(await fs.readFile("votos.json"));
    arrayVotos.push({
        "ip": ip,
        "voto": voto
    });
        
    await fs.writeFile("votos.json", JSON.stringify(arrayVotos, null, 2));
}

const buscaLocalizacao = async function (req, res) {
    const {pais, ip} = req.params;
    const voto = req.body.voto;

    try {    
        const response = await instanciaAxios.get(`?api_key=58cafbe4558f425d8e8c731e3b26fbe0&ip_address=${ip}`);
        const {country} = response.data;

        if(country !== pais){
            return res.status(400).json({
                "mensagem": "IP enviado não coincide com o país da votação."
            });
        }

        salvarVotos(ip, voto);

        return res.send({"mensagem": "Voto enviado com sucesso."});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "mensagem": "IP enviado não é valido."
        });
    }

}

module.exports = {buscaLocalizacao};

// 166.171.248.255
// 200.45.187.22
// 45.4.40.171