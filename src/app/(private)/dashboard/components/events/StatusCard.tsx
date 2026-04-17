import { Label as LabelDefinition } from "@/query/labels/definitions";

export default function StatusCard({
  value,
  type,
  label,
}: {
  value: number;
  type: string;
  label: LabelDefinition | undefined;
}) {
  const isBinary = value === 0 || value === 1;
  const isOn = value === 1;

  const bg = isBinary
    ? isOn
      ? "bg-green-100 dark:bg-green-900"
      : "bg-red-100 dark:bg-red-900"
    : "bg-gray-100 dark:bg-gray-800";

  const text = isBinary
    ? isOn
      ? "text-green-700 dark:text-green-300"
      : "text-red-700 dark:text-red-300"
    : "text-gray-700 dark:text-gray-300";

  let on = "ON";
  let off = "OFF";

  switch (type) {
    case "event1":
      type = label?.event1 || "Event 1";
      on = label?.event1_on || "ON";
      off = label?.event1_off || "OFF";
      break;
    case "event2":
      type = label?.event2 || "Event 2";
      on = label?.event2_on || "ON";
      off = label?.event2_off || "OFF";
      break;
    case "event3":
      type = label?.event3 || "Event 3";
      on = label?.event3_on || "ON";
      off = label?.event3_off || "OFF";
      break;
  }
  return (
    <div className={`p-4 rounded-xl text-center ${bg}`}>
      <span className="text-xs text-gray-500 uppercase">
        {type}
      </span>

      <div className={`text-xl font-bold ${text}`}>
        {isBinary ? (isOn ? on : off) : value}
      </div>
    </div>
  );
}