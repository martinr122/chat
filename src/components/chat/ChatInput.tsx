type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: ChatInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napíšte svoju otázku..."
          rows={3}
          className="flex-1 resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          disabled={disabled}
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-[#2b5dab] px-5 py-3 text-sm font-medium text-white hover:bg-[#244f94] disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Odoslať
        </button>
      </div>
    </div>
  );
}
