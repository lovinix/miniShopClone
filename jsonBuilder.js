const TYPE = ["tshirt", "pants", "skirt"]
const GENDER = ["male", "female"]
const SIZE = ["small", "medium", "large"]
const COLOR = ["blue", "yellow", "pink"]

const attributes = [TYPE, GENDER, SIZE, COLOR]

let items = []

TYPE.forEach(type =>
    GENDER.forEach(gender =>
        SIZE.forEach(size =>
            COLOR.forEach(color => {
                    items.push({type, gender, size, color, "img": `../imgs/${color}_${type[0]}.png`})
                }
            )
        )
    )
)

let filters = []
TYPE.forEach(type => filters.push({type}))
COLOR.forEach(color => {
    color = color[0].toUpperCase() + color.substring(1);
    filters.push({color})
})

const outputData = {items, filters}

const fs = require('fs')
const filePath = "./data/data.json"
fs.writeFile(filePath, JSON.stringify(outputData), () => {
})