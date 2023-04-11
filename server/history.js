
const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

module.exports = function(app){

    app.get('/users/:username/history', (req, res) => {
        const username = req.params.username;
        const data = db.getAllMatchingNames([username])[0];

        const response = {
            status: data ? 200 : 404,
            data: data ? data.history : null,
            message: data ? `Ouviu ${data.history.length} podcasts` : 'Ainda não ouviu nenhum podcast'
        }


        res.json(response);
    })

    app.get('/users/:username/history/filter', (req, res) => {
        const username = req.params.username;
        const data = db.getAllMatchingNames([username])[0];
        const filter = "2023-03-28";
        const datafinal = [];

        const date = new Date(filter);
        const oneDay = 24 * 60 * 60 * 1000; // milissegundos em um dia
        // Arredonda a diferença de dias para baixo para desconsiderar frações de dia
        const totalDaysFilter = Math.floor((date) / oneDay);

        let j = 0;

        for (let i = 0; i < data.history.length; i++) {
            const date2 = new Date(data.history[i].date);
            const totalDaysHistory = Math.floor((date2) / oneDay);
            if (totalDaysHistory < totalDaysFilter) {
                datafinal[j] = data.history[i];
                j++;
            }
        }



        const response = {
            status: datafinal ? 200 : 404,
            data: data ? datafinal : null,
            message: data != null ? `Ouviu ${datafinal.length} podcasts, são eles` : 'Não ouviu nenhum podcast antes desta data'
        };

        res.json(response);
    })

}

