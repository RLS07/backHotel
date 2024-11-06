const express=require('express');
const router=express.Router();

const MenuItem=require('../models/MenuItem');


router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newMenuItem= new MenuItem(data);
        const response=await newMenuItem.save();
        console.log('dataSaved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal Server error}'})

    }
});

router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal Server error}'});
    }
    
});

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='sour'||tasteType=='sweet'||tasteType=='spicy'){
            const response=await MenuItem.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            console.log('Invalid type');
            res.status(400).json({error:'Invalid type.'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }

})

module.exports=router;
