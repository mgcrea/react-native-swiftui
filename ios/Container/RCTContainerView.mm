#import "RCTContainerView.h"

#import "../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../generated/RNSwiftUISpec/EventEmitters.h"
#import "../generated/RNSwiftUISpec/Props.h"
#import "../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

@interface RCTContainerView () <RCTComponentViewProtocol>
@end

@implementation RCTContainerView {
  ContainerView *_containerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
  NativeContainerViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const NativeContainerViewProps>();
        _props = defaultProps;
        _containerView = [ContainerView new];

        // Set up onChange callback
        __weak RCTContainerView *weakSelf = self;
        _containerView.onChange = ^(NSString *value, NSString *type, NSString *identifier) {
            __strong RCTContainerView *strongSelf = weakSelf;
            if (strongSelf) {
                [strongSelf emitChangeEventWithValue:value type:type id:identifier];
            }
        };

        self.contentView = _containerView;
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativeContainerViewProps const>(oldProps ? oldProps
                                                                   : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativeContainerViewProps const>(props);
  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict
                    oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

// MARK: - Event Emitter

- (void)emitChangeEventWithValue:(NSString *)value type:(NSString *)type id:(NSString *)identifier {
    NativeContainerViewEventEmitter::OnChange event = {
        .value = std::string(value.UTF8String),
        .type = std::string(type.UTF8String),
        .id = std::string(identifier.UTF8String)
    };
    self.eventEmitter.onChange(event);
}

- (const NativeContainerViewEventEmitter &)eventEmitter {
  return static_cast<const NativeContainerViewEventEmitter &>(*_eventEmitter);
}

// MARK: - Props

static NSDictionary *convertProps(const NativeContainerViewProps &props) {
  return @{
    @"viewTree" : [NSString stringWithUTF8String:props.viewTree.c_str()],
  };
}

@end
