const Autcomplete = require("./autocomplete");

describe("autocomplete", () => {
  it("should return all words that start with the prefix", () => {
    const completer = new Autcomplete();
    completer
      .insert("Back to the Future", "some-primary-key")
      .insert("Back to the Future 2")
      .insert("Rocky")
      .insert("12 Angry Men");

    expect(completer.startsWith("Back")).toStrictEqual(["some-primary-key", "Back to the Future 2"]);
    expect(completer.startsWith("Rocky")).toStrictEqual(["Rocky"]);
  });
});
