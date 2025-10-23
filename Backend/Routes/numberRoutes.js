const express = require('express');
const router= express.Router();
const validNumber =require('../Models/validNumber');
const {spawn}= require('child_process');


// Get a random number from the list of all numbers in DB

router.get('/random',async(req,res)=>{
   try{
    const randomNoArray = await validNumber.aggregate([{ $sample: { size: 1 } }])   ;
    const randomNo=randomNoArray[0];
     if (randomNoArray.length === 0) {
      return res.status(404).json({ message: 'No numbers found in DB' });
    }
    res.json({randomNo});
    
    console.log("No fetched successfull :",randomNo);
   }
   catch(err){
     console.log("Failed to fetch a number",err);
   }
})

// post solution and see wheter its correct or not 

router.post('/submit',async(req,res)=>{
   try {
    const sol = req.body.solution;        // solution string
    const numberGot = req.query.number;   // number from previous GET request

    if (!numberGot) {
      return res.status(400).json({ message: 'Missing number parameter' });
    }
    if (!sol) {
      return res.status(400).json({ message: 'Missing solution in request body' });
    }

    // Spawn Validator executable
    const validatorProcess = spawn('./Validator/Validator');

    let output = '';
    let error = '';

    // Collect stdout
    validatorProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Collect stderr
    validatorProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    // Handle spawn errors (e.g., executable not found)
    validatorProcess.on('error', (err) => {
      console.error('Failed to start Validator:', err);
      return res.status(500).json({ message: 'Validator not found or failed to start' });
    });

    // When Validator finishes
    validatorProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Validator error:', error);
        return res.status(500).json({ message: 'Validation failed' });
      }

      // Validator output should be '1' for correct solution, '0' for wrong
      if (output.trim() === '1') {
        res.json({ message: 'Correct solution!' });
      } else {
        res.json({ message: 'Wrong solution.' });
      }
    });

    // Send both parameters to Validator: number first, then solution
    validatorProcess.stdin.write(`${numberGot}\n${sol}\n`);
    validatorProcess.stdin.end();

  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports=router;