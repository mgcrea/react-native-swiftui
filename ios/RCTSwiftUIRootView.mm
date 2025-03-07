#import "RCTSwiftUIRootView.h"

#import "./generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "./generated/RNSwiftUISpec/EventEmitters.h"
#import "./generated/RNSwiftUISpec/Props.h"
#import "./generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

@interface RCTSwiftUIRootView () <RCTComponentViewProtocol,
                                  RCTNativeSwiftUIRootViewProtocol>
@end

@implementation RCTSwiftUIRootView {
  SwiftUIRootView *_rootView;
}

// Support RCT_DYNAMIC_FRAMEWORKS
// (https://github.com/facebook/react-native/pull/37274)
+ (void)load {
  [super load];
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativeSwiftUIRootProps>();
    _props = defaultProps;
    _rootView = [SwiftUIRootView new];

    // Set up onChange callback
    __weak RCTSwiftUIRootView *weakSelf = self;
    _rootView.onEvent = ^(NSString *name, NSString *type, NSString *identifier,
                          NSString *_Nullable value) {
      __strong RCTSwiftUIRootView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitEvent:name type:type id:identifier value:value];
      }
    };

    self.contentView = _rootView;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativeSwiftUIRootProps const>(
          oldProps ? oldProps : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativeSwiftUIRootProps const>(props);
  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_rootView updatePropsWith:newViewPropsDict oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

// MARK: - Event Emitter

- (void)emitEvent:(NSString *)name
             type:(NSString *)type
               id:(NSString *)identifier

            value:(NSString *_Nullable)value {
  NativeSwiftUIRootEventEmitter::OnEvent event = {
      .name = std::string(name.UTF8String),
      .type = std::string(type.UTF8String),
      .id = std::string(identifier.UTF8String),
      .value = value ? std::string(value.UTF8String) : std::string()};

  self.eventEmitter.onEvent(event);
}

- (const NativeSwiftUIRootEventEmitter &)eventEmitter {
  return static_cast<const NativeSwiftUIRootEventEmitter &>(*_eventEmitter);
}

// MARK: - Props

static NSDictionary *convertProps(const NativeSwiftUIRootProps &props) {
  return @{
    @"viewTree" : [NSString stringWithUTF8String:props.viewTree.c_str()],
  };
}

// MARK: - RCTNativeSwiftUIRootViewProtocol

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
  RCTNativeSwiftUIRootHandleCommand(self, commandName, args);
}

- (void)updateChildProps:(NSString *)identifier props:(NSString *)propsJson {
  NSLog(@"updateChildProps called with identifier: %@, props: %@", identifier, propsJson);
//  @TODO
//  [_rootView updateChildProps:identifier props:propsJson];
}

// MARK: - RCTComponentViewProtocol

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      NativeSwiftUIRootComponentDescriptor>();
}

@end
