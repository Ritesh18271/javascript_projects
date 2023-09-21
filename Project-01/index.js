const express = require("express");
const app = express();

const PORT = 4300;



const users = require('./MOCK_DATA.json');

// Routes

app.get('/users',(req,res)=>{
   const html = `
   <ul>
   ${users.map(user => `<li>${user.first_name}</li>`).join("")}
   </ul>
   `;
   res.send(html)
  });

  // Rest Api endpoints
  app.get("/api/users",(req,res)=>{
    return res.json(users)
  });
  
  app.get("/api/users/:id",(req,res)=>{
    return res.json({message: "This is the user with id "+ req.params.id})
  });
  
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));