const deleteBtn = document.querySelectorAll('.del') //select all the delete buttons
const todoItem = document.querySelectorAll('span.not') //select all the todo items
const todoComplete = document.querySelectorAll('span.completed') //select all the completed todo items

Array.from(deleteBtn).forEach((el)=>{ //loop through all the delete buttons
    el.addEventListener('click', deleteTodo) //add event listener to each delete button
})

Array.from(todoItem).forEach((el)=>{ //loop through all the todo items
    el.addEventListener('click', markComplete) //add event listener to each todo item
})

Array.from(todoComplete).forEach((el)=>{ //loop through all the completed todo items
    el.addEventListener('click', markIncomplete) //add event listener to each completed todo item
})

async function deleteTodo(){ //create deleteTodo function
    const todoId = this.parentNode.dataset.id //get the todo id
    try{
        const response = await fetch('todos/deleteTodo', { //fetch the deleteTodo route
            method: 'delete', //set method to delete
            headers: {'Content-type': 'application/json'}, //set headers
            body: JSON.stringify({ //set body
                'todoIdFromJSFile': todoId //set todoIdFromJSFile to todoId
            })
        })
        const data = await response.json() //get response data
        console.log(data) //log response data
        location.reload() //reload page
    }catch(err){ //catch errors
        console.log(err) //log errors
    }
}

async function markComplete(){ //create markComplete function
    const todoId = this.parentNode.dataset.id //get the todo id
    try{ 
        const response = await fetch('todos/markComplete', { //fetch the markComplete route
            method: 'put', //set method to put
            headers: {'Content-type': 'application/json'}, //set headers
            body: JSON.stringify({ //set body
                'todoIdFromJSFile': todoId //set todoIdFromJSFile to todoId
            })
        })
        const data = await response.json() //get response data
        console.log(data) //log response data
        location.reload() //reload page
    }catch(err){ //catch errors
        console.log(err) //log errors
    }
}

async function markIncomplete(){ //create markIncomplete function
    const todoId = this.parentNode.dataset.id //get the todo id
    try{
        const response = await fetch('todos/markIncomplete', { //fetch the markIncomplete route
            method: 'put', //set method to put
            headers: {'Content-type': 'application/json'}, //set headers
            body: JSON.stringify({ //set body
                'todoIdFromJSFile': todoId //set todoIdFromJSFile to todoId
            })
        })
        const data = await response.json() //get response data
        console.log(data) //log response data
        location.reload() //reload page
    }catch(err){ //catch errors
        console.log(err) //log errors
    }
}