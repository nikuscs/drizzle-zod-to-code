import { expect, test } from "vitest";
import { mysqlTable } from "drizzle-orm/mysql-core";
import { createSelectSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema } from "../../src/schema.js";

test("true to be true", () => {
	expect(true).toBe(true);
});

test.skip("all data types", () => {
	const table = mysqlTable(
		"test",
		({
			bigint,
			binary,
			boolean,
			char,
			date,
			datetime,
			decimal,
			double,
			float,
			int,
			json,
			mediumint,
			mysqlEnum,
			real,
			serial,
			smallint,
			text,
			time,
			timestamp,
			tinyint,
			varchar,
			varbinary,
			year,
			longtext,
			mediumtext,
			tinytext,
		}) => ({
			bigint1: bigint({ mode: "number" }).notNull(),
			bigint2: bigint({ mode: "bigint" }).notNull(),
			bigint3: bigint({ unsigned: true, mode: "number" }).notNull(),
			bigint4: bigint({ unsigned: true, mode: "bigint" }).notNull(),
			binary: binary({ length: 10 }).notNull(),
			boolean: boolean().notNull(),
			char1: char({ length: 10 }).notNull(),
			char2: char({ length: 1, enum: ["a", "b", "c"] }).notNull(),
			date1: date({ mode: "date" }).notNull(),
			date2: date({ mode: "string" }).notNull(),
			datetime1: datetime({ mode: "date" }).notNull(),
			datetime2: datetime({ mode: "string" }).notNull(),
			decimal1: decimal().notNull(),
			decimal2: decimal({ unsigned: true }).notNull(),
			double1: double().notNull(),
			double2: double({ unsigned: true }).notNull(),
			float1: float().notNull(),
			float2: float({ unsigned: true }).notNull(),
			int1: int().notNull(),
			int2: int({ unsigned: true }).notNull(),
			json: json().notNull(),
			mediumint1: mediumint().notNull(),
			mediumint2: mediumint({ unsigned: true }).notNull(),
			enum: mysqlEnum("enum", ["a", "b", "c"]).notNull(),
			real: real().notNull(),
			serial: serial().notNull(),
			smallint1: smallint().notNull(),
			smallint2: smallint({ unsigned: true }).notNull(),
			text1: text().notNull(),
			text2: text({ enum: ["a", "b", "c"] }).notNull(),
			time: time().notNull(),
			timestamp1: timestamp({ mode: "date" }).notNull(),
			timestamp2: timestamp({ mode: "string" }).notNull(),
			tinyint1: tinyint().notNull(),
			tinyint2: tinyint({ unsigned: true }).notNull(),
			varchar1: varchar({ length: 10 }).notNull(),
			varchar2: varchar({ length: 1, enum: ["a", "b", "c"] }).notNull(),
			varbinary: varbinary({ length: 10 }).notNull(),
			year: year().notNull(),
			longtext1: longtext().notNull(),
			longtext2: longtext({ enum: ["a", "b", "c"] }).notNull(),
			mediumtext1: mediumtext().notNull(),
			mediumtext2: mediumtext({ enum: ["a", "b", "c"] }).notNull(),
			tinytext1: tinytext().notNull(),
			tinytext2: tinytext({ enum: ["a", "b", "c"] }).notNull(),
		}),
	);

	const result = createSelectSchema(table);
	const expected = evalSchema(generateSelectSchema(table));
	expectSchemaShape(result).from(expected);
});

test.skip("type coercion - all", () => {
	// const table = mysqlTable(
	// 	"test",
	// 	({ bigint, boolean, timestamp, int, text }) => ({
	// 		bigint: bigint({ mode: "bigint" }).notNull(),
	// 		boolean: boolean().notNull(),
	// 		timestamp: timestamp().notNull(),
	// 		int: int().notNull(),
	// 		text: text().notNull(),
	// 	}),
	// );
	// const { createSelectSchema } = createSchemaFactory({ coerce: true });
	// const result = createSelectSchema(table);
	// const expected = evalSchema(generateSelectSchema(table, { coerce: true }));
	// expectSchemaShape(result).from(expected);
});

test.skip("type coercion - mixed", () => {
	// const table = mysqlTable("test", ({ timestamp, int }) => ({
	// 	timestamp: timestamp().notNull(),
	// 	int: int().notNull(),
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
	// const table = mysqlTable("test", {
	// 	json: json().$type<TopLevelCondition>(),
	// });
	// const result = createSelectSchema(table);
	// const expected = z.object({
	// 	json: z.nullable(TopLevelCondition),
	// });
	// expectSchemaShape(result).from(expected);
});
