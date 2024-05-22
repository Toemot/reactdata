import { title } from "process";
import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "/styles/site.css";

export const metadata = {
  title: "Demo App",
  description: "Olathings",
};

export default function RootLayer({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
