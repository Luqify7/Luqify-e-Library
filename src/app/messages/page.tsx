"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  MessageCircle,
  ArrowRight,
  Plus,
  X,
  Loader2,
  Users,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";

type Room = {
  id: string;
  name: string;
  description: string | null;
  created_at?: string;
};

export default function MessagesPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const loadRooms = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("rooms")
      .select("id, name, description, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ROOMS LOAD ERROR:", error);
      setRooms([]);
      setLoading(false);
      return;
    }

    setRooms((data ?? []) as Room[]);
    setLoading(false);
  };

  useEffect(() => {
    void loadRooms();

    const channel = supabase
      .channel("messages-rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
        },
        () => {
          void loadRooms();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const createRoom = async () => {
    const name = roomName.trim();
    const description = roomDescription.trim();

    if (!name) return;

    setCreating(true);

    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name,
        description: description || null,
      })
      .select("id, name, description, created_at")
      .single();

    if (error) {
      console.error("CREATE ROOM ERROR:", error);
      setCreating(false);
      return;
    }

    setRoomName("");
    setRoomDescription("");
    setShowCreate(false);
    setCreating(false);

    if (data) {
      setRooms((current) => [
        data as Room,
        ...current,
      ]);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#FAF7F0]
        text-[#3B2412]
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* SIDEBAR */}

      <Sidebar />

      {/* PAGE */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-[#e8dcc8]
            bg-white
            p-6
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
            sm:p-8
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-[#C9A96E]/20
              blur-3xl
            "
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#C9A96E]
                  text-white
                  shadow-lg
                "
              >
                <MessageCircle size={28} />
              </div>

              <div>
                <p
                  className="
                    mb-1
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#C9A96E]
                  "
                >
                  Student Community
                </p>

                <h1
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-[#3B2412]
                    dark:text-white
                  "
                >
                  Messages
                </h1>

                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-6
                    text-[#3B2412]/65
                    dark:text-slate-400
                  "
                >
                  Join a discussion, connect with other
                  students, and share ideas with the
                  Luqify community.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#3B2412]
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-md
                transition
                hover:-translate-y-0.5
                hover:bg-[#4d301b]
                dark:bg-[#C9A96E]
                dark:text-slate-950
                dark:hover:bg-[#d8b97d]
              "
            >
              <Plus size={18} />
              New Discussion
            </button>
          </div>
        </section>

        {/* DISCUSSIONS */}

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2
                className="
                  text-xl
                  font-black
                  text-[#3B2412]
                  dark:text-white
                "
              >
                Discussions
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#3B2412]/60
                  dark:text-slate-400
                "
              >
                Browse active student conversations.
              </p>
            </div>

            {!loading && (
              <span
                className="
                  rounded-full
                  border
                  border-[#C9A96E]/40
                  bg-[#C9A96E]/10
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-[#3B2412]
                  dark:text-[#C9A96E]
                "
              >
                {rooms.length}{" "}
                {rooms.length === 1
                  ? "discussion"
                  : "discussions"}
              </span>
            )}
          </div>

          {/* LOADING */}

          {loading && (
            <div
              className="
                flex
                min-h-[260px]
                items-center
                justify-center
                rounded-3xl
                border
                border-[#e8dcc8]
                bg-white
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-center gap-3 text-sm font-semibold text-[#3B2412]/60 dark:text-slate-400">
                <Loader2
                  size={20}
                  className="animate-spin text-[#C9A96E]"
                />
                Loading discussions...
              </div>
            </div>
          )}

          {/* EMPTY */}

          {!loading && rooms.length === 0 && (
            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-[#C9A96E]/50
                bg-white
                px-6
                text-center
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div
                className="
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#C9A96E]/15
                  text-[#C9A96E]
                "
              >
                <MessageCircle size={30} />
              </div>

              <h3
                className="
                  text-xl
                  font-black
                  text-[#3B2412]
                  dark:text-white
                "
              >
                No discussions yet
              </h3>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-[#3B2412]/60
                  dark:text-slate-400
                "
              >
                Be the first student to start a
                discussion and get the community talking.
              </p>

              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#C9A96E]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  transition
                  hover:-translate-y-0.5
                "
              >
                <Plus size={18} />
                Start Discussion
              </button>
            </div>
          )}

          {/* ROOM CARDS */}

          {!loading && rooms.length > 0 && (
            <div className="grid gap-4">
              {rooms.map((room) => (
                <Link
                  key={room.id}
                  href={`/messages/${room.id}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#e8dcc8]
                    bg-white
                    p-5
                    shadow-sm
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A96E]
                    hover:shadow-lg
                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:hover:border-[#C9A96E]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-y-0
                      left-0
                      w-1
                      bg-[#C9A96E]
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  />

                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#C9A96E]/15
                        text-[#C9A96E]
                        transition
                        group-hover:bg-[#C9A96E]
                        group-hover:text-white
                      "
                    >
                      <Users size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="
                          truncate
                          text-base
                          font-black
                          text-[#3B2412]
                          dark:text-white
                        "
                      >
                        {room.name}
                      </h3>

                      <p
                        className="
                          mt-1
                          line-clamp-2
                          text-sm
                          leading-5
                          text-[#3B2412]/60
                          dark:text-slate-400
                        "
                      >
                        {room.description ||
                          "Join this discussion and connect with other students."}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#e8dcc8]
                        text-[#3B2412]/50
                        transition
                        group-hover:border-[#C9A96E]
                        group-hover:bg-[#C9A96E]
                        group-hover:text-white
                        dark:border-slate-700
                      "
                    >
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* CREATE DISCUSSION MODAL */}

      {showCreate && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCreate(false);
            }
          }}
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              border
              border-[#e8dcc8]
              bg-[#FAF7F0]
              p-6
              shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
              sm:p-8
            "
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#C9A96E]
                  "
                >
                  Community
                </p>

                <h2
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-[#3B2412]
                    dark:text-white
                  "
                >
                  Start a Discussion
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                aria-label="Close"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#e8dcc8]
                  text-[#3B2412]/60
                  transition
                  hover:bg-[#3B2412]
                  hover:text-white
                  dark:border-slate-700
                  dark:text-slate-400
                "
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="room-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-[#3B2412]
                    dark:text-white
                  "
                >
                  Discussion name
                </label>

                <input
                  id="room-name"
                  value={roomName}
                  onChange={(event) =>
                    setRoomName(event.target.value)
                  }
                  placeholder="e.g. Accounting Students"
                  maxLength={100}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#e8dcc8]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#3B2412]
                    outline-none
                    transition
                    focus:border-[#C9A96E]
                    focus:ring-2
                    focus:ring-[#C9A96E]/20
                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-white
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="room-description"
                  className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-[#3B2412]
                    dark:text-white
                  "
                >
                  Description
                </label>

                <textarea
                  id="room-description"
                  value={roomDescription}
                  onChange={(event) =>
                    setRoomDescription(event.target.value)
                  }
                  placeholder="What is this discussion about?"
                  rows={4}
                  maxLength={300}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#e8dcc8]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#3B2412]
                    outline-none
                    transition
                    focus:border-[#C9A96E]
                    focus:ring-2
                    focus:ring-[#C9A96E]/20
                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-white
                  "
                />
              </div>

              <button
                type="button"
                onClick={() => void createRoom()}
                disabled={!roomName.trim() || creating}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#3B2412]
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-[#4d301b]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:bg-[#C9A96E]
                  dark:text-slate-950
                  dark:hover:bg-[#d8b97d]
                "
              >
                {creating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Create Discussion
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}