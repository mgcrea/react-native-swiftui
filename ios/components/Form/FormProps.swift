// FormProps.swift
import SwiftUI

public final class FormProps: ObservableObject, Decodable {
    public init() {}

    public required init(from _: Decoder) throws {}

    public func merge(from _: FormProps) {
        // No properties to merge
    }
}
