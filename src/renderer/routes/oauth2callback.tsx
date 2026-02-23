import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/oauth2callback')({
  component: OAuth2CallbackComponent,
})

function OAuth2CallbackComponent() {
  useEffect(() => {
    handleOAuthCallback()
  }, [])

  async function handleOAuthCallback() {
    try {
      // Parse the hash fragment (implicit flow returns token in #)
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)

      const accessToken = params.get('access_token')
      const expiresIn = params.get('expires_in')
      const error = params.get('error')
      const errorDescription = params.get('error_description')

      // Handle errors
      if (error) {
        const errorMsg = errorDescription || error
        console.error('OAuth error:', errorMsg)

        // Send error to parent window
        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'OAUTH_TOKEN',
              error: errorMsg,
              token: null,
            },
            window.location.origin
          )
        }

        // Close after 3 seconds
        setTimeout(() => window.close(), 3000)
        return
      }

      // Handle success
      if (!accessToken) {
        throw new Error('No access token received from Google')
      }

      const expiresAt = Date.now() + (parseInt(expiresIn || '3600') * 1000)

      // Send token to parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'OAUTH_TOKEN',
            token: accessToken,
            expiresAt: expiresAt,
            error: null,
          },
          window.location.origin
        )
      } else {
        // Fallback: store in sessionStorage if no opener
        sessionStorage.setItem(
          'oauth_token',
          JSON.stringify({
            token: accessToken,
            expiresAt: expiresAt,
          })
        )
      }

      // Close after 2 seconds
      setTimeout(() => window.close(), 2000)
    } catch (error) {
      console.error('OAuth callback error:', error)

      // Send error to parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'OAUTH_TOKEN',
            error: error instanceof Error ? error.message : 'Unknown error',
            token: null,
          },
          window.location.origin
        )
      }

      // Close after 3 seconds
      setTimeout(() => window.close(), 3000)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ color: '#333', marginTop: 0 }}>Authenticating...</h2>
        <div style={{ margin: '20px auto' }}>
          <div
            style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
              margin: '20px auto',
            }}
          />
        </div>
        <div style={{ fontSize: '14px', color: '#666', margin: '20px 0' }}>
          Processing your authentication request...
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
