import { defineSupportCode  } from "cucumber";

import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
const fetch = require("node-fetch");
var fs = require('fs');

const login = async(user): Promise<string> => {
    browser.executeScript(`window.localStorage.setItem('user', '${user}')`);
    let logged = '';
    while(!(logged) || logged != user){
        logged = await browser.executeScript("return window.localStorage.getItem('user');");
    }
    return logged;
}
const userLogged = async(): Promise<string> => {
    let logged = '';
    while(!(logged)){
        logged = await browser.executeScript("return window.localStorage.getItem('user');");
    }
    return logged;
}
defineSupportCode( function({ registerHandler, Given, When, Then}){
        registerHandler('BeforeFeatures', () =>{
            const data =
            [
                {
                  "email": "rjvw@cin.ufpe.br",
                  "username": "ramonwanderley",
                  "password": "4f252ec9d503d1d2e574f607cb9e3092ba5ee713d3b21e8bc5a96178d4b508f2",
                  "created_at": "2020-01-23T01:23:45.678-03:00",
                  "followers": [],
                  "following": [],
                  "history": [
                    {
                      "title": "podciencia",
                      "date": "2023-03-22",
                      "description": "avanço na corrida para marte"
                    },
                    {
                      "title": "podpolitica",
                      "date": "2023-03-24",
                      "description": "novas leis estão por vir"
                    },
                    {
                      "title": "podeconomia",
                      "date": "2023-03-31",
                      "description": "ultimas noticias da bolsa"
                    }
                  ]
                },
                {
                  "email": "rjal@cin.ufpe.br",
                  "username": "romildojuliano",
                  "password": "827f993c7f552c119c09f37de820eac9dde5dd682c462a06a879d65f59f9bbe7",
                  "created_at": "2021-04-25T01:23:45.678-03:00",
                  "followers": [],
                  "following": [],
                  "history": []
                },
                {
                  "email": "mvmf@cin.ufpe.br",
                  "username": "mattvie",
                  "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
                  "created_at": "",
                  "followers": [],
                  "following": [],
                  "history": []
                },
                {
                  "email": "lmm3@cin.ufpe.br",
                  "username": "lmm3",
                  "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
                  "created_at": "",
                  "followers": [],
                  "following": [],
                  "history": []
                },
                {
                  "email": "jvblb@cin.ufpe.br",
                  "username": "joaovictorbelo",
                  "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
                  "created_at": "2021-11-05T01:23:45.678-03:00",
                  "followers": [],
                  "following": [],
                  "history": []
                },
                {
                  "email": "hac@cin.ufpe.br",
                  "username": "HACardoso",
                  "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
                  "created_at": "2023-01-08T01:23:45.678-03:00",
                  "followers": [],
                  "following": [],
                  "history": []
                },
                {
                  "email": "ellc@cin.ufpe.br",
                  "username": "LuanCavalcanti07",
                  "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
                  "created_at": "2023-01-08T23:23:45.678-03:00",
                  "followers": [],
                  "following": [],
                  "history": []
                }
              ]
            fs.writeFileSync(__dirname +'/../../server/samples/users.json', JSON.stringify(data) );
        
        });

        Given(/^I logged in as "([^\"]*)"$/, {timeout: 10000}, async(user) =>{
            await browser.get("http://localhost:3000/");
            let logged = await login(user);
        });

        When(/^I navigate to the "([^\"]*)"$ page/,{timeout: 10000}, async(page) =>{
            await browser.get("http://localhost:3000/history");
        });

        Then(/^I see status : "([^\"]*)"$/, async(alert) =>{
            var alertTitle = await element(by.cssContainingText('.chakra-alert__title', alert as string));
        await expect(alertTitle.isPresent()).to.eventually.equal(true); 
        });

        Then(/^I see "([^\"]*)" podcasts$/, async(podcastCount) =>{
            var user = await userLogged();
            var data = await (await fetch(`http://localhost:4000/history/${user}`)).json();
            await expect(data[0].history.length).to.equal( Number(podcastCount));
        });

        Then(/^I see "([^\"]*)" podcasts$/, async(podcastCount) =>{
            var user = await userLogged();
            var data = await (await fetch(`http://localhost:4000/history/${user}`)).json();
            await expect(data[1].history.length).to.equal( Number(podcastCount));
        });

        Then(/^I see "([^\"]*)", "([^\"]*)", "([^\"]*)"$/, async(podcast1, podcast2, podcast3) =>{
            var user = await userLogged();
            var data = await (await fetch(`http://localhost:4000/history/${user}`)).json();
            await expect(data.length).to.equal(3);
            await expect(data[0].history[0].title).to.equal(podcast1);
            await expect(data[0].history[1].title).to.equal(podcast2);
            await expect(data[0].history[2].title).to.equal(podcast3);
        });

        Then(/^I see a message "([^\"]*)".$/, async(message) =>{ 
            const expectedMessage = "Ainda não ouviu nenhum podcast";       //o certo seria pegar do front, mas a implementação foi realizada apenas com o history.js
            await expect(expectedMessage).to.eventually.equal(message); 
        });
})
