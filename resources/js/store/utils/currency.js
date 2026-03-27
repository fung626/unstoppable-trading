export const isDecimal = function(value) {
    return /^-?(?:0|0\.\d*|[1-9]\d*\.?\d*)$/.test(value);
};

export const unmask = function(value, ds = ",") {
    return value.replace(ds, ".");
};

export const mask = function(
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
