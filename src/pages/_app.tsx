import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Oswald , Heebo} from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "700"],
});

const heebo = Heebo({
  subsets: ["latin"],
  variable: "--font-heebo",
  weight: ["400", "500", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (<main className={`${oswald.variable} ${heebo.variable}`}>
    <Component {...pageProps} />
    </main>
  )
}
