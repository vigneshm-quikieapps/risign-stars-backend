const { validationResult } = require("express-validator");
const converter = require("number-to-words");

const validateArrayResults = (arrayFilter) => (req, res, next) => {
  const errors = validationResult(req);

  const regex = /\[(.*?)\]/;

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  const extractedArrayErrors = extractedErrors
    .map((li) =>
      Object.fromEntries(
        Object.entries(li).filter(([key]) =>
          arrayFilter.some((substring) => key.includes(substring))
        )
      )
    )
    .filter((ul) => Object.keys(ul).length !== 0);

  const extractedArrayErrorsKeys = extractedArrayErrors
    .flatMap((ul) => Object.keys(ul))
    .sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

  const simpleErrors = extractedErrors.filter((obj) =>
    extractedArrayErrorsKeys.every((li) => !Object.keys(obj).includes(li))
  );

  const resultArrayErrors = extractedArrayErrorsKeys.map((err, index) => {
    let rowCount = parseInt(err.match(regex)[1]);

    let rowName = err.split("[")[0];

    let rowDescription = err.split(".");

    rowDescription.shift();

    let errorIndex = errors.array().findIndex((item) => item["param"] === err);

    return {
      [`${converter.toWordsOrdinal(
        rowCount + 1
      )} row ${rowName} ${rowDescription.join(" ")}`]:
        errors.array()[errorIndex].msg,
    };
  });
  // console.log([...simpleErrors, ...resultArrayErrors]);

  return res.status(422).json({
    errors: [...simpleErrors, ...resultArrayErrors],
  });
};

module.exports = validateArrayResults;
