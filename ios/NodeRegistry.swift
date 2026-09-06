import Foundation

/// The one place a tree component is listed on iOS.
///
/// Decoding, view building, prop merging and event binding used to be four
/// hand-written `switch`es over the same twenty-two types, in three files. Each
/// props class now carries its own `nodeType`, `makeView` and `bindEvents`, and
/// this list is all that remains to edit when a component is added.
enum NodeRegistry {
  static let types: [any NodeProps.Type] = [
    ButtonProps.self,
    DatePickerProps.self,
    FormProps.self,
    GroupProps.self,
    HStackProps.self,
    ImageProps.self,
    LazyVGridProps.self,
    MultiPickerProps.self,
    NumberFieldProps.self,
    PickerProps.self,
    RectangleProps.self,
    SectionProps.self,
    SheetProps.self,
    SheetPickerProps.self,
    SliderProps.self,
    SpacerProps.self,
    StepperProps.self,
    TextProps.self,
    TextFieldProps.self,
    ToggleProps.self,
    VStackProps.self,
    ZStackProps.self,
  ]

  /// `type` string in the JSON -> decoder for that node.
  static let decoders: [String: (Decoder) throws -> any SwiftUINode] = Dictionary(
    uniqueKeysWithValues: types.map { type in
      (type.nodeType, { decoder in try type.makeNode(from: decoder) })
    }
  )
}
