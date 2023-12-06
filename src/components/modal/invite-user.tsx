"use client"

import { useAuthInfo } from "@propelauth/react"
import { FormEvent, useState } from "react"
import * as z from "zod"
import { sendInvite } from "../../lib/services"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Props = {
  open: boolean
  orgId: string
  org: string
  onClose: () => void
}

const formSchema = z.object({
    email: z.string().email(),
    role: z.string(),
});

const InviteUserModal: React.FC<Props> = (props: Props) => {
  const { accessToken } = useAuthInfo()
  const [orgName, setOrgName] = useState<string>(``)
  const [email, setEmail] = useState<string>(``)
  const [role, setRole] = useState<string>(``)

  const onChange = (open: boolean) => {
    if (!open) {
      props.onClose()
    }
  }

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       role: "",
//     },
//   });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await sendInvite({ email , orgId: props.orgId, role }, accessToken!)
    console.log('role', res)
    props.onClose()
  }

  return (
    <Dialog open={props.open} onOpenChange={onChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className='text-right'>
                  Email
                </Label>
                <Input
                  id='email'
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="User's Email"
                  className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
                  autoComplete='false'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Organization Name
                </Label>
                <Input
                  id='name'
                  disabled
                  value={props.org}
                  className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
                  autoComplete='false'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='role' className='text-right'>
                  Role
                </Label>
                <Input
                  id='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Please Choose a Role"
                  className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
                  autoComplete='false'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>
                Save
              </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteUserModal
