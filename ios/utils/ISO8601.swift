import Foundation

/// One formatter for both directions of the DatePicker bridge.
///
/// Emission and parsing used to build a fresh `ISO8601DateFormatter` per call,
/// with different options on each side. Formatters are expensive to create, and
/// the mismatch meant a value the app had itself emitted only parsed through the
/// lenient fallback below.
enum ISO8601 {
  private static let strict: ISO8601DateFormatter = {
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return formatter
  }()

  private static let withoutFractionalSeconds: ISO8601DateFormatter = {
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime]
    return formatter
  }()

  /// Accepts `yyyy-MM-dd'T'HH:mm:ss` with no zone designator. Pinned to UTC and
  /// the POSIX locale: without them the parse used the device zone and calendar,
  /// so the same string decoded to a different instant depending on the device.
  private static let lenient: DateFormatter = {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
    formatter.timeZone = TimeZone(identifier: "UTC")
    formatter.locale = Locale(identifier: "en_US_POSIX")
    return formatter
  }()

  static func string(from date: Date) -> String {
    strict.string(from: date)
  }

  static func date(from string: String) -> Date? {
    strict.date(from: string)
      ?? withoutFractionalSeconds.date(from: string)
      ?? lenient.date(from: string)
  }
}
