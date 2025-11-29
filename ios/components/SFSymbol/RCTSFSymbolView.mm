#import "RCTSFSymbolView.h"

#import "../../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../../generated/RNSwiftUISpec/EventEmitters.h"
#import "../../generated/RNSwiftUISpec/Props.h"
#import "../../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativeSFSymbolViewProps &props) {
  NSMutableDictionary *propsDictionary = [@{
    @"name" : [NSString stringWithUTF8String:props.name.c_str()],
    @"textStyle" : [NSString stringWithUTF8String:toString(props.textStyle).c_str()],
    @"weight" : [NSString stringWithUTF8String:toString(props.weight).c_str()],
    @"scale" : [NSString stringWithUTF8String:toString(props.scale).c_str()],
    @"renderingMode" : [NSString stringWithUTF8String:toString(props.renderingMode).c_str()],
  } mutableCopy];

  if (props.size > 0) {
    propsDictionary[@"size"] = @(props.size);
  }

  if (props.variableValue >= 0) {
    propsDictionary[@"variableValue"] = @(props.variableValue);
  }

  if (!props.colors.empty()) {
    NSMutableArray *colorsArray = [NSMutableArray array];
    for (const auto &color : props.colors) {
      [colorsArray addObject:[NSString stringWithUTF8String:color.c_str()]];
    }
    propsDictionary[@"colors"] = colorsArray;
  }

  return propsDictionary;
}

@interface RCTSFSymbolView () <RCTComponentViewProtocol>
@end

@implementation RCTSFSymbolView {
  SFSymbolContainer *_containerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      NativeSFSymbolViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativeSFSymbolViewProps>();
    _props = defaultProps;
    _containerView = [SFSymbolContainer new];

    self.contentView = _containerView;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativeSFSymbolViewProps const>(oldProps ? oldProps
                                                                        : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativeSFSymbolViewProps const>(props);
  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict
                    oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

@end
