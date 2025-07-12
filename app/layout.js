import "./globals.css";

export const metadata = {
  title: "Stack It",
  description: "Ask questions and get answers from the commiunity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
