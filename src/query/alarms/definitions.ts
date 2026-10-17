/** Itens por página na tela de alarmes (compartilhado com o client). */
export const ALARMS_PAGE_SIZE = 20;

export type Alarm = {
  id: string
  device_id: string
  event_name: string
  message: string
  readed: boolean
  created_at: string
}

/** Alarme com o contexto de localização e os limites configurados. */
export type AlarmRow = Alarm & {
  device_name: string | null
  device_mac: string
  device_type: string
  machine_name: string | null
  area_name: string | null
  plant_name: string | null
  config_min: number | null
  config_max: number | null
}

export type AlarmsSummary = {
  total: number
  unread: number
  last24h: number
  byEvent: { event_name: string; total: number; unread: number }[]
  byDevice: { device_id: string; device_name: string | null; total: number; unread: number }[]
}

export type AlarmFilters = {
  status: "all" | "unread" | "read"
  event: string | null
  device: string | null
  period: "all" | "24h" | "7d" | "30d"
  search: string | null
}
