
const Article = require("./../repositories/articles")


exports.getAll = async(req , res , next)=>{
    try {
        
    } catch (err) {
        next(err)
    }
}

exports.create = async(req , res , next)=>{
    try {
        const {title, content, slug, author_id} = req.body
        const articles = await Article.create(title, content, slug, author_id)
        return res.status(201).json(articles)
    } catch (err) {
        next(err)
    }
}
exports.getBySlug = async(req , res , next)=>{
    try {
        
    } catch (err) {
        next(err)
    }
}

exports.remove = async(req , res , next)=>{
    try {
        
    } catch (err) {
        next(err)
    }
}