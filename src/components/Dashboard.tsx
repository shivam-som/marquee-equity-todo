import React, { useState } from 'react';
import { useUserContext } from '../utils/UserContext';
import { updateList } from '../utils/ducks';
import { Task } from './task'

export type Todo = {
    id: number;
    title: string;
    isDone: boolean;
    subtask?: Todo[];
};

type DashboardProps = {
    todos: Todo[];
    setIsLoggedIn(arg: boolean): void;
};

const Dashboard: React.FC<DashboardProps> = ({ setIsLoggedIn }) => {
    const [isShowField, setIsShowField] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const todosLocal = localStorage.getItem('todos');
    const [todosList, setTodosList] = useState(todosLocal ? JSON.parse(todosLocal) : []);

    const { user, logout } = useUserContext();

    const handleInput = (event: any) => {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div>
                    <h1>Welcome, {user.username}!</h1>
                </div>
                <div>
                    <button onClick={() => {
                        setIsLoggedIn(false);
                        localStorage.removeItem('isLoggedIn');
                        logout();
                    }} style={{ padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
            <div style={{ width: '40%', margin: 'auto' }}>
                <h2>Profile Information</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2>Your Todos</h2>
                    </div>
                    <div>
                        <button
                            style={{ padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                            onClick={() => { setIsShowField(!isShowField) }}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
                {isShowField &&
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <input
                            style={{ width: '70%', padding: '5px' }}
                            onChange={handleInput}
                            placeholder='Enter task here ..'
                            type="text" />
                        <div>
                            <span
                                style={{ padding: '3px 7px', cursor: 'pointer', border: '1px solid black', marginRight: '10px' }}
                                onClick={() => { setIsShowField(false) }}
                            >
                                ✘
                            </span>
                            <span
                                style={{ padding: '3px 7px', cursor: 'pointer', border: '1px solid black' }}
                                onClick={() => {
                                    let maxNumber = 0;
                                    todosList.map((a: Todo) => {
                                        if (a.id > maxNumber) {
                                            maxNumber = a.id;
                                        }
                                    });
                                    const todoItem = {
                                        id: maxNumber + 1,
                                        title: inputValue,
                                        isDone: false
                                    }
                                    const updatedTodoList = [...todosList, todoItem];
                                    setTodosList(updatedTodoList);
                                    updateList(updatedTodoList);
                                    setIsShowField(false);
                                }}
                            >
                                ✓
                            </span>
                        </div>
                    </div>
                }
                <ul>
                    {todosList.sort((a: Todo, b: Todo) => a.id - b.id).map((todo: Todo) => {
                        return <Task
                            key={todo.id}
                            todo={todo}
                            todosList={todosList}
                            setTodosList={setTodosList}
                            updateList={updateList}
                            handleInput={handleInput}
                            setIsShowField={setIsShowField}
                            inputValue={inputValue}
                        />
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
