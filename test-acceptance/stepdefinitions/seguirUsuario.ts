import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

const listFollow = async (user): Promise<string[]> => {
    const { data } = JSON.parse(await request(`http://localhost:4000/getUser/${user}`))
    return data.userData.following;
}

const login = async (user): Promise<string> => {
    browser.executeScript(`window.localStorage.setItem('user', '${user}')`);
    let logged = '';
    while (!(logged)){
        logged = await browser.executeScript('return window.localStorage.getItem("user")');
    }
    return logged;
}

defineSupportCode( function({Given, When, Then}){

    Given(/^Eu estou na página do usuario "([^\"]*)"$/, async(user) =>{
        await browser.get(`http://localhost:3000/user/${user}`);
        await expect(browser.getTitle()).to.eventually.equal('Podshare');
    });

    Given(/^Eu estou logado com o usuario "([^\"]*)"$/, async(user) =>{
        await expect(login(user)).to.eventually.equal(user);
    });

    Given(/^Eu nao sigo o usuario "([^\"]*)"$/, async(user) =>{
        await expect(listFollow(user)).to.not.include([user])
    });

    Then(/^Eu devo ver a opção "([^\"]*)" para seguir o usuario$/, async(text) => {
        let button = element(by.id('followButton'));
        await expect(button.getText()).to.eventually.equal(text);
    });
    
    When(/^Eu escolho "([^\"]*)"$/, async(text) =>{
        let button = element(by.id('followButton'));
        await button.click();
    });
   
    Then(/^Eu deve continuar na pagina de "([^\"]*)"$/, async(user) => {
        await expect(browser.getCurrentUrl()).to.eventually.equal(`http://localhost:3000/user/${user}`)
    });

    Then(/^Eu devo ver a informação de que eu estou "([^\"]*)" o usuario"$/, async(text) => {
        let button = element(by.id('followButton'));
        await expect(button.getText()).to.eventully.equal(text);
    });
}) 

