import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export const HomePage = () => {

    const [data, setData] = useState([{
        id: 0,
        name: "Clean Room",
        description: "Dust shelves, vacuum carpet",
        isComplete: null
    }]) 

    useEffect(() => {
        axios.get("http://localhost:8080/find-all").then((res) => {
            setData(res.data);
        })
    }, [])

    const markTodo = (index) => {
        console.log("asd")
        let newData = data;
        for (let i = 0;i < newData.length;i++) {
            if (newData[i].id === index) {
                console.log(newData[i].isComplete)
                newData[i].isComplete = !newData[i].isComplete;
            }
        }
        setData(newData);
    }

    return (
        <>
        <div className='home'>
            <table className='todo-list'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Completed?</th>
                </tr>
                {data.map((todo) => (
                    <tr className='todo'>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td>{todo.description}</td>
                        <td style={{cursor: 'pointer'}} onClick={() => {markTodo(todo.id)}} className='isComplete'>{todo.isComplete ? <FaCheck style={{color: "green"}} /> : <FaXmark style={{color: "red"}}/>}</td>
                    </tr>
                ))}
            </table>
        </div>
        </>
    )

}