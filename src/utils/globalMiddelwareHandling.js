
export const GlobalHandling =(error,req,res,next)=>{
      let status =error.statusCode || 500 
res.status(status).json({error:error.message,status})
}