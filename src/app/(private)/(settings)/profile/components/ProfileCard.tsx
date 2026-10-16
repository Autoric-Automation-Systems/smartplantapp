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

export default function ProfileCard({ user }: { user: User }) {
  const { isOpen, openModal, closeModal } = useModal();

  const details: [string, string][] = [
    ["First name", user.name],
    ["Last name", user.lastname],
    ["Email", user.email],
    ["Phone", user.phone || "—"],
    ["Role", roleLabel(user.role)],
    ["Bio", user.bio || "—"],
  ];

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-2 sm:w-40 sm:flex-shrink-0">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
            <Image
              fill
              sizes="112px"
              src={user?.avatarurl || "/images/logo/logoicon.png"}
              alt=""
              className="object-cover"
              unoptimized
            />
          </div>
          <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white">
            {user.name} {user.lastname}
          </h3>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-300">
            {roleLabel(user.role)}
          </span>
        </div>

        <dl className="grid min-w-0 flex-1 grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          {details.map(([term, value]) => (
            <div key={term} className="min-w-0">
              <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {term}
              </dt>
              <dd className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex-shrink-0">
          <IconAction label="Edit profile" onClick={openModal}>
            <PencilIcon className="h-4 w-4" />
          </IconAction>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-lg">
        <EditForm closeModal={closeModal} user={user} />
      </Modal>
    </>
  );
}
