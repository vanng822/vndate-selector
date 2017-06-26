import {
    monthShortNames,
    getMonthDates
} from './utils';

class DateGenerator {

    constructor(options) {
        this.yearRange = options && options.yearRange? options.yearRange: 9;
    }

    currentYears(year) {
        let res = [];
        let start = year - parseInt(this.yearRange/2);
        let end = start + this.yearRange;
        if (end > 2041) {
            end = 2041;
            start = end-this.yearRange;
        }
        for (var i = start; i < end; i++) {
            res.push(i)
        }
        return res;
    }

    previousYears(year) {
        let res = [];
        let start = year;
        let end = year-this.yearRange;
        if (end < 1800) {
            end = 1800;
            start = end + this.yearRange;
        }
        for (var i = start; i > end; i--) {
            res.push(i)
        }
        return res;
    }

    nextYears(year) {
        let res = [];
        let start = year;
        let end = year + this.yearRange;
        if (end > 2040) {
            end = 2040;
            start = end-this.yearRange;
        }
        for (var i = start; i < end; i++) {
            res.push(i)
        }
        return res;
    }

    months() {
        return monthShortNames;
    }

    dates(year, month) {
        return getMonthDates(year, month)
    }
}

export {
    DateGenerator
}
