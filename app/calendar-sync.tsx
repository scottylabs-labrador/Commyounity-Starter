import { View, Text, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import useDeviceCalendars from "../hooks/useDeviceCalendars";
import useGoogleCalendar from "../hooks/useGoogleCalendar";

export default function CalendarSyncScreen() {
  const {
    hasPermission,
    requestPermission,
    calendars,
    events,
    refreshEvents,
  } = useDeviceCalendars();

  const {
    isSignedIn,
    signIn,
    signOut,
    googleEvents,
    fetchGoogleEvents,
  } = useGoogleCalendar();

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Calendar Sync</Text>

      {/* Device calendars (Apple/Google accounts on the phone) */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Device Calendars</Text>
        {!hasPermission ? (
          <Button title="Grant Calendar Permission" onPress={requestPermission} />
        ) : (
          <>
            <Button title="Refresh Device Events" onPress={() => refreshEvents()} />
            <Text>Calendars: {calendars.length}</Text>
            <Text>Events (next 7d): {events.length}</Text>
          </>
        )}
      </View>

      {/* Direct Google Calendar via OAuth */}
      <View style={{ gap: 8, marginTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Google Calendar (OAuth)</Text>
        {!isSignedIn ? (
          <Button title="Connect Google Calendar" onPress={signIn} />
        ) : (
          <>
            <Button title="Fetch Google Events (next 7d)" onPress={fetchGoogleEvents} />
            <Button title="Disconnect Google" color="crimson" onPress={signOut} />
            <Text>Events (next 7d): {googleEvents.length}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}