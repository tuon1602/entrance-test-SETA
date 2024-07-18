"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { addPost } from "@/stores/redux/slices/postsSlice";
import { toast } from "sonner";

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const [openState, setOpenState] = useState<boolean>(false);
  const formSchema = z.object({
    id: z.number(),
    title: z.string().min(5, {
      message: "Title must be at least 5 characters.",
    }),
    body: z.string().min(10, {
      message: "Body must be at least 10 characters.",
    }),
    userId: z.number(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: Date.now(), //id as an currenttime
      userId: Math.floor(Math.random() * 100) + 1, //userId is from 1 to 100 random
      title: "",
      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(addPost(values));
    form.reset();
    toast.success("Post added successfully!", {
      duration: 1000,
    });
    setOpenState(false);
  }
  return (
    <Dialog onOpenChange={setOpenState} open={openState}>
      <DialogTrigger className="bg-green-400 p-2 rounded-md">
        Add post
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your body here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create post</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostForm;
