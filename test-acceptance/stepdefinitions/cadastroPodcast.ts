import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

async function browserUpdate() {

    await browser.manage().window().maximize();
    await browser.manage().window().setSize(500, 500);
    await browser.manage().window().maximize();
}

defineSupportCode(function ({ Given, When, Then, }) {

    Given(/^I am at the "Channel management" page$/, async () => {
        await browser.get("http://localhost:3000/channel/mattvie");
        await expect(browser.getTitle()).to.eventually.equal('Podshare');
    });

    When(/^I select the Upload option on the menu$/, async () => {
        await element(by.className('UPLOAD')).click();
    });

    When(/^I write the name of the file "Podcast 99"$/, async () => {
        var input = element(by.className('forms-name'));
        input.sendKeys('Podshare New Podcast');
        await expect(input.getAttribute('value')).toBe('Podshare New Podcast');
    });

    When(/^I select the subject "Politics"$/, async () => {
        await element(by.className("forms-politics")).click();
    });

    When(/^I write the link to "Podcast 99"$/, async () => {
        var input = element(by.className('forms-link'));
        input.sendKeys('podshare.link/new-podcast');
        await expect(input.getAttribute('value')).toBe('podshare.link/new-podcast');
    });

    When(/^I click the Submit button$/, async () => {
        await element(by.className('submit')).click();
    });

    Then(/^I can see a confirmation message$/, async () => {
        var EC = ExpectedConditions;
        // Waits for an alert pops up.
        await browser.wait(EC.alertIsPresent(), 5000);
    });

    Then(/^I'm still at the "Channel management" page$/, async () => {
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/channel/mattvie");
    });

    Then(/^I can see "Podcast 99" file in the list of existing podcasts$/, async () => {
        await browserUpdate();
        var allPodcasts: ElementArrayFinder = element.all(by.id('podcast-name'));
        await allPodcasts.then(elems => expect(Promise.resolve(elems)).to.eventually.equal("Podshare New Podcast"));
    });

    //2o cenario
    Given(/^I am at the "Channel management" page again$/, async () => {
        await browser.get("http://localhost:3000/channel/mattvie");
        await expect(browser.getTitle()).to.eventually.equal('Podshare');
    });

    When(/^I select the Upload option on the menu$/, async () => {
        await element(by.className('UPLOAD')).click();
    });

    When(/^I write the name of the file "Podcast 99"$/, async () => {
        var input = element(by.className('forms-name'));
        input.sendKeys('Podshare New Podcast');
        await expect(input.getAttribute('value')).toBe('Podshare New Podcast');
    });

    When(/^I select the subject "Politics"$/, async () => {
        await element(by.className("forms-politics")).click();
    });

    When(/^I write the link to "Podcast 99"$/, async () => {
        var input = element(by.className('forms-link'));
        input.sendKeys('podshare.link/new-podcast');
        await expect(input.getAttribute('value')).toBe('podshare.link/new-podcast');
    });

    When(/^I click the Submit button$/, async () => {
        await element(by.className('submit')).click();
    });

    Then(/^I can see an error message$/, async () => {
        var EC = ExpectedConditions;
        // Waits for an alert pops up.
        await browser.wait(EC.alertIsPresent(), 5000);
    });

    Then(/^I'm still at the "Channel management" page$/, async () => {
        await expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:3000/channel/mattvie");
    });


})