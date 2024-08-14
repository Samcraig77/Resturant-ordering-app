import { menuArray } from "./data.js"

const menuArea = document.getElementById('menu')
const orderArea = document.getElementById('order-area')
const orderItems = document.getElementById('current-order')

let currentOrderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
         getMenuItem(e.target.dataset.add)
            
    } else if (e.target.dataset.remove){
        currentOrderArray = removeItem(e.target.dataset.remove)
            }

    renderOrder()
    orderDisplayToggle()
})

function orderDisplayToggle() {
    currentOrderArray.length > 0 ? orderArea.classList.remove('hidden') :
    currentOrderArray.length === 0 ? orderArea.classList.add('hidden') : ''
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
            <h3>${item.selectedItem.name}</h3>
            <p class="remove-btn" data-remove="${item.uuid}">remove</p>
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
                        <h3> $${item.price} </h3>
                    </hgroup>
                </div>

            <div class="btn-container">
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>
        </li>
        `
    })
    return menu
}

// Render menu items
function renderMenu() {
    menuArea.innerHTML = getMenu()
}

renderMenu()