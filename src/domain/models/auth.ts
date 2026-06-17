import { z } from 'zod';

// Standard response wrapper for the new API spec
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  dataList: z.array(dataSchema),
  status: z.enum(['SUCCESS', 'ERROR', 'FAIL']),
  isHasError: z.boolean(),
  message: z.string().nullable(),
  totalCount: z.number(),
});

export const EntityIdSchema = z.object({
  id: z.string().uuid(),
  entityType: z.string(),
});

export const UserSchema = z.object({
  id: z.string().or(EntityIdSchema), // Handling both old and new ID formats
  phoneNumber: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(['SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER']).optional(),
  authority: z.string().optional(), // backward compatibility
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  name: z.string().optional(),
  additionalInfo: z.record(z.string(), z.any()).nullable().optional(),
});

export const JwtPairSchema = z.object({
  token: z.string(),
  refreshToken: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type JwtPair = z.infer<typeof JwtPairSchema>;
export type EntityId = z.infer<typeof EntityIdSchema>;

export interface ApiResponse<T> {
  dataList: T[];
  status: 'SUCCESS' | 'ERROR' | 'FAIL';
  isHasError: boolean;
  message: string | null;
  totalCount: number;
}
