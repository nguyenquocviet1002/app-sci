export const formatDate = (date) => {
    if (date) {
        const newDate = new Date(date);
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    }
    return "";
};