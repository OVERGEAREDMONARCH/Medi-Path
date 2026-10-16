// In-memory store for the patient area. Seeds from src/data/mock.ts; changes last until page reload.
import { useSyncExternalStore } from "react";
import {
  doctors,
  initialAppointments,
  initialConversations,
  initialNotifications,
  type Appointment,
  type AppNotification,
  type Conversation,
} from "@/data/mock";

interface State {
  appointments: Appointment[];
  conversations: Conversation[];
  notifications: AppNotification[];
}

let state: State = {
  appointments: [...initialAppointments],
  conversations: initialConversations.map((c) => ({ ...c, messages: [...c.messages] })),
  notifications: [...initialNotifications],
};
const listeners = new Set<() => void>();
const set = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const usePatientStore = () => useSyncExternalStore(subscribe, () => state);

export const getDoctor = (id: string) => doctors.find((d) => d.id === id);

export const addAppointment = (a: Omit<Appointment, "id" | "status">) => {
  const appt: Appointment = { ...a, id: `a${Date.now()}`, status: "Scheduled" };
  set({
    appointments: [...state.appointments, appt].sort((x, y) =>
      `${x.date}${x.time}`.localeCompare(`${y.date}${y.time}`),
    ),
  });
  return appt;
};

export const rescheduleAppointment = (id: string, date: string, time: string) =>
  set({ appointments: state.appointments.map((a) => (a.id === id ? { ...a, date, time } : a)) });

export const isSlotTaken = (doctorId: string, date: string, time: string, ignoreId?: string) =>
  state.appointments.some((a) => a.id !== ignoreId && a.doctorId === doctorId && a.date === date && a.time === time);

export const sendMessage = (conversationId: string, body: string) =>
  set({
    conversations: state.conversations.map((c) =>
      c.id === conversationId
        ? { ...c, messages: [...c.messages, { id: `m${Date.now()}`, from: "patient", body, sentAt: new Date().toISOString() }] }
        : c,
    ),
  });

export const markNotificationRead = (id: string) =>
  set({ notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) });

export const markAllNotificationsRead = () =>
  set({ notifications: state.notifications.map((n) => ({ ...n, read: true })) });
