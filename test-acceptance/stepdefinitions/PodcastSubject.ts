import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor'; 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let assert = chai.assert;


const data = [{
    "subject": "Politics",
    "name": "Brazilian Elections",
    "link": "https://podshare.com/Politics/Brazilian-Elections",
    "author": "HACardoso",
    "createdAt": "2020-01-23T01:23:45.678-03:00",
    "image": "https://bestswimming.swimchannel.net/wp-content/uploads/2022/08/brazil-elections-2022-vector-brazilian-portuguese-concept-brazilian-politics-2022-polls_695181-26.jpg"
}]

async function postJSON(data) {
    try {
      const response = await fetch("https://localhost:4000/podcasts", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
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


        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/Politicsseemore")
    })

    
   
})