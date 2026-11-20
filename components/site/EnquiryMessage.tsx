"use client";

import { useLayoutEffect, useRef } from "react";

/** Keep native editing and no-JavaScript defaults across initial hydration. */
export function EnquiryMessage({
  initialValue = "",
  required = false,
}: {
  initialValue?: string;
  required?: boolean;
}) {
  const value = initialValue.slice(0, 2000);
  const field = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    // Restore the native reset default without assigning .value. A textarea's
    // dirty-value flag preserves edits (including an intentional empty value).
    if (field.current) field.current.defaultValue = value;
  });

  return (
    <textarea
      ref={field}
      name="message"
      // React's textarea hydration initializes nonempty defaults via .value,
      // which can overwrite edits made before hydration. Render the default
      // on the server, then restore only .defaultValue in the layout commit.
      defaultValue={typeof window === "undefined" ? value : undefined}
      rows={5}
      required={required}
      maxLength={3000}
    />
  );
}
