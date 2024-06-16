import React, { useState, useRef } from 'react'
import './AddTodo.css'
import { v4 as uuid } from 'uuid'

function AddTodo({ todo, setTodo }) {
    let inputRef = useRef(0)
    let placeholderTimer
    const [value, setValue] = useState('');
    function saveTodo() {
        if(!/\S/.test(value) === false){
        setTodo([...todo, {
            id: uuid(),
            title: value,
            status: false,
            editing: false
        }])
        setValue('');
        clearTimeout()
        inputRef.current.placeholder = 'Enter the name of task'
    }
    else{
        inputRef.current.placeholder = 'Empty name of task. Enter the task name to add it.'
        inputRef.current.value = ''
        placeholderTimer = setTimeout(function(){
            inputRef.current.placeholder = 'Enter the name of task'
        },1500)
        
    }
}

    
    return (
        <div className='addTodo'>
            <input className='inputAddTodo' type="text" ref={inputRef} onKeyDown={(e) => {if(e.keyCode === 13){saveTodo()}}} placeholder='Enter the name of task' value={value} onChange={(e) => setValue(e.target.value)} />
            <button className='submitButton' onClick={saveTodo}>➕ Add</button>
        </div>
    )
}

export default AddTodo;