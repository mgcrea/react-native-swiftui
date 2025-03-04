#import "RCTDatePickerView.h"

#import "../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../generated/RNSwiftUISpec/EventEmitters.h"
#import "../generated/RNSwiftUISpec/Props.h"
#import "../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativePickerViewProps &props) {
  NSMutableArray *optionsArray = [NSMutableArray array];
  for (const auto &option : props.options) {
    [optionsArray addObject:[NSString stringWithUTF8String:option.c_str()]];
  }
  NSLog(@"pickerStyle: %d", props.pickerStyle);
  std::string styleString = toString(props.pickerStyle);
  NSString *pickerStyle = [NSString stringWithUTF8String:styleString.c_str()];
  NSLog(@"pickerStyle: %@", pickerStyle);

  return @{
    @"selection" : [NSString stringWithUTF8String:props.selection.c_str()],
    @"options" : optionsArray,
    @"pickerStyle" : pickerStyle
  };
}

@interface RCTDatePickerView () <RCTComponentViewProtocol>
@end

@implementation RCTDatePickerView {
  PickerContainerView *_containerView;
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
    _containerView = [PickerContainerView new];

    // Set up callback for selection changes
    __weak RCTDatePickerView *weakSelf = self;
    _containerView.onChange = ^(NSString *newValue) {
      __strong RCTDatePickerView *strongSelf = weakSelf;
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
  NativePickerViewEventEmitter::OnChange event = {
      .value = value.UTF8String,
  };
  self.eventEmitter.onChange(event);
}

- (const NativePickerViewEventEmitter &)eventEmitter {
  return static_cast<const NativePickerViewEventEmitter &>(*_eventEmitter);
}

@end
