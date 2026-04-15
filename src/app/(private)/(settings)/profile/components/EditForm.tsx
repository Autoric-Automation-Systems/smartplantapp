'use client';
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { User } from "@/query/users/definitions";
import { updateData, State } from "@/query/users/actions";
import { useActionState, useState, useTransition } from "react";
import FileInputExample from "@/components/form/form-elements/FileInputExample";
import { upload } from '@vercel/blob/client';
import { deleteUnusedFiles } from "@/lib/deleteUnusedFiles";
import Image from "next/image";


export default function EditForm({ closeModal, user }: { closeModal: () => void, user: User }) {

    const initialState: State = { message: null, errors: {} };
    const updateUserWithId = updateData.bind(null, user.id);
    const [state, formAction] = useActionState(updateUserWithId, initialState);
    const [isPending, startTransition] = useTransition();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatarurl ?? null);
    const [uploading, setUploading] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startTransition(() => {
            formAction(new FormData(e.currentTarget));
        });
    }
    async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });
            setAvatarUrl(newBlob.url);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Edit Personal Information
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update your details to keep your profile up-to-date.
                </p>
            </div>
            <form action={formAction} onSubmit={handleSubmit} className="flex flex-col">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                    <div className="mt-7">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Personal Information
                        </h5>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <input type="hidden" id="role" name="role" value={user.role} />
                            <div className="col-span-2 lg:col-span-1">
                                <Label>First Name</Label>
                                <Input id="name" name="name" type="text" defaultValue={user.name} />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label>Last Name</Label>
                                <Input id="lastname" name="lastname" type="text" defaultValue={user.lastname} />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label>Email Address</Label>
                                <Input id="email" name="email" type="email" defaultValue={user.email} />
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <Label>Password</Label>
                                <Input id="password" name="password" type="password" />
                            </div>

                            <div className="col-span-2 lg:col-span-1">
                                <Label>Phone</Label>
                                <Input id="phone" name="phone" type="text" defaultValue={user.phone} />
                            </div>

                            <div className="col-span-2">
                                <Label>Bio</Label>
                                <Input id="bio" name="bio" type="text" defaultValue={user.bio} />
                            </div>
                            <div className="col-span-2">
                                <Label>Profile Picture</Label>
                                <Image
                                    width={500}
                                    height={500}
                                    src={user?.avatarurl ? user?.avatarurl : "/images/logo/logoicon.png"}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-full mb-4"
                                />

                                <FileInputExample />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                        Close
                    </Button>
                    <Button type={"submit"} disabled={isPending}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}