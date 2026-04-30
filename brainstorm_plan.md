# Database Connection Error Fix Plan

## Error Summary
- **Type**: `PrismaClientInitializationError`
- **Message**: Can't reach database server at `ep-morning-mode-anmsecr9.c-6.us-east-1.aws.neon.tech:5432`
- **Source**: `src/lib/actions/appointments.ts:123` → `prisma.user.findUnique(...)`

## Root Cause Hypotheses
1. **Neon project is paused** (common on free tier after inactivity).
2. **Incorrect or outdated `DATABASE_URL`** in `.env`.
3. **Missing SSL parameters** in the connection string (Neon requires `sslmode=require`).
4. **Local network/firewall** blocking outbound port 5432.
5. **Endpoint typo or migration** (the endpoint `ep-morning-mode-anmsecr9` may have changed).

## Information Gathered
- `prisma/schema.prisma` uses `postgresql` provider with `env("DATABASE_URL")`.
- `src/lib/prisma.ts` instantiates `PrismaClient` without custom args.
- No hardcoded database URLs found in the codebase.

## Plan
1. **Inspect `.env`**
   - Ask user to share the `DATABASE_URL` value (with password redacted).
   - Verify it points to the exact endpoint from the error.

2. **Verify Neon Project Status**
   - User should log in to [https://console.neon.tech](https://console.neon.tech) and confirm the project `ep-morning-mode-anmsecr9` is **Active** (not paused).
   - If paused, click **Start** or run a query to wake it up.

3. **Validate Connection String Format**
   - Must include `?sslmode=require` at the end, e.g.:
     ```
     postgresql://user:password@ep-morning-mode-anmsecr9.c-6.us-east-1.aws.neon.tech/dbname?sslmode=require
     ```

4. **Test Connectivity**
   - Run `npx prisma db pull` or `npx prisma validate` to confirm Prisma can reach the DB.
   - If it still fails, try pinging the endpoint:
     ```bash
     telnet ep-morning-mode-anmsecr9.c-6.us-east-1.aws.neon.tech 5432
     ```
     or
     ```bash
     psql "<DATABASE_URL>"
     ```

5. **Fix / Update `.env`**
   - Copy the correct connection string from Neon console → Connection Details.
   - Replace the old `DATABASE_URL` in `.env`.
   - Restart the Next.js dev server so the new env var is loaded.

6. **(Fallback) Handle Unreachable DB Gracefully**
   - If the DB is permanently deleted, we can implement a mock/fallback layer or create a new Neon project.

## Next Step
I need the user to confirm the contents of `.env` (specifically `DATABASE_URL`, with password hidden) so we can proceed with validation.
