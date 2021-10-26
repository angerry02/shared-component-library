const { makeResponse, handleError } = require("../../src/response");

describe("Test for makeResponse function", () => {
  test("returns statusCode 200", () => {
    expect.assertions(2);
    const response = makeResponse(200)("Succesfully tested");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("Succesfully tested");
  });

  test("returns statusCode 500", () => {
    expect.assertions(2);
    const response = makeResponse()("Internal server error");
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe("Internal server error");
  });

  test("returns statusCode 400", () => {
    expect.assertions(2);
    const response = makeResponse(400)("Bad request");
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Bad request");
  });
});

describe("Test errorHandler function", () => {
  test("returns statusCode 400", () => {
    expect.assertions(2);
    handleError({ statusCode: 400, message: "Bad request" }).then(
      (response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBe("Bad request");
      }
    );
  });

  test("Still return 500 without any params", () => {
    expect.assertions(2);
    handleError({ body: "error" }).then((response) => {
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe("error");
    });
  });

  test("Still return 500 without any params", () => {
    expect.assertions(2);
    handleError().then((response) => {
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe("Something went wrong");
    });
  });
});
