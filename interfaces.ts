declare module 'express-session' {
  interface SessionData {
    user?: { id: string; name: string }
    [key: string]: any
  }
}
