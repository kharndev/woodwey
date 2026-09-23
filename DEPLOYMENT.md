# Woodwey deployment

## Vercel project settings

- Root Directory: leave blank (`.` / repository root)
- Framework Preset: Next.js
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build`
- Output Directory: leave unset and let Vercel detect Next.js

## Production environment variables

Required for website inquiry delivery:

- `INQUIRY_WEBHOOK_URL` — active Make custom-webhook URL.

Optional:

- `INQUIRY_WEBHOOK_TOKEN` — bearer token only when the webhook is protected with the same token.
- `NEXT_PUBLIC_INSTAGRAM_URL` — verified Instagram profile URL.
- `NEXT_PUBLIC_FACEBOOK_URL` — verified Facebook profile URL.
- `NEXT_PUBLIC_LINKEDIN_URL` — verified LinkedIn profile URL.

Never commit `.env.local`. Configure production values in Vercel Project Settings → Environment Variables, and enable the Make scenario before testing the deployed quote form.

## Release checks

Run from this directory:

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd lint
pnpm.cmd build
```

## Catalogue access

The full catalogue is not published as a website download. Both catalogue CTAs open the same lead-capture form, which delivers through `INQUIRY_WEBHOOK_URL` so Woodwey can share controlled access manually.

The private editorial PDF can be regenerated locally with:

```powershell
pnpm.cmd run catalogue:generate
```

It is written to the ignored `output/pdf/` directory and must not be moved into `public/`.
