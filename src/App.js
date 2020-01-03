import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Sortable from 'sortablejs';
import initialData from './initial-data';
import Column from './Column';
import 'css-reset-and-normalize';
function App() {

  const [data, setData] = useState(initialData);
  console.log(data);

  const [statusAddCard, setStatusAddCard] = useState(false);
  const [nameCard, setNameCard] = useState('');
  // let [listCard, setListCard] = useState([{ "To-do-list": ["tung", "456"] }, { "Doing": ["thanh", "467856"] }, { "Done": ["thanh", "467856"] }]);
  let [listCard, setListCard] = useState([]);

  const addOtherCard = () => {
    setStatusAddCard(true);
    if (nameCard !== '') {
      setListCard([...listCard, { [nameCard]: [] }]);
    }
    setNameCard('');
  }

  const handleNameCard = (e) => {
    setNameCard(e.target.value);
  }

  useEffect(() => {
    let valueLocalStorage = JSON.parse(localStorage.getItem("listCard"));
    if (valueLocalStorage == null || valueLocalStorage == 0) {
      localStorage.setItem("listCard", JSON.stringify(listCard));
    } else {
      setListCard(valueLocalStorage);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("listCard", JSON.stringify(listCard));
  }, [listCard])

  return (
    <React.Fragment>
      <div className="App" id="card">
        {listCard.map((todoList, index) => {
          return <Card key={index} listCard={listCard} setListCard={setListCard} todoList={todoList} index={index} />
        })}
      </div>
      <div className="wrap__add-cart">
        <button className="add-card" onClick={() => { addOtherCard() }}>Add another card</button>
        {statusAddCard ? <input type="text" value={nameCard} onChange={(e) => { handleNameCard(e) }} /> : null}
      </div>

      {data.columnOrder.map((columnId)=>{
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </React.Fragment>
  );
}

export default App;
