"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

const studentCardColors = [
  {
    bg: "bg-[#102A43]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#C9A96E]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#1F4D3A]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#C9A96E]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#4A235A]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#E5C98A]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#7A3E00]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#FFD98A]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#164E63]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#C9A96E]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#374151]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#C9A96E]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#5B2333]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#E8C77A]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
  {
    bg: "bg-[#365314]",
    text: "text-white",
    meta: "text-white/55",
    resourceIcon: "bg-white/10 text-[#D8E6A8]",
    resourceBottom: "border-white/10 hover:bg-white/10",
  },
];

const getStudentColorIndex = (studentName: string) => {
  let hash = 0;

  for (let index = 0; index < studentName.length; index++) {
    hash =
      (hash * 31 + studentName.charCodeAt(index)) &
      0xffffffff;
  }

  return Math.abs(hash) % studentCardColors.length;
};

export default function MessageRoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId =
    typeof params.roomId === "string"
      ? params.roomId
      : Array.isArray(params.roomId)
        ? params.roomId[0]
        : "";

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const typingTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const presenceChannelRef =
    useRef<ReturnType<typeof supabase.channel> | null>(null);

  const [room, setRoom] =
    useState<Room | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [message, setMessage] =
    useState("");

  const [senderId, setSenderId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [showMenu, setShowMenu] =
    useState(false);

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

  const handleBackToMessages = () => {
    setShowMenu(false);
    setShowDeleteConfirm(false);
    setShowEmojiPicker(false);
    setShowAttachmentMenu(false);
    setShowResourcePicker(false);

    stopTyping();

    router.push("/messages");
  };

  /*
   * STUDENT ID
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
   * LOAD ROOM + MESSAGES
   */
  useEffect(() => {
    if (!roomId) {
      setLoading(false);
      setErrorMessage(
        "No discussion room was specified."
      );
      return;
    }

    let mounted = true;

    async function loadChat() {
      setLoading(true);
      setErrorMessage("");

      /*
       * DISCUSSIONS COME FROM rooms
       */
      const roomQuery = await supabase
        .from("rooms")
        .select(
          "id, name, description"
        )
        .eq("id", roomId)
        .maybeSingle();

      if (!mounted) return;

      if (roomQuery.error) {
        console.error(
          "ROOM LOAD ERROR:",
          roomQuery.error
        );

        setErrorMessage(
          roomQuery.error.message ||
            "Unable to load this discussion."
        );

        setRoom(null);
        setLoading(false);
        return;
      }

      if (!roomQuery.data) {
        setErrorMessage(
          "This discussion no longer exists."
        );

        setRoom(null);
        setLoading(false);
        return;
      }

      /*
       * MESSAGES COME FROM messages
       */
      const messagesQuery = await supabase
        .from("messages")
        .select(`
          id,
          room_id,
          sender_name,
          message,
          created_at,
          message_type,
          resource_id,
          resource_name,
          resource_url,
          resource_type
        `)
        .eq("room_id", roomId)
        .order("created_at", {
          ascending: true,
        });

      if (!mounted) return;

      setRoom(roomQuery.data as Room);

      if (messagesQuery.error) {
        console.error(
          "MESSAGES LOAD ERROR:",
          messagesQuery.error
        );

        setErrorMessage(
          messagesQuery.error.message ||
            "Messages could not be loaded."
        );

        setMessages([]);
      } else {
        setMessages(
          (messagesQuery.data || []) as Message[]
        );
      }

      setLoading(false);
    }

    void loadChat();

    /*
     * REALTIME MESSAGES
     */
    const messageChannel = supabase
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

          setMessages((current) => {
            if (
              current.some(
                (item) =>
                  item.id === newMessage.id
              )
            ) {
              return current;
            }

            return [
              ...current,
              newMessage,
            ];
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;

      void supabase.removeChannel(
        messageChannel
      );
    };
  }, [roomId]);

  /*
   * TYPING PRESENCE
   */
  useEffect(() => {
    if (!roomId || !senderId) {
      return;
    }

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

    presenceChannelRef.current = channel;

    const updateTypingStudents = () => {
      const state =
        channel.presenceState();

      const students: TypingStudent[] = [];

      Object.entries(state).forEach(
        ([key, value]) => {
          if (key === senderId) {
            return;
          }

          const presenceList =
            Array.isArray(value)
              ? value
              : [];

          const isTyping =
            presenceList.some(
              (presence) => {
                const data =
                  presence as {
                    studentId?: string;
                    typing?: boolean;
                  };

                return data?.typing === true;
              }
            );

          if (isTyping) {
            const firstPresence =
              presenceList[0] as
                | {
                    studentId?: string;
                  }
                | undefined;

            students.push({
              studentId:
                firstPresence?.studentId ||
                key,
            });
          }
        }
      );

      setTypingStudents(students);
    };

    channel.on(
      "presence",
      { event: "sync" },
      updateTypingStudents
    );

    channel.on(
      "presence",
      { event: "join" },
      updateTypingStudents
    );

    channel.on(
      "presence",
      { event: "leave" },
      updateTypingStudents
    );

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        try {
          await channel.track({
            studentId: senderId,
            typing: false,
          });
        } catch (error) {
          console.error(
            "INITIAL PRESENCE ERROR:",
            error
          );
        }
      }
    });

    return () => {
      presenceChannelRef.current = null;

      void channel.untrack();

      void supabase.removeChannel(
        channel
      );

      setTypingStudents([]);
    };
  }, [roomId, senderId]);

  const updateTypingStatus = async (
    isTyping: boolean
  ) => {
    const channel =
      presenceChannelRef.current;

    if (!channel || !senderId) {
      return;
    }

    try {
      await channel.track({
        studentId: senderId,
        typing: isTyping,
      });
    } catch (error) {
      console.error(
        "TYPING PRESENCE ERROR:",
        error
      );
    }
  };

  const handleMessageChange = (
    value: string
  ) => {
    setMessage(value);

    if (!value.trim()) {
      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current
        );

        typingTimeoutRef.current = null;
      }

      void updateTypingStatus(false);
      return;
    }

    void updateTypingStatus(true);

    if (typingTimeoutRef.current) {
      clearTimeout(
        typingTimeoutRef.current
      );
    }

    typingTimeoutRef.current =
      setTimeout(() => {
        void updateTypingStatus(false);
        typingTimeoutRef.current = null;
      }, 2500);
  };

  const stopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(
        typingTimeoutRef.current
      );

      typingTimeoutRef.current = null;
    }

    void updateTypingStatus(false);
  };

  /*
   * AUTO SCROLL
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /*
   * ESC
   */
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key !== "Escape") {
        return;
      }

      setShowEmojiPicker(false);
      setShowAttachmentMenu(false);
      setShowResourcePicker(false);
      setShowMenu(false);
      setShowDeleteConfirm(false);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /*
   * SEND MESSAGE
   */
  const sendMessage = async () => {
    const cleanMessage =
      message.trim();

    if (
      !cleanMessage ||
      sending ||
      !senderId ||
      !roomId
    ) {
      return;
    }

    stopTyping();

    setSending(true);
    setErrorMessage("");

    try {
      /*
       * IMPORTANT:
       * room_id must point to rooms.id
       */
      const payload = {
        room_id: roomId,
        sender_name: senderId,
        message: cleanMessage,
        message_type: "text",
      };

      console.log(
        "SENDING MESSAGE:",
        payload
      );

      const result =
        await supabase
          .from("messages")
          .insert(payload)
          .select(`
            id,
            room_id,
            sender_name,
            message,
            created_at,
            message_type,
            resource_id,
            resource_name,
            resource_url,
            resource_type
          `)
          .single();

      if (result.error) {
        console.error(
          "MESSAGE SEND ERROR:",
          {
            message:
              result.error.message,
            details:
              result.error.details,
            hint:
              result.error.hint,
            code:
              result.error.code,
          }
        );

        setErrorMessage(
          result.error.message ||
            "Unable to send message."
        );

        return;
      }

      /*
       * Realtime will normally add this.
       * We also add it locally if necessary.
       */
      if (result.data) {
        setMessages((current) => {
          if (
            current.some(
              (item) =>
                item.id ===
                result.data.id
            )
          ) {
            return current;
          }

          return [
            ...current,
            result.data as Message,
          ];
        });
      }

      setMessage("");
      setShowEmojiPicker(false);
      setShowAttachmentMenu(false);
    } catch (error) {
      console.error(
        "UNEXPECTED MESSAGE ERROR:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the message."
      );
    } finally {
      setSending(false);
    }
  };

  /*
   * EMOJI
   */
  const addEmoji = (
    emoji: string
  ) => {
    handleMessageChange(
      message + emoji
    );
  };

  /*
   * LOAD RESOURCES
   */
  const openResourcePicker =
    async () => {
      setShowAttachmentMenu(false);
      setShowEmojiPicker(false);
      setShowResourcePicker(true);
      setResourceSearch("");

      if (resources.length > 0) {
        return;
      }

      setLoadingResources(true);
      setErrorMessage("");

      try {
        const {
          data,
          error,
        } = await supabase
          .from("resources")
          .select(`
            id,
            title,
            faculty,
            programme,
            year,
            semester,
            category,
            course,
            file_url,
            file_type,
            file_name
          `)
          .order("created_at", {
            ascending: false,
          })
          .limit(200);

        if (error) {
          console.error(
            "RESOURCE LOAD ERROR:",
            error
          );

          setErrorMessage(
            error.message ||
              "Unable to load library resources."
          );

          return;
        }

        setResources(
          (data || []) as Resource[]
        );
      } catch (error) {
        console.error(
          "UNEXPECTED RESOURCE ERROR:",
          error
        );

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
   * SHARE RESOURCE
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
      const payload = {
        room_id: roomId,
        sender_name: senderId,
        message:
          `Shared a resource: ${resource.title}`,
        message_type: "resource",
        resource_id: resource.id,
        resource_name: resource.title,
        resource_url: resource.file_url,
        resource_type:
          resource.file_type ||
          "document",
      };

      const result =
        await supabase
          .from("messages")
          .insert(payload)
          .select(`
            id,
            room_id,
            sender_name,
            message,
            created_at,
            message_type,
            resource_id,
            resource_name,
            resource_url,
            resource_type
          `)
          .single();

      if (result.error) {
        console.error(
          "RESOURCE SHARE ERROR:",
          result.error
        );

        setErrorMessage(
          result.error.message ||
            "Unable to share this resource."
        );

        return;
      }

      if (result.data) {
        setMessages((current) => {
          if (
            current.some(
              (item) =>
                item.id ===
                result.data.id
            )
          ) {
            return current;
          }

          return [
            ...current,
            result.data as Message,
          ];
        });
      }

      setShowResourcePicker(false);
      setResourceSearch("");
    } catch (error) {
      console.error(
        "UNEXPECTED RESOURCE SHARE ERROR:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sharing the resource."
      );
    } finally {
      setSharingResource(false);
    }
  };

  /*
   * DELETE DISCUSSION
   */
  const deleteDiscussion =
    async () => {
      if (!room || deleting) {
        return;
      }

      setDeleting(true);
      setErrorMessage("");

      try {
        const { error } =
          await supabase
            .from("rooms")
            .delete()
            .eq("id", room.id);

        if (error) {
          console.error(
            "DELETE DISCUSSION ERROR:",
            error
          );

          setErrorMessage(
            error.message ||
              "Unable to delete discussion."
          );

          setDeleting(false);
          return;
        }

        setShowDeleteConfirm(false);
        setShowMenu(false);

        router.replace("/messages");
      } catch (error) {
        console.error(
          "UNEXPECTED DELETE ERROR:",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while deleting the discussion."
        );

        setDeleting(false);
      }
    };

  const formatTime = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitial = (
    name: string
  ) => {
    return (
      name
        .trim()
        .charAt(0)
        .toUpperCase() || "?"
    );
  };

  const filteredResources =
    resources.filter(
      (resource) => {
        const query =
          resourceSearch
            .trim()
            .toLowerCase();

        if (!query) {
          return true;
        }

        return (
          resource.title
            .toLowerCase()
            .includes(query) ||
          resource.course
            .toLowerCase()
            .includes(query) ||
          resource.category
            .toLowerCase()
            .includes(query) ||
          resource.programme
            .toLowerCase()
            .includes(query)
        );
      }
    );

  const typingText =
    typingStudents.length === 1
      ? `${typingStudents[0].studentId} is typing`
      : `${typingStudents.length} students are typing`;

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

            <GraduationCap
              size={18}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A96E]"
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
   * ROOM NOT FOUND
   */
  if (!room) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] px-6 dark:bg-slate-950">
        <div className="w-full max-w-md text-center">
          <MessageCircle
            size={42}
            className="mx-auto mb-5 text-[#C9A96E]"
          />

          <h1 className="text-2xl font-black text-[#3B2412] dark:text-white">
            Conversation not found
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {errorMessage ||
              "This discussion room does not exist or is no longer available."}
          </p>

          <button
            type="button"
            onClick={handleBackToMessages}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3B2412] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Back to Messages
          </button>
        </div>
      </main>
    );
  }

  /*
   * MAIN
   */
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-950 dark:text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#e8dcc8] bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <button
            type="button"
            onClick={handleBackToMessages}
            className="relative z-[100] flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
            aria-label="Back to Messages"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3B2412] font-black text-white">
            <MessageCircle size={21} />

            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#C9A96E] text-[#3B2412] dark:border-slate-900">
              <GraduationCap size={9} />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-black">
              {room.name}
            </h1>

            {typingStudents.length > 0 ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A96E]">
                <span className="typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot typing-dot-2" />
                  <span className="typing-dot typing-dot-3" />
                </span>

                <span className="truncate">
                  {typingText}
                </span>
              </div>
            ) : (
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {room.description ||
                  "Discussion"}
              </p>
            )}
          </div>

          <div className="relative z-[80]">
            <button
              type="button"
              onClick={() => {
                setShowMenu(
                  (current) =>
                    !current
                );

                setShowEmojiPicker(false);
                setShowAttachmentMenu(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
              aria-label="More options"
            >
              <MoreVertical size={20} />
            </button>

            {showMenu && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="fixed inset-0 z-[40] h-full w-full cursor-default bg-transparent"
                  onClick={() =>
                    setShowMenu(false)
                  }
                />

                <div className="absolute right-0 top-12 z-[90] w-56 overflow-hidden rounded-2xl border border-[#e8dcc8] bg-white p-1.5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteConfirm(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
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
            <div className="mx-auto mb-5 max-w-2xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              {errorMessage}
            </div>
          )}

          {messages.length === 0 ? (
            <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
              <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#C9A96E] shadow-sm dark:bg-slate-900">
                <div className="absolute inset-0 animate-ping rounded-full bg-[#C9A96E]/10" />
                <MessageCircle size={30} />
              </div>

              <h2 className="text-xl font-black">
                No messages yet
              </h2>

              <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Start the conversation.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-3">

              {messages.map((item) => {
                const isMine =
                  item.sender_name ===
                  senderId;

                const isResource =
                  item.message_type ===
                    "resource" ||
                  !!item.resource_id;

                const studentColor =
                  isMine
                    ? null
                    : studentCardColors[
                        getStudentColorIndex(
                          item.sender_name
                        )
                      ];

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isMine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] md:max-w-[68%] ${
                        isMine
                          ? "ml-12"
                          : "mr-12"
                      }`}
                    >

                      {!isMine && (
                        <div className="mb-1 ml-2 flex items-center gap-2">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white ${
                              studentColor?.bg ||
                              "bg-[#3B2412]"
                            }`}
                          >
                            {getInitial(
                              item.sender_name
                            )}
                          </div>

                          <span className="text-xs font-bold text-[#C9A96E]">
                            {item.sender_name}
                          </span>
                        </div>
                      )}

                      {isResource ? (
                        <div
                          className={`overflow-hidden rounded-2xl shadow-sm ${
                            isMine
                              ? "rounded-br-md bg-[#3B2412] text-white"
                              : `rounded-bl-md ${
                                  studentColor?.bg ||
                                  "bg-[#102A43]"
                                } text-white`
                          }`}
                        >
                          <div className="flex items-center gap-3 px-4 pt-4">

                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                isMine
                                  ? "bg-[#C9A96E]/20 text-[#C9A96E]"
                                  : studentColor?.resourceIcon ||
                                    "bg-white/10 text-[#C9A96E]"
                              }`}
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
                            <div className="rounded-xl bg-black/10 px-3 py-2 dark:bg-white/10">
                              <div className="flex items-center gap-2 text-xs opacity-75">
                                <BookOpen size={13} />

                                <span>
                                  Shared from Luqify e-Library
                                </span>
                              </div>
                            </div>
                          </div>

                          {item.resource_url && (
                            <a
                              href={item.resource_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-between border-t px-4 py-3 text-sm font-bold transition ${
                                isMine
                                  ? "border-white/10 hover:bg-white/10"
                                  : studentColor?.resourceBottom ||
                                    "border-white/10 hover:bg-white/10"
                              }`}
                            >
                              <span>
                                Open Resource
                              </span>

                              <ExternalLink size={16} />
                            </a>
                          )}

                          <div className="px-4 pb-2 text-right text-[10px] text-white/55">
                            {formatTime(
                              item.created_at
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`px-4 py-2.5 shadow-sm ${
                            isMine
                              ? "rounded-2xl rounded-br-md bg-[#3B2412] text-white"
                              : `rounded-2xl rounded-bl-md ${
                                  studentColor?.bg ||
                                  "bg-[#102A43]"
                                } ${
                                  studentColor?.text ||
                                  "text-white"
                                }`
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-sm leading-6">
                            {item.message}
                          </p>

                          <div
                            className={`mt-1 text-right text-[10px] ${
                              isMine
                                ? "text-white/55"
                                : studentColor?.meta ||
                                  "text-white/55"
                            }`}
                          >
                            {formatTime(
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

            {showEmojiPicker && (
              <div className="absolute bottom-16 left-0 z-[70] w-[min(340px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-[#e8dcc8] bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                <div className="border-b border-[#eee5d8] px-4 py-3 text-sm font-bold dark:border-slate-800">
                  Emojis
                </div>

                <div className="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto p-3">
                  {emojis.map(
                    (emoji, index) => (
                      <button
                        key={`${emoji}-${index}`}
                        type="button"
                        onClick={() =>
                          addEmoji(emoji)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-xl transition hover:scale-110 hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
                      >
                        {emoji}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {showAttachmentMenu && (
              <div className="absolute bottom-16 left-11 z-[70] w-60 overflow-hidden rounded-2xl border border-[#e8dcc8] bg-white p-1.5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                <button
                  type="button"
                  onClick={openResourcePicker}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                    <BookOpen size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Library Resource
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Share from e-Library
                    </p>
                  </div>
                </button>
              </div>
            )}

            <div className="flex items-center gap-1.5 rounded-full border border-[#e8dcc8] bg-[#FAF7F0] p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">

              <button
                type="button"
                onClick={() => {
                  setShowEmojiPicker(
                    (current) =>
                      !current
                  );

                  setShowAttachmentMenu(false);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-[#3B2412] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                aria-label="Emoji"
              >
                <Smile size={21} />
              </button>

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
                disabled={sending}
                className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none disabled:opacity-60 dark:text-white"
              />

              <button
                type="button"
                onClick={() => {
                  setShowAttachmentMenu(
                    (current) =>
                      !current
                  );

                  setShowEmojiPicker(false);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-[#3B2412] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                aria-label="Attach"
              >
                <Paperclip size={20} />
              </button>

              <button
                type="button"
                onClick={() =>
                  void sendMessage()
                }
                disabled={
                  sending ||
                  !message.trim()
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B2412] text-white transition hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              Press Enter to send
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCE PICKER */}
      {showResourcePicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">

          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-slate-900">

            <div className="flex items-center gap-3 border-b border-[#eee5d8] px-5 py-4 dark:border-slate-800">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                <BookOpen size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-black">
                  Share Library Resource
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Choose something from Luqify e-Library
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowResourcePicker(false)
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-[#FAF7F0] dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="border-b border-[#eee5d8] p-4 dark:border-slate-800">

              <div className="flex items-center gap-2 rounded-xl border border-[#e8dcc8] bg-[#FAF7F0] px-3 dark:border-slate-700 dark:bg-slate-800">

                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
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
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">

              {loadingResources ? (
                <div className="flex items-center justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A96E]/30 border-t-[#C9A96E]" />
                </div>
              ) : filteredResources.length === 0 ? (
                <div className="py-16 text-center">
                  <FileText
                    size={38}
                    className="mx-auto mb-4 text-[#C9A96E]"
                  />

                  <p className="font-bold">
                    No resources found
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Try another search.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">

                  {filteredResources.map(
                    (resource) => (
                      <button
                        key={resource.id}
                        type="button"
                        disabled={
                          sharingResource
                        }
                        onClick={() =>
                          void shareResource(
                            resource
                          )
                        }
                        className="flex w-full items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition hover:border-[#e8dcc8] hover:bg-[#FAF7F0] disabled:opacity-50 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                      >

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3B2412] text-white">
                          <FileText size={21} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="line-clamp-2 text-sm font-black">
                            {resource.title}
                          </h3>

                          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                            {resource.course}
                            {" • "}
                            {resource.semester}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-[#C9A96E]">
                            {resource.category}
                            {" • "}
                            {resource.year}
                          </p>
                        </div>

                        <div className="shrink-0 rounded-full bg-[#3B2412] px-3 py-2 text-[11px] font-bold text-white">
                          {sharingResource
                            ? "..."
                            : "Share"}
                        </div>
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

            <div className="mb-5 flex items-start justify-between gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                <Trash2 size={22} />
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                disabled={deleting}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-[#FAF7F0] hover:text-slate-600 disabled:cursor-not-allowed dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <h2 className="text-xl font-black">
              Delete Discussion?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              This will permanently delete{" "}
              <span className="font-bold text-[#3B2412] dark:text-white">
                "{room.name}"
              </span>{" "}
              and all messages inside it.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                disabled={deleting}
                className="flex-1 rounded-xl border border-[#e8dcc8] px-4 py-3 text-sm font-semibold transition hover:bg-[#FAF7F0] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void deleteDiscussion()
                }
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Discussion"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TYPING ANIMATION */}
      <style jsx global>{`
        .typing-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          min-width: 22px;
          height: 16px;
        }

        .typing-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: #c9a96e;
          animation: luqifyTyping 1.2s infinite
            ease-in-out;
        }

        .typing-dot-2 {
          animation-delay: 0.15s;
        }

        .typing-dot-3 {
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