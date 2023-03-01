import './addTask.css'
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import {Task} from "../../Components/Task/Task"
import submit = Simulate.submit;

function AddTask() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then((response) => response.json())
            .then((json) => setCategories(json));
    }, [])

    const [task, setTask] = useState<Task>({
        name: "",
        description: "",
        dueDate: "",
        priority: 1,
        alert: false,
        categories: [],
        completed: false,
    });

    // search bar

    useEffect(() => {
        let  url: string;
        (id === undefined)
            ? url = "http://localhost:8080/createNewTask"
            : url = "http://localhost:8080/editTask/" + id;

        fetch(url)
            .then((response) => response.json())
            .then((data: Task) => {
                setTask(data);
            })
            .catch((error) => {
                console.error('Wystąpił błąd podczas pobierania danych', error);
            });
    }, []);

    const submitHandler = (event: any) => {
        event.preventDefault();
        fetch("http://localhost:8080/saveTask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(task)
        })
        navigate("/");
    }

    const onInputChange = (e: any) => {
        setTask({...task, [e.target.name]: e.target.value});
    }

    // @ts-ignore
    return (
        <div className="addTask">
            <form className="taskForm" onSubmit={submitHandler}>
                <p className="line">Category:</p>
                <div className="form-check">
                    {categories.map((category: any) => (
                        <>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <p>{category.name}</p>
                        </>
                    ))
                    }
                </div>
                <p className="line">Title:</p>
                <input type="text" className="form-control" name="name" value={task.name} onChange={(e) => onInputChange(e)}/>
                <p className="line">Description:</p>
                <textarea className="form-control" name="description" value={task.description} onChange={(e) => onInputChange(e)}/>
                <p className="line">Deadline</p>
                <input type="datetime-local" className="form-control" name="dueDate" value={task.dueDate} onChange={(e) => onInputChange(e)}/>
                <div className="justRow">
                    <input type="checkbox" id="checkboxForm" className="form-check-input" onChange={(e) => onInputChange(e)}/>
                    <p>Set alert 1h before</p>
                </div>
                <label htmlFor="customRange3" className="form-label">Priority:</label>
                <input type="range" className="form-range" min="1" max="3" step="1" name="priority" value={task.priority} onChange={(e) => onInputChange(e)}/>
                <div className="priorityBar">
                    <p>Low</p>
                    <p>Medium</p>
                    <p>High</p>
                </div>
                <input  type="submit" value="Save" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default AddTask