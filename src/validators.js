/**
 *
 * RegEx values for the validators
 *
 */
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const loanTermRegex = /^[1-9]$|^[0-1][0-9]$|^[2][0-4]$/;
const orgNoRegex = {
  se: { regex: /(^\d{10}$)|(^\d{6}\-\d{4}$)/ },
  no: { regex: /^(([8]|[9])\d{8}$)/ },
  fi: { regex: /(^\d{8}$)|(^\d{7}\-\d$)/ },
  dk: { regex: /^\d{8}$/ },
  be: { regex: /(^\d{9}$)|(^\d{10}$)/ },
  nl: { regex: /^\d{8}$/ },
};
const personalNumberRegex = {
  se: {
    regex:
      /^(19|20|)[0-9][0-9](0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(-|)\d{4}$/,
  },
  no: {
    regex:
      /^(([0-3][0-9])([0][0-9]|[1-2][0-2])([0-9][0-9])(\d{5})|([4-7][0-9])([0][0-9]|[1-2][0-2])([0-9][0-9])(\d{5}))$/,
  },
  fi: {
    regex:
      /^(0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])[0-9][0-9](-|)(\d{4}|\d{3}[A-Z])$/i,
  },
  dk: {
    regex:
      /^(0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])[0-9][0-9](-|)(\d{4}|[A-Z]{4})$/i,
  },
  be: {
    regex:
      /^[0-9][0-9](\.?)(0[1-9]|1[0-2])(\.?)(0[1-9]|[1-2][0-9]|3[0-1])(-?)\d{3}\.?\d{2}$/,
  },
  // NL is the only market where we don't have Personal Numbers.
};

const phoneNumerRegex = {
  se: {
    regex: /(^([\s-]*[0-9]){8,10}$)|(^[+][4][6]([\s-]*[0-9]){8,10}$)/,
  },
  no: {
    regex: /(^([\s-]*[0-9]){8,12}$)|(^[+][4][7]([\s-]*[0-9]){8,12}$)/,
  },
  dk: {
    regex: /(^([\s-]*[0-9]){8,10}$)|(^[+][4][5]([\s-]*[0-9]){8,10}$)/,
  },
  be: {
    regex: /(^([\s-]*[0-9]){9,10}$)|(^[+][3][2]([\s-]*[0-9]){8,10}$)/,
  },
  nl: {
    regex: /(^([\s-]*[0-9]){10}$)|(^[+][3][1]([\s-]*[0-9]){10}$)/,
  },
  fi: {
    regex: /(^([\s-]*[0-9]){6,10}$)|(^[+][3][5][8]([\s-]*[0-9]){6,10}$)/,
  },
};

const loanAmountsPerMarket = {
  se: { min: 10000, max: 2000000 },
  dk: { min: 10000, max: 1000000 },
  nl: { min: 1000, max: 100000 },
  be: { min: 1000, max: 100000 },
  fi: { min: 1000, max: 200000 },
};

const validateLoanAmount = (amount, market) => {
  if (isNaN(amount)) return false;
  if (typeof amount === "string") amount = parseInt(amount);
  const { min, max } = loanAmountsPerMarket[market.toLowerCase()];
  if (amount >= min && amount <= max) return true;
  return false;
};

const validatePhoneNumber = (phoneNumber, market) => {
  if (typeof phoneNumber === "number") phoneNumber = String(phoneNumber);
  return phoneNumerRegex[market.toLowerCase()].regex.test(phoneNumber);
};

const validatePersonalNumber = (personalNumber, market) => {
  // Declare as string
  if (typeof personalNumber !== "string") personalNumber = `${personalNumber}`;

  // Match agains market specific regex for personal number return false if market is not found
  const regexMatch = personalNumberRegex[market.toLowerCase()]
    ? personalNumberRegex[market.toLowerCase()].regex.test(personalNumber)
    : false;

  // Check if regex was a match and perform additional market specific tasks
  if (regexMatch) {
    // Check sweden specific task for personal number
    if (market.toLowerCase() === "se") {
      // Clean up personal number
      let sanetizedPersonalNumber = personalNumber.replace("-", "");
      if (sanetizedPersonalNumber.length === 12) {
        sanetizedPersonalNumber = sanetizedPersonalNumber.substring(2);
      }

      // Split up the person number and cast the values as integers
      const splitUpPersonalNumber = sanetizedPersonalNumber
        .split("")
        .map((value) => parseInt(value, 10));

      // Perform Luhn Algorith
      let totalValueFromPersonalNumber =
        splitUpPersonalNumber[sanetizedPersonalNumber.length - 1];
      splitUpPersonalNumber.forEach((value, i) => {
        if (i !== sanetizedPersonalNumber.length - 1) {
          let addThisToTotal = i % 2 === 0 ? value * 2 : value;
          if (addThisToTotal > 9) addThisToTotal -= 9;
          totalValueFromPersonalNumber += addThisToTotal;
        }
      });

      return totalValueFromPersonalNumber % 10 === 0;
    }
    return true;
  }
  return false;
};

/**
 *
 * @param {string} email Email to text against regex
 * @returns {boolean} This function returns a boolean value
 */
const validateEmail = (email) => {
  return emailRegex.test(email);
};

/**
 * This is a validator function to validate org numbers against market specific regex.
 *
 * @param {string | number} orgNumber Org number to test againt a market specific regex
 * @param {string} market Market to determine what regex to use
 * @returns {boolean} This function returns a boolean value
 */
const validateOrgNumber = (orgNumber, market) => {
  return orgNoRegex[market.toLowerCase()].regex.test(orgNumber);
};

/**
 * This functions tests if the loan term is between 1-18
 *
 * @param {string | number} loanTerm Loan term to test agains a regex
 * @returns {boolean} This function returns a boolean value
 */
const validateLoanTerm = (loanTerm) => {
  return loanTermRegex.test(loanTerm);
};

module.exports = {
  validatePersonalNumber,
  validateEmail,
  validateOrgNumber,
  validateLoanTerm,
  validateLoanAmount,
  validatePhoneNumber,
};
