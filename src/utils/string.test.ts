import { describe, expect, it } from "@jest/globals";
import { lowercaseFirstLetter } from "./string";

describe("lowercaseFirstLetter", () => {
  it("should lowercase the first letter of a string", () => {
    expect(lowercaseFirstLetter("Hello")).toBe("hello");
    expect(lowercaseFirstLetter("World")).toBe("world");
  });

  it("should leave the rest of the string unchanged", () => {
    expect(lowercaseFirstLetter("Hello World")).toBe("hello World");
    expect(lowercaseFirstLetter("JavaScript")).toBe("javaScript");
  });

  it("should handle empty string", () => {
    expect(lowercaseFirstLetter("")).toBe("");
  });

  it("should handle single character strings", () => {
    expect(lowercaseFirstLetter("A")).toBe("a");
    expect(lowercaseFirstLetter("Z")).toBe("z");
  });

  it("should handle strings that already start with lowercase", () => {
    expect(lowercaseFirstLetter("already lowercase")).toBe("already lowercase");
  });
});
