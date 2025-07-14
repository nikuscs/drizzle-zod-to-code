import { describe, it, expect } from "vitest";
import { generateSchemas } from "../src/generate.js";
import * as pg from "drizzle-orm/pg-core";

describe("generate schema", () => {
	it("should generate all schemas for a table", async () => {
		const nameEnum = pg.pgEnum("name", ["foo", "bar"]);
		const table = pg.pgTable("users", {
			id: pg.integer().primaryKey().notNull(),
			name: nameEnum("name").notNull(),
		});

		const result = await generateSchemas(table, "users");

		const expectedSchema = `import { z } from "zod";

const UserSelectSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int(),
  name: z.enum(["foo", "bar"])
});

const UserUpdateSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int().optional(),
  name: z.enum(["foo", "bar"]).optional()
});

const UserInsertSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int(),
  name: z.enum(["foo", "bar"])
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
