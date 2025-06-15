// import { z } from 'zod'

// const dailyHoursSchema = z.object({
//   open: z.string(),
//   close: z.string(),
// })

// export const newUserSchema = z.object({
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8, 'Password must be at least 8 characters long.')
//     .max(20, 'Password must not exceed 20 characters.')
//     .regex(/[A-Z]/, 'Password must include at least one uppercase letter.')
//     .regex(/\d/, 'Password must include at least one number.'),
//   name: z
//     .string()
//     .min(2, 'Name must be at least 2 characters.')
//     .max(20, 'Name must not exceed 20 characters.'),
//   isBusiness: z.boolean(),
//   businessAddresses: z
//     .array(
//       z.object({
//         description: z.string(),
//         location: z.object({
//           type: z.literal('Point'),
//           coordinates: z.array(z.number()).length(2),
//         }),
//       }),
//     )
//     .optional(),
//   businessHours: z
//     .object({
//       mon: dailyHoursSchema.optional(),
//       tue: dailyHoursSchema.optional(),
//       wed: dailyHoursSchema.optional(),
//       thu: dailyHoursSchema.optional(),
//       fri: dailyHoursSchema.optional(),
//       sat: dailyHoursSchema.optional(),
//       sun: dailyHoursSchema.optional(),
//     })
//     .optional(),
//   businessType: z.string().optional(),
//   isEmailVerified: z.boolean(),
//   isNewBusiness: z
//     .object({ isNew: z.boolean(), newUntil: z.date() })
//     .optional(),
//   imgUrl: z.string().optional(),
//   birthday: z.date().optional(),
// })

// export const credentialsSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8).max(20),
// })

// export const resetPasswordSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8).max(20),
//   code: z.string().min(4).max(4),
// })

// export const emailSchema = z.string().email()

// export const commentSchema = z.object({
//   text: z.string(),
//   userId: z.string(),
//   postId: z.string(),
//   createdAt: z.date().default(() => new Date()),
//   parentId: z.string().optional(),
//   likes: z.array(z.string()).default([]),
//   tags: z.array(z.string()).default([]),
// })

// export const postSchema = z.object({
//   text: z.string().optional(),
//   userId: z.string(),
//   createdAt: z.date().default(() => new Date()),
//   mediaUrl: z.array(z.string()).optional().default([]),
//   address: z.string().optional(),
// })

// export const eventSchema = z.object({
//   userId: z.string(),
//   title: z.string(),
//   description: z.string(),
//   date: z.date(),
//   hours: z.string().optional(),
//   location: z.string(),
//   mediaUrl: z.array(z.string()).optional().default([]),
//   createdAt: z.date().default(() => new Date()),
//   exLink: z.string().optional(),
//   expiresIn: z.date(),
// })

// export const storySchema = z.object({
//   userId: z.string(),
//   text: z.string().optional(),
//   mediaUrl: z.string(),
//   address: z.string(),
//   createdAt: z.date().default(() => new Date()),
//   expiresIn: z.date().default(() => new Date(Date.now() + 24 * 60 * 60 * 1000)),
// })
