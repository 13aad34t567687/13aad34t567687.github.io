import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "我的数字花园 🌱",
    pageTitleSuffix: " | Digital Garden",
    enableSPA: false,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "13aad34t567687.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans SC",
        body: "Noto Sans SC",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "#F5F5F5",
          gray: "#999999",
          darkgray: "#333333",
          dark: "#000000",
          secondary: "#000000",
          tertiary: "#666666",
          highlight: "rgba(0, 0, 0, 0.05)",
          textHighlight: "rgba(0, 0, 0, 0.1)",
        },
        darkMode: {
          light: "#0A0A0A",
          lightgray: "#1A1A1A",
          gray: "#666666",
          darkgray: "#CCCCCC",
          dark: "#FFFFFF",
          secondary: "#FFFFFF",
          tertiary: "#999999",
          highlight: "rgba(255, 255, 255, 0.05)",
          textHighlight: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
