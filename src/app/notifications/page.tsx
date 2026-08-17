"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Bell,
  FileText,
  CalendarDays,
  Megaphone,
  MessageCircle,
  Check,
  CheckCheck,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Notification = {
  id: string;
  student_id: string | null;
  title: string;
  message: string;
  type: string | null;
  read: boolean;
  link: string | null;
  created_at: string;
};

const getNotificationIcon = (
  type: string | null
) => {
  switch (type) {
    case "resource":
      return FileText;

    case "discussion":
      return MessageCircle;

    case "academic":
    case "exam":
      return CalendarDays;

    case "announcement":
      return Megaphone;

    default:
      return Bell;
  }
};

const formatTime = (date: string) => {
  const notificationDate = new Date(date);
  const now = new Date();

  const difference =
    now.getTime() -
    notificationDate.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1
        ? "minute"
        : "minutes"
    } ago`;
  }

  if (hours < 24) {
    return `${hours} ${
      hours === 1
        ? "hour"
        : "hours"
    } ago`;
  }

  if (days < 7) {
    return `${days} ${
      days === 1
        ? "day"
        : "days"
    } ago`;
  }

  return notificationDate.toLocaleDateString(
    [],
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [studentId, setStudentId] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [markingAll, setMarkingAll] =
    useState(false);

  /*
   * CREATE / LOAD STUDENT ID
   */

  useEffect(() => {
    let id =
      window.sessionStorage.getItem(
        "luqify_message_sender_id"
      );

    if (!id) {
      id =
        "Student-" +
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      window.sessionStorage.setItem(
        "luqify_message_sender_id",
        id
      );
    }

    setStudentId(id);
  }, []);

  /*
   * LOAD NOTIFICATIONS
   */

  useEffect(() => {
    if (!studentId) {
      return;
    }

    let mounted = true;

    const loadNotifications =
      async () => {
        setLoading(true);
        setErrorMessage("");

        const { data, error } =
          await supabase
            .from("notifications")
            .select(
              `
                id,
                student_id,
                title,
                message,
                type,
                read,
                link,
                created_at
              `
            )
            .or(
              `student_id.eq.${studentId},student_id.is.null`
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
            );

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "NOTIFICATIONS LOAD ERROR:",
            error.message
          );

          setErrorMessage(
            error.message ||
              "Unable to load notifications."
          );

          setLoading(false);
          return;
        }

        setNotifications(
          (data || []) as Notification[]
        );

        setLoading(false);
      };

    void loadNotifications();

    /*
     * REALTIME
     */

    const notificationChannel =
      supabase
        .channel(
          `notifications-page-${studentId}`
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
          },
          (payload) => {
            const newNotification =
              payload.new as Notification;

            const belongsToStudent =
              newNotification.student_id ===
                null ||
              newNotification.student_id ===
                studentId;

            if (!belongsToStudent) {
              return;
            }

            setNotifications(
              (current) => {
                const exists =
                  current.some(
                    (item) =>
                      item.id ===
                      newNotification.id
                  );

                if (exists) {
                  return current;
                }

                return [
                  newNotification,
                  ...current,
                ];
              }
            );
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notifications",
          },
          (payload) => {
            const updatedNotification =
              payload.new as Notification;

            const belongsToStudent =
              updatedNotification.student_id ===
                null ||
              updatedNotification.student_id ===
                studentId;

            if (!belongsToStudent) {
              return;
            }

            setNotifications(
              (current) =>
                current.map(
                  (notification) =>
                    notification.id ===
                    updatedNotification.id
                      ? updatedNotification
                      : notification
                )
            );
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "notifications",
          },
          (payload) => {
            const deletedId =
              payload.old?.id;

            if (!deletedId) {
              return;
            }

            setNotifications(
              (current) =>
                current.filter(
                  (notification) =>
                    notification.id !==
                    deletedId
                )
            );
          }
        )
        .subscribe();

    return () => {
      mounted = false;

      void supabase.removeChannel(
        notificationChannel
      );
    };
  }, [studentId]);

  /*
   * MARK ONE AS READ
   */

  const markAsRead = async (
    notificationId: string
  ) => {
    const notification =
      notifications.find(
        (item) =>
          item.id ===
          notificationId
      );

    if (
      !notification ||
      notification.read
    ) {
      return;
    }

    setNotifications(
      (current) =>
        current.map(
          (item) =>
            item.id ===
            notificationId
              ? {
                  ...item,
                  read: true,
                }
              : item
        )
    );

    const { error } =
      await supabase
        .from("notifications")
        .update({
          read: true,
        })
        .eq(
          "id",
          notificationId
        );

    if (error) {
      console.error(
        "MARK NOTIFICATION READ ERROR:",
        error.message
      );

      setNotifications(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              notificationId
                ? {
                    ...item,
                    read: false,
                  }
                : item
          )
      );
    }
  };

  /*
   * MARK ALL AS READ
   */

  const markAllAsRead = async () => {
    if (
      markingAll ||
      !studentId
    ) {
      return;
    }

    const unread =
      notifications.filter(
        (notification) =>
          !notification.read
      );

    if (unread.length === 0) {
      return;
    }

    setMarkingAll(true);

    setNotifications(
      (current) =>
        current.map(
          (notification) => ({
            ...notification,
            read: true,
          })
        )
    );

    const unreadIds =
      unread.map(
        (notification) =>
          notification.id
      );

    const { error } =
      await supabase
        .from("notifications")
        .update({
          read: true,
        })
        .in(
          "id",
          unreadIds
        );

    if (error) {
      console.error(
        "MARK ALL NOTIFICATIONS ERROR:",
        error.message
      );

      const { data } =
        await supabase
          .from("notifications")
          .select(
            `
              id,
              student_id,
              title,
              message,
              type,
              read,
              link,
              created_at
            `
          )
          .or(
            `student_id.eq.${studentId},student_id.is.null`
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setNotifications(
        (data || []) as Notification[]
      );
    }

    setMarkingAll(false);
  };

  /*
   * DELETE NOTIFICATION
   */

  const deleteNotification = async (
    notificationId: string
  ) => {
    const previous =
      notifications;

    setNotifications(
      (current) =>
        current.filter(
          (item) =>
            item.id !==
            notificationId
        )
    );

    const { error } =
      await supabase
        .from("notifications")
        .delete()
        .eq(
          "id",
          notificationId
        );

    if (error) {
      console.error(
        "DELETE NOTIFICATION ERROR:",
        error.message
      );

      setNotifications(previous);
    }
  };

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  /*
   * LOADING
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] dark:bg-slate-950">
        <div className="text-center">

          <div className="relative mx-auto mb-4 h-10 w-10">

            <div className="absolute inset-0 animate-ping rounded-full bg-[#C9A96E]/10" />

            <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#C9A96E]/20 border-t-[#C9A96E]" />

            <Bell
              size={17}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A96E]"
            />

          </div>

          <p className="text-sm font-semibold text-[#C9A96E]">
            Loading notifications...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-10 text-[#3B2412] dark:bg-slate-950 dark:text-white sm:px-6 md:py-16">

      <section className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900 md:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3B2412] text-white">
                <Bell size={27} />
              </div>

              <div>

                <h1 className="text-3xl font-black md:text-4xl">
                  Notifications
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Stay updated with Luqify e-Library.
                </p>

              </div>

            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() =>
                  void markAllAsRead()
                }
                disabled={markingAll}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B2412] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCheck size={17} />

                {markingAll
                  ? "Marking..."
                  : "Mark all as read"}
              </button>
            )}

          </div>

          {unreadCount > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 dark:bg-red-950/30 dark:text-red-400">

              <span className="h-2 w-2 rounded-full bg-red-500" />

              {unreadCount} unread{" "}
              {unreadCount === 1
                ? "notification"
                : "notifications"}

            </div>
          )}

        </div>

        {/* ERROR */}

        {errorMessage && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {/* EMPTY */}

        {notifications.length === 0 ? (

          <div className="rounded-[2rem] bg-white px-6 py-20 text-center shadow-sm dark:bg-slate-900">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F0] text-[#C9A96E] dark:bg-slate-800">
              <Bell size={30} />
            </div>

            <h2 className="text-xl font-black">
              No notifications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              When there is something important
              from Luqify e-Library, it will appear
              here.
            </p>

          </div>

        ) : (

          <div className="grid gap-3">

            {notifications.map(
              (notification) => {
                const Icon =
                  getNotificationIcon(
                    notification.type
                  );

                return (
                  <div
                    key={notification.id}
                    className={`
                      group relative flex gap-4 rounded-3xl p-5 shadow-sm transition
                      hover:-translate-y-0.5 hover:shadow-lg
                      ${
                        notification.read
                          ? "bg-white dark:bg-slate-900"
                          : "border border-[#C9A96E]/30 bg-[#fffaf0] dark:bg-slate-900"
                      }
                    `}
                  >

                    {/* UNREAD DOT */}

                    {!notification.read && (
                      <span className="absolute left-2 top-7 h-2.5 w-2.5 rounded-full bg-red-500" />
                    )}

                    {/* ICON */}

                    <div
                      className={`
                        flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl
                        ${
                          notification.read
                            ? "bg-[#FAF7F0] text-[#C9A96E] dark:bg-slate-800"
                            : "bg-[#C9A96E]/15 text-[#C9A96E]"
                        }
                      `}
                    >
                      <Icon size={23} />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">

                      {notification.link ? (
                        <Link
                          href={
                            notification.link
                          }
                          onClick={() =>
                            void markAsRead(
                              notification.id
                            )
                          }
                          className="block rounded-xl outline-none transition focus:ring-2 focus:ring-[#C9A96E]/40"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <h2
                              className={
                                notification.read
                                  ? "text-base font-bold"
                                  : "text-base font-black"
                              }
                            >
                              {notification.title}
                            </h2>

                            {!notification.read && (
                              <span className="shrink-0 rounded-full bg-[#C9A96E] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[#3B2412]">
                                New
                              </span>
                            )}

                          </div>

                          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {notification.message}
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#C9A96E]">

                            <span>
                              {formatTime(
                                notification.created_at
                              )}
                            </span>

                            <span className="text-slate-300 dark:text-slate-700">
                              •
                            </span>

                            <span className="inline-flex items-center gap-1">
                              Open
                              <ArrowRight
                                size={13}
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </span>

                          </div>

                        </Link>
                      ) : (

                        <div
                          onClick={() =>
                            void markAsRead(
                              notification.id
                            )
                          }
                          className="cursor-pointer"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <h2
                              className={
                                notification.read
                                  ? "text-base font-bold"
                                  : "text-base font-black"
                              }
                            >
                              {notification.title}
                            </h2>

                            {!notification.read && (
                              <span className="shrink-0 rounded-full bg-[#C9A96E] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[#3B2412]">
                                New
                              </span>
                            )}

                          </div>

                          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {notification.message}
                          </p>

                          <div className="mt-3">
                            <span className="text-xs font-semibold text-[#C9A96E]">
                              {formatTime(
                                notification.created_at
                              )}
                            </span>
                          </div>

                        </div>
                      )}

                      {/* FOOTER */}

                      <div className="mt-2 flex items-center justify-between gap-3">

                        <div>
                          {notification.read && (
                            <span className="flex items-center gap-1 px-2 text-[10px] font-semibold text-slate-400">
                              <Check size={13} />
                              Read
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            void deleteNotification(
                              notification.id
                            );
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-950/30"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </section>

    </main>
  );
}