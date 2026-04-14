"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { User } from "@/query/users/definitions";
import Image from "next/image";
import EditForm from "./EditForm";

export default function ProfileCard({ user }: { user: User }) {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    //console.log("Saving changes...");
    closeModal();
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Avatar Section - Centralizado e maior */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="relative w-40 h-40 overflow-hidden border-2 border-gray-300 dark:border-gray-700 rounded-full mb-4">
                <Image
                  src={user?.avatarurl || "/images/logo/logoicon.png"}
                  alt={`${user.name} ${user.lastname} - Smart Plant Profile`}
                  fill
                  className="object-cover"
                  sizes="160px"
                  unoptimized
                  priority
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                {user.name} {user.lastname}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {user.role === "admin" ? "Administrator" : user.role === "dev" ? "Developer" : "User"}
              </p>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    First Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Last Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user.lastname}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90 break-all">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Bio
                </p>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {user.bio || "No bio provided yet. Tell us a bit about yourself!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditForm closeModal={closeModal} user={user} />
      </Modal>
    </div>
  );
}
