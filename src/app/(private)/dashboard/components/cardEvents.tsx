import { Count } from "@/query/counts/definitions";
import Badge, { BadgeColor } from "./BadgeValue";
import { Event } from "@/query/events/definitions";

export default async function CardEvents({ events, type }: { events: Event[], type: string }) {
    const value = events[0].value.toString();
    let colorVariant = "primary" as BadgeColor;

    if (value == '1') {
        colorVariant = "success";
    } else if (value == '0') {
        colorVariant = "error";
    } else {
        colorVariant = "primary";
    }

    return (
        <div className="flex flex-wrap gap-2 m-2">
            <Badge>
                <div className="flex items-center gap-2 py-2">
                    <Badge >
                        {type}
                    </Badge>
                    <Badge color={colorVariant} >
                        {(value).toString() === "1" ? "ON" :
                            (value).toString() === "0" ? "OFF" :
                                (value).toString()}
                    </Badge>
                </div>
            </Badge>

        </div>
    )
}