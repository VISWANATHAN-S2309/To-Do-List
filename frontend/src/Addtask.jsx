import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css';
import axios from 'axios';


const Addtask = () => {
  const[tasks,settasks]=useState([]);
  const[task,settask]=useState("");
  const[description,setdescription]=useState("");
  const[timedate,settimedate]=useState("");
  const[priority,setpriority]=useState("");
  const[category,setcategory]=useState("");
  const[status,setstatus]=useState(false);
  const[editid,setid]=useState(null);
  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
      if(editid){
         await axios.put(`http://127.0.0.1:5500/updatetask/${editid}`,{
          task,
          description,
          timedate,
          priority,
          category,
          status,
         });
         alert("updated succesfully");
         setid(null);
          settask("");
    setdescription("");
    settimedate("");
    setpriority("");
    setcategory("");
    setstatus(false);
    fetchusers();
         fetchusers();
      }
      else{
          const response=await axios.post("http://127.0.0.1:5500/createtask",{
      task,
      description,
      timedate,
      priority,
      category,
      status,
    })
    alert("task added successfully");
    settask("");
    setdescription("");
    settimedate("");
    setpriority("");
    setcategory("");
    setstatus(false);
    fetchusers();
      }
      
    }
    catch(err){
      console.log(err);
    }
  }
  const fetchusers=async ()=>{
      const response=await axios.get("http://127.0.0.1:5500/fetchusers");
      settasks(response.data.gettask);
    }
    useEffect(()=>{
      fetchusers();
    },[]);

  const handledelete= async (id,task)=>{
    try{
       await axios.delete(`http://127.0.0.1:5500/deletetask/${id}`);
      alert(`${task} deleted successfully`);
      fetchusers();
    }
    catch(err){
      console.log(err);
    }
  }
  const handleedit=(t)=>{
    settask(t.task);
    setdescription(t.description);
    settimedate(t.timedate);
    setpriority(t.priority);
    setcategory(t.category);
    setstatus(t.status);
    setid(t._id);
  }
 useEffect(() => {
  if (!("Notification" in window)) return;
  Notification.requestPermission();

  const notify = setInterval(() => {
    const now = new Date();
    tasks.forEach(task => {
      const taskTime = new Date(task.timedate);
      if (!task.notified && taskTime <= now) {
        new Notification(`Reminder: ${task.task}`, { body: task.description });
        const updatedTasks = tasks.map(t =>
          t._id === task._id ? { ...t, notified: true } : t
        );
        settasks(updatedTasks);
      }
    });
  }, 6000);

  return () => clearInterval(notify);
}, [tasks]);


  return (
    <>
    <form className="main"onSubmit={handlesubmit}>
      <table className="bor">
        <tr>
          <th colSpan="20"className="header">To-Do List</th>
        </tr>
       <tr className="sec">
        <th>Task</th>
        <th>Description</th>
        <th>Time&Date</th>
        <th>Priority</th>
        <th>Category</th>
        <th>Status</th>
        <th>Actions</th>
       </tr>
      <tbody className="sub">
        <tr>
          <td><input type='text'onChange={(e)=>settask(e.target.value)} value={task}></input></td>
          <td><textarea onChange={(e)=>setdescription(e.target.value)} value={description}></textarea></td>
          <td><input type="datetime-local"onChange={(e)=>settimedate(e.target.value)} value={timedate}></input></td>
          <td>
            <select onChange={(e)=>setpriority(e.target.value)} value={priority}>
              <option>select</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </td>
          <td>
            <select onChange={(e)=>setcategory(e.target.value)} value={category}>
              <option>select</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
          </td>
          <td><input type="checkbox"onChange={(e)=>setstatus(e.target.checked)}></input></td>
          <td><button type='submit'className='btn'>+ Add</button></td>
        </tr>
      </tbody>
      <tbody className='sub'>
        { tasks.map((t,index)=>(
          <tr key={index} className={t.status?"completed":""}>
          <td>{t.task}</td>
          <td>{t.description}</td>
          <td>{t.timedate}</td>
          <td className={t.priority=='High'?"redco":""||t.priority=='Medium'?"yellowco":""||t.priority=='Low'?"greenco":""}>{t.priority}</td>
          <td>{t.category}</td>
          <td>
            <input type='checkbox' checked={t.status} onChange={()=>{
              const taskfinish=[...tasks];
              taskfinish[index].status=!t.status;
              settasks(taskfinish);
            }}
            disabled={t.status}></input>
          </td>
          <td><button type='button'className='btnedit'onClick={()=>handleedit(t)}>Edit</button>
          <button type='button'className='btndelete'onClick={()=>handledelete(t._id,t.task)}>Delete</button>
          </td>
        </tr>
        ))}
        
      </tbody>
      </table>
      </form>
    </>
  )
}

export default Addtask;
