import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema } from "../../src/schema.js";
import { test } from "vitest";
import { sqliteView } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

test("view qb - select", () => {
	const table = sqliteTable("test", {
		id: int().primaryKey({ autoIncrement: true }),
		name: text().notNull(),
	});
	const view = sqliteView("test").as((qb) => qb.select({ id: table.id, age: sql``.as("age") }).from(table));

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test("view columns - select", () => {
	const view = sqliteView("test", {
		id: int().primaryKey({ autoIncrement: true }),
		name: text().notNull(),
	}).as(sql``);

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test("view with nested fields - select", () => {
	const table = sqliteTable("test", {
		id: int().primaryKey({ autoIncrement: true }),
		name: text().notNull(),
	});
	const view = sqliteView("test").as((qb) =>
		qb
			.select({
				id: table.id,
				nested: {
					name: table.name,
					age: sql``.as("age"),
				},
				table,
			})
			.from(table),
	);

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test.skip("refine view - select", () => {
	// const table = sqliteTable("test", {
	// 	c1: int(),
	// 	c2: int(),
	// 	c3: int(),
	// 	c4: int(),
	// 	c5: int(),
	// 	c6: int(),
	// });
	// const view = sqliteView("test").as((qb) =>
	// 	qb
	// 		.select({
	// 			c1: table.c1,
	// 			c2: table.c2,
	// 			c3: table.c3,
	// 			nested: {
	// 				c4: table.c4,
	// 				c5: table.c5,
	// 				c6: table.c6,
	// 			},
	// 			table,
	// 		})
	// 		.from(table),
	// );
	// const refinements = {
	// 	c2: (schema) => schema.max(1000),
	// 	c3: z.string().transform(Number),
	// 	nested: {
	// 		c5: (schema) => schema.max(1000),
	// 		c6: z.string().transform(Number),
	// 	},
	// 	table: {
	// 		c2: (schema) => schema.max(1000),
	// 		c3: z.string().transform(Number),
	// 	},
	// };
	// const result = createSelectSchema(view, refinements);
	// const expected = evalSchema(generateSelectSchema(view, refinements));
	// expectSchemaShape(result).from(expected);
});
