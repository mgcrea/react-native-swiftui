#import "RCTPickerView.h"

#import "../../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../../generated/RNSwiftUISpec/EventEmitters.h"
#import "../../generated/RNSwiftUISpec/Props.h"
#import "../../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativePickerViewProps &props) {
  NSMutableArray *optionsArray = [NSMutableArray array];
  for (const auto &option : props.options) {
    NSString *value = [NSString stringWithUTF8String:option.value.c_str()];
    NSString *label = option.label.empty()
                          ? value
                          : [NSString stringWithUTF8String:option.label.c_str()];
    NSMutableDictionary *optionDict = [@{
      @"label" : label,
      @"value" : value,
    } mutableCopy];
    if (!option.icon.empty()) {
      optionDict[@"icon"] = [NSString stringWithUTF8String:option.icon.c_str()];
    }
    [optionsArray addObject:optionDict];
  }

  std::string styleString = toString(props.pickerStyle);
  NSString *pickerStyle = [NSString stringWithUTF8String:styleString.c_str()];

  // Prefer value over selection if both provided
  NSString *selection = !props.value.empty()
                            ? [NSString stringWithUTF8String:props.value.c_str()]
                            : [NSString stringWithUTF8String:props.selection.c_str()];

  NSMutableDictionary *propsDictionary = [@{
    @"selection" : selection,
    @"label" : [NSString stringWithUTF8String:props.label.c_str()],
    @"options" : optionsArray,
    @"pickerStyle" : pickerStyle,
    @"disabled" : @(props.disabled),
  } mutableCopy];

  if (!props.labelColor.empty()) {
    NSString *labelColor =
        [NSString stringWithUTF8String:props.labelColor.c_str()];
    propsDictionary[@"labelColor"] = labelColor;
  }

  return propsDictionary;
}

@interface RCTPickerView () <RCTComponentViewProtocol>
@end

@implementation RCTPickerView {
  PickerContainer *_containerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      NativePickerViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativePickerViewProps>();
    _props = defaultProps;
    _containerView = [PickerContainer new];

    // Set up callback for selection changes
    __weak RCTPickerView *weakSelf = self;
    _containerView.onChange = ^(NSString *newValue) {
      __strong RCTPickerView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitChangeEventWithValue:newValue];
      }
    };

    self.contentView = _containerView;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativePickerViewProps const>(oldProps ? oldProps
                                                                      : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativePickerViewProps const>(props);
  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict
                    oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

// MARK: - Event Emitter

- (void)emitChangeEventWithValue:(NSString *)value {
  NativePickerViewEventEmitter::OnNativeChange event = {
      .value = value.UTF8String,
  };
  self.eventEmitter.onNativeChange(event);
}

- (const NativePickerViewEventEmitter &)eventEmitter {
  return static_cast<const NativePickerViewEventEmitter &>(*_eventEmitter);
}

@end
