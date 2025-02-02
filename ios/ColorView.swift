import UIKit

// MARK: - Props

struct NativeColorViewProps {
  var color: String = ""
}

extension NativeColorViewProps {
  init(dictionary: [String: Any]) {
    color = dictionary["color"] as? String ?? ""
  }
}

// MARK: - ColorView

@objc(ColorView)
public class ColorView: UIView {
  private let contentView: UIView
  private var props: NativeColorViewProps

  override init(frame: CGRect) {
    contentView = UIView()
    props = NativeColorViewProps() // default props
    super.init(frame: frame)
    addSubview(contentView)
  }

  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    contentView.frame = bounds
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary: [String: Any]) {
    let newProps = NativeColorViewProps(dictionary: newDictionary)
    let oldProps = NativeColorViewProps(dictionary: oldDictionary)

    if newProps.color != oldProps.color,
       let updatedColor = hexStringToColor(newProps.color)
    {
      contentView.backgroundColor = updatedColor
    }
  }

  private func hexStringToColor(_ stringToConvert: String) -> UIColor? {
    let noHashString = stringToConvert.replacingOccurrences(of: "#", with: "")
    guard let hex = Int(noHashString, radix: 16) else { return nil }
    let r = CGFloat((hex >> 16) & 0xFF) / 255.0
    let g = CGFloat((hex >> 8) & 0xFF) / 255.0
    let b = CGFloat(hex & 0xFF) / 255.0
    return UIColor(red: r, green: g, blue: b, alpha: 1.0)
  }
}
