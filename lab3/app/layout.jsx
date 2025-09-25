import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
    title: "Todo App - Task Management",
    description: "Сучасний список завдань",
};

export default function RootLayout({ children }) {
    return (
        <html lang="uk">
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
                {children}
                <Toaster richColors position="top-right" />
            </body>
        </html>
    );
}
