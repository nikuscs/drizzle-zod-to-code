import { test, } from "vitest";

test.skip("refine table - select", () => {
	// const table = pgTable("test", {
	// 	c1: integer(),
	// 	c2: integer().notNull(),
	// 	c3: integer().notNull(),
	// });
	// const result = createSelectSchema(table, {
	// 	c2: (schema) => schema.max(1000),
	// 	c3: z.string().transform(Number),
	// });
	// const expected = evalSchema(
	// 	generateSelectSchema(table, {
	// 		c2: (schema) => schema.max(1000),
	// 		c3: z.string().transform(Number),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("refine table - select with custom data type", () => {
	// const customText = customType({ dataType: () => "text" });
	// const table = pgTable("test", {
	// 	c1: integer(),
	// 	c2: integer().notNull(),
	// 	c3: integer().notNull(),
	// 	c4: customText(),
	// });
	// const customTextSchema = z.string().min(1).max(100);
	// const result = createSelectSchema(table, {
	// 	c2: (schema) => schema.max(1000),
	// 	c3: z.string().transform(Number),
	// 	c4: customTextSchema,
	// });
	// const expected = evalSchema(
	// 	generateSelectSchema(table, {
	// 		c2: (schema) => schema.max(1000),
	// 		c3: z.string().transform(Number),
	// 		c4: customTextSchema,
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("refine table - insert", () => {
	// const table = pgTable("test", {
	// 	c1: integer(),
	// 	c2: integer().notNull(),
	// 	c3: integer().notNull(),
	// 	c4: integer().generatedAlwaysAs(1),
	// });
	// const result = createInsertSchema(table, {
	// 	c2: (schema) => schema.max(1000),
	// 	c3: z.string().transform(Number),
	// });
	// const expected = evalSchema(
	// 	generateInsertSchema(table, {
	// 		c2: (schema) => schema.max(1000),
	// 		c3: z.string().transform(Number),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("refine table - update", () => {
	// const table = pgTable("test", {
	// 	c1: integer(),
	// 	c2: integer().notNull(),
	// 	c3: integer().notNull(),
	// 	c4: integer().generatedAlwaysAs(1),
	// });
	// const result = createUpdateSchema(table, {
	// 	c2: (schema) => schema.max(1000),
	// 	c3: z.string().transform(Number),
	// });
	// const expected = evalSchema(
	// 	generateUpdateSchema(table, {
	// 		c2: (schema) => schema.max(1000),
	// 		c3: z.string().transform(Number),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});
