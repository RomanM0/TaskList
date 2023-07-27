import React, { useEffect, useRef } from 'react'
import './TodoList.css'
export default function TodoList({ todo, setTodo }) {
    let firstTime = true;
    let firstTimeRef = useRef(firstTime)
    function getLocalStorageList(){
        setTodo(JSON.parse(localStorage.getItem('taskList')))
    }
    
    function setLocalStorageList(){
        localStorage.setItem('taskList', JSON.stringify(todo))
    }
    
    function deleteTodo(id) {
        let newTodo = [...todo].filter(item => item.id !== id);
        setTodo(newTodo);
        // document.title = 'Завдань: '+todo.length
    }
    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status;
            }
            return item;
            
        });
        setTodo(newTodo);
        // document.title = 'Завдань: '+todo.length

    }

    function editTodo(id){
        alert('Ця функція ще у розробці... / This function is still at development...')
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
        document.title = 'Todo List | Завдань: '+todo.length + '; Виконано: ' + updateTitle()

        setLocalStorageList()
        
    })
    return (
        <div className='todoList'>

            {
                todo.map(item =>
                    <div className='todoItem' key={item.id}>
                        
                        <h3 className='todoItemTitle' style={{textDecoration: item.status === true && 'line-through', color: item.status === true && 'gray'}} key={item.id+'_title'}>{item.title}</h3>
                        <div className="todoButtons">
                        <button className='TodoBtn deleteBtn' onClick={() => deleteTodo(item.id)}>Видалити</button>
                        <button className='TodoBtn doBtn' onClick={() => statusTodo(item.id)}>Виконати</button>
                        <button className='TodoBtn editBtn' onClick={() => editTodo(item.id)}>Редагувати</button>
                        </div>
                    </div>
                    
                )
            }
        </div>
    )
}
