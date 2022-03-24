const { getPaginationOptions } = require("../helpers/query");
const { BusinessClass } = require("../models");
const Category = require("../models/Category");
const { DoesNotExistError } = require("../exceptions");
const { auditCreatedBy, auditUpdatedBy } = require("../helpers/audit");

// module.exports.getCategoryById = (req, res, next, id) => {
//   Category.findById(id).exec((err, cat) => {
//     if (err) {
//       return res.status(400).json({
//         err: "cannot find category by id",
//       });
//     }
//     req.category = cat;
//     next();
//   });
// };

module.exports.createCategory = async (req, res) => {
  try {
    let payload = { ...req.body };
    payload = auditCreatedBy(req, payload);
    const category = await Category.create(payload);
    return res
      .status(201)
      .send({ message: "Category created successfully.", category });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.getAllCategory = async (req, res) => {
  try {
    let { query, options } = getPaginationOptions(req);
    let response = await Category.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let category = await Category.findById(categoryId);
    return res.send({ category });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let { name } = req.body;
    let options = { new: true };
    let payload = { name };
    payload = auditUpdatedBy(req, payload);

    let category = await Category.findByIdAndUpdate(
      categoryId,
      { $set: payload },
      options
    );

    return res.send({ message: "Category updated successfully.", category });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

module.exports.removeCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;

    let businessClassCount = await BusinessClass.count({ categoryId });

    if (businessClassCount) {
      throw new Error(
        "Not allowed, it is used in at least one Class definition."
      );
    }

    let category = await Category.deleteOne({ _id: categoryId });

    if (category.deletedCount < 1) {
      throw new DoesNotExistError();
    }

    return res.send({ message: "Category deleted successfully." });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports.getAllCategoriesInABusiness = async (req, res) => {
  try {
    let { businessId } = req.params;

    let { query, options } = getPaginationOptions(req);
    query = { ...query, businessId };

    let response = await Category.paginate(query, options);
    return res.send(response);
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};
