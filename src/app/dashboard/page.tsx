"use client"

import { useAuthInfo } from "@propelauth/react"
import { PlusCircleIcon, Settings2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import CreateOrganizationModal from "../../components/modal/create-organization"
import InviteUserModal from "../../components/modal/invite-user"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { fetchUserOrganizations } from "../../lib/services"

export interface Organization {
  id: string
  name: string
  role: string
  slug: string
  metadata: any
}

export default function DashboardPage() {
  const user = useAuthInfo()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [org, setOrg] = useState<Organization | null>(null)
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!user) {
      window.location.href = "/register"
    }
  }, [user])

  useEffect(() => {
    if (user?.accessToken)
      fetchUserOrganizations(user.accessToken).then((data) => {
        const organizations: Organization[] = data.map(
          (org: any) =>
            ({
              id: org.orgId,
              name: org.orgName,
              role: org.userAssignedRole,
              slug: org.urlSafeOrgName,
              metadata: org.orgMetadata
            } as Organization)
        )
        setOrganizations(organizations)
      })
  }, [user?.accessToken])

  return (
    <>
      <div className='container mx-auto px-4 py-2 md:p-0'>
        <header className='flex mb-5 justify-between'>
          <div className='text-3xl font-semibold text-gray-600'>
            Organizations
          </div>
          <Button size='sm' onClick={() => setOpen(true)}>
            <PlusCircleIcon className='mr-2 h-4 w-4' />
            Create Organization
          </Button>
        </header>
        <div className='rounded-md border-2'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Industry Type</TableHead>
                <TableHead>Tender Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.id}</TableCell>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>
                    <Badge>{org.role}</Badge>
                  </TableCell>
                  <TableCell>{org.slug}</TableCell>
                  <TableCell>{org.metadata?.country ?? `-`}</TableCell>
                  <TableCell>{org.metadata?.industryType ?? `-`}</TableCell>
                  <TableCell>{org.metadata?.tenderProducts ?? `-`}</TableCell>
                  {org.role === "Admin" && (
                    <TableCell
                      className='cursor-pointer'
                      onClick={() => {
                        setOrg(org)
                        setInviteModalOpen(true)
                      }}
                    >
                      <Settings2Icon />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {open && (
        <CreateOrganizationModal open={open} onClose={() => setOpen(false)} />
      )}
      {inviteModalOpen && (
        <InviteUserModal
          open={inviteModalOpen}
          org={org?.name!}
          orgId={org?.id!}
          onClose={() => setInviteModalOpen(false)}
        />
      )}
    </>
  )
}
