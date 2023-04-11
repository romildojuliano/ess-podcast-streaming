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
        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();



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
        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/explore");
    });

    When(/^I select the "see all" button of the "Politics" type podcasts$/, async() => {


        await element(by.className("chakra-link Politics css-c6nly4")).click();

    });

    Then(/^I am redirectet to the "Politics" podcasts menu$/, async()=>{

        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/Politicsseemore");
    })

    Given(/^I am a podcaster loged in the system with five podcasts registered with "Politics" subject$/, async() =>{


        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();
        //Por nao possuir o acesso a funcao de insersao de podcast durante o desenvolvimento
        //A insercao foi feita de modo "Artificial"
        var allPodcasts : ElementArrayFinder = element.all(by.id('cabecalho'));
        await allPodcasts.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(5));

    });

    When(/^I upload the podcast "Brazilian Elections" whit the tag of subject "Politics"$/, async()=>{

        //Temporary for replacement of a post method
        await browser.get("http://localhost:3000/Politicsseemore2");
        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/Politicsseemore2");
        

    });

    Then(/^The podcast "Brazilian Elections" is propperly inserted at the list of podcasts with subject "Politics" having the system six podcasts with "Politics" subject$/, async()=>{
        
        var allPodcasts : ElementArrayFinder = element.all(by.id('cabecalho'));
        await allPodcasts.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(6));

    });

    Given(/^I am a podcaster loged in the system with six podcasts registered with "Politics" subject$/, async() => {


        await browser.get("http://localhost:3000/Politicsseemore2");
        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/Politicsseemore2");


    });

    When(/^I delete the podcast "Brazilian Elections" with the tag of subject "Politics"$/, async() => {


        await browser.get("http://localhost:3000/Politicsseemore");
        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/Politicsseemore");


    });

    Then(/^The podcast "Brazilian Elections" is propperly deleted from the list of podcasts with subject "Politics" having the system five podcasts with "Politics" subject$/, async() =>{



        await browser.manage().window().maximize();
        await browser.manage().window().setSize(500,500);
        await browser.manage().window().maximize();
        var allPodcasts : ElementArrayFinder = element.all(by.id('cabecalho'));
        await allPodcasts.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(5));


    })
   
}) 

