//   pnpm admin:seed you@example.com
//
// Run it yourself and type the password when asked. It is read with terminal
// echo off, so it lands in neither shell history nor the screen - a password
// must never travel through chat, argv, or a committed file.

import { createClient } from "@supabase/supabase-js";
import { argv, env, exit, stdin, stdout } from "node:process";

const CTRL_C = String.fromCharCode(3);
const DEL = String.fromCharCode(127);

const email = argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Usage: pnpm admin:seed you@example.com");
  exit(1);
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  exit(1);
}

function askHidden(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    stdout.write(prompt);
    const chars: string[] = [];
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const done = () => {
      if (stdin.isTTY) stdin.setRawMode(false);
      stdin.pause();
      stdin.off("data", onData);
      stdin.off("end", done);
      stdout.write("\n");
      resolve(chars.join(""));
    };
    // A raw TTY delivers keystrokes; a pipe delivers chunks. Walk characters
    // so both behave, and treat end-of-input as enter.
    const onData = (chunk: string) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") return done();
        if (ch === CTRL_C) {
          stdout.write("\n");
          exit(130);
        } else if (ch === DEL || ch === "\b") {
          chars.pop();
        } else {
          chars.push(ch);
        }
      }
    };
    stdin.on("data", onData);
    stdin.on("end", done);
  });
}

// tsx runs .ts as CJS here, so no top-level await: everything lives in main().
async function main() {
  const password = await askHidden(`Password for ${email}: `);
  if (password.length < 8) {
    console.error("Use at least 8 characters. Nothing changed.");
    exit(1);
  }
  if (password !== (await askHidden("Repeat it: "))) {
    console.error("They differ. Nothing changed.");
    exit(1);
  }

  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const { error } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (!error) {
    console.log(`Created ${email}.`);
  } else if (error.code === "email_exists" || /already.*registered/i.test(error.message)) {
    const { data, error: listErr } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const user = data?.users.find((u) => u.email?.toLowerCase() === email);
    if (listErr || !user) {
      console.error(listErr?.message ?? `Could not find ${email} to update.`);
      exit(1);
    }
    const { error: updErr } = await db.auth.admin.updateUserById(user.id, { password });
    if (updErr) {
      console.error(updErr.message);
      exit(1);
    }
    console.log(`Password set on the existing account ${email}.`);
  } else {
    console.error(error.message);
    exit(1);
  }

  if (!(env.ADMIN_EMAILS ?? "").toLowerCase().includes(email)) {
    console.warn(`Note: ${email} is not in ADMIN_EMAILS in .env.local - the dashboard will refuse it until it is.`);
  }
}

main().catch((err) => {
  console.error(String(err));
  exit(1);
});
