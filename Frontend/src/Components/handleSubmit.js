export const handleSubmit = async(number,solution)=>{
try{
const res=await fetch(`http://localhost:3000/submit?number=${number}`,{
    method:'POST',
     headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({solution})
}
);
const data =await res.json();
return data;
}
catch(err){
console.log("Error,submitting solution",err);
throw err;
}
}