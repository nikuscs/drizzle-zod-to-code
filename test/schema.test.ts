import { describe, it } from "vitest";
import { generateInsertSchema, generateSelectSchema, generateUpdateSchema } from "../src/schema";
import * as pg from "drizzle-orm/pg-core";
import * as mysql from "drizzle-orm/mysql-core";
import * as sqlite from "drizzle-orm/sqlite-core";

import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { evalSchema } from "./utils/evalZodSchema";
import { expectSchemaShape } from "./utils/expectSchemaShape";

describe("generateSelectSchema", () => {
	it("should allow to create schemas for a simple pgTable table", () => {
		const table = pg.pgTable("users", {
			id: pg.integer().generatedAlwaysAsIdentity().primaryKey(),
			name: pg.text().notNull(),
			age: pg.integer().notNull(),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it("should allow to create a select schema for a complex pgTable table", () => {
		const table = pg.pgTable("pg_all_types", {
			id: pg.integer().primaryKey().notNull(),
			isActive: pg.boolean().notNull(),
			createdDate: pg.date({ mode: "date" }),
			createdAt: pg.timestamp({ mode: "date" }),
			createdAtStr: pg.timestamp({ mode: "string" }),
			networkCidr: pg.cidr(),
			networkInet: pg.inet(),
			timeInterval: pg.interval(),
			macA: pg.macaddr(),
			macB: pg.macaddr8(),
			money: pg.numeric(),
			description: pg.text(),
			tags: pg.sparsevec({ dimensions: 3 }),
			loginTime: pg.time(),
			bitFlag: pg.bit({ dimensions: 8 }),
			userId: pg.uuid(),
			username: pg.varchar({ length: 50 }),
			bitEnum: pg.text({ enum: ["yes", "no"] }),
			tinyEnum: pg.varchar({ enum: ["a", "b", "c"] }),
			smallNumber: pg.smallint(),
			smallAuto: pg.smallint().default(1),
			regularSerial: pg.serial(),
			bigNumber: pg.bigint({ mode: "number" }),
			doubleVal: pg.doublePrecision(),
			floatVal: pg.real(),
			pointXY: pg.point({ mode: "xy" }),
			pointTuple: pg.point({ mode: "tuple" }),
			geoXY: pg.geometry({ type: "point", mode: "xy" }),
			geoTuple: pg.geometry({ type: "point", mode: "tuple" }),
			lineTuple: pg.line({ mode: "tuple" }),
			lineABC: pg.line({ mode: "abc" }),
			jsonVal: pg.json(),
			jsonbVal: pg.jsonb(),
			vectorVal: pg.vector({ dimensions: 3 }),
			halfVector: pg.halfvec({ dimensions: 2 }),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it.skip("should allow to create a select schema for a pgTable table with shortCode and bigIntReal", () => {
		const table = pg.pgTable("pg_all_types", {
			id: pg.integer().primaryKey().notNull(),
			shortCode: pg.char({ length: 10 }),
			bigIntReal: pg.bigint({ mode: "bigint" }),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it("should allow to create schemas for a simple mysqlTable table", () => {
		const table = mysql.mysqlTable("users", {
			id: mysql.int().primaryKey().autoincrement(),
			name: mysql.text().notNull(),
			age: mysql.int().notNull(),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it("should allow to create a select schema for a complex mysqlTable table", () => {
		const table = mysql.mysqlTable("mysql_all_types", {
			isActive: mysql.boolean(),
			createdDate: mysql.date({ mode: "date" }),
			createdAt: mysql.datetime({ mode: "date" }),
			createdAtStr: mysql.datetime({ mode: "string" }),
			timeStr: mysql.time(),
			timestampStr: mysql.timestamp({ mode: "string" }),
			dateStr: mysql.date({ mode: "string" }),
			bin: mysql.binary(),
			varbin: mysql.varbinary({ length: 255 }),
			dec: mysql.decimal(),
			tinyTxt: mysql.tinytext(),
			text: mysql.text(),
			medTxt: mysql.mediumtext(),
			longTxt: mysql.longtext(),
			tinyEnum: mysql.tinytext({ enum: ["yes", "no"] }),
			textEnum: mysql.text({ enum: ["red", "green"] }),
			medEnum: mysql.mediumtext({ enum: ["x", "y"] }),
			longEnum: mysql.longtext({ enum: ["foo", "bar"] }),
			charEnum: mysql.char({ enum: ["A", "B"] }),
			varcharEnum: mysql.varchar({ enum: ["1", "2"], length: 2 }),
			mysqlEnum: mysql.mysqlEnum("role", ["user", "admin"]),
			tinyInt: mysql.tinyint(),
			tinyUInt: mysql.tinyint({ unsigned: true }),
			smallInt: mysql.smallint(),
			smallUInt: mysql.smallint({ unsigned: true }),
			mediumInt: mysql.mediumint(),
			mediumUInt: mysql.mediumint({ unsigned: true }),
			intVal: mysql.int(),
			intUInt: mysql.int({ unsigned: true }),
			floatVal: mysql.float(),
			floatUInt: mysql.float({ unsigned: true }),
			doubleVal: mysql.double(),
			doubleUInt: mysql.double({ unsigned: true }),
			bigIntNumber: mysql.bigint({ mode: "number" }),
			serial: mysql.serial(),
			year: mysql.year(),
			jsonVal: mysql.json(),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it.skip("should allow to create a select schema for a mysqlTable table with bigIntBig and bigUInt", () => {
		const table = mysql.mysqlTable("mysql_all_types", {
			isActive: mysql.boolean(),
			bigIntBig: mysql.bigint({ mode: "bigint" }),
			bigUInt: mysql.bigint({ mode: "bigint", unsigned: true }),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it("should allow to create schemas for a simple sqliteTable table", () => {
		const table = sqlite.sqliteTable("users", {
			id: sqlite.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
			name: sqlite.text({ mode: "text" }).notNull(),
			age: sqlite.integer({ mode: "number" }).notNull(),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it("should allow to create a select schema for a complex sqliteTable table", () => {
		const table = sqlite.sqliteTable("sqlite_all_types", {
			boolVal: sqlite.integer({ mode: "boolean" }),
			ts: sqlite.integer({ mode: "timestamp" }),
			tsMs: sqlite.integer({ mode: "timestamp_ms" }),
			txt: sqlite.text({ mode: "text" }),
			txtWithLength: sqlite.text({ mode: "text", length: 255 }),
			txtEnum: sqlite.text({ mode: "text", enum: ["a", "b", "c"] }),
			numericVal: sqlite.numeric(),
			realVal: sqlite.real(),
			jsSafeInt: sqlite.integer({ mode: "number" }),
			jsonText: sqlite.text({ mode: "json" }),
			jsonBlob: sqlite.blob({ mode: "json" }),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});

	it.skip("should allow to create a select schema for a sqliteTable table with bigintVal and buf", () => {
		const table = sqlite.sqliteTable("sqlite_all_types", {
			bigintVal: sqlite.blob({ mode: "bigint" }),
			buf: sqlite.blob({ mode: "buffer" }),
		});

		expectSchemaShape(createSelectSchema(table)).from(evalSchema(generateSelectSchema(table)));
		expectSchemaShape(createUpdateSchema(table)).from(evalSchema(generateUpdateSchema(table)));
		expectSchemaShape(createInsertSchema(table)).from(evalSchema(generateInsertSchema(table)));
	});
});
