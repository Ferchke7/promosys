import vinext from "vinext";
import { defineConfig, type Plugin } from "vite";
import { fileURLToPath } from "node:url";
import hostingConfig from "./.openai/hosting.json";
import { sites } from "./build/sites-vite-plugin";

const ROUTE_OWNED_CLIENT_SHIMS = new Set([
  "compat-router",
  "dynamic",
  "dynamic-preload-chunks",
  "form",
  "image",
  "internal/hybrid-client-route-owner",
  "layout-segment-context",
  "legacy-image",
  "link",
  "offline",
  "router",
  "script",
  "web-vitals",
]);

interface CodeSplittingGroup {
  name?: ((moduleId: string) => string | null | undefined) | string;
}

interface EnvironmentClientBuild {
  rolldownOptions?: {
    output?: {
      codeSplitting?: {
        groups?: CodeSplittingGroup[];
      };
    };
  };
}

function vinextManualChunksFixPlugin(): Plugin {
  return {
    name: "vinext-manual-chunks-fix",
    configResolved(config) {
      const environments = config.environments as
        | Record<string, { build?: EnvironmentClientBuild }>
        | undefined;
      const clientOutput =
        environments?.client?.build?.rolldownOptions?.output;
      if (clientOutput?.codeSplitting?.groups) {
        for (const group of clientOutput.codeSplitting.groups) {
          if (typeof group.name === "function") {
            const originalName = group.name;
            group.name = function (moduleId: string) {
              const slashedId = moduleId.replace(/\\/g, "/");
              const shimsMarker = "node_modules/vinext/dist/shims/";
              const idx = slashedId.indexOf(shimsMarker);
              if (idx !== -1) {
                const relativeId =
                  slashedId.slice(idx + shimsMarker.length).split("?")[0] || "";
                const extIdx = relativeId.lastIndexOf(".");
                const shimName =
                  extIdx === -1 ? relativeId : relativeId.slice(0, extIdx);
                if (ROUTE_OWNED_CLIENT_SHIMS.has(shimName)) {
                  return null;
                }
                return "vinext";
              }
              return originalName(moduleId);
            };
          }
        }
      }
    },
  };
}

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: "site-creator-d1",
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinextManualChunksFixPlugin(),
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
