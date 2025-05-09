import { test } from "vitest";
import { pgTable, serial, integer, text, pgSchema, } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema, generateInsertSchema, generateUpdateSchema } from "../../src/schema.js";

test("table - select", () => {
	const table = pgTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test("table in schema - select", () => {
	const schema = pgSchema("test");
	const table = schema.table("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test("table - insert", () => {
	const table = pgTable("test", {
		id: integer().generatedAlwaysAsIdentity().primaryKey(),
		name: text().notNull(),
		age: integer(),
	});

	const result = createInsertSchema(table);
	const expected = evalSchema(generateInsertSchema(table));
	expectSchemaShape(result).from(expected);
});

test("table - update", () => {
	const table = pgTable("test", {
		id: integer().generatedAlwaysAsIdentity().primaryKey(),
		name: text().notNull(),
		age: integer(),
	});

	const result = createUpdateSchema(table);
	const expected = evalSchema(generateUpdateSchema(table));
	expectSchemaShape(result).from(expected);
});

test.skip("enum - select", () => {
	// const enum_ = pgEnum("test", ["a", "b", "c"]);
	// const result = createSelectSchema(enum_);
	// const expected = evalSchema(generateSelectSchema(enum_));
	// expectEnumValues(result).from(expected);
	// expect(false).toBe(true);
});
