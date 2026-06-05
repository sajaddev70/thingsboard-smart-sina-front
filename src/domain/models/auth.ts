import { z } from 'zod';

export const EntityIdSchema = z.object({
  id: z.string().uuid(),
  entityType: z.string(),
});

export const UserSchema = z.object({
  id: EntityIdSchema,
  createdTime: z.number(),
  tenantId: EntityIdSchema,
  customerId: EntityIdSchema.optional(),
  email: z.string().email(),
  authority: z.enum(['SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER']),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  name: z.string(),
  additionalInfo: z.record(z.string(), z.any()).nullable(),
});

export const JwtPairSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type JwtPair = z.infer<typeof JwtPairSchema>;
export type EntityId = z.infer<typeof EntityIdSchema>;
