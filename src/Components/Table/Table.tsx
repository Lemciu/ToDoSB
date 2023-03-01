import './table.css'
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {Task} from "../Task/Task";

interface Props {
    tasks: Task[];
    setTasks: Function;
    complete: string;
}

function Table ({tasks, setTasks, complete} : Props) {
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const [flag, setFlag] = useState(true);
    const [sortFlag, setSortFlag] = useState('/priority-asc')
    // const [sort, setSort] = useState("");
    const [sort, setSort] = useState<number>();

    useEffect(() => {

            fetch("http://localhost:8080/tasks" + complete + sortFlag, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
                .then((response) => response.json())
                .then((json) => {
                     setTasks(json)
                })


    }, [complete, sortFlag, flag])

    function deleteButtonHandler(id: number) {
        fetch(`http://localhost:8080/deleteTask/${id}`, {
            method: 'DELETE'
        }).then((data) => {
            setFlag(!flag);
        });
    }

    function setComplete(id: number) {
            fetch(`http://localhost:8080/setComplete/${id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then((data)=>{
                setFlag(!flag);
            })

    }

    // const onInputChange = (e: any) => {
    //     // setSort(String(e.target.value));
    //     setSort((e.target.value));
    //     console.log(sort);
    //     setFilteredTasks(tasks.filter((t) =>
    //         t.id === sort
    //     )
    // )
        // setFilteredTasks(tasks.filter((e: {name: string }) => {
        //     if(!(e.name === ""))
        //          e.name.includes(sort);
        //         else return true;
        // }));
    // }

    return (
        <div>
            {/*<input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e) => onInputChange(e)}/>*/}
            <Navbar setSortFlag={setSortFlag}/>
            <table className="table">
                <thead>
                <tr className="table-primary">
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Completed</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task: any) => (
                        <tr key={task.id}>
                            <td><Link to={"/editTask/" + task.id} >{task.name}</Link></td>
                            <td>{task.priority}</td>
                            <td>{task.description}</td>
                            <td>{task.dueDate}</td>
                            <td><button className="btn btn-primary" onClick={() => setComplete(task.id)}>X</button></td>
                            <td><button className="btn btn-primary" onClick={() => deleteButtonHandler(task.id)}>X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;