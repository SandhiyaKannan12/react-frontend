
import './App.css';
import Header from './components/Header';
import Userlist from './components/UserList';
import { v4 as uuidv4 } from 'uuid';
import React,{useEffect,useState}from 'react';
import axios from 'axios';

function App() {
  const [users,setUsers]=useState([
    {id:uuidv4(),name:"dhiya",age:23,dept:"it"},
    {id:uuidv4(),name:"sandy",age:21,dept:"it"},
    {id:uuidv4(),name:"vichu",age:23,dept:"it"}
  ]);

  const [expense,setExpense]=useState([]);


  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get("http://localhost:8000/api")
        setExpense(response.data);
      }
      catch(error){
        console.error(error)
      }
      
      
    }
    fetchData();
    
  },[]);
  console.log(expense)
  return (
    <>
      <Header/>
      {/* <Userlist users={users} setUsers={setUsers}/> */}
      <Userlist expense={expense} setExpense={setExpense}/>
    </>
  )
}

export default App;


/*  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get("http://localhost:8000/api")
        setExpense(response.data);
      }
      catch(error){
        console.error(error)
      }
      
      
    }
    fetchData(); i need the fetched from databse to be displayed in the table below
import React,{useEffect,useState}from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Userlist.css"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserList=(props)=>{         //two-way-communication thats why we go for props
  const {users,setUsers}=props

  useEffect(()=>  console.log("changed"),[users]); //callback occurs based on dependency is called useEffect ----if value changes in dependcy callback gets called

  
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!isEdit){
    const newData={
      id:uuidv4(),
      name:name,
      age:age,
      dept:dept,
    }
    
    setUsers([...users,newData]);
    toast.success("New user added successfully");
    setName("")
    setAge(0)
    setDept("")
  }
  else{
    const updateArray=users.map((item)=>{
      return item.id===editId?{...item,name,age,dept} :item;
    })
    setUsers(updateArray)
    setIsEdit(false)
    setEditId("")
    setName("")
    setAge(0)
    setDept("")
    
  }
  };


  const [name,setName]=useState("")
  const [age,setAge]=useState(0)
  const [dept,setDept]=useState("")
  const [isEdit,setIsEdit]=useState(false)
  const [editId,setEditId]=useState("")


  const handleDelete=(id)=>{
    const updateUsers=users.filter((user)=>user.id!==id);
    setUsers(updateUsers);
  };

  const handleEdit=(user)=>{
    setIsEdit(true)
    setEditId(user.id)
    setName(user.name)
    setAge(user.age)
    setDept(user.dept)
  }

  const [newUserlist,setUserlist]=useState({
    name:"",
    age:0,
    dept:"",
  });



  const handleInputChange=(e)=>{
    const{name,value}=e.target;
    setUserlist({...newUserlist,[name]:value});

  };

  const handleaddUserlist=()=>{
    if(newUserlist.name!==""&&newUserlist.age!=0&&newUserlist.dept!=""){
      setUsers([...users,newUserlist]);
      setUserlist({name:"",age:0,dept:""});
    }
    else{
      alert("please fill all fileds");
    }
  };

 
  return (<>
    <Link to="/about">link</Link>
    <br/>
    <a href="/about">A tag</a>
    <h1>UserList</h1>
    <table className="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Dept</th>
      </tr> 
      </thead>
      
      <tbody>
      {users.map((user,index)=>(
        <tr key={index}>  
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.dept}</td>
          <td><button onClick={()=>handleDelete(user.id)}>Delete</button></td>
          <td><button onClick={()=>handleEdit(user)}>Edit</button></td>
        </tr>
      ))}
        
      </tbody>
    </table>
    {/* <div>
      <h2>ADD USERS</h2>
      <div>
        <label>Enter name:</label>
        <input type="text" name="name" value={newUserlist.name} onChange={handleInputChange}/>
      </div>
      <div>
        <label>Enter age:</label>
        <input type="number" name="age" value={newUserlist.age} onChange={handleInputChange}/>
      </div>
      <div>
        <label>Enter dept:</label>
        <input type="text" name="dept" value={newUserlist.dept} onChange={handleInputChange}/>
      </div>
      <button onClick={handleaddUserlist}>Add</button>
    </div> 
    <form className="form-container" style={{marginTop:"20px"}}  onSubmit={(e)=>handleSubmit(e)}>
    <h2 style={{marginBottom:"20px"}}>Create user</h2>
    <label>Enter Name:
      <input type="text" value={name} placeholder="enter name" onChange={(e)=>setName(e.target.value)}/>
    </label>
      <br/>
      <label>Enter Age:
      <input type="number" value={age} placeholder="enter age" onChange={(e)=>setAge(e.target.value)}/>
      </label>
      <br/>
      <label>Enter Dept:
      <input type="text" value={dept} placeholder="enter dept" onChange={(e)=>setDept(e.target.value)}/>
      </label>
      <br/>
      <button type="submit">{isEdit?"update":"Add"}</button>
    </form>
  </>);
}

export default UserList;*/