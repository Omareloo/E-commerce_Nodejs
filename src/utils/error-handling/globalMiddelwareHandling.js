
export const GlobalHandling =(error,req,res,next)=>{
      let code =error.statusCode || 500 
res.status(code).json({error:error.message})
}