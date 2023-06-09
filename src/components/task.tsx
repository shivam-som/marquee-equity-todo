import { useState } from 'react';
import { Todo } from './Dashboard';

export const Task = ({ todo, todosList, setTodosList, updateList, setIsShowField }: any) => {
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInput = (event: any) => {
        setInputValue(event.target.value);
    }

    const textDecor = todo.isDone ? 'line-through' : '';

    console.log(todo.subtask)

    return <li key={todo.id}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ textDecoration: textDecor }}>{todo.title}</p>
            <div>
                <span
                    style={{ padding: '3px 7px', cursor: 'pointer', border: '1px solid black', marginRight: '10px' }}
                    onClick={() => {
                        const updatedTodo = todosList.filter((it: Todo) => it.id !== todo.id);
                        setTodosList(updatedTodo);
                        updateList(updatedTodo);
                    }}
                >
                    ✘
                </span>
                <span
                    style={{ padding: '3px 7px', cursor: 'pointer', border: '1px solid black', marginRight: '10px' }}
                    onClick={() => {
                        const item = { ...todo, isDone: true };
                        const updatedTodo = todosList.filter((it: Todo) => it.id !== item.id);
                        const updatedTodoList = [...updatedTodo, item];
                        setTodosList(updatedTodoList);
                        updateList(updatedTodoList)
                    }}
                >
                    ✓
                </span>
                <button
                    style={{ padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                    onClick={() => { setIsShow(!isShow) }}
                >
                    Add Sub Task
                </button>
            </div>
        </div>
        {isShow &&
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <input
                    style={{ width: '70%', padding: '5px' }}
                    onChange={handleInput}
                    placeholder='Enter task here ..'
                    type="text" />
                <div>
                    <span
                        style={{ padding: '3px 7px', cursor: 'pointer', border: '1px solid black', marginRight: '10px' }}
                        onClick={() => { setIsShow(false) }}
                    >
                        ✘
                    </span>
                    <span
                        style={{ padding: '3px 7px', cursor: 'pointer', border: '1px solid black' }}
                        onClick={() => {
                            console.log('todo.subtask', todo.subtask)
                            let maxNumber = 0;
                            if (todo.subtask) {
                                todo.subtask.map((a: Todo) => {
                                    if (a.id > maxNumber) {
                                        maxNumber = a.id;
                                    }
                                });
                                const todoSubItem = {
                                    id: maxNumber + 1,
                                    title: inputValue,
                                    isDone: false
                                }
                                const subtasks = [...todo.subtask, todoSubItem]
                                const todoItem = { ...todo, subtask: subtasks }
                                const filterList = todosList.filter((its: any) => its.id !== todo.id);
                                const updatedTodoList = [...filterList, todoItem];
                                setTodosList(updatedTodoList);
                                updateList(updatedTodoList);
                            } else {
                                const todoSubItem = {
                                    id: 1,
                                    title: inputValue,
                                    isDone: false
                                }
                                const todoItem = { ...todo, subtask: [todoSubItem] }
                                const filterList = todosList.filter((its: any) => its.id !== todo.id);
                                const updatedTodoList = [...filterList, todoItem];
                                setTodosList(updatedTodoList);
                                updateList(updatedTodoList);
                            }
                            setIsShow(false);
                        }}
                    >
                        ✓
                    </span>
                </div>
            </div>
        }
        {todo.subtask &&
            <ul>
                {
                    todo.subtask && todo.subtask.map((it: any) => {
                        return <li>{it.title}</li>
                    })
                }
            </ul>
        }
    </li>
}
