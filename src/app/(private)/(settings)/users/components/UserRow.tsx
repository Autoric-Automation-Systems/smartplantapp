"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { PencilIcon } from "@heroicons/react/24/outline";
import IconAction from "@/components/common/IconAction";
import Image from "next/image";
import EditForm from "./EditForm";
import { User } from "@/query/users/definitions";

const roleLabel = (role: string) =>
  role === "admin" ? "Administrator" : role === "dev" ? "Developer" : "User";

export default function UserRow({ user }: { user: User }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
            <Image
              fill
              sizes="40px"
              src={user.avatarurl || "/images/logo/logoicon.png"}
              alt=""
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
              {user.name} {user.lastname}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600 dark:bg-white/5 dark:text-gray-300">
            {roleLabel(user.role)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">{user.phone || "—"}</span>
        </div>

        <IconAction label={`Edit ${user.name}`} onClick={openModal}>
          <PencilIcon className="h-4 w-4" />
        </IconAction>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-lg">
        <EditForm closeModal={closeModal} user={user} />
      </Modal>
    </>
  );
}
