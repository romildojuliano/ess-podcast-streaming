import { defineSupportCode } from "cucumber";
import JSONDatabase from "../../server/JSONDatabase"
const fs = require('fs')
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode( function({Given, When, Then,}){
    Given(/^Estou na página "Home"$/, async() =>{
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Podshare');

    });

    Given(/^Os usuários "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07" estão cadastrados na plataforma$/, async() =>{
        const dbPath = "../server/samples/users.json";
        const data = [
            {
              "email": "rjvw@cin.ufpe.br",
              "username": "ramonwanderley",
              "password": "4f252ec9d503d1d2e574f607cb9e3092ba5ee713d3b21e8bc5a96178d4b508f2",
              "created_at": "2020-01-23T01:23:45.678-03:00",
              "followers": [],
              "following": [],
              "history": []
            },
            {
              "email": "rjal@cin.ufpe.br",
              "username": "romildojuliano",
              "password": "827f993c7f552c119c09f37de820eac9dde5dd682c462a06a879d65f59f9bbe7",
              "created_at": "2021-04-25T01:23:45.678-03:00",
              "followers": [],
              "following": []
            },
            {
              "email": "mvmf@cin.ufpe.br",
              "username": "mattvie",
              "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
              "created_at": "2021-05-05T01:23:45.678-03:00",
              "followers": [
                "joaovictorbelo"
              ],
              "following": [],
              "history": []
            },
            {
              "email": "lmm3@cin.ufpe.br",
              "username": "lmm3",
              "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
              "created_at": "2022-12-05T01:23:45.678-03:00",
              "followers": [
                "joaovictorbelo"
              ],
              "following": [],
              "history": []
            },
            {
              "email": "lmm4@cin.ufpe.br",
              "username": "lmm4",
              "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
              "created_at": "2022-12-05T01:23:45.678-03:00",
              "followers": [
                "joaovictorbelo"
              ],
              "following": [],
              "history": []
            },
            {
              "email": "jvblb@cin.ufpe.br",
              "username": "joaovictorbelo",
              "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
              "created_at": "2021-11-05T01:23:45.678-03:00",
              "followers": [],
              "following": [
                "lmm3",
                "mattvie"
              ],
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
          fs.writeFileSync(dbPath, JSON.stringify(data));
        })
        When(/^Eu insiro o valor "ramonwanderley" no campo "Pesquisar Usuários"$/, async() =>{

            await element(by.className('chakra-input')).sendKeys("ramonwanderley");  
            
        });

        When(/^Clico no botão "Pesquisar"$/, async() =>{

            await element(by.className('css-betff9')).click();  
            
        }); 

        Then(/^Um lista "Resultados da sua pesquisa" é mostrada$/, async() =>{

            await expect(element(by.className('css-d2zmnc'))) 
            
        }); 

        Then(/^Contém o valor "ramonwanderley"$/, async() =>{
           let elements = await browser.findElements(by.className("chakra-heading"))
           let results = []
           for(let element of elements){
            results.push(await element.getText())
           }
           expect(results).to.include("ramonwanderley")
        }); 

        When(/^Eu insiro o valor "Jacob" no campo "Pesquisar Usuários"$/, async() =>{
            await element(by.className('chakra-input')).sendKeys("Jacob");
        });

        Then(/^Uma mensagem "Nenhum Resultado Encontrado" é mostrada$/, async() =>{

            await expect(element(by.id('noResult'))) 
            
        }); 

        When(/^Eu insiro o valor "lmm" no campo "Pesquisar Usuários"$/, async() =>{
            await element(by.className('chakra-input')).sendKeys("lmm");
        });

        Then(/^Contém os valores "lmm3" e "lmm4"$/, async() =>{
            let elements = await element.all(by.className("chakra-heading css-18j379d"))
            let results = []
            let users = [
                "lmm3",
                "lmm4"
            ]
            for(let element of elements){
                results.push(await element.getText())
            }
            for(let user of users){
                expect(results).to.include(user)
            }
         }); 

        When(/^Eu insiro o valor "" no campo "Pesquisar Usuários"$/, async() =>{
            await element(by.className('chakra-input')).sendKeys("");
        });

        Then(/^Contém os valores "ramonwanderley", "romildojuliano", "mattvie", "lmm3", "lmm4", "joaovictorbelo", "HACardoso" e "LuanCavalcanti07"$/, async() =>{
            let elements = await browser.findElements(by.className("chakra-heading"))
            let results = []
            let users = [
                "ramonwanderley",
                "romildojuliano",
                "mattvie",
                "lmm3",
                "lmm4",
                "joaovictorbelo",
                "HACardoso",
                "LuanCavalcanti07"
            ]
            for(let element of elements){
             results.push(await element.getText())
            }
            for(let user of users){
                expect(results).to.include(user)
            }
         }); 


})