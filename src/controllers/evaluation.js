const Evaluation = require("../models/evaluation");



//parameter extractor
exports.getEvaluationIdById =(req,res,next,id) =>{
  Evaluation.findById(id).exec((err , evaluation)=>{
      if(err){
          return res.status(400).json({
              err:"cannot find category by id"
          });
      };req.evaluation = evaluation;
      next();
  })
};


//Evaluation creation 

exports.createEvaluation = (req,res) => {

    const evaluation = new Evaluation(req.body);
    category.save((err,evaluation)=>{
        if(err){
            return res.status(400).json({
                error:"unable to save category to database"
            });
        };res.json({
             message: "Deletion was a success",
            evaluation
            });
    })

};


//Evaluation listing all

exports.getAllEvaluations=(req,res)=>{

    Evaluation.find().exec((err , evaluation)=>{
         if(err){
             return res.status(400).json({
              err:"cannot find category by id"
              });
      };res.json(evaluation);


});
};

//Evaluation listing

exports.getEvaluation=(req,res)=>{

    return res.json(req.evaluation);



};


//Evaluation Update


exports.updateEvaluation = (req , res) => {
    Evaluation.findByIdAndUpdate(
        { _id:req.evaluation._id},
        {$set : req.body},
        {new : true ,useFindAndModify:false},
        (err,evaluation)=>{
            if(err){
                return res.status(400).json({
                    err:"you are not "
                });
            }
            
            res.json(evaluation)
        }
    )
};


//Evaluation delete

exports.deleteEvaluation = (req,res)=>{
    const evaluation = req.evaluation;
    evaluation.remove((err,evaluation)=>{
        if(err){
            return res.status(400).json({
                err:"unable to delete category"
            });
        };res.json(evaluation);
    });
};