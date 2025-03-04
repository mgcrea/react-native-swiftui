#import "RCTPopoverView.h"

#import "../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../generated/RNSwiftUISpec/EventEmitters.h"
#import "../generated/RNSwiftUISpec/Props.h"
#import "../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativePopoverViewProps &props) {
  NSMutableArray *optionsArray = [NSMutableArray array];
  for (const auto &option : props.options) {
    [optionsArray addObject:[NSString stringWithUTF8String:option.c_str()]];
  }

  return @{
    @"selection" : [NSString stringWithUTF8String:props.selection.c_str()],
    @"options" : optionsArray,
  };
}

@interface RCTPopoverView () <RCTComponentViewProtocol>
@end

@implementation RCTPopoverView {
  PopoverView *_containerView;
  // PopoverView *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      NativePopoverViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativePopoverViewProps>();
    _props = defaultProps;
    _containerView = [PopoverView new];

    // [_containerView addSubview:_view];
    self.contentView = _containerView;
    // self.contentView = _view;
  }
  return self;
}

// - (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
//   // Delegate to the Swift view to insert the subview inside its contentView.
//   [_view reactInsertSubview:subview at:atIndex];
// }

// - (void)removeReactSubview:(UIView *)subview {
//   [_view reactRemoveSubview:subview];
// }

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativePopoverViewProps const>(
          oldProps ? oldProps : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativePopoverViewProps const>(props);
  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict
                    oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

// Class<RCTComponentViewProtocol> FabricDeclarativeViewCls(void) {
//   return RCTPopoverView.class;
// }

@end
