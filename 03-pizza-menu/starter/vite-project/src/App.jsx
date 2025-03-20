import "./App.css";
import { Pizza, Header, Menu, Footer } from "./components/index";
import "./index.css";

function App() {
  return (
    <section className="container">
      <Header />
      <Menu />
      <Footer />
    </section>
  );
}

export default App;
