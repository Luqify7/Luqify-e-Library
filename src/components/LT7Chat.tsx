"use client";

import {
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useState,
} from "react";
import {
  ArrowUp,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Plus,
  X,
} from "lucide-react";
import LT7Icon from "@/components/LT7Icon";

type Resource = {
  id: string | number;
  title: string | null;
  file_name: string | null;
  file_url: string | null;
  course: string | null;
  category: string | null;
  readable?: boolean;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  resources?: Resource[];
};

type Attachment = {
  id: string;
  file: File;
  previewUrl?: string;
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

export default function LT7Chat() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: 1,
        role: "assistant",
        content:
          "How can I help? Ask me anything — academic questions, general knowledge, study help, or questions about the Luqify e-Library.",
      },
    ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAttachMenu, setShowAttachMenu] =
    useState(false);
  const [attachments, setAttachments] =
    useState<Attachment[]>([]);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  function handleFiles(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    const newAttachments: Attachment[] =
      files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl: file.type.startsWith(
          "image/"
        )
          ? URL.createObjectURL(file)
          : undefined,
      }));

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
      (!question &&
        attachments.length === 0) ||
      loading
    ) {
      return;
    }

    const attachmentNames = attachments
      .map((attachment) => attachment.file.name)
      .join(", ");

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        content:
          question ||
          `Please analyze the attached file${
            attachments.length > 1
              ? "s"
              : ""
          }: ${attachmentNames}`,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "message",
        question ||
          "Please analyze the attached file."
      );

      attachments.forEach((attachment) => {
        formData.append(
          "files",
          attachment.file
        );
      });

      const response = await fetch(
        "/api/ai",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

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
          "LT7 could not generate a response right now."
        );
      }

      setMessages((current) => [
        ...current,
        {
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
        },
      ]);
    } catch (error) {
      console.error(
        "LT7 WIDGET ERROR:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "LT7 is temporarily unavailable. Please try again shortly.",
        },
      ]);
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

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950">
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {messages.map((message) => {
          const isUser =
            message.role === "user";

          const readableResources =
            message.resources?.filter(
              (resource) =>
                resource.readable === true
            ) || [];

          return (
            <div
              key={message.id}
              className={`flex ${
                isUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[88%] ${
                  isUser
                    ? "rounded-2xl rounded-br-md bg-[#3B2412] px-3.5 py-2.5 text-white"
                    : "text-slate-800 dark:text-slate-100"
                }`}
              >
                {!isUser && (
                  <div className="mb-2">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9A96E]/20 blur-sm" />

                      <div className="relative">
                        <LT7Icon
                          size={25}
                          shape="circle"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="whitespace-pre-wrap break-words text-sm leading-6">
                  {message.content}
                </div>

                {readableResources.length >
                  0 && (
                  <div className="mt-4 space-y-2">
                    {readableResources.map(
                      (resource) => (
                        <a
                          key={
                            resource.id
                          }
                          href={
                            resource.file_url ||
                            "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-900"
                        >
                          <FileText
                            size={15}
                            className="shrink-0 text-[#8a6738] dark:text-[#C9A96E]"
                          />

                          <span className="min-w-0 flex-1 truncate">
                            {resource.title ||
                              resource.file_name ||
                              "Library Resource"}
                          </span>

                          <ExternalLink
                            size={13}
                            className="shrink-0"
                          />
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9A96E]/20 blur-sm" />

              <div className="relative">
                <LT7Icon
                  size={25}
                  shape="circle"
                />
              </div>
            </div>

            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />

              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                style={{
                  animationDelay:
                    "150ms",
                }}
              />

              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                style={{
                  animationDelay:
                    "300ms",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-slate-200 px-3 py-2 dark:border-slate-800">
          {attachments.map(
            (attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900"
              >
                {attachment.previewUrl ? (
                  <img
                    src={
                      attachment.previewUrl
                    }
                    alt={
                      attachment.file.name
                    }
                    className="h-7 w-7 rounded-md object-cover"
                  />
                ) : (
                  <FileText
                    size={15}
                    className="text-[#8a6738] dark:text-[#C9A96E]"
                  />
                )}

                <span className="max-w-[120px] truncate text-[11px]">
                  {attachment.file.name}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeAttachment(
                      attachment.id
                    )
                  }
                  className="text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  aria-label="Remove attachment"
                >
                  <X size={13} />
                </button>
              </div>
            )
          )}
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="border-t border-slate-200 p-3 dark:border-slate-800"
      >
        <div className="relative">
          {showAttachMenu && (
            <div className="absolute bottom-14 left-0 z-40 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Paperclip
                  size={18}
                />

                <span>
                  Attach resource
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  imageInputRef.current?.click()
                }
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ImageIcon
                  size={18}
                />

                <span>
                  Add image
                </span>
              </button>
            </div>
          )}

          <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-900">
            <button
              type="button"
              onClick={() =>
                setShowAttachMenu(
                  (current) => !current
                )
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Attach"
            >
              <Plus
                size={19}
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
              className="min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 dark:text-white"
            />

            <button
              type="submit"
              disabled={
                loading ||
                (!input.trim() &&
                  attachments.length ===
                    0)
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3B2412] text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#C9A96E] dark:text-[#24170d]"
              aria-label="Send message"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>

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
      </form>
    </div>
  );
}