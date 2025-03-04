import SwiftUI

extension UIView {
  var parentViewController: UIViewController? {
    var parentResponder: UIResponder? = self
    while let responder = parentResponder {
      if let viewController = responder as? UIViewController {
        return viewController
      }
      parentResponder = responder.next
    }
    return nil
  }
}

public class SwiftUIContainerView: UIView {
  public let hostingController: UIHostingController<AnyView>

  public init(rootView: AnyView) {
    hostingController = UIHostingController(rootView: rootView)
    super.init(frame: .zero)

    // Ensure the background is transparent
    #if os(iOS) || os(tvOS)
      hostingController.view.backgroundColor = .clear
    #endif

    // Add the hosting controller's view and set up constraints once.
    setupHostingView()
  }

  func setupHostingView() {
    addSubview(hostingController.view)
    setupHostingViewConstraints()
  }

  private func setupHostingViewConstraints() {
    guard let view = hostingController.view else {
      return
    }
    view.translatesAutoresizingMaskIntoConstraints = false

    NSLayoutConstraint.activate([
      view.topAnchor.constraint(equalTo: topAnchor),
      view.bottomAnchor.constraint(equalTo: bottomAnchor),
      view.leftAnchor.constraint(equalTo: leftAnchor),
      view.rightAnchor.constraint(equalTo: rightAnchor),
    ])
  }

  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // MARK: - UIView lifecycle

  override public func didMoveToWindow() {
    super.didMoveToWindow()

    if hostingController.parent == nil, let parentViewController = parentViewController {
      parentViewController.addChild(hostingController)
      #if os(iOS) || os(tvOS)
        hostingController.didMove(toParent: parentViewController)
      #endif
    } else {
      // hostingController.view.removeFromSuperview()
      // hostingController.removeFromParent()
    }
  }

  override public func layoutSubviews() {
    super.layoutSubviews()
    // Ensure the hosting controller's view fills the bounds.
    hostingController.view.frame = bounds
  }
}

// https://github.com/expo/expo/blob/main/packages/expo-modules-core/ios/Core/Views/SwiftUI/SwiftUIHostingView.swift
