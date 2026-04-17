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
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <form action={formAction} onSubmit={handleSubmit} className="flex flex-col">
                <input type="hidden" name="device_id" value={config.device_id ?? ""} />
                <input type="hidden" name="id" value={config.id} />
                <input type="hidden" name="event_name" value={config.event_name ?? ""} />
                <div className="w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-gray-700 p-1 justify-center">

                    <div className="flex items-center gap-3 px-2 mt-2 lg:justify-end">
                        <h5 className="mb-1 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Config for {config.event_name}
                        </h5>

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

                    <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-1">
                        <div className="mt-2">
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
                </div>
            </form>
        </div>
    );
}