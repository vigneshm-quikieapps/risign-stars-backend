let NAME_LENGTH = 5;
let PASSWORD_LENGTH = 6;
const USER = {
  NAME: {
    MESSAGE: `name should be at least ${NAME_LENGTH} char`,
    LENGTH: NAME_LENGTH,
  },
  PASSWORD: {
    MESSAGE: `password should be at least ${PASSWORD_LENGTH} char`,
    LENGTH: PASSWORD_LENGTH,
  },
  EMAIL: {
    MESSAGE: "Invalid Email",
  },
  MOBILE_NO: {
    MESSAGE: "Invalid Mobile Number",
  },
};

let POSTCODE_LENGTH = 6;
let LINE1_LENGTH = 3;
let LINE2_LENGTH = 3;
let CITY_LENGTH = 3;
let COUNTRY_LENGTH = 3;

const ADDRESS = {
  POSTCODE: {
    LENGTH: POSTCODE_LENGTH,
    MESSAGE: `postcode should be at least ${POSTCODE_LENGTH} char`,
  },
  LINE1: {
    LENGTH: LINE1_LENGTH,
    MESSAGE: `line1 should be at least ${LINE1_LENGTH} char`,
  },
  LINE2: {
    LENGTH: LINE2_LENGTH,
    MESSAGE: `line1 should be at least ${LINE2_LENGTH} char`,
  },
  CITY: {
    LENGTH: CITY_LENGTH,
    MESSAGE: `city should be at least ${CITY_LENGTH} char`,
  },
  COUNTRY: {
    LENGTH: COUNTRY_LENGTH,
    MESSAGE: `country should be at least ${COUNTRY_LENGTH} char`,
  },
};

module.exports = {
  USER,
  ADDRESS,
};
