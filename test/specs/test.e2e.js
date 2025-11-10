import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Sauce Demo menu closing', () => {
        it ('Should close only when clicking on X button', async () => {
            await LoginPage.login();
            await InventoryPage.hamXTest1();
        })
})

describe('Sauce Demo menu overlay', () => {
        it ('Should be able of interacting with menu being displayed', async () => {
            await LoginPage.login();
            await InventoryPage.menuOverlayingTest2();
    })
})

describe ('Sauce Demo menu functionality', () => {
        it ('Each menu option is working as intended', async () => {
            await LoginPage.login();
            await InventoryPage.menuFeaturesTest3part1();
            await LoginPage.menuFeaturesTest3part2();
            await InventoryPage.menuFeaturesTest3part3();
    })
})

describe ('Sauce Demo add item to cart reflects in cart badge', () => {
        it ('Adding an item to the cart does reflect in the cart badge', async () => {
            await LoginPage.login();
            await InventoryPage.checkingBadgeNumberTest4();
        })
    })

describe ('Sauce Demo correct cart page redirection with correct item', () => {
        it ('Clicking on the cart button redirects to the cart page with the correct item added', async () => {
            await LoginPage.login();
            await InventoryPage.checkingCartItemTest5();
        })
    }
)
describe ('Sauce Demo cart page buttons functionality', () => {
        it ('Continue Shopping, Checkout, and previous buttons work as intended on the cart page', async () => {
            await LoginPage.login();
            await InventoryPage.checkingCartButtons6();
        })
    })
