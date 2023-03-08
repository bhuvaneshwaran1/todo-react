import React, { useState, useEffect } from 'react';
import { Paper, Box, TextField, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import TodoItem from './TodoItem';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import './App.css';


const schema = yup.object().shape({
  
  additem: yup.string().required('Task name less than 50 characters').max(50).required(),
});

function App() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (e) => {
    e.preventDefault()
  

    if (additem !== "") {
      
      displayItem([
      
        ...itemAdded,
        {

          id: itemAdded.length + 1,
          text: additem.trim()
        }
      ]);
    }

  
    setItem("");

  };

  const [additem, setItem] = useState("");
  const [itemAdded, displayItem] = useState(() => {
    const savedTodos = localStorage.getItem("itemAdded");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem("itemAdded", JSON.stringify(itemAdded))
  }, [itemAdded])
  const addItem = () => {

  }
  const enterItem = (event) => {
    setItem(event.target.value);
    console.log(addItem)
  }
const deleteItem = (id) => {
displayItem((olditems)=> {
  return olditems.filter((arrayElem,index)=>{
    return index!==id;
  })
})
}
  const display =  () => {
    displayItem((olditems)=> {
      return [...olditems,additem]
    } )
    setItem("")
  }

  return (
    <>
<form onSubmit={handleFormSubmit}>

      <Paper elevation={3} style={{ padding: '25px', minHeight: "100vh", margin: '5px' }}>

        <h1 style={{ backgroundColor: 'lightblue', fontSize: '25px', textAlign: 'center', color: 'Black' }}> TODO List App</h1>

        <Box sx={{'& > :not(style)':{m:1}}}style={{ display: "flex", justifyContent: "center" }}>
          <TextField id="standard-basic" label="Enter Note" variant="outlined" onChange={enterItem} value={additem}
           /* {...register('additem')}
                error={errors.additem ? true : false}
            */      />
          <Fab color="primary" aria-label="add" onClick={display}>
        <AddIcon />
      </Fab>
        </Box>

        <ol>
          {itemAdded.map((itemval,index) => {
            return (
              <TodoItem key={index} id={index} 
               onDelete={deleteItem} addedItem={itemval} />
            )
          })}
        </ol>
      </Paper>
      </form>
    </>
   
  );
}

export default App;
