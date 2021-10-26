const {
  validateEmail,
  validateOrgNumber,
  validateLoanTerm,
  validatePersonalNumber,
  validateLoanAmount,
  validatePhoneNumber,
} = require("../../src/validators");

describe("Test for validators", () => {
  test.each([
    // Swedish market
    [10000, "se"],
    [1538227.87, "se"],
    [2000000, "se"],
    ["10000", "se"],
    ["100000.54", "se"],
    // Fi Market
    [1000, "fi"],
    [124987, "fi"],
    [200000, "fi"],
    ["1000", "fi"],
    ["10000", "fi"],
    // DK Market
    [10000, "dk"],
    [354341, "dk"],
    [1000000, "dk"],
    ["10000", "dk"],
    ["100000", "dk"],
    // BE Market
    [1000, "be"],
    [64732, "be"],
    [100000, "be"],
    ["1000", "bE"],
    ["10000", "BE"],
    // NL Market
    [1000, "nl"],
    [64732, "nl"],
    [100000, "nl"],
    ["1000", "nL"],
    ["10000", "Nl"],
  ])("Valid LoanAmount with: %s and market: %s", (loanAmount, market) => {
    expect(validateLoanAmount(loanAmount, market)).toBe(true);
  });

  test.each([
    // Swedish market
    [550910782633, "se"],
    [null, "se"],
    [undefined, "se"],
    [10, "se"],
    ["1000 kr", "se"],
    ["10000 eur", "se"],
    // Fi Market
    [550910782633, "fi"],
    [null, "fi"],
    [undefined, "fi"],
    [10, "fi"],
    ["1000 kr", "fi"],
    ["10000 eur", "fi"],
    // DK Market
    [550910782633, "dk"],
    [null, "dk"],
    [undefined, "dk"],
    [10, "dk"],
    ["10000 kr", "dk"],
    ["100000 eur", "dk"],
    ["100000 eur", "dk"],
    // BE Market
    [550910782633, "be"],
    [null, "be"],
    [false, "be"],
    [true, "be"],
    [undefined, "be"],
    [10, "be"],
    ["1000 kr", "bE"],
    ["10000 eur", "BE"],
    ["€1000", "BE"],
    ["", "BE"],
    [" ", "BE"],
    ["Hejsan", "BE"],
    ["#€&%/", "BE"],
    // NL Market
    [550910782633, "nl"],
    [null, "nl"],
    [undefined, "nl"],
    [10, "nl"],
    ["1000 kr", "nL"],
    ["10000 eur", "Nl"],
  ])("Invalid LoanAmount with: %s and market: %s", (loanAmount, market) => {
    expect(validateLoanAmount(loanAmount, market)).toBe(false);
  });

  test.each([
    // Swedish market
    ["as number", 5509107826, "se"],
    ["no dash and no centry", "0101013456", "se"],
    ["with dash and centry added", "19880826-1740", "se"],
    ["no dash and centry added", "197801064176", "se"],
    ["no dash and centry added", "195509107826", "Se"],
    ["no dash and no centry", "8808261740", "se"],
    ["with dash and no centry", "780106-4176", "SE"],
    // NO market
    ["as personal number as string", "27053926647", "NO"],
    ["as birth month december", "12129926647", "NO"],
    ["as personal number as number", 27053926647, "NO"],
    ["as d number as string", "77053866647", "NO"],
    ["as d number as number", 77053816647, "NO"],
    // Fi Market
    ["as number", 2801064176, "fi"],
    ["no dash", "2801064176", "fi"],
    ["with dash", "010629-4176", "fi"],
    ["no dash and no centry", "0101013456", "fi"],
    ["no dash and lowercase letter", "311210782h", "fi"],
    ["with dash and uppercase letter", "250888-174B", "fi"],
    ["with dash and uppercase market", "010100-4176", "FI"],
    // DK Market
    ["as number", 2801064176, "dk"],
    ["no dash and numbers", "2801064176", "dk"],
    ["with dash and number", "010629-4176", "dk"],
    ["no dash and no centry", "0101013456", "dk"],
    ["no dash and letters", "311210GsFh", "dk"],
    ["with dash and letters", "250888-shhB", "dk"],
    ["with dash and number and uppercase market", "010100-4176", "DK"],
    // BE Market
    ["as numbers", 55091078263, "be"],
    ["with dash and no periods", "880826-17407", "be"],
    ["no dash and no periods", "78010641767", "be"],
    ["no dash and no periods", "55091078267", "be"],
    ["no dash and no periods", "88082617405", "be"],
    ["with dash and no periods", "780106-41766", "be"],
    ["with dash and periods at all valid places", "85.12.12-123.93", "be"],
    ["with dash and period after year and month ", "85.12.12-12393", "be"],
    ["with dash and period after year", "85.1212-12393", "be"],
    ["with dash and period before checksum", "851212-123.93", "be"],
    ["period before checksum", "851212123.93", "be"],
    ["period after year, month and before checksum", "85.12.12123.93", "be"],
    ["period after year and month", "85.12.1212393", "be"],
    ["period after year", "85.121212393", "be"],
  ])(
    "Valid personalNumber in context: %s, with: %s and market: %s",
    (_, personalNumber, market) => {
      expect(validatePersonalNumber(personalNumber, market)).toBe(true);
    }
  );

  test.each([
    // SE Market
    ["just the year", "55", "se"],
    ["invalid format (double dash)", "19880826--1740", "se"],
    ["too many numbers", "1978567567064176", "se"],
    ["incorrect control number", "195509107823", "se"],
    ["empty string", "", "se"],
    // Weird market with correct orgnumber for SE
    ["valid se, fi, dk PN and incorrect market", "0101013456", "e"],
    ["valid se, fi, dk PN and empty string as market", "0101013456", ""],
    [
      "valid se, fi, dk PN and incorrect market",
      "0101013456",
      "SomeMarketThatWeDontHave",
    ],
    ["NL should not exist as a market", "0101013456", "NL"],
    // NO market
    ["first number is not 0-7 as string", "87053926647", "NO"],
    ["birth month is number 13", "27133926647", "NO"],
    ["first number is not 0-7 as number", 97053926647, "NO"],
    ["too few numbers and wrong first number", 970539267, "NO"],
    ["too few numbers", 2705392664, "NO"],
    ["with a dash", "77053866-647", "NO"],
    ["with multiple dashes", "7-7 0--53866-647", "NO"],
    ["empty string", "", "NO"],
    ["with dash and space", "77053 866-647", "NO"],
    ["too many numbers", 770538166472, "NO"],
    ["too few numbers", 5705386647, "NO"],
    // FI market
    ["too many numbers (check digits)", "28010641762", "fi"],
    ["too few numbers (check digits)", "010629-416", "fi"],
    ["second to last cant be a character", "31121078Hh", "fi"],
    ["invalid format (double dash)", "250888--174B", "fi"],
    ["date formating in wrong order", "7801064176", "fi"],
    // DK Market
    ["too many numbers (check digits)", "28010641762", "dk"],
    ["invalid format (double dash)", "010629--4176", "dk"],
    ["invalid format (combining numbers and characters)", "3112106sFh", "dk"],
    [
      "invalid format (combining numbers and characters with dash)",
      "250888-s96B",
      "dk",
    ],
    ["first two digits are invalid", "780106-4176", "DK"],
    // BE Market
    ["too long & primitive number", 5509107826333523, "be"],
    ["invalid format (double dash)", "880826--17407", "be"],
    ["invalid format (slash and space)", "78010641/ 767", "be"],
    ["invalid format (empty)", "", "be"],
    ["invalid character", "8808261740H", "bE"],
    ["too many numbers after dash", "780106-417625", "BE"],
    ["incorrect format (spaces)", "780 10641 778", "be"],
    ["too many numbers", "550910782677 ", "be"],
    ["invalid format (periods)", "55..091078277", "be"],
    ["invalid format (periods)", "55.0.91078277", "be"],
    ["invalid format (periods)", ".55091078277", "be"],
    ["invalid format (periods)", "55091078277.", "be"],
    ["invalid format (periods)", "55091.078277", "be"],
    ["invalid format (periods)", "550910.78677", "be"],
    ["invalid format (periods)", "5509107.8277", "be"],
    ["invalid format (periods)", "55091078.277", "be"],
  ])(
    "Should test context: %s, with value: %s and market: %s",
    (_, personalNumber, market) => {
      expect(validatePersonalNumber(personalNumber, market)).toBe(false);
    }
  );

  test.each([
    "email.email@email.com",
    "email@email.se",
    "email.email@email.co.uk",
    "email.e2233mail@emaw445il.com",
  ])("Email should be valid with: %s", (email) => {
    expect(validateEmail(email)).toBe(true);
  });

  test.each([
    "email.emailmail.com",
    "email@email.s",
    "email @email.com",
    "email.email@email",
    "email.e2233mail@emaw445il.c35om",
  ])("Email should be invalid with: %s", (email) => {
    expect(validateEmail(email)).toBe(false);
  });

  test.each([
    ["1234567891", "se"],
    ["1234567891", "SE"],
    ["123456-7891", "se"],
    ["923456789", "no"],
    ["823456789", "no"],
    ["923456789", "NO"],
    ["823456789", "NO"],
    ["923456789", "no"],
    ["12345678", "fi"],
    ["1234567-8", "fi"],
    ["12345678", "dk"],
    ["12345678", "nl"],
    ["123456789", "be"],
    ["1234567891", "be"],
  ])("%s Should be a valid org number for market: %s", (value, market) => {
    expect(validateOrgNumber(value, market)).toBe(true);
  });

  test.each([
    ["12345678911", "se"],
    ["123456--7891", "se"],
    ["123456--7891", "SE"],
    ["123456789", "se"],
    ["2345678", "no"],
    ["723456789", "no"],
    ["9234567891", "NO"],
    ["9234567", "NO"],
    ["8234567891", "NO"],
    ["82345 6789", "NO"],
    ["212345678", "no"],
    ["92345-678", "no"],
    ["123456788", "fi"],
    ["1234567-88", "fi"],
    ["1234567", "fi"],
    ["1234567--2", "fi"],
    ["123456789", "dk"],
    ["1234567", "dk"],
    ["1234567", "nl"],
    ["12345678B01", "nl"],
    ["1234567891b01", "nl"],
    ["123456789101", "nl"],
    ["1234567891 01", "nl"],
    ["1234567891 b01", "nl"],
    ["12345678", "be"],
    ["12345678911", "be"],
    ["1234 5678 911", "be"],
  ])("%s Should be an invalid org number for market: %s", (value, market) => {
    expect(validateOrgNumber(value, market)).toBe(false);
  });

  test.each(["1", "3", "6", "10", "12", "18", "24", 1, 3, 6, 10, 12, 18, 24])(
    "%s Should be a valid loan term",
    (loanTerm) => {
      expect(validateLoanTerm(loanTerm)).toBe(true);
    }
  );

  test.each(["0", "25", "29", "30", "-1", 0, -2, 25])(
    "%s Should be an invalid loan term",
    (loanTerm) => {
      expect(validateLoanTerm(loanTerm)).toBe(false);
    }
  );

  test.each([
    [12345678, "se"],
    ["123456789", "se"],
    ["1234567891", "se"],
    ["12 3456-7891", "SE"],
    ["12 34 56 78 91", "SE"],
    ["12-34-57-89-1", "SE"],
    ["+46 1234-5678", "SE"],
    ["+461-234-56789", "se"],
    ["+46 01234-567 89", "SE"],

    [12345678, "no"],
    [123456789123, "no"],
    ["12345678", "no"],
    ["123456781234", "NO"],
    ["12 3456-78 12 34", "no"],
    ["12 3456-78 12 3", "no"],
    ["12 3456-78 12-34", "no"],
    ["12 34 56 78 12 34", "no"],
    ["12-34-567-8-91", "NO"],
    ["12-34-567-8-9123", "NO"],
    ["12-34-567-891 23", "NO"],
    ["+47 1234-567 8234", "no"],
    ["+471-234-5678 9123", "NO"],
    ["+47 01 234-56 7891-2", "no"],

    ["12345678", "dk"],
    ["123456789", "dk"],
    ["1234567891", "DK"],
    ["12- 34 567-89 1", "DK"],
    ["+45 12 34-5678", "DK"],
    ["+451-234-56789", "dk"],
    ["+45 01234-567 89", "DK"],

    ["123456", "fi"],
    ["1-2-34 56", "fi"],
    ["1234567", "fi"],
    ["12345678", "fi"],
    ["123456789", "FI"],
    ["1234567891", "FI"],
    ["+358 12 34-56", "fi"],
    ["+3581-234-567", "fi"],
    ["+358 01234-567 8", "FI"],
    ["+358 01234-567 89", "fi"],

    ["123456789", "be"],
    ["1234567891", "BE"],
    ["12- 345 678 9-1", "be"],
    ["+32 12 34-5678", "be"],
    ["+321-234-5679", "BE"],
    ["+32 01234-567 89", "be"],

    ["1234567891", "NL"],
    ["12- 345 678 9-1", "nl"],
    ["+31 12 34-567891", "nl"],
    ["+31-1234-567891", "NL"],
    ["+31 1234-567 891", "nl"],
  ])("%s Should be an valid phone number for market: %s", (value, market) => {
    expect(validatePhoneNumber(value, market)).toBe(true);
  });

  test.each([
    [1234567, "se"],
    ["12345678912", "se"],
    ["+46 1234-5678912", "SE"],
    ["+461-23+4-56789", "se"],
    ["46 01234-567 89", "SE"],
    ["+4 01234-567 89", "SE"],
    ["+40 1234-567 89", "SE"],

    [1234567, "no"],
    [1234567891234, "no"],
    ["1234567", "no"],
    ["1234567891234", "NO"],
    ["12 3456-789 12 34", "no"],
    ["12 3456-789 12-34", "no"],
    ["12 34 56 789 12 34", "no"],
    ["12-34-567-8-91234", "NO"],
    ["12-34-567-8-91234", "NO"],
    ["12-34-567-891 234", "NO"],
    ["+47 1234-567 892-345", "no"],
    ["+471-234-5678 91234", "NO"],
    ["+47 01 234-56 7891-22", "no"],

    ["1234567", "dk"],
    ["12345678912", "dk"],
    ["12- 34 567-89 12", "DK"],
    ["+42 12 34-5678", "DK"],
    ["+401-234-56789", "dk"],
    ["+45 01/23+4-567 89", "DK"],

    ["12345", "fi"],
    ["1-2-34 5678912", "fi"],
    ["+358 12 34-56789123", "fi"],
    ["+3481-234-567", "fi"],
    ["+359 01234-567 8", "FI"],
    ["+3+58 01234-567 89", "fi"],

    ["12345678", "be"],
    ["12345678912", "BE"],
    ["12- 345 678 9-1234", "be"],
    ["+3+2 12 34-5678", "be"],
    ["+321-234-56792344", "BE"],
    ["+31 01234-567 89", "be"],

    ["12345678912", "NL"],
    ["12- 345 678 9-12", "nl"],
    ["+30 12 34-567891", "nl"],
    ["+32-1234-567891", "NL"],
    ["31 1234-567 891", "nl"],
  ])("%s Should be an invalid phone number for market: %s", (value, market) => {
    expect(validatePhoneNumber(value, market)).toBe(false);
  });
});
