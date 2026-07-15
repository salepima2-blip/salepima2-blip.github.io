import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PIMA Interior | Nội thất từ tấm nhựa PIMA",
  description: "Tủ bếp, tủ áo, tủ lavabo, kệ và vách gia công từ tấm nhựa PIMA chống ẩm, chống mối mọt và dễ vệ sinh.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
