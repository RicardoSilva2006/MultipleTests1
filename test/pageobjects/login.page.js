import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {
    get inputUsername () {return $('#user-name');}
    get inputPassword () {return $('#password');}
    get btnSubmit () {return $('#login-button');}
    

    async login() {
        const credentials = {username: 'standard_user', password:'secret_sauce'}
        await super.open('');
        await this.inputUsername.setValue(credentials.username);
        await this.inputPassword.setValue(credentials.password);
        await this.btnSubmit.click();
        await expect(super.appLogo).toBeExisting ();
    }
    async menuFeaturesTest3part2() {;
        await expect(super.buttonInsideMenu('about')).toHaveHref('https://saucelabs.com/');
        await super.buttonInsideMenu('logout').click
        await this.login('standard_user', 'secret_sauce');
        await expect(super.appLogo).toBeExisting ();
}
}

export default new LoginPage();
