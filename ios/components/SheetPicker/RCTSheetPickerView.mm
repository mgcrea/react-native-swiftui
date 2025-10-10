#import "RCTSheetPickerView.h"

#import "../../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../../generated/RNSwiftUISpec/EventEmitters.h"
#import "../../generated/RNSwiftUISpec/Props.h"
#import "../../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativeSheetPickerViewProps &props) {
  NSMutableArray *optionsArray = [NSMutableArray array];
  for (const auto &option : props.options) {
    NSString *label = [NSString stringWithUTF8String:option.label.c_str()];
    NSString *value = [NSString stringWithUTF8String:option.value.c_str()];
    [optionsArray addObject:@{ @"label" : label, @"value" : value }];
  }

  NSString *title = [NSString stringWithUTF8String:props.title.c_str()];
  NSString *searchPlaceholder = [NSString stringWithUTF8String:props.searchPlaceholder.c_str()];
  NSString *selectedValue = [NSString stringWithUTF8String:props.selectedValue.c_str()];

  return @{
    @"isPresented" : @(props.isPresented),
    @"title" : title ?: @"",
    @"searchPlaceholder" : searchPlaceholder ?: @"",
    @"selectedValue" : selectedValue ?: @"",
    @"options" : optionsArray,
    @"autoDismiss" : @(props.autoDismiss),
  };
}

static bool optionsAreEqual(const std::vector<NativeSheetPickerViewOptionsStruct> &lhs,
                               const std::vector<NativeSheetPickerViewOptionsStruct> &rhs) {
  if (lhs.size() != rhs.size()) {
    return false;
  }
  for (size_t i = 0; i < lhs.size(); ++i) {
    if (lhs[i].label != rhs[i].label || lhs[i].value != rhs[i].value) {
      return false;
    }
  }
  return true;
}

static bool areSheetPickerPropsEqual(const NativeSheetPickerViewProps &lhs,
                                     const NativeSheetPickerViewProps &rhs) {
  return lhs.isPresented == rhs.isPresented && lhs.title == rhs.title &&
         lhs.searchPlaceholder == rhs.searchPlaceholder &&
         lhs.selectedValue == rhs.selectedValue && lhs.autoDismiss == rhs.autoDismiss &&
         optionsAreEqual(lhs.options, rhs.options);
}

@interface RCTSheetPickerView () <RCTComponentViewProtocol>
@end

@implementation RCTSheetPickerView {
  SheetPickerContainer *_containerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<NativeSheetPickerViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativeSheetPickerViewProps>();
    _props = defaultProps;
    _containerView = [SheetPickerContainer new];

    __weak RCTSheetPickerView *weakSelf = self;
    _containerView.onSelect = ^(NSString *value) {
      __strong RCTSheetPickerView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitSelectEvent:value];
      }
    };
    _containerView.onDismiss = ^{
      __strong RCTSheetPickerView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitDismissEvent];
      }
    };

    self.contentView = _containerView;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativeSheetPickerViewProps const>(oldProps ? oldProps
                                                                           : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativeSheetPickerViewProps const>(props);

  if (oldProps && areSheetPickerPropsEqual(oldViewProps, newViewProps)) {
    [super updateProps:props oldProps:oldProps];
    return;
  }

  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

// MARK: - Event Emitter

- (void)emitSelectEvent:(NSString *)value {
  NativeSheetPickerViewEventEmitter::OnNativeSelect event = {
      .value = value.UTF8String,
  };
  self.eventEmitter.onNativeSelect(event);
}

- (void)emitDismissEvent {
  NativeSheetPickerViewEventEmitter::OnNativeDismiss event = {};
  self.eventEmitter.onNativeDismiss(event);
}

- (const NativeSheetPickerViewEventEmitter &)eventEmitter {
  return static_cast<const NativeSheetPickerViewEventEmitter &>(*_eventEmitter);
}

@end
