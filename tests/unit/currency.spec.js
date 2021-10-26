const {
  getCurrency,
  formatNumber,
  formatNumberWithCurrency,
} = require("../../src/currency");

describe("Test for currency handling", () => {
  test.each([
    ["Swedish market lowercase input", "se", { currency: "SEK", unit: "kr" }],
    ["Swedish market uppercase input", "SE", { currency: "SEK", unit: "kr" }],
    ["Swedish market mixed input", "sE", { currency: "SEK", unit: "kr" }],
    ["Swedish market mixed input", "Se", { currency: "SEK", unit: "kr" }],
    ["Danish market normal input", "dk", { currency: "DKK", unit: "kr" }],
    ["Belgian market normal input", "be", { currency: "EUR", unit: "€" }],
    ["Netherlands market normal input", "nl", { currency: "EUR", unit: "€" }],
    ["Finish market normal input", "fi", { currency: "EUR", unit: "€" }],
  ])(
    "Get correct currency object with context: %s, with market %s",
    (_, market, obj) => {
      expect(getCurrency(market)).toMatchObject(obj);
    }
  );
});

describe("Test for number formatting", () => {
  test.each([
    ["se", 12345.1, "12\xa0345,1"],
    ["dk", 12345.1, "12.345,1"],
    ["be", 12345.1, "12.345,1"],
    ["nl", 12345.1, "12.345,1"],
    ["fi", 12345.1, "12\xa0345,1"],
  ])(
    "Format numbers correctly based on their market: %s, and amount %s",
    (market, amount, expected) => {
      expect(formatNumber(market, amount)).toBe(expected);
    }
  );
});

describe("Test for number formatting with currency", () => {
  test.each([
    ["se", 12345.1, "12\xa0345,1 kr"],
    ["dk", 12345.1, "12.345,1 kr"],
    ["be", 12345.1, "€ 12.345,1"],
    ["nl", 12345.1, "€ 12.345,1"],
    ["fi", 12345.1, "€ 12\xa0345,1"],
  ])(
    "Format numbers with currency correctly based on their market: %s, and amount %s",
    (market, amount, expected) => {
      expect(formatNumberWithCurrency(market, amount)).toBe(expected);
    }
  );
});
