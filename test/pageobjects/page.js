import { $, browser } from '@wdio/globals'

export default class Page {
    open (path) { return browser.url(`https://www.saucedemo.com/${path}`) }
    openOrCloseMenu (menuToShowOrCrossToClose) { return $(`#react-burger-${menuToShowOrCrossToClose}-btn`) }
    cartElement (cartFeature) { return $(`.shopping_cart_${cartFeature}`) } 
    addItem (nameProductdashforspace) { return $(`#add-to-cart-${nameProductdashforspace}`) } 
    removeItem (nameAddedProductdashforspace) { return $(`#remove-${nameAddedProductdashforspace}`) } 
    get continueShoppingBtn () { return $('#continue-shopping') }
    get checkoutBtn () { return $('#checkout') }
    buttonInsideMenu(feature) {return $(`#${feature}_sidebar_link`)}
    get appLogo () {return $('.app_logo');}
}
    