export type Event = {
  id: string;
  recorded_at: string;
  idmachine: string;
  iddevice: string;
  event: string;
  value: string | number;
}