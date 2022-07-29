const { test, expect } = require('@playwright/test');
const RedminePage = require('../page_objects/redmine.page.js');
const SighInPage = require('../page_objects/sighIn.page.js');
const SighUpPage = require('../page_objects/sighUp.page.js');


test.describe('Redmine page', () => {

    let redminePage = null;
    let sighUpPage = null;
    let sighInPage = null;

    beforeAll( async ()=>{
        redminePage = new RedminePage(page)
        sighUpPage = new SighUpPage(page)
        sighInPage = new SighInPage(page)
    })
    test('Url contain RedmineProjects && Managing projects is displayed', async ({ page }) => {
        await page.goto('https://www.redmine.org/');    
        await redminePage.multipleProjectsBtnClick()
        await expect(page).toHaveURL(/.*RedmineProjects/);
        const managingProjectsNavigator = page.locator('[class="toc right"]')
        await expect(managingProjectsNavigator).toContainText('Managing projects', 'Projects list', 'Deleting a project');
    })

    test('User can find list of issues by click on [Обзор] > [Просмотреть все задачи]', async ({ page }) => {
        await page.goto('https://www.redmine.org/');
        await redminePage.pathToTableofIssues()
        const tableOfIssues = page.locator('[class="list issues"]');
        await expect(tableOfIssues).toBeVisible()
    })

    test('User can sigh up with valid credentials', async ({ page }) => {
        await page.goto('https://www.redmine.org/');
        await sighUpPage.registrationValidData(
            sighUpPage.randomValue, 
            sighUpPage.randomValue, 
            sighUpPage.randomValue, 
            sighUpPage.randomValue, 
            sighUpPage.randomValue,
            sighUpPage.randomValue+'@mail.com')
        const accountCreatedMsg = page.locator('[class="flash notice"]')
        await expect(accountCreatedMsg).toBeVisible()
    })

    test('User can\'t sigh up with empty email, error message appears', async ({ page }) => {
        await page.goto('https://www.redmine.org/');
        await sighUpPage.registrationEmptyEmail(
        'Gerasimysenko1555ss',
        'GerasimGerasim221',
        'GerasimGerasim221',
        'Griwa',
        'Britva')
        await expect(page).toHaveURL(/.*register/);
        const errorMsg = page.locator('#errorExplanation')
        const emailErrorMsg = page.locator('div #errorExplanation ul li')
        await expect(errorMsg).toBeVisible()
        await expect(emailErrorMsg).toContainText('Email')
    })

    test('User can\'t sigh in with valid credentials without confirmed email', async ({ page }) => {
        await page.goto('https://www.redmine.org/');
        await sighInPage.sighIn('Gerasim1', 'GerasimGerasim221')
        const sighInErrorMsg = page.locator('#flash_error')
        await expect(sighInErrorMsg).toBeVisible()
    })
});
//npm run allure-report
//npm run test:reporter