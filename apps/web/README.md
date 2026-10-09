# Axis Visual Lab website

The landing page, contact form, and SEO routes live in this Next.js app.

## Run locally

From the repository root, run `pnpm --filter web dev` and open http://localhost:3000.

## Contact form

Create `apps/web/.env.local` for local development, and set the same values in your hosting provider's environment settings for production:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your-private-inbox@example.com
RESEND_FROM_EMAIL=Axis Visual Lab <contact@axisvisuallab.com>
```

`CONTACT_EMAIL` must be an inbox you can actually access (for example, your private mailbox or a working `info@axisvisuallab.com` inbox). The form requires both `CONTACT_EMAIL` and `RESEND_API_KEY`. `RESEND_FROM_EMAIL` is optional; its default is `Axis Visual Lab <contact@axisvisuallab.com>`. The sender domain must be verified for sending in Resend. Visitors' addresses are set as the reply-to address so you can reply from your inbox.

Verifying a domain for sending with Resend does not create a mailbox. If `info@axisvisuallab.com` is hosted by an existing email provider, keep that provider's MX records for receiving mail. The contact form sends a normal email through Resend to the inbox specified by `CONTACT_EMAIL`.

## Site URL

The canonical URL and sitemap default to `https://www.axisvisuallab.com`. If the public website uses another URL, set `SITE_URL` in the hosting environment before building.
