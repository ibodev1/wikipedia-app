import axios from "axios";

const config = {
    headers: {
        Accept:
            'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Summary/1.4.2"',
        "Content-Type":
            'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Summary/1.4.2"',
        "Accept-Language": "tr-TR",
    }
};

export const getData = async (param) => {
    try {
        const newParam = encodeURIComponent(param);
        const url = `https://tr.wikipedia.org/api/rest_v1/page/summary/${newParam}?redirect=true`;
        const res = await axios.get(url);
        return res;
    } catch (err) {
        console.error(err);
    }
};


export const getSearchList = async (param) => {
    try {
        const newParam = encodeURIComponent(param);
        const url = `https://tr.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&origin=*&search=${newParam}&limit=40`;
        const res = await axios.get(url, config);
        return res.data[1];
    } catch (err) {
        console.error(err);
    }
};

// getSearchList("tür").then((res) => {
//     console.log(res);
//     res.forEach((element) => {
//         getData(element).then((res) => {
//             console.log("-----------------------");
//             console.log(res.data.title);
//             console.log(res.data.extract);
//             console.log(
//                 new Date(res.data.timestamp).toLocaleDateString("tr-TR", {
//                     weekday: "long",
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric"
//                 })
//             );
//             console.log("-----------------------");
//         });
//     });
// });