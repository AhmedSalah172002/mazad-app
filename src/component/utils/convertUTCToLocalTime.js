import moment from 'moment'

export const convertUTCToLocalTime = (utcTime) => {
    if (utcTime) {
        return moment.utc(utcTime, 'HH:mm:ss').local().format('hh:mm A')
    }
    return ''
}

export const convertTimeTo12Hours = (utcTime) => {
    if (utcTime) {
        return moment.utc(utcTime, 'HH:mm:ss').format('hh:mm A')
    }
    return ''
}

export const convertUTCToLocalTime24Hours = (utcTime) => {
    if (utcTime) {
        return moment.utc(utcTime, 'HH:mm:ss').local().format('HH:mm:ss')
    }
    return ''
}

export const convertLocalToUTCTime = (utcTime) => {
    if (utcTime) {
        return moment(utcTime, 'HH:mm:ss').utc().format('HH:mm:ss')
    }
    return ''
}

export const convertToArabicDate = (dateString)=> {

    const arabicMonths = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const arabicDate = `${day} ${arabicMonths[month]} ${year}`;

    return arabicDate;
}


