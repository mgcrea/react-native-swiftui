require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_config = get_folly_config()
folly_compiler_flags = folly_config[:compiler_flags]

Pod::UI.puts "[react-native-swiftui] Thank you for using react-native-swiftui ❤️ ! If you enjoy it, please consider sponsoring at https://github.com/sponsors/mgcrea"

Pod::Spec.new do |s|
  s.name         = "RNSwiftUI"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => '15.1' }
  s.source       = { :git => "https://github.com/mgcrea/react-native-swiftui.git", :tag => "#{s.version}" }

  s.pod_target_xcconfig = {
    'SWIFT_COMPILATION_MODE' => 'wholemodule',
  }

  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"

  load 'nitrogen/generated/ios/RNSwiftUI+autolinking.rb'
  add_nitrogen_files(s)

  install_modules_dependencies(s)
end
