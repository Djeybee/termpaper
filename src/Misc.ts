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

export const median = function (values: number[]) {
    values.sort(function (a, b) {
        return a - b;
    });

    if (values.length === 0) return 0;

    let half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return (values[half - 1] + values[half]) / 2.0;
}

export const average = function (values: number[]) {
    let sum = 0;
    let avg = 0;

    if (values.length) {
        sum = values.reduce(function (a, b) {
            return a + b;
        });

        console.log('sum = ', sum, "number of companies = ", values.length);

        avg = sum / values.length;
    }

    return avg;
}