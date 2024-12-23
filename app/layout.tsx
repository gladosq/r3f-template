import '@/styles/globals.css';
import Navigation from "@/components/Navigation/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Navigation/>
          <div className="canvas">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
