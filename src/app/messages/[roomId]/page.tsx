"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  MessageCircle,
  MoreVertical,
  Trash2,
  X,
  Smile,
  Paperclip,
  FileText,
  Search,
  ExternalLink,
  BookOpen,
  GraduationCap,
  LoaderCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Room = {
  id: string;
  name: string;
  description: string | null;
};

type Message = {
  id: string;
  room_id: string;
  sender_name: string;
  message: string;
  created_at: string;
  message_type: string | null;

  resource_id: string | null;
  resource_name: string | null;
  resource_url: string | null;
  resource_type: string | null;
};

type Resource = {
  id: string;
  title: string;
  faculty: string;
  programme: string;
  year: string;
  semester: string;
  category: string;
  course: string;
  file_url: string;
  file_type: string | null;
  file_name: string | null;
};

type TypingStudent = {
  studentId: string;
};

const emojis = [
  "😀",
  "😂",
  "🤣",
  "😊",
  "😍",
  "🥰",
  "😘",
  "😎",
  "🤔",
  "😅",
  "😭",
  "😢",
  "😡",
  "🤯",
  "😴",
  "🙌",
  "👏",
  "👍",
  "👎",
  "❤️",
  "🔥",
  "💯",
  "🎉",
  "🙏",
  "💪",
  "✨",
  "📚",
  "📝",
  "🎓",
  "💡",
];

const colors = [
  {
    bg: "bg-[#102A43]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#C9A96E]",
  },
  {
    bg: "bg-[#1F4D3A]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#C9A96E]",
  },
  {
    bg: "bg-[#4A235A]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#E5C98A]",
  },
  {
    bg: "bg-[#7A3E00]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#FFD98A]",
  },
  {
    bg: "bg-[#164E63]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#C9A96E]",
  },
  {
    bg: "bg-[#374151]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#C9A96E]",
  },
  {
    bg: "bg-[#5B2333]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#E8C77A]",
  },
  {
    bg: "bg-[#365314]",
    text: "text-white",
    meta: "text-white/55",
    icon: "bg-white/10 text-[#D8E6A8]",
  },
];

const colorIndex = (name: string) => {
  let h = 0;

  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0;
  }

  return Math.abs(h) % colors.length;
};

const initial = (name: string) =>
  name.trim().charAt(0).toUpperCase() || "?";

const timeText = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function MessageRoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId =
    typeof params.roomId === "string"
      ? params.roomId
      : Array.isArray(params.roomId)
        ? params.roomId[0]
        : "";

  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const [showAttachmentMenu, setShowAttachmentMenu] =
    useState(false);

  const [showResourcePicker, setShowResourcePicker] =
    useState(false);

  const [resources, setResources] =
    useState<Resource[]>([]);

  const [resourceSearch, setResourceSearch] =
    useState("");

  const [loadingResources, setLoadingResources] =
    useState(false);

  const [sharingResource, setSharingResource] =
    useState(false);

  const [typingStudents, setTypingStudents] =
    useState<TypingStudent[]>([]);

  /*
   * =========================================================
   * REFS
   * =========================================================
   */

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const typingChannelRef =
    useRef<
      ReturnType<typeof supabase.channel> | null
    >(null);

  const typingTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * =========================================================
   * MESSAGE SELECT
   * =========================================================
   */

  const messageSelect =
    "id,room_id,sender_name,message,created_at,message_type,resource_id,resource_name,resource_url,resource_type";

  /*
   * =========================================================
   * SESSION ID
   * =========================================================
   */

  useEffect(() => {
    let id = window.sessionStorage.getItem(
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

    setSenderId(id);
  }, []);

  /*
   * =========================================================
   * LOAD ROOM + MESSAGES
   * =========================================================
   */

  useEffect(() => {
    if (!roomId) return;

    let mounted = true;

    const load = async () => {
      setLoading(true);
      setErrorMessage("");

      const roomResult = await supabase
        .from("rooms")
        .select("id,name,description")
        .eq("id", roomId)
        .maybeSingle();

      if (!mounted) return;

      if (
        roomResult.error ||
        !roomResult.data
      ) {
        setRoom(null);

        setErrorMessage(
          roomResult.error?.message ||
            "This discussion no longer exists."
        );

        setLoading(false);
        return;
      }

      const messageResult = await supabase
        .from("messages")
        .select(messageSelect)
        .eq("room_id", roomId)
        .order("created_at", {
          ascending: true,
        });

      if (!mounted) return;

      setRoom(roomResult.data as Room);

      setMessages(
        (messageResult.data || []) as Message[]
      );

      if (messageResult.error) {
        setErrorMessage(
          messageResult.error.message ||
            "Messages could not be loaded."
        );
      }

      setLoading(false);
    };

    void load();

    const channel = supabase
      .channel(`messages-room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const newMessage =
            payload.new as Message;

          setMessages((current) =>
            current.some(
              (item) =>
                item.id === newMessage.id
            )
              ? current
              : [
                  ...current,
                  newMessage,
                ]
          );
        }
      )
      .subscribe();

    return () => {
      mounted = false;

      void supabase.removeChannel(channel);
    };
  }, [roomId]);

  /*
   * =========================================================
   * TYPING INDICATOR
   * =========================================================
   */

  useEffect(() => {
    if (!roomId || !senderId) return;

    const channel = supabase.channel(
      `typing-room-${roomId}`,
      {
        config: {
          presence: {
            key: senderId,
          },
        },
      }
    );

    typingChannelRef.current = channel;

    const sync = () => {
      const state = channel.presenceState();

      const list: TypingStudent[] = [];

      Object.entries(state).forEach(
        ([key, value]) => {
          if (key === senderId) return;

          const entries =
            Array.isArray(value)
              ? value
              : [];

          const typingEntry =
            entries.find(
              (entry) =>
                (
                  entry as {
                    typing?: boolean;
                  }
                )?.typing === true
            );

          if (typingEntry) {
            list.push({
              studentId:
                (
                  typingEntry as {
                    studentId?: string;
                  }
                ).studentId || key,
            });
          }
        }
      );

      setTypingStudents(list);
    };

    channel
      .on(
        "presence",
        {
          event: "sync",
        },
        sync
      )
      .on(
        "presence",
        {
          event: "join",
        },
        sync
      )
      .on(
        "presence",
        {
          event: "leave",
        },
        sync
      )
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            studentId: senderId,
            typing: false,
          });
        }
      });

    return () => {
      typingChannelRef.current = null;

      void channel.untrack();

      void supabase.removeChannel(channel);

      setTypingStudents([]);
    };
  }, [roomId, senderId]);

  const typing = async (value: boolean) => {
    if (
      !typingChannelRef.current ||
      !senderId
    ) {
      return;
    }

    try {
      await typingChannelRef.current.track({
        studentId: senderId,
        typing: value,
      });
    } catch {
      /*
       * Typing indicator is optional.
       */
    }
  };

  const stopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    void typing(false);
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);

    void typing(!!value.trim());

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(
        () => void typing(false),
        2500
      );
    }
  };

  /*
   * =========================================================
   * AUTO SCROLL
   * =========================================================
   */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingStudents]);

  /*
   * =========================================================
   * CLEANUP
   * =========================================================
   */

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current
        );
      }

      typingChannelRef.current = null;
    };
  }, []);

  /*
   * =========================================================
   * SEND TEXT MESSAGE
   * =========================================================
   */

  const sendMessage = async () => {
    const clean = message.trim();

    if (
      !clean ||
      sending ||
      !senderId ||
      !roomId
    ) {
      return;
    }

    setSending(true);
    setErrorMessage("");

    stopTyping();

    try {
      const result = await supabase
        .from("messages")
        .insert({
          room_id: roomId,
          sender_name: senderId,
          message: clean,
          message_type: "text",
        })
        .select(messageSelect)
        .single();

      if (result.error) {
        throw result.error;
      }

      if (result.data) {
        setMessages((current) =>
          current.some(
            (item) =>
              item.id === result.data.id
          )
            ? current
            : [
                ...current,
                result.data as Message,
              ]
        );
      }

      setMessage("");
      setShowEmojiPicker(false);
      setShowAttachmentMenu(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  };

  /*
   * =========================================================
   * LOAD RESOURCES
   * =========================================================
   */

  const openResourcePicker = async () => {
    setShowAttachmentMenu(false);
    setShowEmojiPicker(false);
    setShowResourcePicker(true);
    setResourceSearch("");

    if (resources.length) {
      return;
    }

    setLoadingResources(true);
    setErrorMessage("");

    try {
      const result = await supabase
        .from("resources")
        .select(
          "id,title,faculty,programme,year,semester,category,course,file_url,file_type,file_name"
        )
        .order("created_at", {
          ascending: false,
        })
        .limit(200);

      if (result.error) {
        throw result.error;
      }

      setResources(
        (result.data || []) as Resource[]
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load library resources."
      );
    } finally {
      setLoadingResources(false);
    }
  };

  /*
   * =========================================================
   * SHARE RESOURCE
   * =========================================================
   */

  const shareResource = async (
    resource: Resource
  ) => {
    if (
      sharingResource ||
      !senderId ||
      !roomId
    ) {
      return;
    }

    setSharingResource(true);
    setErrorMessage("");

    try {
      const result = await supabase
        .from("messages")
        .insert({
          room_id: roomId,
          sender_name: senderId,
          message: `Shared a resource: ${resource.title}`,
          message_type: "resource",
          resource_id: resource.id,
          resource_name: resource.title,
          resource_url: resource.file_url,
          resource_type:
            resource.file_type ||
            "document",
        })
        .select(messageSelect)
        .single();

      if (result.error) {
        throw result.error;
      }

      if (result.data) {
        setMessages((current) =>
          current.some(
            (item) =>
              item.id === result.data.id
          )
            ? current
            : [
                ...current,
                result.data as Message,
              ]
        );
      }

      setShowResourcePicker(false);
      setResourceSearch("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to share this resource."
      );
    } finally {
      setSharingResource(false);
    }
  };

  /*
   * =========================================================
   * DELETE DISCUSSION
   * =========================================================
   */

  const deleteDiscussion = async () => {
    if (!room || deleting) {
      return;
    }

    setDeleting(true);
    setErrorMessage("");

    try {
      const result = await supabase
        .from("rooms")
        .delete()
        .eq("id", room.id);

      if (result.error) {
        throw result.error;
      }

      router.replace("/messages");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete discussion."
      );

      setDeleting(false);
    }
  };

  /*
   * =========================================================
   * FILTER RESOURCES
   * =========================================================
   */

  const filtered = useMemo(() => {
    const query = resourceSearch
      .trim()
      .toLowerCase();

    if (!query) {
      return resources;
    }

    return resources.filter((resource) =>
      [
        resource.title,
        resource.course,
        resource.category,
        resource.programme,
      ].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [resources, resourceSearch]);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] dark:bg-slate-950">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-12 w-12">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#C9A96E]/10" />

            <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#C9A96E]/20 border-t-[#C9A96E]" />

            <GraduationCap
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A96E]"
              size={20}
            />
          </div>

          <p className="text-sm text-[#C9A96E]">
            Loading conversation...
          </p>
        </div>
      </main>
    );
  }

  /*
   * =========================================================
   * ROOM NOT FOUND
   * =========================================================
   */

  if (!room) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-6 dark:bg-slate-950">
        <div className="max-w-md text-center">
          <MessageCircle
            size={42}
            className="mx-auto mb-5 text-[#C9A96E]"
          />

          <h1 className="text-2xl font-black dark:text-white">
            Conversation not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {errorMessage ||
              "This discussion room does not exist or is no longer available."}
          </p>

          <button
            onClick={() =>
              router.push("/messages")
            }
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B2412] px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Messages
          </button>
        </div>
      </main>
    );
  }

  const typingText =
    typingStudents.length === 1
      ? `${typingStudents[0].studentId} is typing`
      : `${typingStudents.length} students are typing`;

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-950 dark:text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#e8dcc8] bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <button
            onClick={() =>
              router.push("/messages")
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3B2412] font-black text-white">
            <MessageCircle size={21} />

            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#C9A96E] text-[#3B2412]">
              <GraduationCap size={9} />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-black">
              {room.name}
            </h1>

            {typingStudents.length ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A96E]">
                <span>{typingText}</span>

                <span className="typing-indicator">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : (
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {room.description ||
                  "Discussion"}
              </p>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowMenu((value) => !value);
                setShowEmojiPicker(false);
                setShowAttachmentMenu(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
            >
              <MoreVertical size={20} />
            </button>

            {showMenu && (
              <>
                <button
                  className="fixed inset-0 z-40"
                  onClick={() =>
                    setShowMenu(false)
                  }
                />

                <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border bg-white p-1.5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteConfirm(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                    Delete Discussion
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* MESSAGES */}

        <div className="flex-1 overflow-y-auto px-3 py-5 md:px-8">

          {errorMessage && (
            <div className="mx-auto mb-5 max-w-2xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {messages.length === 0 ? (
            <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
              <MessageCircle
                size={40}
                className="mb-4 text-[#C9A96E]"
              />

              <h2 className="text-xl font-black">
                No messages yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Start the conversation.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-3">

              {messages.map((item) => {
                const mine =
                  item.sender_name ===
                  senderId;

                const resource =
                  item.message_type ===
                    "resource" ||
                  !!item.resource_id;

                const color =
                  colors[
                    colorIndex(
                      item.sender_name
                    )
                  ];

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      mine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] md:max-w-[68%] ${
                        mine
                          ? "ml-12"
                          : "mr-12"
                      }`}
                    >

                      {!mine && (
                        <div className="mb-1 ml-2 flex items-center gap-2">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white ${color.bg}`}
                          >
                            {initial(
                              item.sender_name
                            )}
                          </div>

                          <span className="text-xs font-bold text-[#C9A96E]">
                            {item.sender_name}
                          </span>
                        </div>
                      )}

                      {resource ? (
                        <div
                          className={`overflow-hidden rounded-2xl shadow-sm ${
                            mine
                              ? "rounded-br-md bg-[#3B2412] text-white"
                              : `rounded-bl-md ${color.bg} text-white`
                          }`}
                        >

                          <div className="flex items-center gap-3 px-4 pt-4">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-xl ${color.icon}`}
                            >
                              <FileText size={22} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                                Library Resource
                              </p>

                              <h3 className="mt-0.5 line-clamp-2 text-sm font-black">
                                {item.resource_name ||
                                  item.message.replace(
                                    "Shared a resource: ",
                                    ""
                                  )}
                              </h3>
                            </div>
                          </div>

                          <div className="px-4 pb-2 pt-3">
                            <div className="rounded-xl bg-black/10 px-3 py-2">
                              <div className="flex items-center gap-2 text-xs opacity-75">
                                <BookOpen size={13} />
                                Shared from Luqify e-Library
                              </div>
                            </div>
                          </div>

                          {item.resource_url && (
                            <a
                              href={
                                item.resource_url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm font-bold hover:bg-white/10"
                            >
                              Open Resource

                              <ExternalLink
                                size={16}
                              />
                            </a>
                          )}

                          <div className="px-4 pb-2 text-right text-[10px] text-white/50">
                            {timeText(
                              item.created_at
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`px-4 py-2.5 shadow-sm ${
                            mine
                              ? "rounded-2xl rounded-br-md bg-[#3B2412] text-white"
                              : `rounded-2xl rounded-bl-md ${color.bg} ${color.text}`
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-sm leading-6">
                            {item.message}
                          </p>

                          <div
                            className={`mt-1 text-right text-[10px] ${color.meta}`}
                          >
                            {timeText(
                              item.created_at
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* COMPOSER */}

        <div className="sticky bottom-0 z-20 border-t border-[#e8dcc8] bg-white/95 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:p-4">

          <div className="relative mx-auto max-w-3xl">

            {/* EMOJI PICKER */}

            {showEmojiPicker && (
              <div className="absolute bottom-16 left-0 z-[70] w-[min(340px,calc(100vw-24px))] rounded-2xl border bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                <div className="border-b px-4 py-3 text-sm font-bold">
                  Emojis
                </div>

                <div className="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto p-3">
                  {emojis.map(
                    (emoji, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMessage(
                            (value) =>
                              value + emoji
                          );

                          void typing(true);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-xl hover:bg-[#FAF7F0]"
                      >
                        {emoji}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ATTACHMENT MENU */}

            {showAttachmentMenu && (
              <div className="absolute bottom-16 left-11 z-[70] w-60 rounded-2xl border bg-white p-1.5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                <button
                  onClick={() =>
                    void openResourcePicker()
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#FAF7F0]"
                >
                  <BookOpen className="text-[#C9A96E]" />

                  <span>
                    <b>
                      Library Resource
                    </b>

                    <small className="block text-slate-500">
                      Share from e-Library
                    </small>
                  </span>
                </button>
              </div>
            )}

            {/* COMPOSER */}

            <div className="flex items-center gap-1.5 rounded-full border border-[#e8dcc8] bg-[#FAF7F0] p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">

              {/* EMOJI */}

              <button
                onClick={() => {
                  setShowEmojiPicker(
                    (value) => !value
                  );

                  setShowAttachmentMenu(
                    false
                  );
                }}
                disabled={
                  sending ||
                  sharingResource
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-white disabled:opacity-40"
              >
                <Smile size={21} />
              </button>

              {/* INPUT */}

              <input
                value={message}
                onChange={(event) =>
                  handleMessageChange(
                    event.target.value
                  )
                }
                onFocus={() => {
                  setShowEmojiPicker(false);
                  setShowAttachmentMenu(false);
                }}
                onBlur={stopTyping}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Type a message"
                maxLength={1000}
                disabled={
                  sending ||
                  sharingResource
                }
                className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none dark:text-white"
              />

              {/* ATTACHMENT */}

              <button
                onClick={() => {
                  setShowAttachmentMenu(
                    (value) => !value
                  );

                  setShowEmojiPicker(false);
                }}
                disabled={
                  sending ||
                  sharingResource
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-white disabled:opacity-40"
              >
                <Paperclip size={20} />
              </button>

              {/* SEND */}

              <button
                onClick={() =>
                  void sendMessage()
                }
                disabled={
                  sending ||
                  sharingResource ||
                  !message.trim()
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B2412] text-white disabled:opacity-40"
              >
                {sending ? (
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>

            {/* YOUR CHANGED TEXT */}

            <p className="mt-2 text-center text-[10px] text-slate-400">
              Connect, share and learn together.
            </p>

          </div>
        </div>
      </section>

      {/* RESOURCE PICKER */}

      {showResourcePicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">

          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-slate-900">

            <div className="flex items-center gap-3 border-b px-5 py-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                <BookOpen size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-black">
                  Share Library Resource
                </h2>

                <p className="text-xs text-slate-500">
                  Choose something from Luqify e-Library
                </p>
              </div>

              <button
                onClick={() =>
                  setShowResourcePicker(false)
                }
              >
                <X size={19} />
              </button>
            </div>

            <div className="border-b p-4">
              <div className="flex items-center gap-2 rounded-xl border bg-[#FAF7F0] px-3">
                <Search
                  size={18}
                  className="text-slate-400"
                />

                <input
                  value={resourceSearch}
                  onChange={(event) =>
                    setResourceSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search resources..."
                  autoFocus
                  className="h-11 flex-1 bg-transparent outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">

              {loadingResources ? (
                <div className="flex justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E]/30 border-t-[#C9A96E]" />
                </div>
              ) : !filtered.length ? (
                <div className="py-16 text-center">

                  <FileText
                    size={38}
                    className="mx-auto mb-4 text-[#C9A96E]"
                  />

                  <b>
                    No resources found
                  </b>

                  <p className="mt-1 text-sm text-slate-500">
                    Try another search.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">

                  {filtered.map(
                    (resource) => (
                      <button
                        key={resource.id}
                        disabled={
                          sharingResource
                        }
                        onClick={() =>
                          void shareResource(
                            resource
                          )
                        }
                        className="flex w-full items-center gap-3 rounded-2xl p-3 text-left hover:bg-[#FAF7F0] disabled:opacity-50"
                      >

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B2412] text-white">
                          <FileText size={21} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="line-clamp-2 text-sm font-black">
                            {resource.title}
                          </h3>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {resource.course}{" "}
                            •{" "}
                            {resource.semester}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-[#C9A96E]">
                            {resource.category}{" "}
                            •{" "}
                            {resource.year}
                          </p>
                        </div>

                        <span className="rounded-full bg-[#3B2412] px-3 py-2 text-[11px] font-bold text-white">
                          {sharingResource
                            ? "..."
                            : "Share"}
                        </span>

                      </button>
                    )
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-slate-900">

            <div className="mb-5 flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <button
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                disabled={deleting}
              >
                <X size={19} />
              </button>

            </div>

            <h2 className="text-xl font-black">
              Delete Discussion?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This will permanently delete{" "}
              <b>"{room.name}"</b> and all
              messages inside it. This action
              cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                disabled={deleting}
                className="flex-1 rounded-xl border px-4 py-3 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  void deleteDiscussion()
                }
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Discussion"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}

      <style jsx global>{`
        .typing-indicator {
          display: inline-flex;
          gap: 3px;
        }

        .typing-indicator i {
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: #c9a96e;
          animation: luqifyTyping 1.2s
            infinite ease-in-out;
        }

        .typing-indicator i:nth-child(2) {
          animation-delay: 0.15s;
        }

        .typing-indicator i:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes luqifyTyping {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.35;
          }

          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
