import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	cacheDir: path.resolve(__dirname, "../node_modules/.vitest.generator-cache"),
	test: {
		exclude: ["node_modules", "dist"],
	},
});
