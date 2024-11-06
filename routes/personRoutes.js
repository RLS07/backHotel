const express=require('express');
const router=express.Router();
const Person=require('../models/person');

router.post('/',async (req,res)=>{
    try{
     const data = req.body;

     const newPerson = new Person(data);
 
     const response = await newPerson.save(); '//wait until save'
     console.log('dataSaved');
     res.status(200).json(response);
      
    }catch(err){
     console.log(err);
     res.status(500).json({error:'internal Server error}'})
    }
 })


router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal Server error}'})
    }

})


router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='manager'||workType=='waiter'){
            const respose=await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(respose);    
    
        }else{
            res.status(400).json({error:'Invalid Work Type'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal Server error'});
    }
})


router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; //url
        const updatedPersonData = req.body; //json ko through
        
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        });

        if(!response){
            return res.status(404).json({error:'User id not found'});
        };
        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal Server error'});

    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:'User id not found'});
        };

        console.log('data deleted');
        res.status(200).json('Date deleted.')
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal Server error'});
    }
})
module.exports=router;