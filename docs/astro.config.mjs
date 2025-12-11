// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://mgcrea.github.io",
  base: "/react-native-swiftui",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "React Native SwiftUI",
      logo: {
        src: "./src/assets/logo.svg",
      },
      expressiveCode: {
        themes: ["github-dark"],
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/mgcrea/react-native-swiftui",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "index" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
            { label: "How It Works", slug: "getting-started/how-it-works" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "Overview", slug: "components/overview" },
            { label: "SwiftUI Root", slug: "components/swiftui-root" },
            { label: "Text", slug: "components/text" },
            { label: "Button", slug: "components/button" },
            { label: "TextField", slug: "components/textfield" },
            { label: "NumberField", slug: "components/numberfield" },
            { label: "Toggle", slug: "components/toggle" },
            { label: "Slider", slug: "components/slider" },
            { label: "DatePicker", slug: "components/datepicker" },
            { label: "Picker", slug: "components/picker" },
            { label: "MultiPicker", slug: "components/multipicker" },
            { label: "Stepper", slug: "components/stepper" },
            { label: "Form", slug: "components/form" },
            { label: "Section", slug: "components/section" },
            { label: "Sheet", slug: "components/sheet" },
            { label: "SheetPicker", slug: "components/sheetpicker" },
            { label: "Image", slug: "components/image" },
          ],
        },
        {
          label: "Layout",
          items: [
            { label: "HStack", slug: "layout/hstack" },
            { label: "VStack", slug: "layout/vstack" },
            { label: "ZStack", slug: "layout/zstack" },
            { label: "LazyVGrid", slug: "layout/grid" },
            { label: "Spacer", slug: "layout/spacer" },
            { label: "Group", slug: "layout/group" },
            { label: "Rectangle", slug: "layout/rectangle" },
          ],
        },
        {
          label: "Standalone",
          items: [
            { label: "Overview", slug: "standalone/overview" },
            { label: "SFSymbol", slug: "standalone/sf-symbol" },
            { label: "SwiftUIPicker", slug: "standalone/picker" },
            { label: "SwiftUISheet", slug: "standalone/sheet" },
            { label: "SwiftUISheetPicker", slug: "standalone/sheet-picker" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Building Forms", slug: "guides/building-forms" },
            { label: "React Hook Form", slug: "guides/react-hook-form" },
            { label: "TanStack Form", slug: "guides/tanstack-form" },
            { label: "Dynamic Lists", slug: "guides/dynamic-lists" },
            { label: "Styling", slug: "guides/styling" },
            { label: "Event Handling", slug: "guides/event-handling" },
          ],
        },
        {
          label: "Examples",
          autogenerate: { directory: "examples" },
        },
      ],
      plugins: [starlightLlmsTxt()],
    }),
  ],
});
