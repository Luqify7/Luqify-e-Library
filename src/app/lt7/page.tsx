"use client";

import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowUp,
  BookOpen,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import LT7Icon from "@/components/LT7Icon";

type Resource = {
  id: string | number;
  title: string | null;
  file_name: string | null;
  file_url: string | null;
  course: string | null;
  programme: string | null;
  year: string | null;
  semester: string | null;
  category: string | null;
  file_type: string | null;
  readable?: boolean;
};

type Attachment = {
  id: string;
  file: File;
  previewUrl?: string;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  resources?: Resource[];
};

const welcomeMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "How can I help? Ask me anything — academic questions, general knowledge, explanations, ideas, study help, or questions about the Luqify e-Library.",
};

function cleanAssistantText(text: string) {
  return text
    .replace(/\*\*\*/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^\s*#{1,6}\s*/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function LT7Page() {
  const [messages, setMessages] = useState<Message[]>([
    welcomeMessage,
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const newAttachments: Attachment[] = files.map(
      (file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      })
    );

    setAttachments((current) => [
      ...current,
      ...newAttachments,
    ]);

    event.target.value = "";
    setShowAttachMenu(false);
  }

  function removeAttachment(id: string) {
    setAttachments((current) => {
      const attachment = current.find(
        (item) => item.id === id
      );

      if (attachment?.previewUrl) {
        URL.revokeObjectURL(
          attachment.previewUrl
        );
      }

      return current.filter(
        (item) => item.id !== id
      );
    });
  }

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>
  ) {
    event?.preventDefault();

    const question = input.trim();

    if (
      (!question && attachments.length === 0) ||
      loading
    ) {
      return;
    }

    setError("");

    const attachmentNames = attachments
      .map((attachment) => attachment.file.name)
      .join(", ");

    const displayMessage =
      question ||
      `Please analyze the attached file${attachments.length > 1 ? "s" : ""}: ${attachmentNames}`;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: displayMessage,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "message",
        question || "Please analyze the attached file."
      );

      attachments.forEach((attachment) => {
        formData.append(
          "files",
          attachment.file
        );
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "LT7 is temporarily unavailable. Please try again shortly."
        );
      }

      if (
        !data?.reply ||
        typeof data.reply !== "string"
      ) {
        throw new Error(
          "LT7 could not generate a response right now. Please try again."
        );
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: cleanAssistantText(
          data.reply
        ),
        resources: Array.isArray(
          data.resources
        )
          ? data.resources
          : [],
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (err) {
      console.error(
        "LT7 FRONTEND ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "LT7 is temporarily unavailable. Please try again shortly."
      );
    } finally {
      setLoading(false);

      attachments.forEach((attachment) => {
        if (attachment.previewUrl) {
          URL.revokeObjectURL(
            attachment.previewUrl
          );
        }
      });

      setAttachments([]);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (
        !loading &&
        (input.trim() ||
          attachments.length > 0)
      ) {
        void sendMessage();
      }
    }
  }

  function clearChat() {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. What would you like to explore?",
      },
    ]);

    setInput("");
    setError("");

    attachments.forEach((attachment) => {
      if (attachment.previewUrl) {
        URL.revokeObjectURL(
          attachment.previewUrl
        );
      }
    });

    setAttachments([]);
  }

  function formatAcademicValue(
    value: string | null | undefined
  ) {
    if (!value) {
      return "Unknown";
    }

    return value
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  }

  function getReadableResources(
    resources: Resource[] | undefined
  ) {
    if (!resources) {
      return [];
    }

    return resources.filter(
      (resource) =>
        resource.readable === true
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9A96E]/30 blur-md" />

              <div className="relative">
                <LT7Icon
                  size={38}
                  shape="circle"
                />
              </div>
            </div>

            <div>
              <h1 className="text-base font-bold">
                LT7
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Luqify AI Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={clearChat}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Clear chat"
              title="Clear chat"
            >
              <Trash2 size={18} />
            </button>

            <Link
              href="/"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white sm:block"
            >
              Library
            </Link>
          </div>
        </div>
      </header>

      {/* CHAT AREA */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <div className="flex-1 px-4 pb-32 pt-8 sm:px-6">
          {messages.map((message) => {
            const isUser =
              message.role === "user";

            const readableResources =
              getReadableResources(
                message.resources
              );

            return (
              <div
                key={message.id}
                className={`mb-8 flex ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex w-full gap-3 ${
                    isUser
                      ? "max-w-[85%] flex-row-reverse sm:max-w-[75%]"
                      : "max-w-full"
                  }`}
                >
                  {!isUser && (
                    <div className="mt-1 shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9A96E]/20 blur-sm" />

                        <div className="relative">
                          <LT7Icon
                            size={30}
                            shape="circle"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={
                      isUser
                        ? "rounded-3xl rounded-br-md bg-[#3B2412] px-4 py-3 text-sm leading-7 text-white sm:text-base"
                        : "min-w-0 flex-1 px-0 py-1 text-sm leading-7 text-slate-800 dark:text-slate-100 sm:text-base"
                    }
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>

                    {/* LIBRARY RESOURCES */}
                    {readableResources.length >
                      0 && (
                      <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
                        <div className="mb-4 flex items-center gap-2">
                          <BookOpen
                            size={17}
                            className="text-[#8a6738] dark:text-[#C9A96E]"
                          />

                          <span className="text-sm font-bold">
                            Library resources
                          </span>
                        </div>

                        <div className="space-y-3">
                          {readableResources.map(
                            (resource) => (
                              <div
                                key={
                                  resource.id
                                }
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
                              >
                                <div className="flex gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A96E]/15">
                                    <FileText
                                      size={19}
                                      className="text-[#8a6738] dark:text-[#C9A96E]"
                                    />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold">
                                      {resource.title ||
                                        resource.file_name ||
                                        "Library Resource"}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                      {formatAcademicValue(
                                        resource.course
                                      )}

                                      {" • "}

                                      {formatAcademicValue(
                                        resource.category
                                      )}
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                      {resource.programme && (
                                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                          {formatAcademicValue(
                                            resource.programme
                                          )}
                                        </span>
                                      )}

                                      {resource.year && (
                                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                          {formatAcademicValue(
                                            resource.year
                                          )}
                                        </span>
                                      )}

                                      {resource.semester && (
                                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                          {formatAcademicValue(
                                            resource.semester
                                          )}
                                        </span>
                                      )}
                                    </div>

                                    {resource.file_url && (
                                      <a
                                        href={
                                          resource.file_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#3B2412] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#4d301b]"
                                      >
                                        Open resource

                                        <ExternalLink
                                          size={
                                            13
                                          }
                                        />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* THINKING ANIMATION */}
          {loading && (
            <div className="mb-8 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9A96E]/25 blur-md" />

                <div className="relative">
                  <LT7Icon
                    size={30}
                    shape="circle"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{
                    animationDelay:
                      "150ms",
                  }}
                />

                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                  style={{
                    animationDelay:
                      "300ms",
                  }}
                />
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto w-full max-w-4xl px-4 py-3 sm:px-6 sm:py-4">
          {/* ATTACHMENTS */}
          {attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachments.map(
                (attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-900"
                  >
                    {attachment.previewUrl ? (
                      <img
                        src={
                          attachment.previewUrl
                        }
                        alt={
                          attachment.file.name
                        }
                        className="h-9 w-9 rounded-lg object-cover"
                      />
                    ) : (
                      <FileText
                        size={18}
                        className="text-[#8a6738] dark:text-[#C9A96E]"
                      />
                    )}

                    <span className="max-w-[180px] truncate text-xs font-medium">
                      {attachment.file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeAttachment(
                          attachment.id
                        )
                      }
                      className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
                      aria-label={`Remove ${attachment.file.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          <form
            onSubmit={sendMessage}
          >
            <div className="relative">
              {/* ATTACH MENU */}
              {showAttachMenu && (
                <div className="absolute bottom-16 left-0 z-40 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C9A96E]/15">
                      <Paperclip
                        size={18}
                        className="text-[#8a6738] dark:text-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Attach resource
                      </p>

                      <p className="text-xs text-slate-500">
                        PDF, Word, text and other files
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      imageInputRef.current?.click()
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C9A96E]/15">
                      <ImageIcon
                        size={18}
                        className="text-[#8a6738] dark:text-[#C9A96E]"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Add image
                      </p>

                      <p className="text-xs text-slate-500">
                        Upload an image for LT7 to inspect
                      </p>
                    </div>
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2 rounded-3xl border border-slate-300 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() =>
                    setShowAttachMenu(
                      (current) => !current
                    )
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label="Attach"
                  title="Attach"
                >
                  <Plus
                    size={21}
                    className={`transition-transform ${
                      showAttachMenu
                        ? "rotate-45"
                        : ""
                    }`}
                  />
                </button>

                <textarea
                  value={input}
                  onChange={(event) =>
                    setInput(
                      event.target.value
                    )
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Message LT7..."
                  disabled={loading}
                  rows={1}
                  className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 dark:text-white sm:text-base"
                />

                <button
                  type="submit"
                  disabled={
                    loading ||
                    (!input.trim() &&
                      attachments.length ===
                        0)
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B2412] text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 dark:bg-[#C9A96E] dark:text-[#24170d]"
                  aria-label="Send message"
                >
                  <ArrowUp size={19} />
                </button>
              </div>
            </div>
          </form>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.csv,.md,.rtf,.ppt,.pptx,.xls,.xlsx"
            onChange={handleFiles}
            className="hidden"
          />

          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
            className="hidden"
          />
        </div>
      </div>
    </main>
  );
}