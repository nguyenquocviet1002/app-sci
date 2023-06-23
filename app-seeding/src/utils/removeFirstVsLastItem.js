export function removeFirstVsLastItem(data) {
    try {
        const dataFinal = [];
        for (let i = 1; i < data.data.data.length - 1; i++) {
            dataFinal.push(data.data.data[i]);
        }
        return dataFinal
    } catch (error) {
        return [];
    }
}