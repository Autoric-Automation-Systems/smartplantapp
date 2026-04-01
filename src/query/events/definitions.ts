export type Event = {
  id: string;
  created_at: string;
  machine_id: string;
  device_id: string;
  event: string;
  value: string | number;
}