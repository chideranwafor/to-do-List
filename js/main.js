const clock = document.querySelector('#clock')
const form = document.querySelector('#form');
const inputValue = document.querySelector('#inputItem');
const warning = document.querySelector('.alert');
const clear = document.querySelector('#clear-items');
const listContainer = document.querySelector('#myUl');

const addZero = (i) => {
    if (i < 10) {
        i = '0' + i;
    }
    return i
}

const showCurrentTime = setInterval(() => {
    const currentTime = new Date();
    let hours = addZero(currentTime.getHours());
    let minutes = addZero(currentTime.getMinutes());

    const time = `${hours}:${minutes}`;

    clock.innerHTML = time;
}, 1000);

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

            const hourSection = () => {
                let hour = singleList.querySelector('.hour');

                for (let h = 0; h < 23; h++) {
                    hour.options[hour.options.length] = new Option(h < 10 ? '0' + h : h, h);
                }
            }
            hourSection();

            const minuteSection = () => {
                let minute = singleList.querySelector('.minute');

                for (let m = 0; m < 60; m++) {
                    minute.options[minute.options.length] = new Option(m < 10 ? '0' + m : m, m);
                }
            }
            minuteSection();

            singleList.querySelector('.reminderButton').addEventListener('click', (e) => {
                e.preventDefault();

                let hour = document.querySelector('.hour');
                let minute = document.querySelector('.minute');

                let hourSelected = hour.options[hour.selectedIndex].value;
                let minuteSelected = minute.options[minute.selectedIndex].value;

                let reminderTime = `${hourSelected}:${minuteSelected}`;

                const displayedReminderTime = () => {
                    const currentDate = new Date();
                    let hours = addZero(currentDate.getHours());
                    let minutes = addZero(currentDate.getMinutes());

                    const time = `${hours}:${minutes}`;

                    if (reminderTime === time) {
                        alert('REMINDER: ' + nameOfItem);
                    }
                }

                setInterval(displayedReminderTime, 1000);
            })
        }
    })
}

const listValue = todoList => {
    listContainer.innerHTML = '';

    todoList.forEach(item => {
        listContainer.insertAdjacentHTML('beforeend', `<li class="item"> <p class="item-name">${item}</p>
        <label>
            <select class="hour"></select>
            <select class="minute"></select>
            <button type="button" class="reminderButton">SET</button>
        </label>
            <span class="item-icons">
                <a href="#" class="edit"><i class="far fa-edit"></i></a>
                <a href="#" class="delete"><i class="far fa-times-circle"></i></a>
            </span>
        </li>`)

        editDelete(item);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

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