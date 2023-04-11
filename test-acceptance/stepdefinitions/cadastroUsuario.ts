import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

async function browserUpdate() {

    await browser.manage().window().maximize();
    await browser.manage().window().setSize(500, 500);
    await browser.manage().window().maximize();
}

// defineSupportCode(function ({ Given, When, Then }) {
//     Given();
// }