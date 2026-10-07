import {z} from 'zod';

const short = z.string().trim().min(1).max(200);

export const requestSchema = z.object({
  mode: z.enum(['request', 'inquiry']),
  name: short,
  email: z.email().max(254),
  place: z.string().trim().max(500),
  preferred: z.string().trim().max(200),
  activities: z.string().trim().max(2000),
  checkpoints: z.string().trim().max(2000),
  formats: z.array(z.enum(['写真', '動画'])).max(2),
  wishes: z.string().trim().max(2000),
  consent: z.literal(true),
  website: z.string().max(200).default(''),
}).superRefine((value, ctx) => {
  if (value.mode === 'request') {
    for (const key of ['place', 'preferred', 'activities'] as const) {
      if (!value[key]) ctx.addIssue({code: 'custom', path: [key], message: '入力してください'});
    }
  }
  if (value.mode === 'inquiry' && !value.wishes) {
    ctx.addIssue({code: 'custom', path: ['wishes'], message: 'お問い合わせ内容を入力してください'});
  }
});

export type RequestInput = z.infer<typeof requestSchema>;
