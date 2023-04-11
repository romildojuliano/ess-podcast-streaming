import { BeforeAll } from "@cucumber/cucumber"
import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const unfollow = async (user): Promise<string[]> => {
    const myUser = browser.executeScript('window.localStorage.setItem("user")');
    const { data } = await (
        await fetch(`http://localhost:4000/users/${myUser}/following?user_to_unfollow=${user}`, {
          method: 'DELETE'
        })
      ).json()
    return data;
}

const listFollow = async (user): Promise<string[]> => {
    const { data } = await (await fetch(`http://localhost:4000/getUser/${user}`)).json()
    return data.userData.following;
}

defineSupportCode( function({Given, When, Then}){

    Given(/^Eu estou na página do usuario "([^\"]*)"$/, async(user) =>{
        await browser.get(`http://localhost:3000/user/${user}`);
        await expect(browser.getTitle()).to.eventually.equal('Podshare');
    });

    Given(/^Eu estou logado com o usuario "([^\"]*)"$/, async(user) =>{
        browser.executeScript(`window.localStorage.setItem('user', '${user}')`)
        await expect(browser.executeScript('window.localStorage.setItem("user")')).to.eventually.equal(user);
    });

    Given(/^Eu nao sigo o usuario "([^\"]*)"$/, async(user) =>{
        const following = await unfollow(user)
        await expect(following).to.not.include(user)
    });

    Then(/^Eu devo ver a opção "([^\"]*)" para seguir o usuario$/, async(text) => {
        let button = element(by.xpath(`.//*[.="${text}" and class="followButton"]`));
        await expect(button).isPresent().toBe(true);
    });
    
    When(/^Eu escolho "([^\"]*)"$/, async(text) =>{
        let button = element(by.xpath(`.//*[.="${text}" and class="followButton"]`));
        await button.click();
    });
   
    Then(/^Eu deve continuar na pagina de "([^\"]*)"$/, async(user) => {
        await expect(browser.getCurrentUrl()).to.eventually.equal(`http://localhost:3000/user/${user}`)
    });

    Then(/^Eu devo ver a informação de que eu estou "([^\"]*)" o usuario"$/, async(text) => {
        let button = element(by.xpath(`.//*[.="${text}" and class="followButton"]`));
        await expect(button).isPresent().toBe(true);
    });
}) 

