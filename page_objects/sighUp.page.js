const { expect } = require('@playwright/test');
class SighUpPage {

    constructor(page) {
        this.page = page;

        this.sighUpBtn = '[class="register"]'
        this.userLogin = '#user_login'
        this.userPassword = '#user_password'
        this.userRepeatPassword = '#user_password_confirmation'
        this.userName = '#user_firstname'
        this.userLastName = '#user_lastname'
        this.userEmail = '#user_mail'
        this.submitBtn ='[type="submit"]'
    }

    async registrationEmptyEmail(login, password, repeatPassword, name, lastname) {
        await this.page.click(this.sighUpBtn)
        await this.page.fill(this.userLogin,login)
        await this.page.fill(this.userPassword,password)
        await this.page.fill(this.userRepeatPassword,repeatPassword)
        await this.page.fill(this.userName,name)
        await this.page.fill(this.userLastName,lastname)
        await this.page.click(this.submitBtn)

    }

    async registrationValidData(login, password, repeatPassword, name, lastname, email) {
        await this.page.click(this.sighUpBtn)
        await expect(this.page).toHaveURL(/.*register/);
        await this.page.fill(this.userLogin,login)
        await this.page.fill(this.userPassword,password)
        await this.page.fill(this.userRepeatPassword,repeatPassword)
        await this.page.fill(this.userName,name)
        await this.page.fill(this.userLastName,lastname)
        await this.page.fill(this.userEmail, email)
        await this.page.click(this.submitBtn)

    }

    randomValue = makeName()

}


function makeName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
module.exports = SighUpPage;