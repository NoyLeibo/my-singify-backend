import express from 'express'

const startServer = async (app: express.Application) => {
  try {
    const PORT = process.env.SERVER_PORT || 3000

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`)
    })
  } catch (error: any) {
    console.error(`❌ Server startup error: ${error.message}`)
    throw error
  }
}

export const servers = { startServer }
