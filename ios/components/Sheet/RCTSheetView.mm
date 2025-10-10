#import "RCTSheetView.h"

#import "../../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../../generated/RNSwiftUISpec/EventEmitters.h"
#import "../../generated/RNSwiftUISpec/Props.h"
#import "../../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativeSheetViewProps &props) {
  NSMutableArray *detentsArray = [NSMutableArray array];
  for (const auto &detent : props.detents) {
    [detentsArray addObject:[NSString stringWithUTF8String:detent.c_str()]];
  }

  NSMutableDictionary *dictionary = [@{
    @"isPresented" : @(props.isPresented),
    @"detents" : detentsArray,
  } mutableCopy];

  if (!props.title.empty()) {
    dictionary[@"title"] = [NSString stringWithUTF8String:props.title.c_str()];
  }
  if (!props.message.empty()) {
    dictionary[@"message"] =
        [NSString stringWithUTF8String:props.message.c_str()];
  }
  if (!props.primaryButtonTitle.empty()) {
    dictionary[@"primaryButtonTitle"] =
        [NSString stringWithUTF8String:props.primaryButtonTitle.c_str()];
  }
  if (!props.secondaryButtonTitle.empty()) {
    dictionary[@"secondaryButtonTitle"] =
        [NSString stringWithUTF8String:props.secondaryButtonTitle.c_str()];
  }

  return dictionary;
}

static bool areSheetPropsEqual(const NativeSheetViewProps &lhs,
                               const NativeSheetViewProps &rhs) {
  return lhs.isPresented == rhs.isPresented && lhs.detents == rhs.detents &&
         lhs.title == rhs.title && lhs.message == rhs.message &&
         lhs.primaryButtonTitle == rhs.primaryButtonTitle &&
         lhs.secondaryButtonTitle == rhs.secondaryButtonTitle;
}

@interface RCTSheetView () <RCTComponentViewProtocol>
@end

@implementation RCTSheetView {
  SheetContainer *_containerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<NativeSheetViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativeSheetViewProps>();
    _props = defaultProps;
    _containerView = [SheetContainer new];

    __weak RCTSheetView *weakSelf = self;
    _containerView.onDismiss = ^{
      __strong RCTSheetView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitDismissEvent];
      }
    };
    _containerView.onPrimaryAction = ^{
      __strong RCTSheetView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitPrimaryActionEvent];
      }
    };
    _containerView.onSecondaryAction = ^{
      __strong RCTSheetView *strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf emitSecondaryActionEvent];
      }
    };

    self.contentView = _containerView;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativeSheetViewProps const>(oldProps ? oldProps
                                                                     : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativeSheetViewProps const>(props);

  if (oldProps && areSheetPropsEqual(oldViewProps, newViewProps)) {
    [super updateProps:props oldProps:oldProps];
    return;
  }

  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict
                    oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

// MARK: - Event Emitter

- (void)emitDismissEvent {
  NativeSheetViewEventEmitter::OnNativeDismiss event = {};
  self.eventEmitter.onNativeDismiss(event);
}

- (void)emitPrimaryActionEvent {
  NativeSheetViewEventEmitter::OnNativePrimaryAction event = {};
  self.eventEmitter.onNativePrimaryAction(event);
}

- (void)emitSecondaryActionEvent {
  NativeSheetViewEventEmitter::OnNativeSecondaryAction event = {};
  self.eventEmitter.onNativeSecondaryAction(event);
}

- (const NativeSheetViewEventEmitter &)eventEmitter {
  return static_cast<const NativeSheetViewEventEmitter &>(*_eventEmitter);
}

@end
