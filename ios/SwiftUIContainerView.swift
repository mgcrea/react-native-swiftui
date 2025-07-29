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

    if window != nil {
      // Add hosting controller to parent view controller hierarchy when view enters window
      if hostingController.parent == nil, let parentViewController = parentViewController {
        parentViewController.addChild(hostingController)
        #if os(iOS) || os(tvOS)
          hostingController.didMove(toParent: parentViewController)
        #endif
      }
    } else {
      // Intentionally NOT removing hosting controller when view leaves window.
      // This preserves SwiftUI view state and avoids expensive view tree reconstruction
      // when the view temporarily moves out of hierarchy (e.g., during navigation).
      // The hosting controller will be properly cleaned up when the container view is deallocated.
    }
  }

  override public func layoutSubviews() {
    super.layoutSubviews()
    // Auto Layout constraints handle the hosting controller's view sizing automatically
  }

  deinit {
    // Properly clean up the hosting controller when container view is deallocated
    hostingController.willMove(toParent: nil)
    hostingController.view.removeFromSuperview()
    hostingController.removeFromParent()
  }
}

// https://github.com/expo/expo/blob/main/packages/expo-modules-core/ios/Core/Views/SwiftUI/SwiftUIHostingView.swift
