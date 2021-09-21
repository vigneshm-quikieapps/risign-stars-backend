const coach = require("../models/coach");

module.exports.createCoach = (req, res) => {
  const category = new coach(req.body);
  category.save((err, cat) => {
    if (err) {
      return res.status(400).json({
        error: "unable to save coach to database",
      });
    }
    res.json(cat);
  });
};
