'use client';

import { CheckIcon, InformationCircleIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

export default function MsgPage() {
    const searchParams = useSearchParams();
    
    const title = searchParams.get('title');
    const message = searchParams.get('message');
    const type = searchParams.get('type');

    if (!title || !message || !type) return null;

    let formateMsg = {
        classes: '',
        icon: <CheckIcon width={24} height={24} />,
    }

    if (type === 'success') {
        formateMsg.classes = 'bg-green-50 dark:bg-green-800/50';
        formateMsg.icon = <CheckIcon width={24} height={24} />;
    }
    if (type === 'error') {
        formateMsg.classes = 'bg-red-50 dark:bg-red-800/50';
        formateMsg.icon = <XMarkIcon width={24} height={24} />;
    }
    if (type === 'info') {
        formateMsg.classes = 'bg-blue-50 dark:bg-blue-800/50';
        formateMsg.icon = <InformationCircleIcon width={24} height={24} />;
    }
    if (type === 'warning') {
        formateMsg.classes = 'bg-yellow-50 dark:bg-yellow-800/50';
        formateMsg.icon = <ExclamationCircleIcon width={24} height={24} />;
    }

    return (
        <div
            className={`rounded-xl border mb-4 p-4 md:p-5 ${formateMsg.classes} dark:border-gray-800`}
        >
            <div className="flex items-start gap-3">
                <div className={`-mt-0.5 flex h-8 w-8 items-center justify-center rounded-full`}>
                    {formateMsg.icon}
                </div>

                <div>
                    <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>

                </div>
            </div>
        </div>
    );
}