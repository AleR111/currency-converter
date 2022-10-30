export const fixNumber = (value: string | number, amount: number = 3) => {
    return +(+value).toFixed(amount);
};
