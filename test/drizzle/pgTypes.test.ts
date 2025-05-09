import { test } from "vitest";
import { pgTable, integer } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema, generateInsertSchema, generateUpdateSchema } from "../../src/schema.js";

test("nullability - select", () => {
	const table = pgTable("test", {
		c1: integer(),
		c2: integer().notNull(),
		c3: integer().default(1),
		c4: integer().notNull().default(1),
	});

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test("nullability - insert", () => {
	const table = pgTable("test", {
		c1: integer(),
		c2: integer().notNull(),
		c3: integer().default(1),
		c4: integer().notNull().default(1),
		c5: integer().generatedAlwaysAs(1),
		c6: integer().generatedAlwaysAsIdentity(),
		c7: integer().generatedByDefaultAsIdentity(),
	});

	const result = createInsertSchema(table);
	const expected = evalSchema(generateInsertSchema(table));
	expectSchemaShape(result).from(expected);
});

test("nullability - update", () => {
	const table = pgTable("test", {
		c1: integer(),
		c2: integer().notNull(),
		c3: integer().default(1),
		c4: integer().notNull().default(1),
		c5: integer().generatedAlwaysAs(1),
		c6: integer().generatedAlwaysAsIdentity(),
		c7: integer().generatedByDefaultAsIdentity(),
	});

	const result = createUpdateSchema(table);
	const expected = evalSchema(generateUpdateSchema(table));
	expectSchemaShape(result).from(expected);
});

test("type coercion - all", () => {
	// const table = pgTable(
	// 	"test",
	// 	({ bigint, boolean, timestamp, integer, text }) => ({
	// 		bigint: bigint({ mode: "bigint" }).notNull(),
	// 		boolean: boolean().notNull(),
	// 		timestamp: timestamp().notNull(),
	// 		integer: integer().notNull(),
	// 		text: text().notNull(),
	// 	}),
	// );
	// const { createSelectSchema } = createSchemaFactory({ coerce: true });
	// const result = createSelectSchema(table);
	// const expected = evalSchema(generateSelectSchema(table, { coerce: true }));
	// expectSchemaShape(result).from(expected);
});

test("type coercion - mixed", () => {
	// const table = pgTable("test", ({ timestamp, integer }) => ({
	// 	timestamp: timestamp().notNull(),
	// 	integer: integer().notNull(),
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

test.skip("all data types", () => {
	// const table = pgTable(
	// 	"test",
	// 	({
	// 		bigint,
	// 		bigserial,
	// 		bit,
	// 		boolean,
	// 		date,
	// 		char,
	// 		cidr,
	// 		doublePrecision,
	// 		geometry,
	// 		halfvec,
	// 		inet,
	// 		integer,
	// 		interval,
	// 		json,
	// 		jsonb,
	// 		line,
	// 		macaddr,
	// 		macaddr8,
	// 		numeric,
	// 		point,
	// 		real,
	// 		serial,
	// 		smallint,
	// 		smallserial,
	// 		text,
	// 		sparsevec,
	// 		time,
	// 		timestamp,
	// 		uuid,
	// 		varchar,
	// 		vector,
	// 	}) => ({
	// 		bigint1: bigint({ mode: "number" }).notNull(),
	// 		bigint2: bigint({ mode: "bigint" }).notNull(),
	// 		bigserial1: bigserial({ mode: "number" }).notNull(),
	// 		bigserial2: bigserial({ mode: "bigint" }).notNull(),
	// 		bit: bit({ dimensions: 5 }).notNull(),
	// 		boolean: boolean().notNull(),
	// 		date1: date({ mode: "date" }).notNull(),
	// 		date2: date({ mode: "string" }).notNull(),
	// 		char1: char({ length: 10 }).notNull(),
	// 		char2: char({ length: 1, enum: ["a", "b", "c"] }).notNull(),
	// 		cidr: cidr().notNull(),
	// 		doublePrecision: doublePrecision().notNull(),
	// 		geometry1: geometry({ type: "point", mode: "tuple" }).notNull(),
	// 		geometry2: geometry({ type: "point", mode: "xy" }).notNull(),
	// 		halfvec: halfvec({ dimensions: 3 }).notNull(),
	// 		inet: inet().notNull(),
	// 		integer: integer().notNull(),
	// 		interval: interval().notNull(),
	// 		json: json().notNull(),
	// 		jsonb: jsonb().notNull(),
	// 		line1: line({ mode: "abc" }).notNull(),
	// 		line2: line({ mode: "tuple" }).notNull(),
	// 		macaddr: macaddr().notNull(),
	// 		macaddr8: macaddr8().notNull(),
	// 		numeric: numeric().notNull(),
	// 		point1: point({ mode: "xy" }).notNull(),
	// 		point2: point({ mode: "tuple" }).notNull(),
	// 		real: real().notNull(),
	// 		serial: serial().notNull(),
	// 		smallint: smallint().notNull(),
	// 		smallserial: smallserial().notNull(),
	// 		text1: text().notNull(),
	// 		text2: text({ enum: ["a", "b", "c"] }).notNull(),
	// 		sparsevec: sparsevec({ dimensions: 3 }).notNull(),
	// 		time: time().notNull(),
	// 		timestamp1: timestamp({ mode: "date" }).notNull(),
	// 		timestamp2: timestamp({ mode: "string" }).notNull(),
	// 		uuid: uuid().notNull(),
	// 		varchar1: varchar({ length: 10 }).notNull(),
	// 		varchar2: varchar({ length: 1, enum: ["a", "b", "c"] }).notNull(),
	// 		vector: vector({ dimensions: 3 }).notNull(),
	// 		array1: integer().array().notNull(),
	// 		array2: integer().array().array(2).notNull(),
	// 		array3: varchar({ length: 10 }).array().array(2).notNull(),
	// 	}),
	// );
	// const result = createSelectSchema(table);
	// const expected = evalSchema(generateSelectSchema(table));
	// expectSchemaShape(result).from(expected);
});

// Recursive TopLevelCondition test
test.skip("recursive type - TopLevelCondition", () => {
	// const TopLevelCondition: z.ZodType<TopLevelCondition> = z
	// 	.custom<TopLevelCondition>()
	// 	.superRefine(() => {});
	// const table = pgTable("test", {
	// 	json: json().$type<TopLevelCondition>().notNull(),
	// 	jsonb: jsonb().$type<TopLevelCondition>(),
	// });
	// const result = createSelectSchema(table);
	// const expected = z.object({
	// 	json: TopLevelCondition,
	// 	jsonb: z.nullable(TopLevelCondition),
	// });
	// expectSchemaShape(result).from(expected);
});
