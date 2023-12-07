"use client"

import Image from "next/image"
import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
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
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
})

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      `http://localhost:5000/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
    await response.json()
    window.location.href = "https://505027270.propelauthtest.com/login"
  }

  return (
    <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <div>
        <Image src='/logo.png' alt='MyGETS' width={100} height={40} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 border-slate-500 border-2 rounded-lg p-7'
          autoComplete='off'
        >
          <header className='text-2xl font-bold text-gray-700 tracking-wide'>
            Register
          </header>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className='text-red-700'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your email'
                    {...field}
                    className='w-64 md:w-80 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
                    type='email'
                    autoComplete='false'
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
                <FormLabel>
                  Password <span className='text-red-700'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your password'
                    {...field}
                    className='w-64 md:w-80 focus:outline-none focus:border-none focus:border-transparent focus:ring-0'
                    type='password'
                    autoComplete='false'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Sign Up
          </Button>
          <p className='text-sm'>
            Already Have An Account.?{" "}
            <a
              href='https://505027270.propelauthtest.com/login'
              className='text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors text-base'
            >
              Login
            </a>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm
