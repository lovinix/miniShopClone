async function loadData() {
    return fetch('data/data.json')
        .then(response => response.json())
}

async function makeFilterList(filters) {
    const container = document.getElementById('filters')
    container.innerHTML = filters.map(filter => createFilterHTML(filter)).join('')
}

function createFilterHTML(filter) {
    const filterName = Object.keys(filter)[0]
    const filterValue = filter[filterName]

    if (filterName === 'type') {
        const imgPath = `../imgs/blue_${filterValue[0]}.png`
        return (
            `<button class="buttons filterBtn"><img src="${imgPath}" alt="${filterValue}" class="filterImg"  data-key="type" data-value="${filterValue}"/></button>`
        )
    }
    if (filterName === 'color') {
        return (
            `<button class="buttons filterBtn filterColor ${filterValue}" data-key="color" data-value="${filterValue.toLowerCase()}">${filterValue}</button>`
        )
    }

}

async function makeItemList(items) {
    const container = document.getElementById('items')
    container.innerHTML = items.map(item => createItemHTML(item)).join('')
}

function createItemHTML(item) {
    const {type, gender, size, color, img} = item
    return (`
        <li class="item">
            <img src="${img}" alt="itemImage" class="itemThumbnail"/>
            <span class="itemDescription">${gender}, ${size} size</span>
        </li>
    
    `)
}

function onFilterClick(event, items) {
    const key = event.target.dataset.key
    const value = event.target.dataset.value
    makeItemList(items.filter((item) => {
        return item[key] === value
    })).catch(console.log)
}

async function handleUI() {
    const json = await loadData()
    const {items, filters} = json

    await makeFilterList(filters).catch(console.log)
    await makeItemList(items).catch(console.log)

    const logo = document.querySelector('.logo')
    logo.addEventListener('click', () => {
        makeItemList(items)
    })

    const filterBtns = document.getElementsByClassName('filterBtn')
    for (let filter of filterBtns) {
        filter.addEventListener('click', (event) => {
            onFilterClick(event, items)
        })
    }
}


handleUI().catch(console.log)