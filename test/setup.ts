import { afterEach } from "@jest/globals";
// Imported by path rather than package specifier: jest substitutes this file for
// `react-native-nitro-modules` and keys its module registry by resolved path, so
// both routes reach the same instance — and this one also typechecks.
import { resetNitroMocks } from "../__mocks__/react-native-nitro-modules";

afterEach(() => {
  // The mock accumulates created host components and hybrid instances; without
  // this, assertions in one test see instances left over from earlier ones.
  resetNitroMocks();
});
