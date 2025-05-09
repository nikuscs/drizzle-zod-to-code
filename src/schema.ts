import { zodToCode } from "@lucaconlaq/zod-to-code";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from "drizzle-zod";
import type { Table, View } from "drizzle-orm";

const generateSelectSchema = (table: Table | View) => {
	// @ts-ignore
	const selectSchema = createSelectSchema(table);
	const zodCode = zodToCode(selectSchema);
	return zodCode;
};

const generateUpdateSchema = (table: Table) => {
	const updateSchema = createUpdateSchema(table);
	const zodCode = zodToCode(updateSchema);
	return zodCode;
};

const generateInsertSchema = (table: Table) => {
	const insertSchema = createInsertSchema(table);
	const zodCode = zodToCode(insertSchema);
	return zodCode;
};

export { generateSelectSchema, generateUpdateSchema, generateInsertSchema };
