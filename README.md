# QR Dashboard

A small full-stack app that turns any link into a QR code. Paste a link, generate the code, and share it with a single click.

## Features

- Generate a QR code from any http or https link (the protocol is added if you leave it out)
- One-click share: opens the native share sheet with the QR image and link, and falls back to copying the image where sharing files is not supported
- Copy the QR image or download it as a PNG
- Recent links list, saved in the browser, to regenerate a code quickly
- Server-side validation of every link
- Responsive layout with light and dark themes

## Tech stack

| Part | Stack |
| --- | --- |
| Client | React, Vite, plain CSS |
| Server | Node.js, Express, [`qrcode`](https://www.npmjs.com/package/qrcode), `cors` |

## Project structure

```
qr-dashboard/
├── client/                 # React app (Vite)
│   └── src/
│       ├── components/     # Navbar, LinkForm, QrCard, History, Toast
│       ├── App.jsx
│       └── main.jsx
└── server/                 # Express API
    ├── middleware/
    │   └── validateUrl.js  # checks and normalises the link
    ├── routes/
    │   └── qr.js           # POST /api/qr
    └── server.js
```

## Getting started

You need Node.js 18 or newer.

```bash
git clone https://github.com/hub-mayank/qr-dashboard.git
cd qr-dashboard
```

### Run the whole app

Build the client once, then start the server. Express serves the built client and the API on the same port.

```bash
cd client
npm install
npm run build

cd ../server
npm install
npm start
```

Open http://localhost:3000.

### Development mode

Run the server and the Vite dev server in two terminals. Vite proxies `/api` calls to the server.

```bash
# terminal 1
cd server
npm install
npm run dev
```

```bash
# terminal 2
cd client
npm install
npm run dev
```

Open http://localhost:5173.

## API

### `POST /api/qr`

Generates a QR code for a link.

Request body:

```json
{ "url": "github.com/vercel/next.js" }
```

Response `200`:

```json
{
  "url": "https://github.com/vercel/next.js",
  "qr": "data:image/png;base64,..."
}
```

Errors:

| Status | Message | When |
| --- | --- | --- |
| 400 | `link is required` | the body has no link |
| 400 | `enter a valid link` | the link is malformed or not http/https |
| 500 | `could not generate qr` | the QR image could not be created |

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | port the server listens on |

## Notes

- The share button uses the Web Share API, which needs a secure context (HTTPS or localhost). Sharing the image file works on most phones and recent desktop browsers.
- Recent links are stored in `localStorage` and never leave the browser.
