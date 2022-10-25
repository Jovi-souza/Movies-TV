import { Home } from "./pages/Home";
import { Popular } from "./pages/Home/Most/Popular";
import { Header } from "./pages/Layout/Header";

export function App() {
  return (
    <div className="bg-background p-4">
      <Header />
      <Home />
    </div>
  )
}
