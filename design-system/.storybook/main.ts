import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    staticDirs: ["../../frontend/public"],
    async viteFinal(config) {
        const path = await import("path");
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../../frontend/src"),
        };

        const { mergeConfig } = await import("vite");
        return mergeConfig(config, {
            server: {
                fs: {
                    allow: ["..", "../../frontend"],
                },
            },
        });
    },
};

export default config;
