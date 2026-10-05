import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "LFarm AI - Quản Lý Nông Nghiệp Lúa Thông Minh",
  description: "Hệ thống quản lý ruộng lúa, theo dõi mực nước AWD & kết nối thương lái thu mua.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${plusJakartaSans.variable} antialiased bg-slate-50 text-slate-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
