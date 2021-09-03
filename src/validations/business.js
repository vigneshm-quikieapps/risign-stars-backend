const { query } = require('express-validator');
const { FILTER_TYPES } = require("../contants/constant")


const businessFilter = (filters) => {
    if(!Array.isArray(filters)) {
        return false
    }

    for (let i = 0; i < filters.length; i++) {
        let {field, type, value} = filters[i]
        if(!field || typeof field != "string") {
            return Promise.reject(`filters[${i}].field should be string`)
        }
        if(!type || typeof type != "string" || !FILTER_TYPES.includes(type)) {
            return Promise.reject(`filters[${i}].type should be either ${FILTER_TYPES.join('/')}`)
        }
        if(!value || typeof value != "string") {
            return Promise.reject(`filters[${i}].value should be string`)
        }
    }
    return true
}

const getAllBusinessValidationRules = () => {
    return [
        query('filters').optional().custom(businessFilter),
    ]
}

module.exports = {
  getAllBusinessValidationRules,
}