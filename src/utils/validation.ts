const isEmpty = (item: string) => {
    return item.length === 0;
};

const emptyText = (name: string) => {
    return `${name} cannot be empty`;
};

const overCustomLength = (item: string, length: number) => {
    return item.length > length;
};

const overLengthText = (name: string, length: number) => {
    return `${name} cannot be over ${length} characters`;
};

const mustEqualLength = (item: string, length: number) => {
    return item.length === length;
};

const mustEqualText = (name: string, length: number) => {
    return `${name} must equal ${length} characters`;
};

const lessThanNumber = (num: number, numLength: number) => {
    return num < numLength;
};

const lessNumText = (name: string, length: number) => {
    return `${name} cannot be less than ${length}`;
};

const moreThanNumber = (num: number, numLength: number) => {
    return num > numLength;
};

const moreThanText = (name: string, length: number) => {
    return `${name} cannot be more than ${length}`;
};

// advanced validate
const stringRequiredValidate = (item: string, length: number) => {
    return isEmpty(item) || overCustomLength(item, length);
};

const stringRequiredTextValidate = (
    item: string,
    name: string,
    length: number
) => {
    return isEmpty(item)
        ? emptyText(name)
        : overCustomLength(item, length)
        ? overLengthText(name, length)
        : '';
};

const validate = {
    isEmpty,
    overCustomLength,
    mustEqualLength,
    lessThanNumber,
    moreThanNumber,
    overLengthText,
    mustEqualText,
    lessNumText,
    moreThanText,
    emptyText,
    stringRequiredValidate,
    stringRequiredTextValidate
};

export default validate;
