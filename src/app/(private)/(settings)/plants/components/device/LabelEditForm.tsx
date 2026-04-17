'use client';
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { updateData, State } from "@/query/labels/actions";
import { useActionState, useTransition } from "react";
import { Label as LabelDefinition } from "@/query/labels/definitions";

export default function LabelEditForm({
    closeModal,
    label
}: {
    closeModal: () => void,
    label: LabelDefinition
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
                <input type="hidden" name="device_id" value={label.device_id ?? ""} />
                <input type="hidden" name="id" value={label.id} />
                <div className="w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-gray-700 p-1 justify-center">

                    <div className="flex items-center gap-3 px-2 mt-2 lg:justify-end">
                        <h5 className="mb-1 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                            Config for Labels
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

                    <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-1 pt-3 lg:pb-6 border-t border-gray-200 dark:border-gray-700 mt-4">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            {/* Counter */}
                            <div className="col-span-2 lg:col-span-1 lg:col-start-1">
                                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                    <Label className="text-lg font-medium mb-3">Counter</Label>
                                    <Input name="count" type="text" defaultValue={label.count ?? ""} placeholder={label.count?.toString()} />
                                </div>
                            </div>

                            {/* Event 1 */}
                            <div className="col-span-2 lg:col-span-1 lg:col-start-2">
                                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                    <Label className="text-lg font-medium mb-3">Event 1</Label>
                                    <Input name="event1" type="text" defaultValue={label.event1 ?? ""} placeholder={label.event1?.toString()} className="mb-3" />
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                        <div>
                                            <Label className="text-sm">On</Label>
                                            <Input name="event1_on" type="text" defaultValue={label.event1_on ?? ""} placeholder={label.event1_on?.toString()} />
                                        </div>
                                        <div>
                                            <Label className="text-sm">Off</Label>
                                            <Input name="event1_off" type="text" defaultValue={label.event1_off ?? ""} placeholder={label.event1_off?.toString()} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event 2 */}
                            <div className="col-span-2 lg:col-span-1 lg:col-start-1 mt-4">
                                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                    <Label className="text-lg font-medium mb-3">Event 2</Label>
                                    <Input name="event2" type="text" defaultValue={label.event2 ?? ""} placeholder={label.event2?.toString()} className="mb-3" />
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                        <div>
                                            <Label className="text-sm">On</Label>
                                            <Input name="event2_on" type="text" defaultValue={label.event2_on ?? ""} placeholder={label.event2_on?.toString()} />
                                        </div>
                                        <div>
                                            <Label className="text-sm">Off</Label>
                                            <Input name="event2_off" type="text" defaultValue={label.event2_off ?? ""} placeholder={label.event2_off?.toString()} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event 3 */}
                            <div className="col-span-2 lg:col-span-1 lg:col-start-2 mt-4">
                                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                    <Label className="text-lg font-medium mb-3">Event 3</Label>
                                    <Input name="event3" type="text" defaultValue={label.event3 ?? ""} placeholder={label.event3?.toString()} className="mb-3" />
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                        <div>
                                            <Label className="text-sm">On</Label>
                                            <Input name="event3_on" type="text" defaultValue={label.event3_on ?? ""} placeholder={label.event3_on?.toString()} />
                                        </div>
                                        <div>
                                            <Label className="text-sm">Off</Label>
                                            <Input name="event3_off" type="text" defaultValue={label.event3_off ?? ""} placeholder={label.event3_off?.toString()} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}