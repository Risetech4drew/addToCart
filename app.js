import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn-el")
const shoppingListEl = document.getElementById("shoppingList-el")

const appSettings = {
    databaseUrl: "https://realtime-database-6055a-default-rtdb.firebaseio.com/",
    projectId: "realtime-database-6055a"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database,"shoppingList")


addBtn.addEventListener("click", function(){
    let inputValue = inputEl.value

    push(shoppingListInDb,inputValue)
    
    inputEl.value = ""
    // appendShoppingListItems(inputValue)
    // console.log(inputValue)


})

//getting items from the database in realtime using onValue function

onValue(shoppingListInDb, function(snapshot){

    if(snapshot.exists()){
            let shoppingListArray = Object.entries(snapshot.val())
            clearShoppingListEl()
        
    
    
        for(let i = 0; i < shoppingListArray.length; i++) {

            let currentShoppingList = shoppingListArray[i]
            let currentItemID = currentShoppingList[0]
            let currentItemValue = currentShoppingList[1]

            // rendering shopping list items from database
            
    
            appendShoppingListItems(currentShoppingList)
            
        }

    } else{
        shoppingListEl.innerHTML = "No items here....yet"
    }

    
})

function appendShoppingListItems(item) {

    let itemID = item[0]
    let itemValue = item[1]

    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let li = document.createElement("li")
    li.textContent = itemValue
    shoppingListEl.append(li)

    li.addEventListener("click", function(){

        let exactItemInDb = ref(database,`shoppingList/${itemID}`)
        
        remove(exactItemInDb)
    })

}
//clearing  duplicate entries after update
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}