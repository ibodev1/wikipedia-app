import axios from "axios";

const config = {
    headers: {
        Accept:
            'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Summary/1.4.2"',
        "Content-Type":
            'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Summary/1.4.2"',
        "Accept-Language": "en-US",
    }
};

export const getData = async (param) => {
    try {
        const newParam = encodeURIComponent(param);
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${newParam}?redirect=true`;
        const res = await axios.get(url);
        return res;
    } catch (err) {
        console.error(err);
    }
};


export const getSearchList = async (param) => {
    try {
        const newParam = encodeURIComponent(param);
        const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&origin=*&search=${newParam}&limit=10`;
        const res = await axios.get(url, config);
        return res.data[1];
    } catch (err) {
        console.error(err);
    }
};