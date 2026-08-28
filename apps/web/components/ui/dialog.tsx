"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Where the last activation happened, in viewport coordinates, so a panel can
 * grow out of the control that opened it instead of appearing from nowhere.
 *
 * Recorded from the document rather than the trigger: the content mounts as
 * part of the same click, and a listener here is guaranteed to have run
 * before the panel is attached.
 */
let lastPoint: { x: number; y: number } | null = null

if (typeof document !== "undefined") {
  document.addEventListener(
    "pointerdown",
    (event) => {
      lastPoint = { x: event.clientX, y: event.clientY }
    },
    true,
  )
  // Keyboard activation carries no coordinates: fall back to the focused
  // control's own box so Enter animates from the same place a click does.
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return
      const el = document.activeElement
      if (!(el instanceof HTMLElement)) return
      const { top, left, width, height } = el.getBoundingClientRect()
      lastPoint = { x: left + width / 2, y: top + height / 2 }
    },
    true,
  )
}

/**
 * Set on attach, before the first painted frame, a state update would land a
 * frame late and the panel would visibly jump from centre to origin.
 */
function anchorToLastPoint(node: HTMLDivElement | null) {
  if (!node || !lastPoint) return
  const rect = node.getBoundingClientRect()
  node.style.setProperty(
    "--dialog-origin",
    `${lastPoint.x - rect.left}px ${lastPoint.y - rect.top}px`,
  )
}

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogContent({
  className,
  children,
  closeLabel = "Close",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Popup> & {
  closeLabel?: string
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-overlay"
        className="data-open:animate-in data-open:fade-in-0 data-[ending-style]:animate-out data-[ending-style]:fade-out-0 fixed inset-0 isolate z-50 bg-black/60 duration-200 ease-out"
      />
      <DialogPrimitive.Popup
        ref={anchorToLastPoint}
        data-slot="dialog-content"
        className={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 fixed start-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] origin-(--dialog-origin) -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-5 text-sm shadow-2xl ring-1 duration-100 outline-none sm:max-w-md rtl:translate-x-1/2",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground absolute end-3 top-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-md"
        >
          <XIcon className="size-5" />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-base leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
