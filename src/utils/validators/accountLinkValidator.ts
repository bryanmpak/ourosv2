import { z } from "zod"

export const AccountLinkValidator = z.object({
  email: z.string().email({ message: "please input valid email address" }),
  passcode: z.string().length(6, { message: "passcode must be 6 numbers" }),
})

export type TAccountLinkValidator = z.infer<typeof AccountLinkValidator>
