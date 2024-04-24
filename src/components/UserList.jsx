//components--->functional,class component
/*if key passed unique index value gets returned */

// import React, { useState } from 'react';

// const UserList = () => {
//   const [users, setUsers] = useState([
//     {
//       name: "Suresh",
//       dept: "IT",
//       rollno: "20ita21",
//     },
//     {
//       name: "Mithra",
//       dept: "IT",
//       rollno: "20ita22",
//     }
//   ]);

//   const handleDelete = (index) => {
//     const deletedArray = users.filter((user, i) => index !== i);
//     setUsers(deletedArray);
//   };

//   return (
//     <>
//       <div>
//         <h1>Users</h1>
//         <table
//           className="table"
//           style={{ border: "2px solid black", borderCollapse: "collapse" }}
//         >
//           <thead>
//             <tr>
//               <th style={{ border: "2px solid black" }}>Name</th>
//               <th style={{ border: "2px solid black" }}>Dept</th>
//               <th style={{ border: "2px solid black" }}>Rollno</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index}>
//                 <td style={{ border: "2px solid black" }}>{user.name}</td>
//                 <td style={{ border: "2px solid black" }}>{user.dept}</td>
//                 <td style={{ border: "2px solid black" }}>{user.rollno}</td>
//                 <td style={{ border: "2px solid black" }}>
//                   <button onClick={() => handleDelete(index)}>Delete User</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default UserList;


import React,{useEffect,useState}from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Userlist.css"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const UserList=(props)=>{         //two-way-communication thats why we go for props
  // const {users,setUsers}=props
  const {expense,setExpense}=props;


  useEffect(()=>  console.log("changed"),[expense]); //callback occurs based on dependency is called useEffect ----if value changes in dependcy callback gets called

  
  
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
        <th>Date</th>
        <th>Category</th>
        <th>amount</th>
      </tr> 
      </thead>
      
      <tbody>
      {expense&&expense?.map((user,index)=>(
        <tr key={index}>  
          {/* <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.dept}</td> */}
          <td>{user.date}</td>
          <td>{user.category}</td>
          <td>{user.amount}</td>
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
    </div> */}
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

export default UserList;