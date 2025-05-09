
import { test } from "vitest";

test.skip("refine table - select", () => {
	// const table = sqliteTable("test", {
	// 	c1: int(),
	// 	c2: int().notNull(),
	// 	c3: int().notNull(),
	// });
	// const result = createSelectSchema(table, {
	// 	c2: (s) => s.max(1000),
	// 	c3: z.string().transform(Number),
	// });
	// const expected = evalSchema(
	// 	generateSelectSchema(table, {
	// 		c2: (s) => s.max(1000),
	// 		c3: z.string().transform(Number),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("refine table - select with custom data type", () => {
	// const customText = customType({ dataType: () => "text" });
	// const table = sqliteTable("test", {
	// 	c1: int(),
	// 	c2: int().notNull(),
	// 	c3: int().notNull(),
	// 	c4: customText(),
	// });
	// const result = createSelectSchema(table, {
	// 	c2: (s) => s.max(1000),
	// 	c3: z.string().transform(Number),
	// 	c4: z.string().min(1).max(100),
	// });
	// const expected = evalSchema(
	// 	generateSelectSchema(table, {
	// 		c2: (s) => s.max(1000),
	// 		c3: z.string().transform(Number),
	// 		c4: z.string().min(1).max(100),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("refine table - insert", () => {
	// const table = sqliteTable("test", {
	// 	c1: int(),
	// 	c2: int().notNull(),
	// 	c3: int().notNull(),
	// 	c4: int().generatedAlwaysAs(1),
	// });
	// const result = createInsertSchema(table, {
	// 	c2: (s) => s.max(1000),
	// 	c3: z.string().transform(Number),
	// });
	// const expected = evalSchema(
	// 	generateInsertSchema(table, {
	// 		c2: (s) => s.max(1000),
	// 		c3: z.string().transform(Number),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});

test.skip("refine table - update", () => {
	// const table = sqliteTable("test", {
	// 	c1: int(),
	// 	c2: int().notNull(),
	// 	c3: int().notNull(),
	// 	c4: int().generatedAlwaysAs(1),
	// });
	// const result = createUpdateSchema(table, {
	// 	c2: (s) => s.max(1000),
	// 	c3: z.string().transform(Number),
	// });
	// const expected = evalSchema(
	// 	generateUpdateSchema(table, {
	// 		c2: (s) => s.max(1000),
	// 		c3: z.string().transform(Number),
	// 	}),
	// );
	// expectSchemaShape(result).from(expected);
});
