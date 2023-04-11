
const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

module.exports = function(app){

    app.get('/users/:username/history', (req, res) => {
        const username = req.params.username;
        const data = db.getAllMatchingNames([username])[0];

        //verifica se o histórico está vazio
        if(data.history.length == 0){
            const response = {
                status: data ? 200 : 404,
                message: 'Ainda não ouviu nenhum podcast'
            }
    
            res.json(response);
        }
        else{
            const response = {
                status: data ? 200 : 404,
                message: `Ouviu ${data.history.length} podcasts, são eles:`,
                data: data.history
            }
            res.json(response);
        }   
    })

    //filtro de podcasts ouvidos antes da data
    app.get('/users/:username/history/filter', (req, res) => {
        const username = req.params.username;
        const data = db.getAllMatchingNames([username])[0];

        //verifica se o histórico está vazio
        if(data.history.length == 0){
            const response = {
                status: data ? 200 : 404,
                message: 'Ainda não ouviu nenhum podcast'
            }
    
            res.json(response);
        }

        else{
            const filter = stringToTotalDays("2023-03-28");     //exemplo de data
            const finaldata = [];
            
            let j = 0;

            if (data.history == undefined)
                data.history = null

            else{
                for (let i = 0; i < data.history.length; i++) {
                    if (stringToTotalDays(data.history[i].date) < filter) {
                        finaldata[j] = data.history[i];
                        j++;
                    }
                }
            }

            const response = {
                status: finaldata ? 200 : 404,
                message: `Ouviu ${finaldata.length} podcasts, são eles`,
                data: finaldata
            };

            res.json(response);
        }
    })
}

function stringToTotalDays(dateString) {
    const date = new Date(dateString);
    const oneDay = 24 * 60 * 60 * 1000;     // milissegundos em um dia
    const totalDays = Math.floor((date) / oneDay);      // Arredonda a diferença de dias para baixo para desconsiderar frações de dia
  
    return totalDays;
  }
  