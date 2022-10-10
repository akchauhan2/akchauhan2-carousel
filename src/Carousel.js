import React from "react";

const cardWidth = 25;

const _items = new Array(5).fill(0).map((_, idx) => ({
  pos: idx,
}));
//_items.push(..._items);

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const CarouselSlideItem = ({ pos, idx }) => {
  const styles = {
    transform: `translateX(${pos * cardWidth}rem)`,
  };

  return (
    <li className="slide-item" style={styles}>
      <div className="card">
        <div className="card-header">title {idx}</div>

        <div className="card-body">
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            saepe atque commodi exercitationem dolore praesentium vitae a eius
            ipsum reprehenderit eligendi molestiae aliquid ab itaque, aperiam
            nihil quia mollitia velit!
          </p>
        </div>

        <div className="card-footer small">{new Date().getTime()}</div>
      </div>
    </li>
  );
};

const keys = _items.map((e, idx) => idx);

export default function Carousel() {
  const [items, setItems] = React.useState(keys);
  const [transitioning, setTransitioning] = React.useState(false);

  const itemLength = items.length;

  const prevClick = (jump = 1) => {
    if (!transitioning) {
      setTransitioning(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % itemLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!transitioning) {
      setTransitioning(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + itemLength) % itemLength]);
      });
    }
  };

  React.useEffect(() => {
    if (transitioning) sleep(300).then(() => setTransitioning(false));
  }, [transitioning]);

  return (
    <>
      <div className="buttons">
        <button className="btn btn--prev" onClick={() => prevClick()}>
          <i className="btn-arrow btn-arrow--left" />
        </button>
        <button className="btn btn--next" onClick={() => nextClick()}>
          <i className="btn-arrow btn-arrow--right" />
        </button>
      </div>
      <div className="wrap">
        <div className="inner">
          <div className="container">
            <ul className="slide-list">
              {items.map((pos, i) => (
                <CarouselSlideItem key={i} idx={i} pos={pos} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
