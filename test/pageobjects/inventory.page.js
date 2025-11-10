import {browser, expect } from '@wdio/globals'
import Page from './page.js';

const listOfProducts = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt', 'sauce-labs-fleece-jacket', 'sauce-labs-onesie', 'test\\.allthethings\\(\\)-t-shirt-\\(red\\)'];

class InventoryPage extends Page {

    async hamXTest1() {
        await super.openOrCloseMenu('menu').click();
        await super.addItem('sauce-labs-backpack').click();
        await expect(super.openOrCloseMenu('cross')).toBeDisplayed();
        await super.openOrCloseMenu('cross').click();
        
    }
    async menuOverlayingTest2() {
        await super.openOrCloseMenu('menu').click()
        await expect(super.removeItem('sauce-labs-backpack')).toBeClickable ();
        await expect(super.cartElement('link')).toBeClickable ();
    }
    async menuFeaturesTest3part1() {;
        await super.openOrCloseMenu('menu').click();
        await super.buttonInsideMenu('inventory').click();
        await expect(super.appLogo).toBeExisting();
    }
    async menuFeaturesTest3part3() {;
        await super.openOrCloseMenu('menu').click();
                await super.buttonInsideMenu('reset').click();
                await expect(super.removeItem('sauce-labs-backpack')).toBeExisting ();;
                await expect(super.cartElement('badge')).not.toBeExisting();
                await browser.refresh();
                await expect(super.removeItem('sauce-labs-backpack')).not.toBeExisting ();
                await expect(super.cartElement('badge')).not.toBeExisting();
    }
    async checkingBadgeNumberTest4() {
        const itemsToCheckBadge = listOfProducts.slice(0,4); //taking first 4 items from the list
        let expectedBadgeNumber = 0;
        for (const item of itemsToCheckBadge) {
            expectedBadgeNumber++;
            await super.addItem(item).click();
            await expect(super.cartElement('badge')).toHaveText(`${expectedBadgeNumber}`);
            console.log(`Adding ${item} to the cart, expecting badge number to be ${expectedBadgeNumber}`);
        }
        await super.openOrCloseMenu('menu').click();
        await super.buttonInsideMenu('reset').click();
    }
    async checkingCartItemTest5() {
        await super.cartElement('link').click();
        await expect(super.removeItem('sauce-labs-backpack')).not.toBeExisting ();
        await expect(super.removeItem('sauce-labs-bike-light')).not.toBeExisting ();
        await browser.url('https://www.saucedemo.com/cart.html')
        await browser.back();
        for (const product of listOfProducts) {
            console.log(`testing if the ${product} can be added to the cart`);
        await super.addItem(product).click();
        await expect(super.cartElement('badge')).toHaveText('1');
        await super.cartElement('link').click();
        await expect(super.removeItem(product)).toBeDisplayed ();
        await browser.url('https://www.saucedemo.com/cart.html')
            console.log(`testing if the ${product} can be removed from the cart`);
        await super.removeItem(product).click();
        await expect(super.removeItem(product)).not.toBeDisplayed ();
        await expect(super.cartElement('badge')).not.toBeExisting();
        await browser.back();
            console.log('Now testing it with multiple items at the same time')
        const itemsToAdd = listOfProducts.slice(0,4); //taking first 4 items from the list
        for (const item of itemsToAdd) {
            await super.addItem(item).click(); }
        await expect(super.cartElement('badge')).toHaveText(`${itemsToAdd.length}`);
        await super.cartElement('link').click();
        for (const item of itemsToAdd) {
            await expect(super.removeItem(item)).toBeDisplayed ();
            await super.removeItem(item).click(); }
        await expect(super.cartElement('badge')).not.toBeExisting();
        await browser.back();
        await super.openOrCloseMenu('menu').click();
        await super.buttonInsideMenu('reset').click();
    }
}
    async checkingCartButtons6() {
        await super.addItem('sauce-labs-backpack').click();
        await super.cartElement('link').click();
        await browser.url('https://www.saucedemo.com/cart.html');
        await expect(super.cartElement('badge')).toHaveText('1');
        await super.openOrCloseMenu('menu').click();
        await super.openOrCloseMenu('cross').click();
        await super.continueShoppingBtn.click();
        await browser.url('https://www.saucedemo.com/inventory.html');
        await browser.back();
        await expect(super.removeItem('sauce-labs-backpack')).toBeDisplayed ();
        await super.checkoutBtn.click();
        await browser.url('https://www.saucedemo.com/checkout-step-one.html');
        await browser.back();
        await expect(super.removeItem('sauce-labs-backpack')).toBeDisplayed ();
        await super.removeItem('sauce-labs-backpack').click();
    }
}

export default new InventoryPage();