import { z } from 'zod';
import { EntityIdSchema } from './auth';

export const DeviceSchema = z.object({
  id: EntityIdSchema,
  createdTime: z.number(),
  tenantId: EntityIdSchema,
  customerId: EntityIdSchema.nullable().optional(),
  name: z.string(),
  type: z.string(),
  label: z.string().nullable().optional(),
  deviceProfileId: EntityIdSchema,
  deviceData: z.any().optional(),
  active: z.boolean().optional(),
});

export type Device = z.infer<typeof DeviceSchema>;
