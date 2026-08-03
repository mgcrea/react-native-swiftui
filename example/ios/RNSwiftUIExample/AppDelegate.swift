import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    // Allow `simctl launch <device> <bundleId> -initialURL rnswiftui://FullForm` to open a
    // deep link on a cold start. Opening the URL with `simctl openurl` instead makes iOS show
    // an "Open in ...?" confirmation, which cannot be dismissed from an automated run.
    var options = launchOptions ?? [:]
    let arguments = ProcessInfo.processInfo.arguments
    if let flag = arguments.firstIndex(of: "-initialURL"),
       let url = arguments.indices.contains(flag + 1) ? URL(string: arguments[flag + 1]) : nil {
      options[.url] = url
    }

    factory.startReactNative(
      withModuleName: "RNSwiftUIExample",
      in: window,
      launchOptions: options
    )

    return true
  }

  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    RCTLinkingManager.application(app, open: url, options: options)
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
