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
        
    }
    function statusTodo(id) {
        let TodoTitle = id+'_title'
        let newTodo = [...todo].filter(item => {
            if (item.id == id) {
                if(item.status === false){
                    
                }
                item.status = !item.status;
                console.log(id)
                TodoTitle.setState({text: '123'})
            }
            return item;
            
        });
        setTodo(newTodo);
        

    }

    function editTodo(id){
        
    }
    useEffect(()=>{
        if(firstTimeRef.current === true){
        getLocalStorageList();
        firstTimeRef.current = false;
        }
        setLocalStorageList()
    })
    return (
        <div className='todoList'>

            {
                todo.map(item =>
                    <div className='todoItem' key={item.id}>
                        
                        <div className='todoItemTitle' key={item.id+'_title'}>{item.title}</div>
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
