const validation =(schema)=>{
return (req,res,next)=>{
 const { error } = schema.validate(req.body,{abortEarly:false});
 if(error){
    let errors =[]
    error.details.map(key=>{
        errors.push({message:key.message})
    })
    res.status(403).json({message:"validation Error",errors})
 }else{
    next()
 }
}
}
export default validation