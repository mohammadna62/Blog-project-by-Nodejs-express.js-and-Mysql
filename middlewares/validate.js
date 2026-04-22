module.exports= (validator)=>{
  return async(req , res , next)=>{
     try {
        await validator.validate(req.body)
        next()
     } catch (err) {
        return res.status(400).json({error : err.errors })
     }
  }
}