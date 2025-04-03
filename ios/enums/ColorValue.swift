import Foundation

public enum ColorValue: Decodable {
  case string(String)
  case semantic(SemanticColor)
  case dynamic(DynamicColor)

  // Represents a semantic color, e.g., {"semantic": ["systemGreen"]}
  public struct SemanticColor: Decodable {
    let semantic: [String]
  }

  public enum ColorVariant: Decodable {
    case string(String)
    case semantic(SemanticColor)

    public init(from decoder: Decoder) throws {
      let container = try decoder.singleValueContainer()
      if let str = try? container.decode(String.self) {
        self = .string(str)
      } else if let semantic = try? container.decode(SemanticColor.self) {
        self = .semantic(semantic)
      } else {
        throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid color variant")
      }
    }
  }

  // Represents the light/dark pair, e.g., {"light": {...}, "dark": {...}}
  public struct DynamicColor: Decodable {
    let light: ColorVariant
    let dark: ColorVariant
  }

  // Handles the wrapper, e.g., {"dynamic": {...}}
  private struct DynamicWrapper: Decodable {
    let dynamic: DynamicColor
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()
    if let str = try? container.decode(String.self) {
      self = .string(str)
    } else if let semantic = try? container.decode(SemanticColor.self) {
      self = .semantic(semantic)
    } else if let dynamicWrapper = try? container.decode(DynamicWrapper.self) {
      self = .dynamic(dynamicWrapper.dynamic)
    } else {
      throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid color value")
    }
  }
}
