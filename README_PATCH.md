
# Finario API – Build Patch v4

This patch adds a TypeScript shim at `apps/api/src/types/bullmq.d.ts` to satisfy
TypeScript when `bullmq` (and its types) are not available during build on Render.

✅ It unblocks the build by declaring a minimal "bullmq" module.
⚠️ For production use, keep the real `bullmq` dependency and Redis connection.

How to use:
1. Upload the contents of this ZIP into your GitHub repository root.
   It will create the file:
   - apps/api/src/types/bullmq.d.ts
2. Commit the change.
3. In Render, click "Manual Deploy" → "Clear build cache & Redeploy".
