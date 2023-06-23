export function removeFirstItem(data) {
    try {
        const dataFinal = [];
        for (let i = 1; i < data.data.data.length; i++) {
            dataFinal.push(data.data.data[i]);
        }
        return dataFinal
    } catch (error) {
        return [];
    }
}