
export const stripPunctuation = (str) => {
    return str.replace(/[^\w\s]/g, '');
};