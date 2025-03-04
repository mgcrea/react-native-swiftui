#import "RCTSectionView.h"

#import "../generated/RNSwiftUISpec/ComponentDescriptors.h"
#import "../generated/RNSwiftUISpec/EventEmitters.h"
#import "../generated/RNSwiftUISpec/Props.h"
#import "../generated/RNSwiftUISpec/RCTComponentViewHelpers.h"

#import "RNSwiftUI-Swift.h"

using namespace facebook::react;

static NSDictionary *convertProps(const NativeSectionViewProps &props) {
  return @{
    @"header" : [NSString stringWithUTF8String:props.header.c_str()],
    @"footer" : [NSString stringWithUTF8String:props.footer.c_str()],
    @"listStyle" :
        [NSString stringWithUTF8String:toString(props.listStyle).c_str()],
  };
}

@interface RCTSectionView () <RCTComponentViewProtocol>
@end

@implementation RCTSectionView {
  SectionView *_containerView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<
      NativeSectionViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const NativeSectionViewProps>();
    _props = defaultProps;
    _containerView = [[SectionView alloc] initWithFrame:frame];
    self.contentView = _containerView;
  }
  return self;
}

- (void)mountChildComponentView:
            (UIView<RCTComponentViewProtocol> *)childComponentView
                          index:(NSInteger)index {
  [_containerView mountChildComponentView:childComponentView index:index];
}

- (void)unmountChildComponentView:
    (UIView<RCTComponentViewProtocol> *)childComponentView {
  [_containerView unmountChildComponentView:childComponentView];
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &oldViewProps =
      *std::static_pointer_cast<NativeSectionViewProps const>(
          oldProps ? oldProps : _props);
  const auto &newViewProps =
      *std::static_pointer_cast<NativeSectionViewProps const>(props);
  NSDictionary *oldViewPropsDict = convertProps(oldViewProps);
  NSDictionary *newViewPropsDict = convertProps(newViewProps);

  [_containerView updatePropsWith:newViewPropsDict
                    oldDictionary:oldViewPropsDict];
  [super updateProps:props oldProps:oldProps];
}

@end
