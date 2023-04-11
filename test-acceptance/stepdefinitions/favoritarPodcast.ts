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
        {
            "mattvie": [
              {
                "username": "mattvie",
                "podcast": "FED",
                "created_at": "2023-04-07T16:02:47.137Z"
              },
              {
                "username": "mattvie",
                "podcast": "US Debt",
                "created_at": "2023-04-07T17:21:56.600Z"
              }
            ],
            "ramonwanderley": [
              {
                "username": "ramonwanderley",
                "created_at": "2023-04-11T10:52:26.495Z",
                "podcast": "GIT e GITHUB"
              }
            ]
        }
        fs.writeFileSync(__dirname +'/../../server/samples/favorites.json', JSON.stringify(data) );
        
    });

    Given(/^eu estou logado como "([^\"]*)"$/, {timeout: 10000}, async(user) =>{
        await browser.get("http://localhost:3000/");
        let logged = await login(user);
    });

    Given(/^estou na página do podcast "([^\"]*)"$/, async(podcast) =>{
        await browser.get(`http://localhost:3000/podcast/${podcast}`);
    });

    Given(/^em favoritos tenho o podcast "([^\"]*)"$/, async(podcast) =>{
        var user = await userLogged();
        var data = await (await fetch(`http://localhost:4000/favorites/${user}`)).json();
        await expect(data.length).to.equal(1);
        await expect(data[0].name).to.equal(podcast);
    });

    Given(/^em favoritos tenho "([^\"]*)" podcasts$/, async(podcastCount) =>{
        var user = await userLogged();
        var data = await (await fetch(`http://localhost:4000/favorites/${user}`)).json();
        await expect(data.length).to.equal( Number(podcastCount));
    });

    Given(/^em favoritos tenho os podcasts "([^\"]*)", "([^\"]*)"$/, async(podcast1, podcast2) =>{
        var user = await userLogged();
        var data = await (await fetch(`http://localhost:4000/favorites/${user}`)).json();
        await expect(data.length).to.equal(2);
        await expect(data[0].name).to.equal(podcast1);
        await expect(data[1].name).to.equal(podcast2);
    });

    When(/^eu favoritar o podcast "([^\"]*)"$/,{timeout: 10000}, async(podcast) =>{
        await element(by.id("favorite-button")).click();   
    });

    When(/^eu navegar para página "([^\"]*)"$/,{timeout: 10000}, async(page) =>{
        await browser.get("http://localhost:3000/favorites");
    });

    Then(/^aparecerá um alerta "([^\"]*)"$/, async(alert) =>{
        var alertTitle = await element(by.cssContainingText('.chakra-alert__title', alert as string));
       await expect(alertTitle.isPresent()).to.eventually.equal(true); 
    });

    Then(/^aparecerá a mensagem "([^\"]*)".$/, async(message) =>{
        var messageHtml = await element(by.id("favorite-none"));
       await expect(messageHtml.isPresent()).to.eventually.equal(true); 
       await expect(messageHtml.getText()).to.eventually.equal(message); 
    });

    Then(/^salvará no sistema "([^\"]*)" nos favoritos de "([^\"]*)"$/, async(podcast, user) =>{
        var data = await (await fetch(`http://localhost:4000/favorites/${user}`)).json();
        await expect(data.length).to.equal(2);
        await expect(data[1].name).to.equal(podcast);
    });
   
    Then(/^apagará no sistema "([^\"]*)" nos favoritos de "([^\"]*)"$/, async(podcast, user) =>{
        var data = await (await fetch(`http://localhost:4000/favorites/${user}`)).json();
        await expect(data.length).to.equal(1);
        await expect(data[0].name).not.equal(podcast);
    });

    Then(/^aparecerá os podcasts "([^\"]*)", "([^\"]*)".$/, async(podcast1, podcast2) =>{
        var allPodcasts : ElementArrayFinder = element.all(by.id('favorite-option'));
        await allPodcasts.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));
    });

    Then(/^o simbolo de favorito aparecerá.$/, async() =>{
        await expect(element(by.id("star-on")).isPresent()).to.eventually.equal(true); 
    });

    Then(/^o simbolo de favorito desaparecerá.$/, async() =>{
        await expect(element(by.id("star-on")).isPresent()).to.eventually.equal(false); 
    });
}) 

