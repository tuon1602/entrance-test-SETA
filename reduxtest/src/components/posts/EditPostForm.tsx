"use client";

import React, { memo, useState } from "react";
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
import { editPost } from "@/stores/redux/slices/postsSlice";
import { toast } from "sonner";

interface IProps {
  post:
    | {
        id: number;
        userId: number;
        title: string;
        body: string;
      }
    | undefined;
  onClose: () => void;
}

const EditPostForm: React.FC<IProps> = memo(({ post, onClose }) => {
  const dispatch = useDispatch();
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
      id: post?.id, //id as an currenttime
      userId: post?.userId, //userId is from 1 to 100 random
      title: post?.title,
      body: post?.body,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(editPost(values));
    form.reset();
    onClose();
    toast.success("Post edited successfully!", {
      duration: 1000,
    });
  }
  return (
    <Form {...form} key={post?.id}>
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
                <Textarea placeholder="Your body here" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit post</Button>
      </form>
    </Form>
  );
});

export default EditPostForm;
