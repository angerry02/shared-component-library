const countyValues = {
  se: { currency: "SEK", currencyUnit: "kr", locale: "sv-SE" },
  dk: { currency: "DKK", currencyUnit: "kr", locale: "da-DK" },
  nl: { currency: "EUR", currencyUnit: "€", locale: "nl-NL" },
  fi: { currency: "EUR", currencyUnit: "€", locale: "fi-FI" },
  be: { currency: "EUR", currencyUnit: "€", locale: "nl-BE" },
};

/**
 *
 * @param {string} market
 */
const getCurrency = (market) => {
  // Cast the market to lower case to minimize the risk of error in input value
  const formatedMarket = market.toLowerCase();
  try {
    return {
      currency: countyValues[formatedMarket].currency,
      unit: countyValues[formatedMarket].currencyUnit,
    };
  } catch (error) {
    throw new Error("Error in currency");
  }
};

/**
 *
 * @param {string} market
 * @param {number} amount
 */
const formatNumber = (market, amount) => {
  // Cast the market to lower case to minimize the risk of error in input value
  const formatedMarket = market.toLowerCase();

  // Cast the amount to integer value to minimize the risk of error in input value
  let formatedAmount;
  if (typeof amount === "string") formatedAmount = parseInt(amount, 10);
  else formatedAmount = amount;

  // return formated number according to the market
  return new Intl.NumberFormat(countyValues[formatedMarket].locale, {
    currency: countyValues[formatedMarket].currency,
    style: "decimal",
  }).format(formatedAmount);
};

/**
 *
 * @param {string} market
 * @param {string | number} amount
 */
const formatNumberWithCurrency = (market, amount) => {
  // Cast the market to lower case to minimize the risk of error in input value
  const formatedMarket = market.toLowerCase();

  // Cast the amount to integer value to minimize the risk of error in input value
  let formatedAmount;
  if (typeof amount === "string") formatedAmount = parseInt(amount, 10);
  else formatedAmount = amount;

  // Setup the prefix if the currency of the current market demands
  const prefixedCurrency =
    formatedMarket === "be" ||
    formatedMarket === "nl" ||
    formatedMarket === "fi"
      ? `${countyValues[formatedMarket].currencyUnit} `
      : "";

  // Setup the postfix if the currency of the current formatedMarket demands
  const postfixedCurrency =
    formatedMarket === "se" || formatedMarket === "dk"
      ? ` ${countyValues[formatedMarket].currencyUnit}`
      : "";

  // Format the number according to the Intl library
  const intlFormatedAmount = formatNumber(formatedMarket, formatedAmount);

  return `${prefixedCurrency}${intlFormatedAmount}${postfixedCurrency}`;
};

module.exports = {
  getCurrency,
  formatNumber,
  formatNumberWithCurrency,
};
