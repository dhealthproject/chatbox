import express from 'express'
import path from 'path'
import { app as electronApp } from 'electron'
import fs from 'fs'

let serverInstance: any = null

export function startLocalServer(port: number = 8080): Promise<number> {
  return new Promise((resolve, reject) => {
    const app = express()

    // Determine the correct path to serve files from
    let rendererPath: string

    if (electronApp.isPackaged) {
      // When packaged, the files are in the app.asar or next to it
      // Try multiple possible locations
      const possiblePaths = [
        path.join(process.resourcesPath, 'app.asar', 'dist', 'renderer'),
        path.join(process.resourcesPath, 'app', 'dist', 'renderer'),
        path.join(__dirname, '..', 'renderer'),
        path.join(__dirname, '../renderer'),
      ]

      // Find the first path that exists
      rendererPath =
        possiblePaths.find((p) => {
          const exists = fs.existsSync(p)
          console.log(`Checking path: ${p} - ${exists ? 'EXISTS' : 'NOT FOUND'}`)
          return exists
        }) || possiblePaths[0]
    } else {
      rendererPath = path.join(__dirname, '../renderer')
    }

    console.log('Final serving path:', rendererPath)
    console.log('__dirname:', __dirname)
    console.log('process.resourcesPath:', process.resourcesPath)

    // Serve static files with proper mime types
    app.use(
      express.static(rendererPath, {
        setHeaders: (res, filepath) => {
          if (filepath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css')
          } else if (filepath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript')
          }
        },
      })
    )

    // Fallback to index.html for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(rendererPath, 'index.html'))
    })

    // Start server
    serverInstance = app
      .listen(port, 'localhost', () => {
        console.log(`Local server started at http://localhost:${port}`)
        resolve(port)
      })
      .on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is in use, trying ${port + 1}`)
          resolve(startLocalServer(port + 1))
        } else {
          reject(err)
        }
      })
  })
}

export function stopLocalServer() {
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('Local server stopped')
    })
    serverInstance = null
  }
}
