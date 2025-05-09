import { test } from "vitest";
import { pgTable, serial, text, pgView, pgMaterializedView } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { evalSchema } from "../utils/evalZodSchema";
import { expectSchemaShape } from "../utils/expectSchemaShape";
import { generateSelectSchema } from "../../src/schema.js";
import { sql } from "drizzle-orm";

test("view qb - select", () => {
	const table = pgTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});
	const view = pgView("test").as((qb) => qb.select({ id: table.id, age: sql``.as("age") }).from(table));

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test("view columns - select", () => {
	const view = pgView("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	}).as(sql``);

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test("materialized view qb - select", () => {
	const table = pgTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});
	const view = pgMaterializedView("test").as((qb) => qb.select({ id: table.id, age: sql``.as("age") }).from(table));

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test("materialized view columns - select", () => {
	const view = pgView("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	}).as(sql``);

	const result = createSelectSchema(view);
	const expected = evalSchema(generateSelectSchema(view));
	expectSchemaShape(result).from(expected);
});

test("view with nested fields - select", () => {
	const table = pgTable("test", {
		id: serial().primaryKey(),
		name: text().notNull(),
	});
	const view = pgMaterializedView("test").as((qb) =>
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
	// const table = pgTable("test", {
	// 	c1: integer(),
	// 	c2: integer(),
	// 	c3: integer(),
	// 	c4: integer(),
	// 	c5: integer(),
	// 	c6: integer(),
	// });
	// const view = pgView("test").as((qb) =>
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
	// const result = createSelectSchema(view, {
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
	// });
	// const expected = evalSchema(
	// 	generateSelectSchema(view, {
	// 		c2: (schema) => schema.max(1000),
	// 		c3: z.string().transform(Number),
	// 		nested: {
	// 			c5: (schema) => schema.max(1000),
	// 			c6: z.string().transform(Number),
	// 		},
	// 		table: {
	// 			c2: (schema) => schema.max(1000),
	// 			c3: z.string().transform(Number),
	// 		},
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});
