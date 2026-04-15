"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useRouter } from "next/navigation";
import { Alarm } from "@/query/alarms/definitions";
import { de } from "zod/v4/locales";
import { Device } from "@/query/devices/definitions";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      fetchAlarms();
    }
  }, [isOpen]);

  const fetchAlarms = async () => {
    try {
      const response = await fetch('/api/alarms/recent');
      const data = await response.json();
      setAlarms(data);
    } catch (error) {
      console.error('Error fetching alarms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices/all');
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const markAsRead = async (alarmId: string) => {
    try {
      const response = await fetch(`/api/alarms/${alarmId}/read`, {
        method: 'POST',
      });

      if (response.ok) {
        setAlarms(prev => prev.map(alarm =>
          alarm.id === alarmId ? { ...alarm, readed: true } : alarm
        ));
      }
    } catch (error) {
      console.error('Error marking alarm as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/alarms/read-all', {
        method: 'POST',
      });

      if (response.ok) {
        setAlarms(prev => prev.map(alarm => ({ ...alarm, readed: true })));
      }
    } catch (error) {
      console.error('Error marking all alarms as read:', error);
    }
  };

  const unreadCount = alarms.filter(alarm => !alarm.readed).length;

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours} h`;
    if (diffDays < 7) return `${diffDays} d`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  };

  const handleClick = () => {
    toggleDropdown();
  };

  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${unreadCount === 0 ? "hidden" : "flex"
            }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="fixed inset-x-2 top-20 flex flex-col rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark w-auto max-w-[calc(100vw-1rem)] h-auto max-h-[calc(100vh-6rem)] sm:absolute sm:top-full sm:mt-[17px] sm:inset-x-auto sm:left-auto sm:right-0 sm:bottom-auto sm:w-[361px]"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Alarmes
            </h5>
            {unreadCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 whitespace-nowrap"
              >
                Marcar todos
              </button>
            )}
            <button
              onClick={toggleDropdown}
              className="text-gray-500 transition dropdown-toggle dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-gray-500 dark:text-gray-400">Carregando...</div>
            </div>
          ) : alarms.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center p-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3 dark:bg-green-900/30">
                <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nenhum alarme ativo
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {alarms.slice(0, 8).map((alarm) => {
                const deviceName = devices.find(device => device.id === alarm.device_id)?.name || 'Desconecido';
                return (
                  <li key={alarm.id}>
                    <div className={`flex gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/5 ${!alarm.readed ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                      <div className="flex-shrink-0">
                        <div className={`h-3 w-3 rounded-full mt-2 ${!alarm.readed ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-1">
                          <p className="text-sm text-gray-800 dark:text-white/90 font-medium break-words">
                            {alarm.message}
                          </p>
                          {!alarm.readed && (
                            <button
                              onClick={() => markAsRead(alarm.id)}
                              className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 whitespace-nowrap self-start"
                            >
                              Marcar
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="truncate max-w-[220px]">Dispositivo: {deviceName}</span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full hidden sm:inline"></span>
                          <span>{formatRelativeTime(alarm.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="p-3 border-t border-gray-100 dark:border-gray-700">
          <Link
            href="/alarms"
            onClick={closeDropdown}
            className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Ver todos os alarmes
          </Link>
        </div>
      </Dropdown>
    </div>
  );
}