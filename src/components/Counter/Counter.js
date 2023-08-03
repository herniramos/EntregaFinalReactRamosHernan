import Button from 'react-bootstrap/Button';
import "./Counter.css";


const Counter = ({ counter, setCounter}) => {

  const onAdd = () => {
    setCounter(counter + 1);
  };
  const onSubtract = () => {
    if (counter != 1) {
      setCounter(counter - 1);
    } 
  };

  return (
    
    <div className="counterContainer">
      <div className="counter"> Cantidad: {counter} </div>
      <div className="counterbuttons">
        <Button variant="outline-dark" disabled={counter === 0} className="rest" onClick={onSubtract}>-</Button>
        <Button variant="outline-dark" disabled={counter === 0} className="add" onClick={onAdd}>+</Button>
      </div>
    </div>
  );
};

export default Counter;
