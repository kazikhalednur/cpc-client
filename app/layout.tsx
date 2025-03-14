import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "./providers/SessionProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./providers/theme-provider";

export const metadata: Metadata = {
  title: "Daffodil International University Computer & Programming Club",
  description:
    "DIU CPC is the most primitive and extensive club as well as the biggest club in Daffodil International University. We work together to explore every field of Computer Science",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SessionProvider session={session}>
            {children}
            <Toaster position="top-right" />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
