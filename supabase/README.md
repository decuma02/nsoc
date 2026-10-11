# NSoC '26 — Supabase Database Setup Guide

## Supabase vs Prisma — Why Supabase is all you need

You mentioned being confused between Supabase and Prisma. Here is the simple distinction:
- **Supabase** is your **entire backend in the cloud**: managed PostgreSQL database + OAuth Authentication (GitHub/Google) + REST/Realtime APIs + Row-Level Security (RLS).
- **Prisma** is an Object-Relational Mapper (ORM) library for Node.js. It does not provide database hosting or authentication; it is just a client to query SQL databases.
- Because our project already uses `@supabase/supabase-js` and Supabase handles Auth and client-side database queries directly, **you do NOT need Prisma at all!** Supabase handles everything in one place.

---

## 1. Quick Setup in 3 Simple Steps

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard: [https://supabase.com/dashboard/project/myiczllepqvrfqejxcaw](https://supabase.com/dashboard/project/myiczllepqvrfqejxcaw)
2. In the left navigation bar, click **SQL Editor** (icon looking like `>_`).
3. Click **+ New query**.

### Step 2: Paste and Run the Schema
1. Open [`supabase/schema.sql`](./schema.sql) in this repository.
2. Copy the entire file content.
3. Paste it into the Supabase SQL Editor query box.
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).

> **What this creates:**
> - `profiles`: Contributor & maintainer user profiles synced automatically with GitHub / Google sign-in.
> - `registrations`: Track registrations (Contributor, Project Kernel, Campus Ambassador).
> - `inquiries`: Sponsorship and Community Partnership submissions from the website forms.
> - `projects`: Approved open-source repositories and issues catalog.
> - `contributions`: PR tracking and point calculations.
> - `leaderboard`: Materialized ranking view for fast live queries.
> - Row Level Security (RLS) policies protecting all tables.

---

## 2. Environment Variables in Vercel

In your Vercel Project Settings → **Environment Variables**, ensure you have:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://myiczllepqvrfqejxcaw.supabase.co` | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_6AHJ706BMH33qNd23wQFFw_swZ3KZUp` | Supabase Public Key |

*(Also supported fallback: `NEXT_PUBLIC_SUPABASE_ANON_KEY`)*

---

## 3. GitHub & Google OAuth Setup (Supabase)

To enable 1-click login on the website:
1. In your Supabase Dashboard, go to **Authentication** → **Providers**.
2. **GitHub**:
   - Turn **Enable GitHub** ON.
   - Follow the Supabase instructions to create a GitHub OAuth App and copy the Client ID & Client Secret.
3. **Google**:
   - Turn **Enable Google** ON.
   - Enter your Google Cloud OAuth Client ID & Secret.
4. In **URL Configuration**:
   - Set **Site URL** to your domain (e.g., `https://your-domain.vercel.app`).
   - Add Redirect URL: `https://your-domain.vercel.app/**` and `http://localhost:3000/**`.
