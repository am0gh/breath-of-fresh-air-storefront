import { Metadata } from "next"
import ResetPasswordTemplate from "@modules/account/templates/reset-password-template"

export const metadata: Metadata = {
  title: "Reset Password | Breath of Fresh Air",
  description: "Set a new password for your account.",
}

type Props = {
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams
  return <ResetPasswordTemplate token={token} />
}
