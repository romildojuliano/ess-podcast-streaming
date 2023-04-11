import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then, }) {

    Given(/^I am at the "Channel management" page$/, async () => {
        await browser.get("http://localhost:3000/channel/mattvie");
        await expect(browser.getTitle()).to.eventually.equal('Podshare');
    });

})