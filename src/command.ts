import { Command } from "commander";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseConfig } from "./config.js";
import { extractDrizzleTables } from "./analyze.js";
import { generateSchemas, generateIndex, tableNameToSchemaName } from "./generate.js";

export const setupCommand = () => {
	const program = new Command();

	const __dirname = dirname(fileURLToPath(import.meta.url));
	const packageJson = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf8"));
	const version = packageJson.version;

	program
		.name("drizzle-zod-generator")
		.description("A tool to generate Zod schemas from Drizzle schema definitions")
		.version(version);

	program
		.command("generate")
		.description("Generate Zod schemas from Drizzle schema definitions")
		.option("--config <path>", "Path to drizzle.config.ts", "drizzle.config.ts")
		.option("--out <path>", "Path for generated Zod schemas", "src/schemas")
		.option("--ts-config <path>", "Path to tsconfig.json", "tsconfig.json")
		.action(async (options) => {
			try {
				const config = await parseConfig(options);
				const tables = await extractDrizzleTables(config);

				const output: Record<string, string> = {};

				for (const [tableName, table] of Object.entries(tables)) {
					const schema = await generateSchemas(table, tableName);
					const fileName = `${tableNameToSchemaName(tableName)}.ts`;
					output[fileName] = schema;
				}

				const index = await generateIndex(Object.keys(tables));
				output["index.ts"] = index;

				for (const [key, value] of Object.entries(output)) {
					const path = join(options.out, key);
					mkdirSync(dirname(path), { recursive: true });
					writeFileSync(path, value);
				}
			} catch (error) {
				console.log(`⚠️ error ${error}`);
				process.exit(1);
			}
		});

	return program;
};
