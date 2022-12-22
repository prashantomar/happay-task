export const getRandomColor = () =>  `#${Math.floor(Math.random()*16777215).toString(16)}`; 
export const changeNameToCaps = (e) => e.split(' ').map(string => `${string[0].toUpperCase()}${string.substring(1)}` ).join(' ');
export const formatToUSD = (e) => e.toLocaleString("en-US", {style:"currency", currency:"USD"})