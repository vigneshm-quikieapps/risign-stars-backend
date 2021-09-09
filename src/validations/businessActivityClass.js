


const classValidator = ( { req }) => {
    
  
    
   
}



const deleteBusinessActivityValidationRules = (req,res) => {

  const classes = req.activityClass.class;


    
     /** if class array contains no class */
    if (classes.length < 1) {
        return true
    }
     return res.status(400)

};

module.exports = deleteBusinessActivityValidationRules;