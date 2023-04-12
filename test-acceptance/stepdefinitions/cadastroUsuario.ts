import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

async function browserUpdate() {

    await browser.manage().window().maximize();
    await browser.manage().window().setSize(500, 500);
    await browser.manage().window().maximize();
}


defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the "LoginPage"$/, async() => {        
        await browser.get("http://localhost:3000/login");
    });

    // Given('I am at the {LoginPage}', async (LoginPage) => {
    //     // Write code here that turns the phrase above into concrete actions
    //     await browser.executeScript("window.localStorage.setItem('user', '')");
    //     await browser.get("http://localhost:3000/login");
    //   });

    When(/^I click at the "Register button$/, async() => {
        await browser.get("http://localhost:3000/register");
    });

    Then(/^the page updates to the "Register Page"$/, async() => {
        await expect(browser.getCurrentUrl()).to.eventually.equal("Podshare")
    })

    When(/^I fill the username field with "user01" that is not contained at the system $/, async() => {
        await element(by.id("field-:r0:")).sendKeys("user01")
    })




})