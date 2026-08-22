export type CopyDependencies = {
  writeText?: (text: string) => Promise<void>;
  legacyCopy?: (text: string) => boolean;
};

function browserLegacyCopy(text: string) {
  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export async function copyText(text: string, dependencies: CopyDependencies = {}) {
  const writeText =
    dependencies.writeText ??
    (typeof navigator !== "undefined"
      ? navigator.clipboard?.writeText.bind(navigator.clipboard)
      : undefined);
  const legacyCopy = dependencies.legacyCopy ?? browserLegacyCopy;

  if (writeText) {
    try {
      await writeText(text);
      return true;
    } catch {
      // The legacy path supports insecure localhost origins and denied clipboard access.
    }
  }

  return legacyCopy(text);
}
