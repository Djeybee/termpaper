export const log = function log(str: String) {
    let d = new Date();

    console.log("(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")", str);
};

export const nFormatter = function (num: number): string {
    if (Math.abs(num) >= 1000) {
        let numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0});

        return numberFormatter.format(num / 1000000);
    }

    return num.toString();
};