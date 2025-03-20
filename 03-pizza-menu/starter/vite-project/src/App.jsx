import "./App.css";
import { Pizza, Header, Menu, Footer } from "./components/index";
import "./index.css";

function App() {
  const hour = new Date().getHours();

  const openHours = 8;
  const closeHours = 22;
  const isOpen = hour >= openHours && hour <= closeHours ? true : false;

  return (
    <section className="container">
      <Header />
      <Menu />
      <Footer />
    </section>
  );
}

export default App;
