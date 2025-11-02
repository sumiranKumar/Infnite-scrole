import { useEffect, useState } from "react";
import "./App.css";

const INITIAL_CARDS = 1;
const LOADING_Cards = 1;
function App() {
  const [cards, addCards] = useState([]);
  const [ShowCards, setShowCards] = useState(INITIAL_CARDS);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/blogs?_page=${page}&_limit=10+1`)
      .then((get) => get.json())
      .then((cards) => addCards(cards));
  }, [page]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const viewHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;

    console.log("ScrollTop:", scrollTop);
    console.log("viewHeight:", viewHeight);
    console.log("ScrollHeight:", scrollHeight);

    if (scrollTop + viewHeight >= scrollHeight) {
      loadMore();
    }
  };

  const loadMore = () => {
    setShowCards((prev) => prev + LOADING_Cards);
  };

  console.log(cards);

  return (
    <>
      <div className="container" onScroll={handleScroll}>
        {cards.slice(0, ShowCards).map((card) => (
          <div className="cards" key={card.id}>
            <h1>{card.title}</h1>

            <p>{card.body}</p>
           
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
