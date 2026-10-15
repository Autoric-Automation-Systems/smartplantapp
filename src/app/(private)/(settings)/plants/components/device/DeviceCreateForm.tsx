'use client';
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { updateData, State } from "@/query/devices/actions";
import { useActionState, useTransition } from "react";
import { Device } from "@/query/devices/definitions";

export default function DeviceCreatForm({
    closeModal,
    idmachine,
    devices
}: {
    closeModal: () => void,
    idmachine: string,
    devices: Device[]
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
                    Edit Information
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update details...
                </p>
            </div>
            <form action={formAction} onSubmit={handleSubmit} className="flex flex-col">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                    <input type="hidden" name="idmachine" value={idmachine} />
                    <div className="mt-7">
                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Device Information
                        </h5>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mb-5">
                            <div className="col-span-2">
                                <Label>Name</Label>
                                <Input name="name" defaultValue="New Device" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            {/* SELECT DEVICE */}
                            <div className="col-span-2">
                                <Label>Select Device</Label>
                                {devices && (
                                    <select
                                        name="id"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                                        required
                                    >
                                        <option value="">
                                            Select a device
                                        </option>
                                        {devices?.map((device) => (
                                            <option key={device.id} value={device.id}>
                                                {device.mac} • {device.type}
                                            </option>
                                        ))}
                                    </select>
                                )}
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
                        Save New
                    </Button>
                </div>
            </form>
        </div>
    );
}