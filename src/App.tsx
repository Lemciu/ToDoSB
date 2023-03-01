import React, {useState} from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Table from "./Components/Table/Table";
import AddTask from "./Pages/AddTask/AddTask";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from "./Components/Calendar/Calendar";
import {Task} from "./Components/Task/Task";

function App() {
    const [tasks, setTasks] = useState<Task[]>([])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Table  tasks={tasks} setTasks={setTasks} complete={""}/>}/>
        <Route path='/completed' element={<Table  tasks={tasks} setTasks={setTasks} complete={"/completed"}/>}/>
        <Route path='/addTask' element={<AddTask/>}/>
        <Route path='/editTask/:id' element={<AddTask/>}/>
        <Route path='/calendar' element={<Calendar />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
