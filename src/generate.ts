import { Eta } from "eta";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Table } from "drizzle-orm";
import { generateSelectSchema, generateUpdateSchema, generateInsertSchema } from "./schema.js";
import { singularize } from "inflection";
import { camelCase, pascalCase } from "change-case";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = join(__dirname, "templates");

const eta = new Eta({ views: templatePath });

const tableNameToSchemaName = (tableName: string) => {
	return pascalCase(singularize(tableName));
};

const generateSchemas = async (table: Table, tableName: string) => {
	const selectSchema = generateSelectSchema(table);
	const updateSchema = generateUpdateSchema(table);
	const insertSchema = generateInsertSchema(table);

	return eta.render("schema", {
		selectSchema,
		updateSchema,
		insertSchema,
		schemaName: tableNameToSchemaName(tableName),
	});
};

const generateIndex = async (tableNames: string[]) => {
	return eta.render("index", {
		tableNames: tableNames.map((name) => camelCase(tableNameToSchemaName(name))),
	});
};

export { generateSchemas, generateIndex, tableNameToSchemaName };
