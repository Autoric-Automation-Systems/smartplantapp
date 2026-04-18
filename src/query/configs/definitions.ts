export type Config = {
  id: string;
  device_id: string;
  event_name: string;
  min?: number;
  max?: number;
  created_at: string;
  updated_at: string;
  alarm: boolean;
}