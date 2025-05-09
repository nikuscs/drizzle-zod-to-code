import { describe, it, expect } from "vitest";
import { generateIndex, tableNameToSchemaName } from "../src/generate.js";
import { generateSchemas } from "../src/generate.js";
import * as pg from "drizzle-orm/pg-core";

describe("tableNameToSchemaName", () => {
	it("should convert snake_case table names to PascalCase schema names", () => {
		expect(tableNameToSchemaName("user_profiles")).toBe("UserProfile");
		expect(tableNameToSchemaName("order_items")).toBe("OrderItem");
	});

	it("should handle single word table names", () => {
		expect(tableNameToSchemaName("users")).toBe("User");
		expect(tableNameToSchemaName("products")).toBe("Product");
	});

	it("should handle already singular table names", () => {
		expect(tableNameToSchemaName("user")).toBe("User");
		expect(tableNameToSchemaName("product")).toBe("Product");
	});
});

describe("generate schema", () => {
	it("should generate all schemas for a table", async () => {
		const table = pg.pgTable("users", {
			id: pg.integer().primaryKey().notNull(),
			name: pg.text().notNull(),
			age: pg.integer().notNull(),
		});

		const result = await generateSchemas(table, "users");

		const expectedSchema = `import { z } from "zod";

const UserSelectSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int(),
  name: z.string(),
  age: z.number().min(-2147483648).max(2147483647).int()
});

const UserUpdateSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int().optional(),
  name: z.string().optional(),
  age: z.number().min(-2147483648).max(2147483647).int().optional()
});

const UserInsertSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int(),
  name: z.string(),
  age: z.number().min(-2147483648).max(2147483647).int()
});

type UserSelect = z.infer<typeof UserSelectSchema>;
type UserInsert = z.infer<typeof UserInsertSchema>;
type UserUpdate = z.infer<typeof UserUpdateSchema>;

export {
  UserSelectSchema,
  UserUpdateSchema,
  UserInsertSchema
};

export type {
  UserSelect,
  UserInsert,
  UserUpdate
};
`;

		expect(result).toBe(expectedSchema);
	});
});

describe("generate index", () => {
	it("should generate the index", async () => {
		const table = pg.pgTable("users", {
			id: pg.integer().primaryKey().notNull(),
			name: pg.text().notNull(),
			age: pg.integer().notNull(),
		});

		const result = await generateIndex(["users", "colors"]);
		const lines = result.split("\n");
		expect(lines[0]).toBe("export * from './user.js';");
		expect(lines[1]).toBe("export * from './color.js';");
	});
});
