"use client";

import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
    noteId: number;
};


const DeleteNoteDialog = ({ noteId }: Props) => {
    const router = useRouter();
    const deleteNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/deleteNote", {
                noteId,
            });
            return response.data;
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        deleteNote.mutate(undefined, {
            onSuccess: () => {
                router.push("/dashboard");
            },
            onError: (err) => {
                console.error(err);
            },
        });

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"destructive"}
                    size="sm"
                    disabled={deleteNote.isLoading}
                >
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        note.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form onSubmit={handleSubmit}>
                        <Button
                            variant={"destructive"}
                            disabled={deleteNote.isLoading}
                        >
                            <Trash />
                        </Button>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteNoteDialog