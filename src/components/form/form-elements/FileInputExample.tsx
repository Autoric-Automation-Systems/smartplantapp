"use client";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import { upload } from '@vercel/blob/client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";



export default function FileInputExample() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function loadUser() {
      const res = await fetch("/api/user");

      if (!res.ok) return;

      const data = await res.json();

      if (data) {
        setUser(data);
      }
    }

    loadUser();
    setAvatarUrl(user?.avatarurl || null);
  }, [status, user?.avatarurl]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    //console.log("Selected file:", file.name);
    setUploading(true);
    try {
      const newBlob = await upload('avatar/ ' + file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload'
      });
      setAvatarUrl(newBlob.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <ComponentCard title="Change Picture">
      <div>
        <Label>Upload picture</Label>
        <FileInput onChange={handleAvatarChange} className="custom-class" />
        <div>
          {uploading && <p className="text-xs text-blue-600 mt-1">Enviando avatar...</p>}
          {avatarUrl && (
            <div className="mt-2">
              <Image
                width={500}
                height={500}
                src={avatarUrl ? avatarUrl : "/images/logo/logoicon.png"}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md"
              />
              <input type="hidden" name="avatarurl" value={avatarUrl} />
            </div>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
