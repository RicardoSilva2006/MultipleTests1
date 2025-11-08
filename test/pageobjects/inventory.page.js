import { $, browser, expect } from '@wdio/globals'
import Page from './page.js';
import MenubtnPage from './menubtn.page.js';

const listOfProducts = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt', 'sauce-labs-fleece-jacket', 'sauce-labs-onesie', 'test\\.allthethings\\(\\)-t-shirt-\\(red\\)'];

class InventoryPage extends Page {

    openOrCloseMenu (menuToShowOrCrossToClose) { return $(`#react-burger-${menuToShowOrCrossToClose}-btn`) }
    cartElement (cartFeature) { return $(`.shopping_cart_${cartFeature}`) } 
    addItem (nameProductdashforspace) { return $(`#add-to-cart-${nameProductdashforspace}`) } 
    removeItem (nameAddedProductdashforspace) { return $(`#remove-${nameAddedProductdashforspace}`) } 
    get continueShoppingBtn () { return $('#continue-shopping') }
    get checkoutBtn () { return $('#checkout') }

    async hamXTest1() {
        await this.openOrCloseMenu('menu').click();
        await this.addItem('sauce-labs-backpack').click();
        await expect(this.openOrCloseMenu('cross')).toBeDisplayed();
        await this.openOrCloseMenu('cross').click();
        
    }
    async menuOverlayingTest2() {
        await this.openOrCloseMenu('menu').click()
        await expect(this.removeItem('sauce-labs-backpack')).toBeClickable ();
        await expect(this.cartElement('link')).toBeClickable ();
            }
    async checkingBadgeNumberTest4() {
        await expect(this.cartElement('badge')).not.toBeExisting
        const itemsToCheckBadge = listOfProducts.slice(0,4); //taking first 4 items from the list
        let expectedBadgeNumber = 0;
        for (const item of itemsToCheckBadge) {
            expectedBadgeNumber++;
            await this.addItem(item).click();
            await expect(this.cartElement('badge')).toHaveText(`${expectedBadgeNumber}`);
            console.log(`Adding ${item} to the cart, expecting badge number to be ${expectedBadgeNumber}`);
        }
        await this.openOrCloseMenu('menu').click();
        await MenubtnPage.buttonInsideMenu('reset').click();
                    }

    async checkingCartItemTest5() {
        await this.cartElement('link').click();
        await expect(this.removeItem('sauce-labs-backpack')).not.toBeExisting ();
        await expect(this.removeItem('sauce-labs-bike-light')).not.toBeExisting ();
        await browser.url('https://www.saucedemo.com/cart.html')
        await browser.back();
        for (const product of listOfProducts) {
            console.log(`testing if the ${product} can be added to the cart`);
        await this.addItem(product).click();
        await expect(this.cartElement('badge')).toHaveText('1');
        await this.cartElement('link').click();
        await expect(this.removeItem(product)).toBeDisplayed ();
        await browser.url('https://www.saucedemo.com/cart.html')
            console.log(`testing if the ${product} can be removed from the cart`);
        await this.removeItem(product).click();
        await expect(this.removeItem(product)).not.toBeDisplayed ();
        await expect(this.cartElement('badge')).not.toBeExisting();
        await browser.back();
            console.log('Now testing it with multiple items at the same time')
        const itemsToAdd = listOfProducts.slice(0,4); //taking first 4 items from the list
        for (const item of itemsToAdd) {
            await this.addItem(item).click(); }
        await expect(this.cartElement('badge')).toHaveText(`${itemsToAdd.length}`);
        await this.cartElement('link').click();
        for (const item of itemsToAdd) {
            await expect(this.removeItem(item)).toBeDisplayed ();
            await this.removeItem(item).click(); }
        await expect(this.cartElement('badge')).not.toBeExisting();
        await browser.back();
        await this.openOrCloseMenu('menu').click();
        await MenubtnPage.buttonInsideMenu('reset').click();
    }
}
    async checkingCartButtons6() {
        await this.addItem('sauce-labs-backpack').click();
        await this.cartElement('link').click();
        await browser.url('https://www.saucedemo.com/cart.html');
        await expect(this.cartElement('badge')).toHaveText('1');
        await expect(this)
        await this.openOrCloseMenu('menu').click();
        await this.openOrCloseMenu('cross').click();
        await this.continueShoppingBtn.click();
        await browser.url('https://www.saucedemo.com/inventory.html');
        await browser.back();
        await expect(this.removeItem('sauce-labs-backpack')).toBeDisplayed ();
        await this.checkoutBtn.click();
        await browser.url('https://www.saucedemo.com/checkout-step-one.html');
        await browser.back();
        await expect(this.removeItem('sauce-labs-backpack')).toBeDisplayed ();
        await this.removeItem('sauce-labs-backpack').click();
        await browser.refresh();
    }
}

export default new InventoryPage();