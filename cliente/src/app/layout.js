export const metadata = {
  title: 'Register users',
  description: 'Project for class PTAC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel='icon' href='favicon.ico' />
      </head>
      <body>{children}</body>
    </html>
  )
}
