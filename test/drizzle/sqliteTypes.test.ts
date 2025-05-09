
import { sqliteTable, } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema } from "../../src/schema.js";
import { test } from "vitest";

test.skip("all data types", () => {
	const table = sqliteTable("test", ({ blob, integer, numeric, real, text }) => ({
		blob1: blob({ mode: "buffer" }).notNull(),
		blob2: blob({ mode: "bigint" }).notNull(),
		blob3: blob({ mode: "json" }).notNull(),
		integer1: integer({ mode: "number" }).notNull(),
		integer2: integer({ mode: "boolean" }).notNull(),
		integer3: integer({ mode: "timestamp" }).notNull(),
		integer4: integer({ mode: "timestamp_ms" }).notNull(),
		numeric: numeric().notNull(),
		real: real().notNull(),
		text1: text({ mode: "text" }).notNull(),
		text2: text({ mode: "text", length: 10 }).notNull(),
		text3: text({ mode: "text", enum: ["a", "b", "c"] }).notNull(),
		text4: text({ mode: "json" }).notNull(),
	}));

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test.skip("type coercion - all", () => {
	// const table = sqliteTable("test", ({ blob, integer, text }) => ({
	// 	blob: blob({ mode: "bigint" }).notNull(),
	// 	integer1: integer({ mode: "boolean" }).notNull(),
	// 	integer2: integer({ mode: "timestamp" }).notNull(),
	// 	integer3: integer().notNull(),
	// 	text: text().notNull(),
	// }));
	// const { createSelectSchema } = createSchemaFactory({ coerce: true });
	// const result = createSelectSchema(table);
	// const expected = evalSchema(generateSelectSchema(table, { coerce: true }));
	// expectSchemaShape(result).from(expected);
});

test.skip("type coercion - mixed", () => {
	// const table = sqliteTable("test", ({ integer }) => ({
	// 	integer1: integer({ mode: "timestamp" }).notNull(),
	// 	integer2: integer().notNull(),
	// }));
	// const { createSelectSchema } = createSchemaFactory({
	// 	coerce: { date: true },
	// });
	// const result = createSelectSchema(table);
	// const expected = evalSchema(
	// 	generateSelectSchema(table, { coerce: { date: true } }),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("recursive type - json conditions", () => {
	// const TopLevelCondition: z.ZodType<TopLevelCondition> = z
	// 	.custom<TopLevelCondition>()
	// 	.superRefine(() => {});
	// const table = sqliteTable("test", {
	// 	json1: text({ mode: "json" }).$type<TopLevelCondition>().notNull(),
	// 	json2: blob({ mode: "json" }).$type<TopLevelCondition>(),
	// });
	// const result = createSelectSchema(table);
	// const expected = z.object({
	// 	json1: TopLevelCondition,
	// 	json2: z.nullable(TopLevelCondition),
	// });
	// expectSchemaShape(result).from(expected);
});
