const Category = require("../models/Category");


exports.getCategoryById =(req,res,next,id) =>{
  Category.findById(id).exec((err , cat)=>{
      if(err){
          return res.status(400).json({
              err:"cannot find category by id"
          });
      };req.category = cat;
      next();
  })
};

exports.createCategory = (req,res) => {

    const category = new Category(req.body);
    category.save((err,cat)=>{
        if(err){
            return res.status(400).json({
                error:"unable to save category to database"
            });
        };res.json(cat);
    })

};

exports.getAllCategory=(req,res)=>{

    Category.find().exec((err , categories)=>{
         if(err){
             return res.status(400).json({
              err:"cannot find category by id"
              });
      };res.json(categories);


});
};

exports.getCategory=(req,res)=>{

    return res.json(req.category);



};


exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err,cat)=>{
        if(err){
            return res.status(400).json({
                err:"unable to update category"
            });
        };res.json(cat);
    });

};

exports.removeCategory = (req,res)=>{
    const category = req.category;
    category.remove((err,cat)=>{
        if(err){
            return res.status(400).json({
                err:"unable to delete category"
            });
        };res.json(cat);
    });
};