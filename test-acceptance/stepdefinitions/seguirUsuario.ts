import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
const fetch = require("node-fetch");

const unfollowAll = async (): Promise<string[]> => {
    const logged = await browser.executeScript('return window.localStorage.getItem("user")');
    const { data } = await (await fetch(`http://localhost:4000/users/${logged}/unfollow_all`, {method: 'DELETE'})).json();
    return data;
}

const follow = async (user) => {
    const logged = await browser.executeScript('return window.localStorage.getItem("user")');
    const { data } = await (await fetch(`http://localhost:4000/users/${logged}/following?user_to_follow=${user}`, {method: 'POST'})).json();
    return data;
}

const login = async (user): Promise<string> => {
    browser.executeScript(`window.localStorage.setItem('user', '${user}')`);
    let logged = '';
    while (!(logged)  || logged != user){
        logged = await browser.executeScript('return window.localStorage.getItem("user")');
    }
    return logged;
}

const logout = async (): Promise<string> => {
    browser.executeScript(`window.localStorage.removeItem('user')`);
    let logged = 'user';
    while ((logged)){
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
        await expect(unfollowAll()).to.eventually.not.include([user]);
    });

    Then(/^Eu devo ver a opção "([^\"]*)" para seguir o usuario$/, async(text: string) => {
        browser.wait(() => (element(by.id(text)).isPresent()), 30000)
    });
    
    When(/^Eu escolho "([^\"]*)"$/, async(text: string) =>{
        let button = element(by.id(text));
        await button.click();
    });
   
    Then(/^Eu devo continuar na pagina de "([^\"]*)"$/, async(user) => {
        await expect(browser.getCurrentUrl()).to.eventually.equal(`http://localhost:3000/user/${user}`)
    });

    Then(/^Eu devo ver a informação de que eu estou "([^\"]*)" o usuario$/, async(text: string) => {
        browser.wait(() => (element(by.id(text)).isPresent()), 30000)
    });

    Given(/^Eu sigo o usuario "([^\"]*)"$/, async(user) =>{
        await expect(follow(user)).to.eventually.include(user);
    });

    When(/Eu escolho parar de seguir$/, async() => {
        let button = element(by.id('SEGUINDO'));
        await button.click();
    });

    Then(/^Eu sou perguntado se tenho certeza que desejo parar de seguir o usuario$/, async() => {
        browser.wait(() => (element(by.id('confirmation')).isPresent()), 30000)
        browser.wait(() => (element(by.id('cancelUF')).isPresent()), 30000)
        browser.wait(() => (element(by.id('confirmUF')).isPresent()), 30000)
    });

    When(/^Eu escolho cancelar/, async() => {
        let button = element(by.id('cancelUF'));
        await button.click();
    })

    When(/^Eu escolho prosseguir/, async() => {
        let button = element(by.id('confirmUF'));
        await button.click();
    })

    Then(/^Eu não devo ver a opção "([^\"]*)"/, async(text: string) => {
        await expect(element(by.id(text)).isEnabled()).to.eventually.equal(false)
    })

    Given(/^Eu não estou logado na plataforma/, async() => {
        await expect(logout()).to.eventually.equal(null);
    })

    Given(/^Eu sigo apenas os usuarios "([^\"]*)" e "([^\"]*)"/, async(user1, user2) => {
        await unfollowAll();
        await expect(follow(user1)).to.eventually.include(user1);
        await expect(follow(user2)).to.eventually.include(user2);
    })

    Then(/^Eu devo ver a opção de ir para a pagina de "([^\"]*)"/, async(text) => {
        browser.wait(() => (($(`a[name='${text}']`)).isPresent()), 30000);
    })

    When(/^Eu escolho ir para a página de "([^\"]*)"/, async(text:string) => {
        let link = element(by.id(text));
        await link.click();
    })

    Then(/^Eu devo ser levado ate a pagina de usuarios seguidos/, async() => {
        await expect(browser.getCurrentUrl()).to.eventually.equal(`http://localhost:3000/following`)
    })

    Then(/^Eu devo ver listado os usuarios "([^\"]*)" e "([^\"]*)"/, async(user1, user2) => {
        let users = element.all(by.className('users'));
        await expect(users.count()).to.eventually.equal(2);
    })
}) 

