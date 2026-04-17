'use client';

import { useState, useCallback, useMemo } from 'react';
import { Alarm } from "@/query/alarms/definitions";
import { useRouter } from 'next/navigation';
import { Device } from '@/query/devices/definitions';
import { useOptimizedFetch } from '@/hooks/useOptimizedFetch';

interface TableAlarmsOptimizedProps {
    initialAlarms: Alarm[];
    devices: Device[];
    currentPage: number;
    totalPages: number;
}

export default function TableAlarmsOptimized({ 
    initialAlarms, 
    devices,
    currentPage,
    totalPages 
}: TableAlarmsOptimizedProps) {
    const [alarms, setAlarms] = useState(initialAlarms);
    const [isMarkingAll, setIsMarkingAll] = useState(false);
    const router = useRouter();

    // Cache para marcação de alarmes como lidos
    const { mutate: mutateAlarms } = useOptimizedFetch<Alarm[]>(
        `/api/alarms?page=${currentPage}`,
        {
            fallbackData: alarms,
            revalidateOnMount: false,
        }
    );

    // Mapa de devices para acesso rápido
    const deviceMap = useMemo(() => 
        new Map(devices.map(device => [device.id, device])),
        [devices]
    );

    // Função otimizada para marcar como lido
    const markAsRead = useCallback(async (alarmId: string) => {
        try {
            const response = await fetch(`/api/alarms/${alarmId}/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Atualiza o estado local
                setAlarms(prev => prev.map(alarm =>
                    alarm.id === alarmId ? { ...alarm, readed: true } : alarm
                ));
                
                // Invalida o cache para esta página
                mutateAlarms();
            }
        } catch (error) {
            console.error('Error marking alarm as read:', error);
        }
    }, [mutateAlarms]);

    // Função otimizada para marcar todos como lidos
    const markAllAsRead = useCallback(async () => {
        if (isMarkingAll) return;
        
        setIsMarkingAll(true);
        try {
            const response = await fetch('/api/alarms/read-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Atualiza todos no estado local
                setAlarms(prev => prev.map(alarm => ({ ...alarm, readed: true })));
                
                // Invalida o cache
                mutateAlarms();
                
                // Recarrega apenas se necessário (dados em tempo real)
                setTimeout(() => {
                    router.refresh();
                }, 1000);
            }
        } catch (error) {
            console.error('Error marking all alarms as read:', error);
        } finally {
            setIsMarkingAll(false);
        }
    }, [isMarkingAll, mutateAlarms, router]);

    // Calcular contagem de não lidos
    const unreadCount = useMemo(() => 
        alarms.filter(alarm => !alarm.readed).length,
        [alarms]
    );

    // Dados virtuais para performance (se houver muitos registros)
    const visibleAlarms = useMemo(() => 
        alarms.slice(0, 100), // Limitar visualização a 100 registros
        [alarms]
    );

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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white/90">
                            Alarms ({alarms.length})
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Showing {visibleAlarms.length} of {alarms.length} alarms
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                {unreadCount} unread
                            </span>
                            <button
                                onClick={markAllAsRead}
                                disabled={isMarkingAll}
                                className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                                {isMarkingAll ? 'Processing...' : 'Mark all read'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table com scroll virtualizado para performance */}
            <div className="overflow-x-auto max-h-[600px]">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 sticky top-0">
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
                        {visibleAlarms.map((alarm) => {
                            const device = deviceMap.get(alarm.device_id);
                            return (
                                <tr
                                    key={alarm.id}
                                    className={`${!alarm.readed ? 'bg-red-50 dark:bg-red-900/10' : 'bg-white dark:bg-gray-900'} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`h-2 w-2 rounded-full mr-2 ${!alarm.readed ? 'bg-red-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
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
                                            <p className="text-sm text-gray-800 dark:text-white/90 line-clamp-2">
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
                                                className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
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

            {/* Footer com informações */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex justify-between items-center">
                    <span>
                        Page {currentPage} of {totalPages} • {unreadCount} unread alarms
                    </span>
                    <span className="text-xs">
                        Data cached for optimal performance
                    </span>
                </div>
            </div>
        </div>
    );
}