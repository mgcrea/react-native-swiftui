// SectionProps.swift
import SwiftUI

public final class SectionProps: ObservableObject {
    @Published public var header: String
    @Published public var footer: String
    @Published public var isCollapsed: Bool

    public init(
        header: String = "",
        footer: String = "",
        isCollapsed: Bool = false
    ) {
        self.header = header
        self.footer = footer
        self.isCollapsed = isCollapsed
    }

    public func update(with newDictionary: [String: Any]) {
        if let header = newDictionary["header"] as? String {
            self.header = header
        }
        if let footer = newDictionary["footer"] as? String {
            self.footer = footer
        }
        if let isCollapsed = newDictionary["isCollapsed"] as? Bool {
            self.isCollapsed = isCollapsed
        }
    }
}
