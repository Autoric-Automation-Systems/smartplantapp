'use client';

import { useState } from 'react';
import { Alarm } from "@/query/alarms/definitions";
import { useRouter } from 'next/navigation';
import { Device } from '@/query/devices/definitions';

export default function TableAlarms({ initialAlarms, devices }: {
    initialAlarms: Alarm[],
    devices: Device[]
}) {
    const [alarms, setAlarms] = useState(initialAlarms);
    const router = useRouter();

    const deviceMap = new Map(devices.map(device => [device.id, device]));

    const markAsRead = async (alarmId: string) => {
        try {
            const response = await fetch(`/api/alarms/${alarmId}/read`, {
                method: 'POST',
            });

            if (response.ok) {
                // Atualiza o estado local
                setAlarms(prev => prev.map(alarm =>
                    alarm.id === alarmId ? { ...alarm, readed: true } : alarm
                ));
                // Recarrega a página para atualizar os dados
                router.refresh();
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
                // Marca todos como lidos no estado local
                setAlarms(prev => prev.map(alarm => ({ ...alarm, readed: true })));
                // Recarrega a página para atualizar os dados
                router.refresh();
            }
        } catch (error) {
            console.error('Error marking all alarms as read:', error);
        }
    };

    const unreadCount = alarms.filter(alarm => !alarm.readed).length;

    if (alarms.length === 0) {
        return (
            <div className="w-full rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="text-center py-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                        No Alarms Found
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        There are no alarms to display
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">
                        Alarms ({alarms.length})
                    </h3>
                    {unreadCount > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                {unreadCount} unread
                            </span>
                            <button
                                onClick={markAllAsRead}
                                className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                                Mark all read
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Device
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Message
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Time
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {alarms.map((alarm) => {
                            const device = deviceMap.get(alarm.device_id);
                            return (
                                <tr
                                    key={alarm.id}
                                    className={`${!alarm.readed ? 'bg-red-50 dark:bg-red-900/10' : 'bg-white dark:bg-gray-900'}`}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`h-2 w-2 rounded-full mr-2 ${!alarm.readed ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                            <span className="text-xs font-medium">
                                                {!alarm.readed ? 'Unread' : 'Read'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-gray-800 dark:text-white/90">
                                            {device?.name || `Device ${alarm.device_id}`}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="max-w-md">
                                            <p className="text-sm text-gray-800 dark:text-white/90">
                                                {alarm.message}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(alarm.created_at).toLocaleString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                day: '2-digit',
                                                month: 'short'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {!alarm.readed && (
                                            <button
                                                onClick={() => markAsRead(alarm.id)}
                                                className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                                            >
                                                Mark read
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}