import express from 'express'

const router = express.Router();


router.get("/", (req, res) =>{
    res.render("index");
  })

router.get("/user", (req, res)=>{
  res.render("user");
})
  


export default router;