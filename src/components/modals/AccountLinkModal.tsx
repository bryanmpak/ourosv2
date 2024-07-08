"use client"

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { AccountLinkValidator } from "../../utils/validators/accountLinkValidator"
import { ZodError } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useAccountLink } from "../../hooks/useAccountLink"
import { InputOTPForm } from "../InputOTPForm"
import { createLink, submitLink } from "../../app/actions/accountLink"

interface ServerError extends Error {
  message: string
}

const AccountLinkModal = () => {
  const accountLink = useAccountLink()
  const [emailValue, setEmailValue] = useState("")
  const [createOtpValue, setCreateOtpValue] = useState("")
  const [submitOtpValue, setSubmitOtpValue] = useState("")
  const { user } = useUser()

  if (!user) {
    return
  }

  const handleCreate = async () => {
    try {
      const validationResult = AccountLinkValidator.parse({
        email: emailValue,
        passcode: createOtpValue,
      })

      const promise = createLink(
        validationResult.email,
        validationResult.passcode
      )

      toast.promise(promise, {
        loading: "creating link request..",
        success: "link request created",
        error: (err) => {
          if (err instanceof Error) {
            return err.message
          }
          return "An unknown error occurred"
        },
      })

      setEmailValue("")
      setCreateOtpValue("")

      accountLink.onClose()
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => issue.message)
        toast.error(errors.join(", "))
      } else {
        console.error("error creating link:", err)
        toast.error("An unknown error occurred")
      }
    }
  }

  // TODO: this is pretty cool, implement multi-faceted error msg
  const handleSubmit = async () => {
    const handleError = (err: ServerError) => {
      if (err.message === "incorrect passcode") {
        return "incorrect passcode."
      } else if (
        err.message === "request not found or you're not the intended recipient"
      ) {
        return "account link may have been an incorrect email address"
      } else {
        return "an error occurred, please try again"
      }
    }

    try {
      const promise = submitLink(
        user.primaryEmailAddress?.emailAddress as string,
        submitOtpValue
      )

      toast.promise(promise, {
        loading: "submitting link request..",
        success: () => {
          accountLink.onClose()
          setSubmitOtpValue("")
          return "account linked"
        },
        error: (err: ServerError) => handleError(err),
      })
    } catch (err) {
      console.error("error submitting link:", err)
      toast.error("link submit error")
    }
  }

  return (
    <Dialog open={accountLink.isOpen} onOpenChange={accountLink.onClose}>
      <DialogContent className=' px-10'>
        <DialogHeader className='border-b pb-3'>
          <h2 className='font-medium text-lg'>link to account</h2>
        </DialogHeader>
        <Tabs defaultValue='create'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='create'>create link</TabsTrigger>
            <TabsTrigger value='submit'>submit link</TabsTrigger>
          </TabsList>
          <TabsContent value='create'>
            <div className='pt-4 flex flex-col gap-y-4'>
              <div className='flex flex-col space-y-4'>
                <Label>partner&apos;s account email </Label>
                <Input
                  className='h-10 px-2 focus-visible:ring-transparent hover:border-muted-foreground focus-within:border-muted-foreground'
                  type='email'
                  placeholder='enter email address here...'
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              <div className='flex flex-col space-y-4'>
                <Label>input passcode</Label>
                <div className='flex justify-center'>
                  <InputOTPForm
                    otpValue={createOtpValue}
                    setOtpValue={setCreateOtpValue}
                  />
                </div>
              </div>
              <button onClick={handleCreate}>create link</button>
            </div>
          </TabsContent>
          <TabsContent value='submit'>
            <div className='pt-4 flex flex-col gap-y-4'>
              <div className='flex flex-col space-y-4'>
                <Label>input passcode</Label>
                <div className='flex justify-center'>
                  <InputOTPForm
                    otpValue={submitOtpValue}
                    setOtpValue={setSubmitOtpValue}
                  />
                </div>
              </div>
              <button onClick={handleSubmit}>submit link</button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AccountLinkModal
