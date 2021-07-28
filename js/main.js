const form = document.querySelector('#form');
const inputValue = document.querySelector('#inputItem');
const warning = document.querySelector('.alert');
const clear = document.querySelector('#clear-items');
const listContainer = document.querySelector('#myUl');

let todoList = [];

const editDelete = nameOfItem => {
    const list = listContainer.querySelectorAll('li');

    list.forEach(singleList => {
        const itemName = singleList.querySelector('.item-name');
        if (itemName.textContent === nameOfItem) {
            itemName.addEventListener('click', () => {
                itemName.classList.toggle('checked');
            })

            singleList.querySelector('.edit').addEventListener('click', () => {
                inputValue.value = nameOfItem;
                listContainer.removeChild(singleList)

                todoList = todoList.filter(singleList => {
                    return singleList !== nameOfItem
                })
            })

            singleList.querySelector('.delete').addEventListener('click', () => {
                listContainer.removeChild(singleList)

                todoList = todoList.filter(singleList => {
                    return singleList !== nameOfItem
                })
            })
        }
        
    })
}

const listValue = todoList => {
    listContainer.innerHTML = '';

    todoList.forEach(item => {
        listContainer.insertAdjacentHTML('beforeend', `<li class="item"> <p class="item-name">${item}</p>
            <span class="item-icons">
                <a href="#" class="edit"><i class="far fa-edit"></i></a>
                <a href="#" class="delete"><i class="far fa-times-circle"></i></a>
            </span>
        </li>`)

        editDelete(item);
    });
}

form.addEventListener('submit', () => {
    const nameOfItem = inputValue.value;
    if (nameOfItem === '' || nameOfItem === ' ') {
        warning.innerHTML = 'please insert valid value';
        warning.classList.add('showWarning');
        setTimeout(() => {
            warning.classList.remove('showWarning')
        }, 3000);
    } else {
        todoList.push(nameOfItem);
        listValue(todoList)
    }
    inputValue.value = '';
})

clear.addEventListener('click', () => {
    todoList = [];
    listValue(todoList);
})
// const alertMessage = document.querySelector('.alert')
// const form = document.querySelector('#form');
// const inputItem = document.querySelector('#inputItem');
// const lists = document.querySelector('#myUl');
// const clear = document.querySelector('#clear-items');

// let todoList = [];

// const editDelete = item => {
//     const list = lists.querySelectorAll('li');

//     list.forEach(listItem => {
//         if (listItem.querySelector('.item-name').textContent === item) {
//             listItem.querySelector('.item-name').addEventListener('click', function() {
//                 listItem.querySelector('.item-name').classList.toggle('checked');
//             })

//             listItem.querySelector('.edit').addEventListener('click', () => {
//                 inputItem.value = item;
//                 lists.removeChild(listItem);

//                 todoList = todoList.filter(listItem => {
//                     return listItem !== item;
//                 })
//             })

//             listItem.querySelector('.delete').addEventListener('click', () => {
//                 lists.removeChild(listItem);

//                 todoList = todoList.filter(listItem => {
//                     return listItem !== item;
//                 })
//             })
//         } 
//     });
// }

// const getList = todoList => {
//     lists.innerHTML = '';

//     todoList.forEach(item => {
//         lists.insertAdjacentHTML('beforeend', `<li class="item"> <p class="item-name">${item}</p>
//         <span class="item-icons">
//             <a href="#" class="edit"><i class="far fa-edit"></i></a>
//             <a href="#" class="delete"><i class="far fa-times-circle"></i></a>
//         </span>
//     </li>`)

//     editDelete(item);
//     });
// }


// form.addEventListener('submit', e => {
//     e.preventDefault();

//     const itemName = inputItem.value;
//     if (itemName === '' || itemName === ' ') {
//         alertMessage.innerHTML = 'Please Insert A Valid Value';
//         alertMessage.classList.add('showItem');
//         setTimeout(() => {
//             alertMessage.classList.remove('showItem');
//         }, 3000);
//     } else {
//         todoList.push(itemName);
//         getList(todoList)
//     }
//     inputItem.value = ''; 
// })

// clear.addEventListener('click', () => {
//     todoList = [];
//     getList(todoList)
// })