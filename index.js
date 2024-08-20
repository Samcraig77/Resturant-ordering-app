import { menuArray } from "./data.js"

const menuArea = document.getElementById('menu')
const orderArea = document.getElementById('order-area')
const orderItems = document.getElementById('current-order')
const orderTotalArea = document.getElementById('order-total-area')
const confirmBtn = document.getElementById('complete-order-btn')
const paymentModalWrapper = document.getElementById('modal-wrapper')
const payBtn = document.getElementById('pay-btn')

let currentOrderArray = []

document.addEventListener('click', function(e){
    e.target.dataset.add ? getMenuItem(e.target.dataset.add) :
    e.target.dataset.remove ? currentOrderArray = removeItem(e.target.dataset.remove) :
    e.target === confirmBtn ? paymentModalWrapper.classList.remove('hidden') : 
    e.target === paymentModalWrapper ? paymentModalWrapper.classList.add('hidden') :
    e.target === payBtn ? thankYouDisplay() && SubmitEvent.preventDefault() : ''
     
    renderOrder()
    orderDisplayToggle()
    renderCheckoutArea()
})

function orderDisplayToggle() {
    currentOrderArray.length ? orderArea.classList.remove('hidden') :
    currentOrderArray.length === 0 ? orderArea.classList.add('hidden') : ''
}

function thankYouDisplay(){
    const customerName = document.getElementById('customer-name').value

    orderTotalArea.innerText = `Thanks for your order ${customerName}`
}

// Take order array and display it
function renderOrder(){
    orderItems.innerHTML = getOrder()
}

// Set the order elements 
function getOrder(){
    let order = ''

    currentOrderArray.forEach(item =>{
        order += `
        <li class="order-item">
            <h3 class="item-description">${item.selectedItem.name}</h3>
            <button class="remove-btn" data-remove="${item.uuid}">remove</button>
            <h3 class="item-price">$${item.selectedItem.price}</h3>
        </li>
        `
    })
    
    return order
}

// Create object of selected menu item with uuid
function addMenuItem(item){
    item.uuid = crypto.randomUUID()
    currentOrderArray.unshift(item)
}

// Add object from menu to order
function getMenuItem(itemId) {
    const selectedItem = menuArray[Number(itemId)]
    addMenuItem({selectedItem})
}


// Remove item from order 
function removeItem(itemUUID) {
    const updatedOrderArray = currentOrderArray.filter(item => {
    return item.uuid !== itemUUID}
   )

    return updatedOrderArray
}

// Get cash total
function getOrderTotal() {
   const total = currentOrderArray.reduce((total, menuItem) =>
    total + Number(menuItem.selectedItem.price), 0)
    const tax = .08
    return (total + (total * tax)).toFixed(2)
}

// Render order total
function renderCheckoutArea(){
    orderTotalArea.innerHTML = `
        <h2 class="order-total">Total Price + Tax:</h2>
        <h3 class="align-right">$${getOrderTotal()}</h3>
    `
}

// Retrieve menu
function getMenu() {
    let menu = ''
    menuArray.forEach(item => {
        menu += `
        <li class="menu-item" id="${item.name}">

            <div class="emoji-div"> ${item.emoji} </div>
                <div class="item-info">
                    <hgroup>
                        <h3 class="item-name"> ${item.name} </h3>
                        <p class="ingredients"> ${item.ingredients.join(', ')} </p>
                        <h3> $${item.price} + Tax</h3>
                    </hgroup>
                </div>

            <div class="btn-container">
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>
        </li>`
    })
    return menu
}

// Render menu items
function renderMenu() {
    menuArea.innerHTML = getMenu()
}

renderMenu()
