# Gryffindor Lab website

The landing page, contact form, and SEO routes live in this Next.js app.

## Run locally

From the repository root, run `pnpm --filter web dev` and open http://localhost:3000.

## Contact form

Create `apps/web/.env.local` for local development, and set the same values in your hosting provider's environment settings for production:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=info@gryffindorlab.com
RESEND_FROM_EMAIL=Gryffindor Lab <info@gryffindorlab.com>
```

`CONTACT_EMAIL` must be an inbox you can actually access. The form requires both `CONTACT_EMAIL` and `RESEND_API_KEY`. `RESEND_FROM_EMAIL` is optional; its default is `Gryffindor Lab <info@gryffindorlab.com>`. The sender domain must be verified for sending in Resend. Visitors' addresses are set as the reply-to address so you can reply from your inbox.

Verifying a domain for sending with Resend does not create a mailbox. If `info@gryffindorlab.com` is hosted by an existing email provider, keep that provider's MX records for receiving mail. The contact form sends a normal email through Resend to the inbox specified by `CONTACT_EMAIL`.

The contact endpoint allows three validated submissions per IP address every 15 minutes and returns HTTP 429 with a `Retry-After` header when the limit is reached. This in-memory limit is per running server instance; for multiple instances or serverless deployments, use a shared rate-limit store at the hosting edge.

## Site URL

The canonical URL and sitemap default to `https://gryffindorlab.com`. If the public website uses another URL, set `SITE_URL` in the hosting environment before building.
