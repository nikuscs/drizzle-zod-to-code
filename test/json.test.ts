import { describe, it, expect } from "vitest";
import { generateSchemas } from "../src/generate.js";
import * as pg from "drizzle-orm/pg-core";
import { json } from "drizzle-orm/pg-core";

describe("generate schema", () => {
	it("should generate all schemas for a table", async () => {
		const table = pg.pgTable("users", {
			id: pg.integer().primaryKey().notNull(),
			other: json(),
		});

		const result = await generateSchemas(table, "users");

		const expectedSchema = `import { z } from "zod";

const UserSelectSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int(),
  other: z.union([z.union([z.string(), z.number(), z.boolean(), z.null()]), z.record(z.string(), z.any()), z.array(z.any())]).nullable()
});

const UserUpdateSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int().optional(),
  other: z.union([z.union([z.string(), z.number(), z.boolean(), z.null()]), z.record(z.string(), z.any()), z.array(z.any())]).nullable().optional()
});

const UserInsertSchema = z.object({
  id: z.number().min(-2147483648).max(2147483647).int(),
  other: z.union([z.union([z.string(), z.number(), z.boolean(), z.null()]), z.record(z.string(), z.any()), z.array(z.any())]).nullable().optional()
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

		console.log(result);

		expect(result).toBe(expectedSchema);
	});
});
