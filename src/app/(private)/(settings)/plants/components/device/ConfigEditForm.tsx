'use client';
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { updateData, State } from "@/query/configs/actions";
import { useActionState, useTransition } from "react";
import { Config } from "@/query/configs/definitions";

export default function ConfigEditForm({
    closeModal,
    config
}: {
    closeModal: () => void,
    config: Config
}) {

    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(updateData, initialState);
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startTransition(() => {
            formAction(new FormData(e.currentTarget));
        });
    }

    return (
        <div className="w-full max-w-2xl p-4 md:p-2 xl:p-10 mb-4 m-2 sm:m-4 mx-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-11 border border-gray-200 dark:border-gray-700">
            <form action={formAction} onSubmit={handleSubmit} className="flex flex-col">
                <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-1">
                    <input type="hidden" name="device_id" value={config.device_id ?? ""} />
                    <input type="hidden" name="id" value={config.id} />
                    <input type="hidden" name="event_name" value={config.event_name ?? ""} />
                    <div className="mt-2">
                        <h5 className="mb-1 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            {config.event_name}  Config
                        </h5>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div>
                                <Label>Min Value</Label>
                                <Input name="min" type="number" defaultValue={config.min ?? ""} placeholder={config.min?.toString()} />
                            </div>
                            <div>
                                <Label>Max Value</Label>
                                <Input name="max" type="number" defaultValue={config.max ?? ""} placeholder={config.max?.toString()} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-2 lg:justify-end">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={closeModal}
                    >
                        Close
                    </Button>

                    <Button
                        type={"submit"}
                        disabled={isPending}
                    >
                        Save Config
                    </Button>
                </div>
            </form>
        </div>
    );
}