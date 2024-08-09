import { menuArray } from "./data.js"

const menuArea = document.getElementById('menu')
// const orderArea = document.getElementById('order-area')




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
                        <h3 class="item-price"> $${item.price} </h3>
                    </hgroup>
                </div>

            <div class="btn-container">
                <button class="add-btn" id="">+</button>
            </div>
        </li>
        `
    })
    return menu
}

function renderMenu() {
    menuArea.innerHTML = getMenu()
}

renderMenu()

// console.log(menuArray)