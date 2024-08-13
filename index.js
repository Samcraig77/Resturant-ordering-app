import { menuArray } from "./data.js"

const menuArea = document.getElementById('menu')
const orderArea = document.getElementById('current-order')

const currentOrderArray = []

document.addEventListener('click', function(e){
        if(e.target.dataset.add){
        addMenuItem(e.target.dataset.add)
        renderOrder()
        } else if (e.target.dataset.remove){
            removeItem(e.target.dataset.remove)
            renderOrder()
            
        }
        

    
})

// Take order array and display it
function renderOrder(){
    // orderArea.style.display('none')
    // getOrder() === '' ? document.getElementById('order-heading').style.display = 'block' : 'none'
    
    orderArea.innerHTML = getOrder()
}


// Add item from menu to order
function addMenuItem(itemId) {

    menuArray.filter(item => {
    return item.id === itemId})

    currentOrderArray.push(menuArray[Number(itemId)])
}

// Set the order elements 
function getOrder(){
    let order = ''
    currentOrderArray.forEach(item =>{
        order += `
        <li class="order-item">
        <h3>${item.name}</h3>
        <p data-remove="${item.id}">remove</p>
        <h3 class="item-price">$${item.price}</h3>
        </li>
        `
    })
    // console.log(order)
    return order
    
}

// Remove item from order 

function removeItem(itemId) {
   currentOrderArray.splice(currentOrderArray, 1)

    console.log(itemId)
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
// Render menu
function renderMenu() {
    menuArea.innerHTML = getMenu()
}

renderMenu()

// function handleLikeClick(tweetId){
    
//     const targetTweetObj = tweetsData.filter(function(tweet){
//         return tweet.uuid === tweetId
//     })[0]
//     targetTweetObj.likes++
//     console.log(tweetsData)