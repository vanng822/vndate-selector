import {
    convertSolar2Lunar,
    convertLunar2Solar
} from 'amlich';


// Swedish way of presenting
const weekDayOrder = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
Object.freeze(weekDayOrder);

const weekDayFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Object.freeze(weekDayFull);

function getWeekDayFull(date) {
    return weekDayFull[date.getDay()];
}

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
Object.freeze(monthNames);

const monthShortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
Object.freeze(monthShortNames);

// mapping javascript weekday
const weekDayMap = {
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
    Su: 0
};

Object.freeze(weekDayMap);

var LunarDate = function(year, month, day, isLeap) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.isLeap = isLeap;
}

LunarDate.prototype = {
    dateString: function(addMonth) {
        if (this.day === 1 || addMonth) {
            return this.day + '/' + this.month;
        }
        return '' + this.day;
    },
    toString: function() {
        return this.year + '-' + paddString(this.month) + '-' + paddString(this.day);
    },
    toLocaleString: function() {
        return this.day + '/' + this.month + '/' + this.year;
    }
}

function getLunarDate(solarDate) {
    var converted = convertSolar2Lunar(solarDate.getDate(), solarDate.getMonth() + 1, solarDate.getFullYear(), 7)
    return new LunarDate(converted[2], converted[1], converted[0], converted[3])
}

function getSolarDate(lunarDate) {
    var converted = convertLunar2Solar(
        lunarDate.day,
        lunarDate.month,
        lunarDate.year,
        lunarDate.isLeap? 1: 0,
        7.0
    );
    return new Date(converted[2], converted[1] - 1, converted[0], 12);
}

function addDays(date, days) {
    var t = new Date(date);
    t.setDate(date.getDate() + days);
    return t;
}

function getLunarDateFromString(dateString) {
    var res = /(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    if (res.length === 4) {
        return new LunarDate(parseInt(res[1]), parseInt(res[2]), parseInt(res[3]))
    }
    return null
}


var paddString = function(digits) {
    if (digits > 9) {
        return '' + digits;
    }
    return '0' + digits;
}

function LunarSolarDate(lunar, solar) {
    this.lunar = lunar;
    this.solar = solar;
}

LunarSolarDate.prototype = {
    lunarString: function() {
        return this.lunar.toString();
    },
    lunarLocaleString: function() {
        return this.lunar.toLocaleString();
    },
    solarString: function() {
        var year = this.solar.getFullYear();
        var month = this.solar.getMonth() + 1;
        var day = this.solar.getDate();
        return year + '-' + paddString(month) + '-' + paddString(day);
    },
    solarLocaleString: function() {
        return formatDateLocale(this.solar);
    },
    nextDate: function() {
        let solar = addDays(this.solar, 1);
        let lunar = getLunarDate(solar);
        return new LunarSolarDate(lunar, solar);
    }
}

function getMonthDates(year, month) {
    var res = [];
    var s;
    var t = new Date(year, month, 1, 12);
    res.push(new LunarSolarDate(getLunarDate(t), t))
    for (var i = 1; i < 31; i++) {
        s = addDays(t, i)
        if (s.getMonth() !== month) {
            break;
        }
        res.push(new LunarSolarDate(getLunarDate(s), s))
    }
    return res;
}

export {
	getMonthDates,
    getLunarDate,
	getSolarDate,
    monthNames,
    monthShortNames
}
