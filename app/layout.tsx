import { Footer, NavBar } from "@/components";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "CARZO",
  description: "Discover the best cars in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
