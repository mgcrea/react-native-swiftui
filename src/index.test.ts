import { describe, expect, it } from "@jest/globals";

import * as pkg from "./index";

describe("package root", () => {
  // `./components/SwiftUI` resolves to the *file* (the namespace component) over
  // the directory of the same name purely by resolution order. This pins that.
  it("exports the SwiftUI namespace component with its sub-components", () => {
    expect(typeof pkg.SwiftUI).toBe("function");
    expect(typeof pkg.SwiftUI.Button).toBe("function");
    expect(typeof pkg.SwiftUI.TextField).toBe("function");
    expect(typeof pkg.SFSymbol).toBe("object");
    expect(typeof pkg.SwiftUIPicker).toBe("object");
  });
});
