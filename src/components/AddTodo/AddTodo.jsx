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
        inputRef.current.placeholder = 'Введи завдання'
    }
    else{
        inputRef.current.placeholder = 'Введіть назву завдання, щоб додати його у список!'
        inputRef.current.value = ''
        placeholderTimer = setTimeout(function(){
            inputRef.current.placeholder = 'Введи завдання'
        },1500)
        
    }
}

    
    return (
        <div className='addTodo'>
            <input className='inputAddTodo' type="text" ref={inputRef} onKeyDown={(e) => {if(e.keyCode === 13){saveTodo()}}} placeholder='Введи завдання' value={value} onChange={(e) => setValue(e.target.value)} />
            <button className='submitButton' onClick={saveTodo}>Додати +</button>
        </div>
    )
}

export default AddTodo;