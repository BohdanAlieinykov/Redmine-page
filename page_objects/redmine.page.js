const { expect } = require('@playwright/test');

class RedminePage {

    constructor(page) {
        this.page = page;

        this.multipleProjectsBtn = '[href="/projects/redmine/wiki/RedmineProjects"]'
        this.overwievBtn = '[class="overview"]'
        this.viewAllTasksBtn = '[href="/projects/redmine/issues?set_filter=1"]'
    }

    async pathToTableofIssues() {
        await this.page.click(this.overwievBtn)
        await expect(this.page).toHaveURL(/.*projects/);
        await this.page.click(this.viewAllTasksBtn)
        await expect(this.page).toHaveURL('https://www.redmine.org/projects/redmine/issues?set_filter=1')
    }

    async multipleProjectsBtnClick() {
        await this.page.click(this.multipleProjectsBtn);
    }
}
module.exports = RedminePage;