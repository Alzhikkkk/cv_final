import About from "./components/About";
import Benefit from "./components/Benefit";
import Converter from "./components/Converter";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
          <Header></Header>
          <main className="main">
            <About></About>
            <Benefit></Benefit>
            <Converter></Converter>
          </main>
          <Footer></Footer>
    </div>
  );
}

export default App;
