import { test } from "vitest";
import { mysqlTable, serial, int, text, mysqlSchema } from "drizzle-orm/mysql-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema, generateInsertSchema, generateUpdateSchema } from "../../src/schema.js";

test("table - select", () => {
	const table = mysqlTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test("table in schema - select", () => {
	const schema = mysqlSchema("test");
	const table = schema.table("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test("table - insert", () => {
	const table = mysqlTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
		age: int(),
	});

	const result = createInsertSchema(table);
	const expected = evalSchema(generateInsertSchema(table));
	expectSchemaShape(result).from(expected);
});

test("table - update", () => {
	const table = mysqlTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
		age: int(),
	});

	const result = createUpdateSchema(table);
	const expected = evalSchema(generateUpdateSchema(table));
	expectSchemaShape(result).from(expected);
});

test("nullability - select", () => {
	const table = mysqlTable("test", {
		c1: int(),
		c2: int().notNull(),
		c3: int().default(1),
		c4: int().notNull().default(1),
	});

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test("nullability - insert", () => {
	const table = mysqlTable("test", {
		c1: int(),
		c2: int().notNull(),
		c3: int().default(1),
		c4: int().notNull().default(1),
		c5: int().generatedAlwaysAs(1),
	});

	const result = createInsertSchema(table);
	const expected = evalSchema(generateInsertSchema(table));
	expectSchemaShape(result).from(expected);
});

test("nullability - update", () => {
	const table = mysqlTable("test", {
		c1: int(),
		c2: int().notNull(),
		c3: int().default(1),
		c4: int().notNull().default(1),
		c5: int().generatedAlwaysAs(1),
	});

	const result = createUpdateSchema(table);
	const expected = evalSchema(generateUpdateSchema(table));
	expectSchemaShape(result).from(expected);
});
