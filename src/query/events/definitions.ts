export type Event = {
  id: string;
  created_at: string;
  machine_id: string;
  device_id: string;
  name: string;
  value: string | number;
}