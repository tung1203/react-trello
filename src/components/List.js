import React, { useEffect } from 'react';
import Sortable from 'sortablejs';
function List({ listCard, todoList, nameTodoList, setListCard }) {
    useEffect(() => {
        var list = document.getElementsByClassName('card__content-parent');
        console.log(list.length);
        for (let i = 0; i < list.length; i++) {
            new Sortable(list[i], {
                group: 'list1',
                animation: 150,
                ghostClass: 'blue-background-class',
                store: {
                    /**
                     * Get the order of elements. Called once during initialization.
                     * @param   {Sortable}  sortable
                     * @returns {Array}
                     */
                    get: function (sortable) {
                        var order = localStorage.getItem(sortable.options.group.name);
                        return order ? order.split('|') : [];

                    },

                    /**
                     * Save the order of elements. Called onEnd (when the item is dropped).
                     * @param {Sortable}  sortable
                     */
                    set: function (sortable) {
                        var order = sortable.toArray();
                        localStorage.setItem(sortable.options.group.name, order.join('|'));

                    }
                }
            });
        }
    }, [])
    const handleDeleteList = (e, listName) => {
        e.preventDefault();
        setListCard(listCard.map((card) => {
            if (card[nameTodoList]) {
                card[nameTodoList].splice(card[nameTodoList].indexOf(listName), 1);
            }
            return card;
        }))
    }

    return (
        <React.Fragment>
            {todoList[nameTodoList].map((listName, index) => {
                return <li className="card__content-list" key={index}>{listName} <button className="card__content-delete" onClick={(e) => { handleDeleteList(e, listName) }}>Delete</button></li>
            })}
        </React.Fragment>
    );
}

export default List;