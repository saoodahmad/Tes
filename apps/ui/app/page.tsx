import Header from '@/components/Header';
import PlayGround from '@/components/PlayGround';
import { Analytics } from '@vercel/analytics/react'

export default function Home() {
  return (
    <main >
      <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <PlayGround />
    </div>
    <Analytics />
    </main>
  );
}
