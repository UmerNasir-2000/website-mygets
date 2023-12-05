"use client"

import Image from "next/image"
import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(7, {
    message: "Password must be valid.",
  }),
})

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push('/dashboard')
  }

  return (
    <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <div>
        <Image src='/logo.png' alt='MyGETS' width={100} height={40} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 border-slate-500 border-2 rounded-lg p-7'
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email <span className="text-red-700">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your email'
                    {...field}
                    className="w-64 md:w-80 focus:outline-none focus:border-none focus:border-transparent focus:ring-0"
                    type='email'
                    autoComplete="false"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password <span className="text-red-700">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your password'
                    {...field}
                    className="w-64 md:w-80 focus:outline-none focus:border-none focus:border-transparent focus:ring-0"
                    type='password'
                    autoComplete="false"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
          {/* <p>Already Have An Account.? <Link href='login'>Login</Link></p> */}
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm
