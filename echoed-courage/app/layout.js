// import { Analytics } from "@vercel/analytics/react";
import "./styles/globals.css";

export const metdata = {
  title: "echoed-courage",
  openGraph: {
    title: "echoed-courage",
    description: "submission for DevFest Batna 2023 ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>echoes-courage</title>
        <link rel="icon" href="" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
