import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join, basename } from "node:path";
import { pathToFileURL } from "node:url";
import type { Config } from "./config";
import type { Table } from "drizzle-orm";

const COLUMNS = Symbol.for("drizzle:Columns");
const NAME = Symbol.for("drizzle:Name");

const extractDrizzleTables = async (config: Config): Promise<Record<string, Table>> => {
	const allTables: Record<string, Table> = {};

	for (const filePath of config.schemaFiles) {
		const outfile = join(tmpdir(), `drizzle-bundle-${basename(filePath)}-${Date.now()}.mjs`);

		await build({
			entryPoints: [filePath],
			outfile,
			format: "esm",
			bundle: true,
			platform: "node",
			target: "node18",
			tsconfig: config.tsConfigPath,
			logLevel: "silent",
		});

		const mod = await import(pathToFileURL(outfile).href);

		for (const key of Object.keys(mod)) {
			const value = mod[key];
			if (value && typeof value === "object" && COLUMNS in value && NAME in value) {
				allTables[value[NAME]] = value;
			}
		}
	}

	return allTables;
};

export { extractDrizzleTables };
export type { Table };
