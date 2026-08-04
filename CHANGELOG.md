# Changelog

All notable changes to this project are documented here.

Generated from the commit history, which follows
[Conventional Commits](https://www.conventionalcommits.org/). Chore, docs, style,
test and CI commits are omitted; see the full log for those.

## 0.18.0 — unreleased

### ⚠ BREAKING CHANGES

- shared type names lost their Native prefix, SwiftUISheetPicker's onSelect is now onChange, and SwiftUISheet's detents is typed rather than string[]. ([79fdb02a](https://github.com/mgcrea/react-native-swiftui/commit/79fdb02a9547ae7b4b12cbb5aa7d10d4d7c0003c))

See the [migration guide](https://mgcrea.github.io/react-native-swiftui/guides/migrating-to-0-18/) for the full before/after.

### Features

- **api:** unify the duplicated public types (0.18.0) ([79fdb02a](https://github.com/mgcrea/react-native-swiftui/commit/79fdb02a9547ae7b4b12cbb5aa7d10d4d7c0003c))
- **js:** accept an explicit id on Picker and MultiPicker ([e97dd88a](https://github.com/mgcrea/react-native-swiftui/commit/e97dd88a267cddfceea9fc2b0a1c2ea114509059))

### Bug Fixes

- **ios:** apply text styles on containers, stop color leaking into tint ([14d56733](https://github.com/mgcrea/react-native-swiftui/commit/14d56733517413b3c06605f715bda22095a759d4))
- **ios:** stop JS-driven updates echoing back as user events ([0517529a](https://github.com/mgcrea/react-native-swiftui/commit/0517529adf9fa69efa55ac31e95ebcb1e8c1f454))

### Performance

- **ios:** look child props up by id instead of walking the tree ([82f36467](https://github.com/mgcrea/react-native-swiftui/commit/82f36467fde5c9229d88ae17532ae289c879ec9b))

### Refactors

- **ios:** use the supported ForEach form in MultiPicker ([2a009176](https://github.com/mgcrea/react-native-swiftui/commit/2a00917643cd45427f649e6fe2fc64ad2343774a))
- **js:** factor out the container and parsed-event boilerplate ([7aa72ff6](https://github.com/mgcrea/react-native-swiftui/commit/7aa72ff67bedaaff7621ba3f661a9fc3b1ee0bc4))
- **ios:** one labeled-content view, and fix the labels it exposed ([b8fd5f19](https://github.com/mgcrea/react-native-swiftui/commit/b8fd5f19e9b5299574f7633b1e0826dec13965a5))
- **ios:** one merge contract, and stop republishing unchanged props ([e765672c](https://github.com/mgcrea/react-native-swiftui/commit/e765672c973099120b39302e6a05e15b3a059a7b))

## [0.17.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.17.0) — 2026-08-04

### Bug Fixes

- **ios:** break the retain cycle leaking every SwiftUI root ([47359154](https://github.com/mgcrea/react-native-swiftui/commit/47359154e5e1cb7e6a20265391970b9b204df5f7))
- **context:** stop dropping prop updates and event handlers ([18d33cd3](https://github.com/mgcrea/react-native-swiftui/commit/18d33cd30ddd9f15149c4621ed0f0732db72b0fc))
- **ios:** correct five prop-handling bugs in the native layer ([9e51b71e](https://github.com/mgcrea/react-native-swiftui/commit/9e51b71e6d9aafdb4fab37d6ab136148550b04f6))
- **example:** track the example app source ([b3ff894b](https://github.com/mgcrea/react-native-swiftui/commit/b3ff894b9b7be631b7c9377295600382e2eb1798))

## [0.16.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.16.1) — 2026-04-28

### Features

- upgrade docs deps ([3d8805a9](https://github.com/mgcrea/react-native-swiftui/commit/3d8805a9b577e5e4194c4a0c2b32ddf80bea3051))

### Bug Fixes

- dispatch @Published prop mutations to main thread ([be9faff4](https://github.com/mgcrea/react-native-swiftui/commit/be9faff44208fb1165949173f55b91b4651581c5))
- extract useId call to satisfy react-hooks/rules-of-hooks ([15271ae0](https://github.com/mgcrea/react-native-swiftui/commit/15271ae0c1198e6ba7cf13bfd346529f06f68392))

### Refactors

- guard merge() with presentKeys to skip absent props ([56b36151](https://github.com/mgcrea/react-native-swiftui/commit/56b36151ccb47f94d2b6456ac27ee6074a583151))

## [0.16.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.16.0) — 2026-04-28

### Bug Fixes

- resolve all lint, type, and test failures ([c2332b00](https://github.com/mgcrea/react-native-swiftui/commit/c2332b00e8d1f0837eb0462d5f9060a0cb06f30c))
- **ios:** wire onDropView for deterministic HybridSwiftUIRootView teardown ([494e4e72](https://github.com/mgcrea/react-native-swiftui/commit/494e4e723f5fbbd3476e25512fd47dc31f6e2110))
- replace setNativeProps with React state and wire hybridRef for Nitro 0.35 ([71ed7924](https://github.com/mgcrea/react-native-swiftui/commit/71ed7924aeb814e0dc12569b109d54e4fb5a60fa))
- **ios:** make TextField/NumberField types internal for C++ interop ([70c113f1](https://github.com/mgcrea/react-native-swiftui/commit/70c113f1cb9dad1e84964845cac9a107a4371f15))
- **podspec:** migrate to nitrogen 0.35.x autolinking script ([8278b4f7](https://github.com/mgcrea/react-native-swiftui/commit/8278b4f72ed96f71c8186560a48f6039c28ac35d))

### Performance

- **ios:** replace JSON round-trip with typed direct prop updates ([ef514125](https://github.com/mgcrea/react-native-swiftui/commit/ef514125bff8a1d4be13ddcdbd9f42efe7d4367f))

### Refactors

- migrate from Fabric to Nitro Modules ([ecd1a28b](https://github.com/mgcrea/react-native-swiftui/commit/ecd1a28bfb034761bac45450f6f17c4cc17506d3))

## [0.15.2](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.15.2) — 2026-02-09

### Features

- add controlSize to standalone SwiftUIPicker component ([a4426db3](https://github.com/mgcrea/react-native-swiftui/commit/a4426db35813a5c91249fd7d96708edd5232f78f))

## [0.15.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.15.1) — 2026-02-09

### Features

- add controlSize prop to Picker component ([b9876498](https://github.com/mgcrea/react-native-swiftui/commit/b9876498015f7007f5db13b82be1806d6d544492))

## [0.15.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.15.0) — 2026-02-01

### ⚠ BREAKING CHANGES

- options prop now requires { value, label } objects instead of string arrays ([c08ce047](https://github.com/mgcrea/react-native-swiftui/commit/c08ce047c86f0b4c8d496acee2f4e700e85042f9))

### Features

- align Picker API with structured options and value prop ([c08ce047](https://github.com/mgcrea/react-native-swiftui/commit/c08ce047c86f0b4c8d496acee2f4e700e85042f9))
- add markdown source link to documentation pages ([e76f4634](https://github.com/mgcrea/react-native-swiftui/commit/e76f46346d55fd3e0d09f7ae3cb3beb311645057))

## [0.14.3](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.14.3) — 2026-01-15

_No user-facing changes._

## [0.14.2](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.14.2) — 2026-01-15

### Bug Fixes

- ensure Slider onBlur fires reliably ([092506b3](https://github.com/mgcrea/react-native-swiftui/commit/092506b3bce14f86cac1f55796ff8780a346f5e9))

## [0.14.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.14.1) — 2026-01-08

### Features

- add contentMargins prop to Form ([dbb04c38](https://github.com/mgcrea/react-native-swiftui/commit/dbb04c3856006e495e5d773c1040ed5ce8913b18))

### Bug Fixes

- apply textContentType, autocapitalization, and maxLength ([57c68542](https://github.com/mgcrea/react-native-swiftui/commit/57c685424709813cb96f27701d119be4e3314786))
- align DatePicker style type with Swift implementation ([7c4e3c3a](https://github.com/mgcrea/react-native-swiftui/commit/7c4e3c3aa82c9ee2d9134efd2f1471aa74134187))
- preserve nil values and enforce min/max in NumberField ([24b189ec](https://github.com/mgcrea/react-native-swiftui/commit/24b189ecddaac34437a3bde52b74353dbab16b5d))
- correct Font.fromString case matching ([befb2d1a](https://github.com/mgcrea/react-native-swiftui/commit/befb2d1a7615b04563e984c159159600bc2f959e))
- normalize StyleSheet.create() numeric IDs properly ([72fc5a5f](https://github.com/mgcrea/react-native-swiftui/commit/72fc5a5f847fd3a6e7c0772c16b549e8a9cedd6d))

### Refactors

- use type-only imports for verbatimModuleSyntax compliance ([f2cd2ece](https://github.com/mgcrea/react-native-swiftui/commit/f2cd2ecef1dc7dec596678db0300530222bb4ffe))

## [0.14.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.14.0) — 2025-12-15

### Features

- apply labelStyle to component label views ([ffc25e50](https://github.com/mgcrea/react-native-swiftui/commit/ffc25e50b96e5ba8f108b2adb1203e5b5afcdfca))
- add labelStyle to Swift component props ([7e15cc83](https://github.com/mgcrea/react-native-swiftui/commit/7e15cc833bb5fac56a2a7a0ab44f70c78455e942))
- add labelStyle prop to components with labels ([be976902](https://github.com/mgcrea/react-native-swiftui/commit/be976902dc0f7d5ed2a17416db0d8011ab269f5f))
- add NativeLabelStyleProps interface for declaration merging ([81cbbed5](https://github.com/mgcrea/react-native-swiftui/commit/81cbbed5182fef274e16108f9a8d3921fd0a052f))

### Refactors

- use LabeledContent pattern in DatePicker and Toggle ([b59449c4](https://github.com/mgcrea/react-native-swiftui/commit/b59449c44579ae96c2eb785261f45695ae5b3230))
- use public CodegenTypes API instead of private imports ([3482972a](https://github.com/mgcrea/react-native-swiftui/commit/3482972a8af3695a395b6647599af4589b97b156))
- use NativeTextStyleProps and NativeViewStyleProps interfaces ([94a6ee2d](https://github.com/mgcrea/react-native-swiftui/commit/94a6ee2dd2555d61e984bd2f62a03e7e95ccda09))

## [0.13.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.13.1) — 2025-12-11

### Features

- export SwiftUI component types ([83360887](https://github.com/mgcrea/react-native-swiftui/commit/833608873e99f03cce9f55d5f749ff3d78006855))

### Bug Fixes

- correct SwiftUI type import path ([82fbc03b](https://github.com/mgcrea/react-native-swiftui/commit/82fbc03b469f440fc27fff8b3979cf4b5ec4a967))

### Refactors

- remove redundant type export from SwiftUISheet ([aefafc0d](https://github.com/mgcrea/react-native-swiftui/commit/aefafc0da6c5ac326871a3a544ef5931bdc2bdae))

## [0.13.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.13.0) — 2025-12-08

### Features

- add error and helperText props to TextField ([8802d072](https://github.com/mgcrea/react-native-swiftui/commit/8802d072f3f54bacfd34c42022c964234f05fb98))
- rework readme, update starlight config ([8aa0182e](https://github.com/mgcrea/react-native-swiftui/commit/8aa0182ee76bd49de077c7d5b3f5eace083cb5df))
- **update:** minor changes ([2427a620](https://github.com/mgcrea/react-native-swiftui/commit/2427a62021c5639c2491e044ae3db51993be9e10))
- github add github actions ([496dd338](https://github.com/mgcrea/react-native-swiftui/commit/496dd33882a4fef1d318c4260107771047fac665))
- add complete docs ([77ab9a10](https://github.com/mgcrea/react-native-swiftui/commit/77ab9a10e613371819260e98e689832966eeada9))

### Bug Fixes

- prevent view update warnings in Slider component ([fcc712b5](https://github.com/mgcrea/react-native-swiftui/commit/fcc712b51840e3ab0770224c614ad83c5b472af7))
- **SheetPicker:** prevent race condition on auto-dismiss ([53185009](https://github.com/mgcrea/react-native-swiftui/commit/53185009fdc9afc3fc9ea9c88a711c1384c6fadb))
- use AsyncImage to avoid synchronous URL loading on main thread ([7272075f](https://github.com/mgcrea/react-native-swiftui/commit/7272075f0e7e2ba5d6a8fb5f8ee2c400d4748768))

### Performance

- simplify nodesKey and renderSequenceKey computation ([6650d876](https://github.com/mgcrea/react-native-swiftui/commit/6650d87673afe2e658354a47fc3c632760931c65))

### Refactors

- use useDeepMemo in useSwiftUINode ([fcd88808](https://github.com/mgcrea/react-native-swiftui/commit/fcd88808067180e543b841cb8ca91c7e5244a52e))
- replace useJsonMemo with useDeepMemo ([ae913851](https://github.com/mgcrea/react-native-swiftui/commit/ae913851263daf70a28e12646960a42da7c995a5))

## [0.12.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.12.0) — 2025-11-29

### Features

- add starlight docs ([23ec581e](https://github.com/mgcrea/react-native-swiftui/commit/23ec581e2ca02ab8a0a7efdccb060e9a19be5426))
- add explicit sizing to SFSymbol component ([db8f828b](https://github.com/mgcrea/react-native-swiftui/commit/db8f828b51e4bb026d41e3be3d4dda9bc94e3ae4))
- implement SwiftUI resizeMode handling ([136efe8c](https://github.com/mgcrea/react-native-swiftui/commit/136efe8cb8bf7b342ef766161ab28e2ac9e36f96))
- add resizeMode prop to SFSymbol component ([f45c5ff4](https://github.com/mgcrea/react-native-swiftui/commit/f45c5ff4bfaf3807ab4d796129c2be57225eeeda))
- add SFSymbol example page ([f8bc1afe](https://github.com/mgcrea/react-native-swiftui/commit/f8bc1afeed094fe6fcdad5dc83d926869360eadc))
- add SFSymbol standalone component with full SF Symbols support ([16f56764](https://github.com/mgcrea/react-native-swiftui/commit/16f5676409350763d00cfb7e956696e626ec1fb7))

### Bug Fixes

- add iOS version compatibility checks for SFSymbol ([8e2510cc](https://github.com/mgcrea/react-native-swiftui/commit/8e2510cc14cffdc4c13b937615e15d6265e60132))
- add intrinsic content sizing support for SFSymbol ([f7777a9f](https://github.com/mgcrea/react-native-swiftui/commit/f7777a9fe51bf23e4f4729c372151a170bfe071b))
- normalize MultiPicker selections to prevent out-of-bounds crash ([dbf42080](https://github.com/mgcrea/react-native-swiftui/commit/dbf420805b79274460996c73b1df2b3dffd42ae2))
- track event keys in useSwiftUINode to prevent stale listeners ([737a8986](https://github.com/mgcrea/react-native-swiftui/commit/737a898675cd31c967b0c50044409bd56cc828d0))
- wire onFocus/onBlur events for DatePicker and Stepper ([7c3b1bcc](https://github.com/mgcrea/react-native-swiftui/commit/7c3b1bcc73d4f3ecdb389b132106d79dd162e40b))
- include submitLabel in TextField merge to enable updates ([f231471c](https://github.com/mgcrea/react-native-swiftui/commit/f231471cd7b66b7fb97e942878570ad0e465526a))
- apply autoDismiss default in SwiftUISheetPicker ([834dea48](https://github.com/mgcrea/react-native-swiftui/commit/834dea48117e02ba87e7616eaaa746d4d37d2d22))
- use StyleProp and normalize styles in SwiftUI components ([ac9b8d51](https://github.com/mgcrea/react-native-swiftui/commit/ac9b8d5183b4d6296ada8e6024d5cf723b7bec72))
- align package type with CommonJS output format ([349b6d29](https://github.com/mgcrea/react-native-swiftui/commit/349b6d29f0c12fd94931d25c6068275911307991))

### Refactors

- simplify SFSymbolContainer sizing ([c0636468](https://github.com/mgcrea/react-native-swiftui/commit/c0636468f129eca42c41e3d3fb56011b783f726e))

## [0.11.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.11.0) — 2025-11-24

### Features

- add primary and secondary action buttons to Sheet component ([3e0f3a25](https://github.com/mgcrea/react-native-swiftui/commit/3e0f3a25b8208b9f7bf0ea78574164b54c5e0ccb))

### Bug Fixes

- properly track view tree reordering changes ([ae1daf12](https://github.com/mgcrea/react-native-swiftui/commit/ae1daf12f35ccb8da1f6c91faf16d43bafa432a5))
- prevent double dismiss callback in SheetPicker ([e38ce425](https://github.com/mgcrea/react-native-swiftui/commit/e38ce425d2ea0fc0308bfb1a7370b985e3f91e08))
- prevent array mismatch in MultiPicker selections ([b5f692d6](https://github.com/mgcrea/react-native-swiftui/commit/b5f692d6ef81942ac242b5d0e6c5f91f444fc267))

## [0.10.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.10.1) — 2025-11-19

### Features

- expose APPLE_COLORS for external use ([5e78855b](https://github.com/mgcrea/react-native-swiftui/commit/5e78855b934da39b57a5b3cc812e480d0e0c8e85))

## [0.10.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.10.0) — 2025-10-11

### Features

- add SheetPicker demo to FullFormExample with dynamic options ([fec2a1dd](https://github.com/mgcrea/react-native-swiftui/commit/fec2a1ddbd269b39f00e44c873f36c03ad689263))
- implement embedded display mode for SheetPicker in native layer ([77fc06e4](https://github.com/mgcrea/react-native-swiftui/commit/77fc06e4b2b61e8a845e3cb99671aa25d3bbb985))
- add embedded SheetPicker component for SwiftUI tree ([bf793c13](https://github.com/mgcrea/react-native-swiftui/commit/bf793c13e8b4f5fae8ab948989a6744f3a1393f9))
- improve SheetPicker native implementation ([87230cc5](https://github.com/mgcrea/react-native-swiftui/commit/87230cc579a78cf7fbc2fae382bc840bc2ab809b))
- add SwiftUI sheet picker component ([28e9b815](https://github.com/mgcrea/react-native-swiftui/commit/28e9b815c7c5694590721b750a74fed12121e311))
- add standalone SwiftUI sheet component ([b6ea2a7f](https://github.com/mgcrea/react-native-swiftui/commit/b6ea2a7f144f22fae3d577716f2da6300913ada4))
- enhance SwiftUIPicker with onChange event and tint support ([983ca14b](https://github.com/mgcrea/react-native-swiftui/commit/983ca14b55ddc86dfd2e4639d4b9bea2e933ed81))
- tailor picker labels for root-hosted views ([d96fc48e](https://github.com/mgcrea/react-native-swiftui/commit/d96fc48e30ee2c5726ff40f418516f09236cbb0f))
- add swiftui picker wrapper with customizable label color ([41edd86f](https://github.com/mgcrea/react-native-swiftui/commit/41edd86f11ab07209c9fe5b8c3905ea35691b63f))
- upgrade example to react-native@0.82.0 ([b89e6ce1](https://github.com/mgcrea/react-native-swiftui/commit/b89e6ce17d97086fec6ffb1af00c998dc527ad13))

### Bug Fixes

- report intrinsic size from swiftui container ([afaa10c6](https://github.com/mgcrea/react-native-swiftui/commit/afaa10c63857aa0a8d6a255d17529e5984ca9bf0))

### Refactors

- move components around for cleanup ([24d98f61](https://github.com/mgcrea/react-native-swiftui/commit/24d98f61c12e1ea004c96a55234df79e6aec1cb5))
- streamline swiftui picker exports ([8ff30570](https://github.com/mgcrea/react-native-swiftui/commit/8ff305704bb7308d4971996d1ce07915935a2aec))

## [0.9.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.9.1) — 2025-08-10

### Features

- **update:** minor changes ([9f0e275a](https://github.com/mgcrea/react-native-swiftui/commit/9f0e275a24f23781c510f91812e5ca5dfde41bbb))

## [0.9.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.9.0) — 2025-08-10

### Features

- **update:** minor changes ([302b230e](https://github.com/mgcrea/react-native-swiftui/commit/302b230e087a77e30fb0fa7a2dee91a0e4178040))
- **update:** minor changes ([74918f1c](https://github.com/mgcrea/react-native-swiftui/commit/74918f1c1f0ba2544785373ea2f0b12ea0c3ff5c))
- **update:** minor changes ([054db75a](https://github.com/mgcrea/react-native-swiftui/commit/054db75acc5b50dce8010b7edc1cfcede8bb8d8a))
- **example:** update example to latest react-native ([f980b9fc](https://github.com/mgcrea/react-native-swiftui/commit/f980b9fcc9c2ef364b4188bd10937a3f92d166a6))

### Bug Fixes

- prevent viewTree update if the prop did not change ([8aa11d8a](https://github.com/mgcrea/react-native-swiftui/commit/8aa11d8ac23d27eade96c64137c54b2685b20b98))

## [0.8.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.8.0) — 2025-07-29

### Bug Fixes

- **SwiftUIContainerView:** improve hosting controller lifecycle management and preserve SwiftUI view state fix(SwiftUIRootView): clean up Combine subscriptions in deinit to prevent memory leaks ([034fd23a](https://github.com/mgcrea/react-native-swiftui/commit/034fd23aef5f432cc539703f97f2637ce9cad7bc))
- **SwiftUIRootView:** simplify updateSwiftUIView and clean up multiPicker case ([7e3a1d70](https://github.com/mgcrea/react-native-swiftui/commit/7e3a1d70745e32b10918d037a4dbe6396453d56f))

## [0.7.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.7.1) — 2025-04-28

### Features

- **form:** add support for disabled and scrollDisabled properties in FormProps and Form components ([04aa25f0](https://github.com/mgcrea/react-native-swiftui/commit/04aa25f0c70ea8dda625f190185b5086ad5b789c))
- **example:** upgrade to react-native 0.79.0 ([6f36743a](https://github.com/mgcrea/react-native-swiftui/commit/6f36743a9446fe8d42dc99dfad8ac977ba7d72c7))
- **picker:** add configuration support for dynamic option generation and update computed options handling ([b19650bd](https://github.com/mgcrea/react-native-swiftui/commit/b19650bd479ad54c00c65dc8285226c8e1392698))
- **multi-picker:** add configuration support for dynamic option generation ([28c3c654](https://github.com/mgcrea/react-native-swiftui/commit/28c3c6540e231ef27662993d279d3e03559e65af))

## [0.7.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.7.0) — 2025-04-10

### Features

- **date-picker:** enhance date selection decoding with fallback formats and improve component handling feat(picker): update options type for better flexibility refactor(text): normalize styles in Text component and improve type definitions ([0d9c417c](https://github.com/mgcrea/react-native-swiftui/commit/0d9c417cf207a915a20b6845f6fe33b20aadc9ca))
- **multi-picker:** add MultiPicker component with props and view implementation ([32f7b695](https://github.com/mgcrea/react-native-swiftui/commit/32f7b695dee577f223f6ce984540f43888c49d07))
- **update:** minor changes ([a6517ba5](https://github.com/mgcrea/react-native-swiftui/commit/a6517ba5c3e5ac80c0de2fc6fd1c45f48bb05a74))
- **colors:** add html color support back ([f59a62b0](https://github.com/mgcrea/react-native-swiftui/commit/f59a62b0634511cc36acd5797840cfe0b37e0dfc))
- **colors:** add system colors full list back ([31dc1c0f](https://github.com/mgcrea/react-native-swiftui/commit/31dc1c0f8bd4fadbc74bb455e86cff5e1c8ae7ab))

### Bug Fixes

- **docs:** correct installation command order in README ([80b57743](https://github.com/mgcrea/react-native-swiftui/commit/80b57743b71aa26da530e6a00bdf9346b04733f2))

### Refactors

- wrap SwiftUI components in VStack for better layout structure ([aadc9bf5](https://github.com/mgcrea/react-native-swiftui/commit/aadc9bf5b0c327cd23803a3a687d82fef977db91))

## [0.6.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.6.0) — 2025-04-03

### Features

- **colors:** add support for both DynamicColorIOS and PlatformColor ([bec36cad](https://github.com/mgcrea/react-native-swiftui/commit/bec36cad73b987cc040acc576a0884c4acece056))
- **typescript:** update API ([46956cc7](https://github.com/mgcrea/react-native-swiftui/commit/46956cc76b7b395e9778776e891fa8a77b68c345))
- **TextField:** add toolbar ([4e23c558](https://github.com/mgcrea/react-native-swiftui/commit/4e23c5588575eedc62f4dcf7ede828519bdfbdfd))
- **Picker:** improve toolbar, add focus events ([7ec9860a](https://github.com/mgcrea/react-native-swiftui/commit/7ec9860a2b9b85abc55f34de82e76159b9a3a506))
- **NumberField:** improve component ([bc764da5](https://github.com/mgcrea/react-native-swiftui/commit/bc764da5ae2b3906a9c6537df80572778a02101a))
- **styles:** add preferredColorScheme ([27f33fd7](https://github.com/mgcrea/react-native-swiftui/commit/27f33fd7e5628a15ebee2976fb313d55d56fa906))
- **TextField:** add support for submitLabel ([ddf0533f](https://github.com/mgcrea/react-native-swiftui/commit/ddf0533f84e141bba9778e4d7440c2f949f7d3d0))

### Bug Fixes

- **RCTSwiftUIRootView:** fix eventEmitter crash when view not in the window hierarchy ([2bfc07eb](https://github.com/mgcrea/react-native-swiftui/commit/2bfc07ebae0131c984389bcdff6044ce799d1f17))

## [0.5.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.5.0) — 2025-03-27

### Features

- **api:** update TypeScript api ([2bc382a9](https://github.com/mgcrea/react-native-swiftui/commit/2bc382a9d533c4846f86cf44866928283cd9edfe))
- **ios:** add NumberField component ([0dd717b9](https://github.com/mgcrea/react-native-swiftui/commit/0dd717b94aff24ed86fb29d93d3aebf13af902b2))
- **styles:** add support for textAlign ([e7f9bbb7](https://github.com/mgcrea/react-native-swiftui/commit/e7f9bbb74f5f91f3ba94ea1f5938b6aced5f1c5a))
- **Picker:** display label when pickerStyle is segmented, support separate label/value for options ([d063d480](https://github.com/mgcrea/react-native-swiftui/commit/d063d48076dba147aae94d10059719fc7a600caa))
- **update:** minor changes ([557e7470](https://github.com/mgcrea/react-native-swiftui/commit/557e7470769e9933cd4a88419048a3440b37d1df))
- **update:** minor changes ([5d5017bb](https://github.com/mgcrea/react-native-swiftui/commit/5d5017bb4fce59fbf2551113fc832d4f1824f2a1))
- **readme:** add demo gif ([03d6a35b](https://github.com/mgcrea/react-native-swiftui/commit/03d6a35b1545b814ab99d4a0222032f5227da3ff))
- **Slider:** allow dynamic children ([6adee182](https://github.com/mgcrea/react-native-swiftui/commit/6adee182686bbb31fd560c33d1cbb0a405707519))

## [0.4.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.4.0) — 2025-03-25

### Features

- **typescript:** update interfaces ([d7c39f64](https://github.com/mgcrea/react-native-swiftui/commit/d7c39f64468bb75a7a41e0f776df77d47c1fa905))
- **style:** add support for tint/accentColor ([a8a84ebd](https://github.com/mgcrea/react-native-swiftui/commit/a8a84ebdf30b37a9a9306c695297c485bf72c08d))
- **Stepper:** allow dynamic children ([1ad602a5](https://github.com/mgcrea/react-native-swiftui/commit/1ad602a5b0f67ac5b972539ee277d95a6bc758cb))
- **Picker:** support ViewStyles ([b2b15e5d](https://github.com/mgcrea/react-native-swiftui/commit/b2b15e5dfe81e73cd5e8afdcab1b4eb9df94559f))
- **Form:** support ViewStyles ([b26b19c0](https://github.com/mgcrea/react-native-swiftui/commit/b26b19c01a9117e186389d790d5b36a2246793d7))
- **update:** minor changes ([afaae4aa](https://github.com/mgcrea/react-native-swiftui/commit/afaae4aa6da1e3a15bf05f8c4ac758776afef66a))
- **update:** minor changes ([0a206f5b](https://github.com/mgcrea/react-native-swiftui/commit/0a206f5b96a94341e194bdc901a36b5d711eeccd))
- **ios:** initial dynamic size handling (%) ([e5c900a3](https://github.com/mgcrea/react-native-swiftui/commit/e5c900a39695e545cb0af845ee8d9fe6e7e22001))
- **TextField:** allow custom styles for TextField ([dfa97e19](https://github.com/mgcrea/react-native-swiftui/commit/dfa97e196308058111921638f19c75579df74cb7))
- **styles:** add support for more padding options, initial absolute positionning support ([466e7eb2](https://github.com/mgcrea/react-native-swiftui/commit/466e7eb2433663e3dd8afa19612673e442b586d6))
- **Stepper:** allow styling ([19db7bc4](https://github.com/mgcrea/react-native-swiftui/commit/19db7bc4b73277a6735d885e2e452392d5cd614c))
- **Button:** allow usage of children inside Buttons ([22d55d4c](https://github.com/mgcrea/react-native-swiftui/commit/22d55d4c31bc0def395bf266cefa89cc72ac2392))
- **stacks:** unify stack props regarding styles ([224250c1](https://github.com/mgcrea/react-native-swiftui/commit/224250c18b081eac46b6a05b3ae78a629dd742ce))
- **SwiftUI:** refactor node updates tracking ([0bd00c7d](https://github.com/mgcrea/react-native-swiftui/commit/0bd00c7d0ef3c36404f570027ffff4fef76540b2))
- **components:** allow Group to be styled ([de52e6be](https://github.com/mgcrea/react-native-swiftui/commit/de52e6be94883d185b6534e8e3a421a91720d95b))
- **components:** add LazyVGrid ([19292ada](https://github.com/mgcrea/react-native-swiftui/commit/19292ada14b12f4d546d61e489c1cacd3a66acac))
- **update:** minor changes ([df6a8ebf](https://github.com/mgcrea/react-native-swiftui/commit/df6a8ebf6fe16f50d110cfa08ec51c48c37d9e39))

## [0.3.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.3.0) — 2025-03-12

### Features

- **Image:** add support for local image ([9fbb44b7](https://github.com/mgcrea/react-native-swiftui/commit/9fbb44b7f4db22ae8c5bfff081d55a31bea29374))
- **components:** initial Image implementation ([53a406d5](https://github.com/mgcrea/react-native-swiftui/commit/53a406d5e4e275fa74c1b2054a9f915119b1feaa))
- **Slider:** add displayed value ([3a7e15bc](https://github.com/mgcrea/react-native-swiftui/commit/3a7e15bc389bf15c88741cd9366ef98d338feec1))
- **components:** add Rectangle, Spacer components, improve styling ([7a5150aa](https://github.com/mgcrea/react-native-swiftui/commit/7a5150aa2912e86c7dac73fbb0fb652632e03f16))

## [0.2.3](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.2.3) — 2025-03-11

### Bug Fixes

- **TextField:** properly bind events ([75fa493c](https://github.com/mgcrea/react-native-swiftui/commit/75fa493c7d26736fee0d39e2da2f884994fb9a12))

## [0.2.2](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.2.2) — 2025-03-11

### Features

- **update:** minor changes ([14010644](https://github.com/mgcrea/react-native-swiftui/commit/140106443079d84fb25332119369d246455f174f))

## [0.2.1](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.2.1) — 2025-03-11

### Features

- **update:** minor changes ([0e893307](https://github.com/mgcrea/react-native-swiftui/commit/0e8933075cdbc25c46d9006c7d68631eb89c34cb))
- **update:** minor changes ([cf5110bd](https://github.com/mgcrea/react-native-swiftui/commit/cf5110bd674029295aa4eff77fe2986f9ae11965))
- **update:** minor changes ([5bc91b6f](https://github.com/mgcrea/react-native-swiftui/commit/5bc91b6f705d5d44c384b80abb4522c23cb0f4a5))

## [0.2.0](https://github.com/mgcrea/react-native-swiftui/releases/tag/0.2.0) — 2025-03-11

### Features

- **update:** minor changes ([40c4d248](https://github.com/mgcrea/react-native-swiftui/commit/40c4d2485a7791f7b0fc83f581cde8fba6a7447f))
- **update:** minor changes ([06663053](https://github.com/mgcrea/react-native-swiftui/commit/06663053216144fd61d0789c40f26a93394ba664))
- **update:** minor changes ([0e99b81c](https://github.com/mgcrea/react-native-swiftui/commit/0e99b81cab88269f3396fcd65ddd4fbcb6b4ca9c))
- **project:** fix types build ([9425b0e5](https://github.com/mgcrea/react-native-swiftui/commit/9425b0e5890e2e0506601383d4b06689c8d5bf30))
- **update:** minor changes ([93a1e629](https://github.com/mgcrea/react-native-swiftui/commit/93a1e629c6fae3a7f72c3b399c97c2aa776de2eb))
- **update:** minor changes ([6bb5ee19](https://github.com/mgcrea/react-native-swiftui/commit/6bb5ee191016501989fd5638a45536bfaebe1c5e))
- **update:** minor changes ([9fe4a18e](https://github.com/mgcrea/react-native-swiftui/commit/9fe4a18e3c90b8dd011ef96b3c492d52a3c86cb3))
- **update:** minor changes ([499b2cd4](https://github.com/mgcrea/react-native-swiftui/commit/499b2cd4ab00a3189dfb65c4bddedf7fb7a9e74c))
- **update:** minor changes ([66aad4a7](https://github.com/mgcrea/react-native-swiftui/commit/66aad4a7dca1f771db7005d9944cfa3e3fddb339))
- **components:** add new Sheet component ([f0f0b926](https://github.com/mgcrea/react-native-swiftui/commit/f0f0b9260b582fc0629081534fa40e92ba3971f0))
- **Button:** add custom button styles, improve system color support ([526c1742](https://github.com/mgcrea/react-native-swiftui/commit/526c174269b64979adfdef436a85502320dcedc1))
- **styles:** better styling support ([d90b386b](https://github.com/mgcrea/react-native-swiftui/commit/d90b386be3fbbfe78a181b86645928e41e7e273d))
- **styles:** add new styles, make Text stylable ([43add283](https://github.com/mgcrea/react-native-swiftui/commit/43add283e2e30fe9d4135619343f39dc080d89bc))
- **Button:** add support for buttonStyle, add more styles ([bf9781c9](https://github.com/mgcrea/react-native-swiftui/commit/bf9781c9072a53f1e312bfcfecbd81027a8d64ee))
- **components:** initial styling wip ([f985a857](https://github.com/mgcrea/react-native-swiftui/commit/f985a85706de3aa41aea39f791de453f169373b4))
- **project:** refactor to drop invididual ComponentNode.swift files ([c3350098](https://github.com/mgcrea/react-native-swiftui/commit/c33500981c8d93314ff8af3d2c3606784ab2c250))
- **components:** add HStack/VStack ([44efea2f](https://github.com/mgcrea/react-native-swiftui/commit/44efea2f506341aa5d2416e735872cd596d3148b))
- **update:** minor changes ([b6e8b53b](https://github.com/mgcrea/react-native-swiftui/commit/b6e8b53bf96a914db6baa869d929f2f9de35d980))
- **github:** add workflows ([cb6d4fa8](https://github.com/mgcrea/react-native-swiftui/commit/cb6d4fa840050d151151b6bc305309ef503d856b))
- **viewTree:** refactor buildViewTree to keep track of siblings orders ([6b79f1c6](https://github.com/mgcrea/react-native-swiftui/commit/6b79f1c63726f77d337a3b365973252a185c4c34))
- **components:** refactor with useSwiftUINode ([503a3980](https://github.com/mgcrea/react-native-swiftui/commit/503a3980a7132b55970111137d0067106f50eeaf))
- **viewTree:** optimize tree rebuild ([1b536651](https://github.com/mgcrea/react-native-swiftui/commit/1b5366517d4c6a1f0636b3129852c36be8aa9a51))
- **project:** refactor node-level updates in useSwiftUINode ([1ec3c508](https://github.com/mgcrea/react-native-swiftui/commit/1ec3c508fb41d1fa0e1fb36fcacfef655b2163d4))
- **SwiftUIRoot:** first attempt to use commands for targeted updates ([6471c168](https://github.com/mgcrea/react-native-swiftui/commit/6471c1686845ab40da8912ae8583f5cce3c6c2a6))
- **update:** minor changes ([e4a17bc7](https://github.com/mgcrea/react-native-swiftui/commit/e4a17bc71c8d7ef0d06f9c57f34aa8333980104c))
- **components:** add partial memoization for native passed props ([e32f1dfa](https://github.com/mgcrea/react-native-swiftui/commit/e32f1dfacbc1a5d384642723802028666e0c553d))
- **components:** add Slider ([2643a084](https://github.com/mgcrea/react-native-swiftui/commit/2643a084f469d97c5d725bd799b4807914b58b49))
- **components:** add Toggle component ([7f684f5e](https://github.com/mgcrea/react-native-swiftui/commit/7f684f5ed6ff484e1dee8e63ffa5748e8512ef04))
- **update:** minor changes ([7b5a23df](https://github.com/mgcrea/react-native-swiftui/commit/7b5a23df154dbb81163e3ca2d6549ed3553c5da2))
- **update:** minor changes ([f560dde3](https://github.com/mgcrea/react-native-swiftui/commit/f560dde322ff8520e4f1f5ce262df2e9c492c12b))
- **update:** minor changes ([b56ea6a5](https://github.com/mgcrea/react-native-swiftui/commit/b56ea6a59187b2147c4af28bdda2f1cb442579bd))
- **project:** major refactoring ([8a4bd3f2](https://github.com/mgcrea/react-native-swiftui/commit/8a4bd3f2e09b7cce9d4b9e6b84daae4d12be6fa0))
- **update:** minor changes ([717bfb1a](https://github.com/mgcrea/react-native-swiftui/commit/717bfb1ae704bd9455617207ac34257262e48e9f))
- **project:** major refactoring ([5b4913cf](https://github.com/mgcrea/react-native-swiftui/commit/5b4913cf9c21a9bd368f56316632f7fe6168b1fa))
- **update:** minor changes ([5a86c6dc](https://github.com/mgcrea/react-native-swiftui/commit/5a86c6dc1f5f88e338a28a139032d5d3f2a43cea))
- **project:** wip ([23edc677](https://github.com/mgcrea/react-native-swiftui/commit/23edc677f4b2efb60766add41eb12079d0a674a6))
- **project:** wip ([65dd3977](https://github.com/mgcrea/react-native-swiftui/commit/65dd3977c4301be307da8279e46534cc9a8c9a60))
- **project:** major refactoring / cleanup ([7a081330](https://github.com/mgcrea/react-native-swiftui/commit/7a081330eb5266ba2a10c1d2d49c86f8571c6b11))
- **project:** working proof of concept ([ab9b49ca](https://github.com/mgcrea/react-native-swiftui/commit/ab9b49cad68caf808190d3dedd4ef0708ccfd928))
- **react-native:** upgrade to 0.78 ([59252692](https://github.com/mgcrea/react-native-swiftui/commit/59252692cff9e5d2109b3b1f11301a091883b21a))
- **react-native:** bump to 0.78 ([accd4f6c](https://github.com/mgcrea/react-native-swiftui/commit/accd4f6cb562fd5661d959ba911430b3f4870b6e))
- **update:** minor changes ([a74f4806](https://github.com/mgcrea/react-native-swiftui/commit/a74f4806ac8554af6c7ef8eb45c29d4e44143f23))
- **swift:** working example with swift ([8147ea9b](https://github.com/mgcrea/react-native-swiftui/commit/8147ea9b81838455c809ae26bf32e760e67a9125))

### Other

- Initial commit ([36227039](https://github.com/mgcrea/react-native-swiftui/commit/362270390aff00ac1581fd541443ca804e57cf6e))
