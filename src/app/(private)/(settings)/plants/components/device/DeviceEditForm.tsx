'use client';
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { updateData, State } from "@/query/devices/actions";
import { useActionState, useTransition } from "react";
import { Device } from "@/query/devices/definitions";

export default function DeviceEditForm({
    closeModal,
    device
}: {
    closeModal: () => void,
    device: Device
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
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Edit Device: {device.name}
                </h4>
            </div>
            <form action={formAction} onSubmit={handleSubmit} className="flex flex-col">
                <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-1">
                    <input type="hidden" name="idmachine" value={device.idmachine ?? ""} />
                    <input type="hidden" name="id" value={device.id} />
                    <div className="mt-7">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Device Information
                        </h5>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2">
                                <Label>Name</Label>
                                <Input name="name" defaultValue={device.name} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
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
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}