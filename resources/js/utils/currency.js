export const isDecimal = function (value) {
    return /^-?(?:0|0\.\d*|[1-9]\d*\.?\d*)$/.test(value);
};

export const format = function (value, defaultDecimal = 2, symbol = true) {
    value = value * 1;
    if (isNaN(value)) {
        value = 0;
    }
    const count = numberOfDecimals(value);
    const places = count > defaultDecimal ? count : defaultDecimal;
    return (
        (symbol ? " $ " : "") +
        value.toFixed(places).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
};

export const numberOfDecimals = function (value) {
    if (parseInt(value) === value) {
        return 0;
    } else if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    let count = 0;
    while (value !== Math.round(value, count)) {
        count++;
    }
    return count;
};

export const unmask = function (value, ds = ",") {
    return value.replace(ds, ".");
};

export const mask = function (
    value,
    dp = -1,
    editing = false,
    ds = ",",
    gs = "."
) {
    if (editing || !isDecimal(value)) {
        return value.replace(".", ds);
    }

    const parts = value.split(/\./);

    let dec = parts[1] || "";

    if (dp >= 0) {
        dec = dec.length < dp ? dec.padEnd(dp, "0") : dec.substr(0, dp);
    }

    if (dec) {
        dec = ds + dec;
    }

    return parts[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + gs) + dec;
};
