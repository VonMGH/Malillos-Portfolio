export function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm text-zinc-800 shadow-sm dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-100"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
