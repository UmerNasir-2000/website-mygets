"use client"

import { useAuthInfo } from "@propelauth/react"
import { FormEvent, useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"

type Props = {
  open: boolean
  orgId: string
  org: string
  onClose: () => void
}

const InviteUserModal: React.FC<Props> = (props: Props) => {
  const { accessToken } = useAuthInfo()
  const [email, setEmail] = useState<string>(``)
  const [role, setRole] = useState<string>(``)

  const onChange = (open: boolean) => {
    if (!open) {
      props.onClose()
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await sendInvite(
      { email, orgId: props.orgId, role },
      accessToken!
    )
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
                type='email'
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
              <Select onValueChange={(val) => setRole(val)}>
                <SelectTrigger className='w-full md:w-[280px]'>
                  <SelectValue placeholder='Select Role' />
                </SelectTrigger>
                <SelectContent placeholder="Select Role">
                  <SelectGroup>
                    <SelectItem value='Admin'>Admin</SelectItem>
                    <SelectItem value='Member'>Member</SelectItem>
                    <SelectItem value='Manager'>Manager</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteUserModal
