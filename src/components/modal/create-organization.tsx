"use client"

import { useAuthInfo } from "@propelauth/react"
import { useState } from "react"
import { createNewOrganization } from "../../lib/services"
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
  onClose: () => void
}

const CreateOrganizationModal: React.FC<Props> = (props: Props) => {
  const { accessToken } = useAuthInfo()
  const [orgName, setOrgName] = useState<string>(``)

  const onChange = (open: boolean) => {
    if (!open) {
      props.onClose()
    }
  }

  const onSubmit = async () => {
    await createNewOrganization(orgName, accessToken!)
    window.location.reload()
  }

  return (
    <Dialog open={props.open} onOpenChange={onChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Organization</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization's name"
              className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
              autoComplete='false'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='button' onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateOrganizationModal
