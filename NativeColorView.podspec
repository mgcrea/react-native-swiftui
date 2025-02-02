require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_config = get_folly_config()
folly_compiler_flags = folly_config[:compiler_flags]

Pod::Spec.new do |s|
  s.name         = "NativeColorView"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => '14.0' }
  s.source       = { :git => "https://github.com/mgcrea/react-native-local-storage.git", :tag => "#{s.version}" }

  s.pod_target_xcconfig = {
    "DEFINES_MODULE" => "YES",
    'SWIFT_COMPILATION_MODE' => 'wholemodule',
  }

  s.source_files = "ios/**/*.{m,mm,cpp,swift}"
  s.private_header_files = "ios/**/*.h"

  install_modules_dependencies(s)
end
