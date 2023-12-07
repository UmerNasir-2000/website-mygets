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
  const [industryType, setIndustryType] = useState<string>(``)
  const [country, setCountry] = useState<string>(``)
  const [tenderProducts, setTenderProducts] = useState<string>(``)

  const onChange = (open: boolean) => {
    if (!open) {
      props.onClose()
    }
  }

  const onSubmit = async () => {
    await createNewOrganization(
      { name: orgName, country, industryType, tenderProducts },
      accessToken!
    )
    window.location.reload()
  }

  return (
    <Dialog open={props.open} onOpenChange={onChange}>
      <DialogContent className='max-w-[425px] sm:max-w-[625px]'>
        <DialogHeader>
          <DialogTitle>Add Organization</DialogTitle>
        </DialogHeader>
        <form className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name <span className="text-red-700 font-bold">*</span>
            </Label>
            <Input
              id='name'
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization's name"
              className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
              autoComplete='false'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='industryType' className='text-right'>
              Industry Type <span className="text-red-700 font-bold">*</span>
            </Label>
            <Input
              id='industryType'
              required
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
              placeholder='Please Enter Industry Type'
              className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
              autoComplete='false'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='country' className='text-right'>
              Country <span className="text-red-700 font-bold">*</span>
            </Label>
            <Input
              id='country'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Please Enter Country'
              className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
              autoComplete='false'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='tenderProducts' className='text-right'>
              Tender Products
            </Label>
            <Input
              id='tenderProducts'
              value={tenderProducts}
              onChange={(e) => setTenderProducts(e.target.value)}
              placeholder='Please Enter Tender Products, separated by comma'
              className='col-span-3 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
              autoComplete='false'
            />
          </div>
        </form>
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
