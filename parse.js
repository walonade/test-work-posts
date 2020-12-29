const parseCall = callString => {
    const splitString = callString.split(" ")
    const slicer = (string, start, end) => string.slice(start, end)
    const duration = +slicer(splitString[0], 0, 2) * 60 + +slicer(splitString[0], 2, 4)
    const parseDate = input => {
        const month = slicer(input, 0, 2)
        const day = slicer(input, 2, 4)
        const year = slicer(input, 4, 8)
        return new Date(year, month, day);
    }
    const startDate = parseDate(splitString[1])
    const accessCode = +splitString[2]
    const dialedNumber = splitString[3]
    const chargedNumber = splitString[4]
    const timeInQueue = +splitString[5]
    return {
        duration, /* number of seconds */
        startDate, /* Js Date */
        accessCode, /* number */
        dialedNumber, /* string */
        chargedNumber, /* string */
        timeInQueue /* number */
    }
}
const result = parseCall("0506 06132020 9 474000 257257 10")
console.log(result)

// 0-1: Длительность в минутах
// 2-3: Длительность в секундах
// 5-6: Начало звонка (месяц)
// 7-8: Начало звонка (день)
// 9-12: Начало звонка (год)
// 14: Код доступа
// 16-21: Набранный номер
// 23-28: Номер звонящего
// 30-31: Время ожидания в очереди
