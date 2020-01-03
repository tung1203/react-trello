import React, { useState, useEffect } from 'react';
import List from './List';

import Sortable from 'sortablejs';
function Card({ listCard, setListCard, todoList, index }) {


    const [statusAddCard, setStatusAddCard] = useState(false);
    const [nameList, setNameList] = useState('');
    let nameTodoList = Object.keys(todoList);

    const addListHandler = (e) => {
        e.preventDefault();
        setStatusAddCard(true);
        if (nameList !== '') {
            setListCard(listCard.map((card) => {
                if (card[nameTodoList]) {
                    card[nameTodoList] = [...card[nameTodoList], nameList];
                }
                return card;
            }));
        }
        setNameList('');
    }
    useEffect(() => {
        var card = document.getElementById('card');
        new Sortable(card, {
            group: 'card',
            animation: 150,
            ghostClass: 'blue-background-class',
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    console.log(sortable);
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? order.split('|') : [];
                    
                },
        
                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    
                    var order = sortable.toArray();
                    console.log(order);
                    localStorage.setItem(sortable.options.group.name, order.join('|'));

                }
            }
        });
        
    }, [])
    const handleValueNameList = (e) => {
        setNameList(e.target.value);
    }

    return (
        <div>
            <form className="wrap__card">
                <div className="card">
                    <div className="card__header">
                        <h3>{index}. {nameTodoList}</h3>
                    </div>
                    <div className="card__content">
                        <ul className="card__content-parent" id="simpleList">
                            <List listCard={listCard} todoList={todoList} nameTodoList={nameTodoList} setListCard={setListCard} />
                        </ul>
                    </div>
                    <div className="card__handler">
                        <button className="card__handler-add" onClick={(e) => { addListHandler(e) }}>Add another list</button>
                        {statusAddCard ? <input type="text" value={nameList} onChange={(e) => { handleValueNameList(e) }} /> : null}
                    </div>
                </div>
            </form>

        </div>
    );
}
export default Card;