const Tag = require("./../../repositories/tags")
exports.showTagsManagment = async(req , res , next)=>{
    try {
        const tags = await Tag.findAll()

        return res.render('p-admin/tags',{tags})
    } catch (err) {
        next(err)
        
    }
}