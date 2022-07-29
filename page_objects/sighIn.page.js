class SighInPage {

    constructor(page) {
        this.page = page;

        this.sighInBtn = '[class="login"]'
        this.sighInUserName = '#username'
        this.sighinPassword = '#password'
        this.autoLoginCheckbox = '#autologin'
        this.vxodBtn = '[type="submit"]'
    }

    async sighIn(login, password) {
        await this.page.click(this.sighInBtn)
        await this.page.fill(this.sighInUserName,login)
        await this.page.fill(this.sighinPassword,password)
        await this.page.click(this.autoLoginCheckbox)
        await this.page.click(this.vxodBtn)
    }
}
module.exports = SighInPage;