import { BeforeAll } from "@cucumber/cucumber";
import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;



defineSupportCode( function({Given, When, Then}){

    Given(/^I am at the "Home" menu of the "Podshare"$/, async() =>{
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Podshare');


    });

    When(/^I click at the "Explore" button$/, async() =>{

        await element(by.className('Explore')).click();
        
        
    });

    Then(/^I get redirected to the "Explore" menu$/, async() => {
        
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/explore");

    });

    Then(/^The podcasts are displayed by topic$/, async() =>{

        var allTopics : ElementArrayFinder = element.all(by.className('css-wb6fz'));
        await allTopics.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));

        
    });

    Then(/^A button "see all" is displayed at each topic$/, async() =>{

        var allButtons : ElementArrayFinder = element.all(by.className("chakra-link css-c6nly4"));
        await allButtons.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));

    })

    Given(/^I am at the "Podcasts" menu$/, async() =>{

        await browser.get("http://localhost:3000/explore");
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/explore");
    });

    When(/^I select the "see all" button of the "Politics" type podcasts$/, async() => {

        await element(by.className("chakra-link Politics css-c6nly4")).click();

    });

    Then(/^I am redirectet to the "Politics" podcasts menu$/, async()=>{

        await browser.get("http://localhost:3000/Politicsseemore");
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/Politicsseemore")
    })

    Given(/^I am a podcaster loged in the system$/, async() =>{

        var allPodcasts : ElementArrayFinder = element.all(by.id('HEADING'));

        await allPodcasts.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));

    });

    When(/^I upload the podcast "Brazilian Elections" whit the tag of subject "Politics"$/, async()=>{

        //Temporary for replacement of a post method
        await browser.get("http://localhost:3000/Politicsseemore2");

    });

    Then(/^The podcast "Brazilian Elections" is propperly inserted at the list of podcasts with subject "Politics"$/, async()=>{
        
        var allPodcasts : ElementArrayFinder = element.all(by.className('chakra-heading css-1dklj6k'));

        await allPodcasts.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(2));

    })
   
}) 

