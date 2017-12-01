const db = require('../get_db')
const parsed = require('../parser')

const uks = []

parsed.root.children.map((obj) => {
    let uk = {}
    obj.children.map((cell) => {
        const getContent = () => cell.children[0].content
        switch (cell.attributes.name) {
            case 'Телефон': uk.phone = getContent(); break
            case 'ФИО руководителя':
                uk.directorFName = getContent().split(' ')[0]
                uk.directorLName = getContent().split(' ')[2]
                break
            case 'Электронная почта': uk.directorEmail = getContent(); break
            case 'Наименование организации': uk.title = getContent(); break
        }
    })
    uk._cat = "uk"
    uks.push(uk)
})

db.insert(uks, (err, docs) => {
    console.log(docs)
})