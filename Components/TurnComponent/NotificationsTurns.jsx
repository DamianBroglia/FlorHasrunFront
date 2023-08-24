import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function NotificationsTurns() {
    useEffect(() => {
        const scheduleNotification = async () => {
            const fechaNotificacion = new Date(2023, 7, 21, 19, 13); // Agosto es el mes 7 en JavaScript

            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Notificación automática',
                    body: 'Esta es una notificación programada automáticamente para el 21/8/2023 a las 19:05.',
                },
                trigger: fechaNotificacion,
            });

            console.log(`Notificación programada automáticamente con ID: ${notificationId}`);
        };

        scheduleNotification();
    }, []);
    return (
        <View>
            <Text>Notificación automática programada</Text>
        </View>
    );

}