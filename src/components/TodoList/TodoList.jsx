import React, { useEffect, useRef, useState } from 'react'
import './TodoList.css'
export default function TodoList({ todo, setTodo }) {
    let firstTime = true;
    let firstTimeRef = useRef(firstTime)
    let [editWindowState, setEditWindowState] = useState(false)
    function getLocalStorageList(){
        setTodo(JSON.parse(localStorage.getItem('taskList')))
    }
    
    function setLocalStorageList(){
        localStorage.setItem('taskList', JSON.stringify(todo))
    }
    
    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id !== id);
        setTodo(newTodo);
    }
    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status;
            }
            return item;
            
        });
        setTodo(newTodo);

    }

    window.addEventListener("unload", (e)=>{
        let newTodo = [...todo].filter(item => {
                item.editing = false;
            return item;
            
        });
        setTodo(newTodo);
    })
    function editTodo(id){
        window.onbeforeunload = function(){
            return 'Do you want to leave the page? Editing the todo task will be cancelled'
        } 
        setEditWindowState(true)     
        let newTodo = [...todo].filter(item => 
            {
                if (item.id === id) {
                    item.editing = !item.editing
                }
            }
        );
    }
    function updateTitle(){
        let taskCount = 0;
        [...todo].filter(todo => {
            if (todo.status === true) {
                taskCount++
            }
        });
    console.log(todo)
        return taskCount;
    }
    useEffect(()=>{
        if(firstTimeRef.current === true){
        getLocalStorageList();
        firstTimeRef.current = false;
        }
        document.title = 'Todo List | Tasks: '+todo.length + '; Done: ' + updateTitle()

        setLocalStorageList()
        
    })
    return (
        
        <div className='todoList'>
            <div className='editWindow' style={{display: editWindowState === true && 'flex'}}>
         <p className='editWindowTitle'>Edit task</p>
         <div className="editContainer">
         <input type="text" className="inputAddTodo" placeholder='Name...' />
         <button className='TodoBtn editBtn' onClick={()=> setEditWindowState(false)}>OK</button>
         </div>
     </div>
            {
                todo.map(item =>
                    <div className='todoItem' key={item.id}>
                        
                        <h3 className='todoItemTitle' style={{textDecoration: item.status === true && 'line-through', color: item.status === true && 'gray'}} key={item.id+'_title'}>{item.title}</h3>
                        <div className="todoButtons">
                        <button className='TodoBtn deleteBtn' onClick={() => deleteTodo(item.id)}>🗑 Delete</button>
                        <button className='TodoBtn doBtn' onClick={() => statusTodo(item.id)}>✅ Do it</button>
                        <button className='TodoBtn editBtn' onClick={() => editTodo(item.id)}>✏️ Edit</button>
                        </div>
                    </div>
                    
                )
            }
        </div>
    )
}
