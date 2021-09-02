const Evaluation = require("../models/evaluation");



//parameter extractor
exports.getEvaluationIdById =(req,res,next,id) =>{
  Evaluation.findById(id).exec((err , evaluation)=>{
      if(err){
          return res.status(400).json({
              err:"cannot find evaluation by id"
          });
      };req.evaluation = evaluation;
      next();
  })
};


//Evaluation creation 

exports.createEvaluation = (req,res) => {

    const evaluation = new Evaluation(req.body);
    evaluation.save((err,eval)=>{
        if (err) {
            console.log(err)
            console.log(req.body)
            
            return res.status(400).json({
                error:"unable to save evaluation to database"
            });
        };res.json(eval );
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