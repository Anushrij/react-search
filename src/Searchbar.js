import React from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  {useEffect,useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


 export default function Searchbar(){
   const [user,setUser] =useState([]);
   const [search,setSearch] = useState("");
   const url = `https://jsonplaceholder.typicode.com/todos`;

     //getting data fro api

     async function getData(){
        const result=await axios.get(url);
       console.log(result.data);
    setUser(result.data);

      }

     useEffect (()=>{
            getData();
      },[]);
















  return(
    <div>


<Box
      component="form"
      sx={{ mx: "auto", width: 200 ,px: 4,mb:4
        ,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField placeholder="Search here..."  color="secondary" focused  onChange = {(e)=>{
        setSearch(e.target.value);
      }}
      
      />
      
      
    </Box>

       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell >Title</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Users</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
             {user.filter((user)=>{
                 if(search == ""){
                       return user;
                 }else if(user.title.toLowerCase().includes(search.toLowerCase())){
                return user;
                 }

             }).map((user)=>(
               
            <StyledTableRow key = "user.id">
              <StyledTableCell component="th" scope="row">
               {user.id}
              </StyledTableCell>
             
              <StyledTableCell >{user.title}</StyledTableCell>
              <StyledTableCell align="right">{user.completed}</StyledTableCell>
              <StyledTableCell align="right"><button>View user</button></StyledTableCell>
            </StyledTableRow>
           
             ))}
        </TableBody>
      </Table>
    </TableContainer> 
      
    </div>
  );
}
