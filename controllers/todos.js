const Todo = require('../models/Todo') // import todo model

module.exports = { // export controllers
    getTodos: async (req,res)=>{ // get all todos
        console.log(req.user) // log user
        try{
            const todoItems = await Todo.find({userId:req.user.id}) // find all todos
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) // count all incomplete todos
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user}) // render todos.ejs
        }catch(err){ // catch errors
            console.log(err) // log errors
        }
    },
    createTodo: async (req, res)=>{ // create todo
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id}) // create todo
            console.log('Todo has been added!') // log success
            res.redirect('/todos') // redirect to todos
        }catch(err){ // catch errors
            console.log(err) // log errors
        }
    },
    markComplete: async (req, res)=>{ // mark todo as complete
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ // find todo and update
                completed: true
            })
            console.log('Marked Complete') // log success
            res.json('Marked Complete') // send response
        }catch(err){ // catch errors
            console.log(err) // log errors
        }
    },
    markIncomplete: async (req, res)=>{ // mark todo as incomplete
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ // find todo and update
                completed: false
            })
            console.log('Marked Incomplete') // log success
            res.json('Marked Incomplete') // send response
        }catch(err){ // catch errors
            console.log(err) // log errors
        }
    },
    deleteTodo: async (req, res)=>{ // delete todo
        console.log(req.body.todoIdFromJSFile) // log todo id
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile}) // find todo and delete
            console.log('Deleted Todo') // log success
            res.json('Deleted It')  // send response
        }catch(err){ // catch errors
            console.log(err) // log errors
        }
    }
}    