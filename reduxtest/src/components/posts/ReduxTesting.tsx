"use client";
import { fetchPostsData } from "@/stores/redux/slices/postsSlice";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores/redux/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CreatePostForm from "./CreatePostForm";
import { removePost } from "@/stores/redux/slices/postsSlice";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditPostForm from "./EditPostForm";

const ReduxTesting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, isLoading, isError } = useSelector(
    (state: RootState) => state.posts
  );
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [editPostId, setEditPostId] = useState<number>();

  const handleDeletePost = (id: number) => {
    dispatch(removePost(id));
    toast.success("Deleted post", {
      duration: 1000,
    });
  };

  const handleEditUser = (id: number) => {
    setEditPostId(id);
  };
  useEffect(() => {
    dispatch(fetchPostsData());
  }, [dispatch]);

  if (isLoading && !isError) {
    return <p>Loading...</p>;
  }
  if (isError && !isLoading) {
    return <p>There has an error</p>;
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2>Create user here</h2>
        <CreatePostForm />
      </div>
      <Table className="">
        <TableCaption>A list of posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="text-center">UserId</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Body</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.userId}</TableCell>
              <TableCell className="text-balance">{post.title}</TableCell>
              <TableCell className="max-w-md text-balance">
                {post.body}
              </TableCell>
              <TableCell className="flex items-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger className="bg-red-500 p-2 rounded-md">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure want to delete this post
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will delete your post
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* <Dialog open={openDialogEdit} onOpenChange={setOpenDialogEdit}>
                  <DialogTrigger onClick={() => handleEditUser(post.id)} className="bg-blue-500 rounded-md p-2 w-[50px]">
                    Edit
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                    </DialogHeader>
                    <EditPostForm
                      post={posts.find((post) => post.id === editPostId)}
                      onClose={()=>setOpenDialogEdit(false)}
                    />
                  </DialogContent>
                </Dialog> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ReduxTesting;
