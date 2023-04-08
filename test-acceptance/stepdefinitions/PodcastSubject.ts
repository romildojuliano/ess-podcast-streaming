import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = chai.assert;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

defineSupportCode( function({Given, When, Then}){

    Given(/^I am at the "Home" menu of the "Podshare"$/, async() =>{

        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Podshare');


    });

    When(/^I click at the "Explore" button$/, async() =>{

        await element(by.className('Explore')).click();
        
        
    });

    Then(/^I get redirected to the "Explore" menu$/, async() => {
        
        await browser.get("http://localhost:3000/explore");
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/explore");
    });

    Then(/^The podcasts are displayed by topic$/, async() =>{

        await browser.get("http://localhost:3000/explore");
        var allTopics : ElementArrayFinder = element.all(by.className('css-wb6fz'));

        await allTopics.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));
        
    });

    Then(/^A button "see all" is displayed at each topic$/, async() =>{

        await browser.get("http://localhost:3000/explore");
        var allButtons : ElementArrayFinder = element.all(by.className("chakra-link css-c6nly4"));

        await allButtons.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));

    })
   
})