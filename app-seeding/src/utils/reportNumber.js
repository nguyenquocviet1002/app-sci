import { formatDate } from "./formatDate";
import { getBookingFn } from "@/api/booking";
import { getFormFn } from "@/api/form";
import { getReportBookingFn, getReportBrandFn, getReportFn } from "@/api/report";

export const removeAccents = (str) => {
    const string = str || "";
    return string
        .normalize("NFD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};

const searchByName = (data, input) => {
    return input === ""
        ? data
        : data.filter(
            (item) =>
                removeAccents(item.group_service).search(removeAccents(input)) !== -1
        );
};

export const getNumberBrand = async (startDate, endDate, token, user) => {
    try {
        const dataForm = await getFormFn({
            token: token,
            brand_id: '',
            type: 'seeding',
            limit: 0,
            offset: 0,
            company_id: '',
            name_fb: '',
            phone: '',
            service: '',
            name: '',
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user_seeding: user
        })

        const dataBooking = await getBookingFn({
            token: token,
            type: 'opportunity',
            check: '',
            limit: 0,
            offset: 0,
            name: '',
            phone: '',
            code: '',
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user_seeding: user
        })

        let formKN = 0;
        let formPR = 0;
        let formDA = 0;
        let formHH = 0;
        for (let i = 1; i < dataForm.data.data.length; i++) {
            if (dataForm.data.data[i].brand === "KN") {
                formKN++;
            }
            if (dataForm.data.data[i].brand === "PR") {
                formPR++;
            }
            if (dataForm.data.data[i].brand === "DA") {
                formDA++;
            }
            if (dataForm.data.data[i].brand === "HH") {
                formHH++;
            }
        }

        let bookingKN = 0;
        let bookingPR = 0;
        let bookingDA = 0;
        let bookingHH = 0;
        for (let i = 1; i < dataBooking.data.data.length; i++) {
            if (dataBooking.data.data[i].brand === "Kangnam") {
                bookingKN++;
            }
            if (dataBooking.data.data[i].brand === "Paris") {
                bookingPR++;
            }
            if (dataBooking.data.data[i].brand === "Đông Á") {
                bookingDA++;
            }
            if (dataBooking.data.data[i].brand === "Hồng Hà") {
                bookingHH++;
            }
        }

        return [
            {
                name: "Kangnam",
                form: formKN,
                booking: bookingKN
            },
            {
                name: "Paris",
                form: formPR,
                booking: bookingPR
            },
            {
                name: "Đông Á",
                form: formDA,
                booking: bookingDA
            },
            {
                name: "Hồng Hà",
                form: formHH,
                booking: bookingHH
            }
        ];
    } catch (error) {
        return { message: error };
    }
};

export const getNumberByDate = async (startDate, endDate, token, user, steps = 1) => {
    try {
        const dataForm = await getFormFn({
            token: token,
            brand_id: '',
            type: 'seeding',
            limit: 0,
            offset: 0,
            company_id: '',
            name_fb: '',
            phone: '',
            service: '',
            name: '',
            start_date: '',
            end_date: '',
            user_seeding: user
        })

        const dataBooking = await getBookingFn({
            token: token,
            type: 'opportunity',
            check: '',
            limit: 0,
            offset: 0,
            name: '',
            phone: '',
            code: '',
            start_date: '',
            end_date: '',
            user_seeding: user
        })

        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dateArray.push(new Date(currentDate));
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        const dayArr = [];
        const arrForm = [];
        const arrBooking = [];
        dateArray.forEach((item) => {
            dayArr.push(`${new Date(item).getDate()}/${new Date(item).getMonth() + 1}`);
            const dateArrForm = [];
            for (let i = 1; i < dataForm.data.data.length; i++) {
                if (
                    new Date(dataForm.data.data[i].create_date).toDateString() ===
                    new Date(item).toDateString()
                ) {
                    dateArrForm.push(dataForm.data.data[i]);
                }
            }
            arrForm.push(dateArrForm.length);

            const dateArrBooking = [];
            for (let i = 1; i < dataBooking.data.data.length - 1; i++) {
                if (
                    new Date(dataBooking.data.data[i].create_date).toDateString() ===
                    new Date(item).toDateString()
                ) {
                    dateArrBooking.push(dataBooking.data.data[i]);
                }
            }
            arrBooking.push(dateArrBooking.length);
        });
        return { labels: dayArr, form: arrForm, booking: arrBooking };
    } catch (error) {
        return { message: error };
    }
};

export const getNumberByYear = async (startDate, endDate, token, user) => {
    try {
        const dataForm = await getFormFn({
            token: token,
            brand_id: '',
            type: 'seeding',
            limit: 0,
            offset: 0,
            company_id: '',
            name_fb: '',
            phone: '',
            service: '',
            name: '',
            start_date: '',
            end_date: '',
            user_seeding: user
        })

        const dataBooking = await getBookingFn({
            token: token,
            type: 'opportunity',
            check: '',
            limit: 0,
            offset: 0,
            name: '',
            phone: '',
            code: '',
            start_date: '',
            end_date: '',
            user_seeding: user
        })

        const labelArr = [];
        const dateArray = [];
        let currentDate = new Date(startDate);
        for (
            let i = currentDate.getMonth() + 1;
            i <= new Date(endDate).getMonth() + 1;
            i++
        ) {
            dateArray.push(i);
            labelArr.push("Tháng " + i);
        }

        const arrForm = [];
        const arrBooking = [];
        dateArray.forEach((item) => {
            const dateArrForm = [];
            for (let i = 1; i < dataForm.data.data.length; i++) {
                if (new Date(dataForm.data.data[i].create_date).getMonth() + 1 === item) {
                    dateArrForm.push(dataForm.data.data[i]);
                }
            }
            arrForm.push(dateArrForm.length);

            const dateArrBooking = [];
            for (let i = 1; i < dataBooking.data.data.length - 1; i++) {
                if (new Date(dataBooking.data.data[i].create_date).getMonth() + 1 === item) {
                    dateArrBooking.push(dataBooking.data.data[i]);
                }
            }
            arrBooking.push(dateArrBooking.length);
        });
        return { labels: labelArr, form: arrForm, booking: arrBooking };
    } catch (error) {
        return { message: error };
    }
};

export const getSuccessByBrand = async (startDate, endDate, token, user) => {
    try {
        const data = await getReportBookingFn({
            token: token,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user: user
        })

        data.data.data.pop();

        const all = [];
        const kn = [];
        const pr = [];
        const da = [];
        const hh = [];
        const labels = [];
        for (let i = 0; i < data.data.data.length; i++) {
            all.push(data.data.data[i].sl_ngay);
            kn.push(data.data.data[i].kn);
            pr.push(data.data.data[i].pr);
            da.push(data.data.data[i].da);
            hh.push(data.data.data[i].hh);
            labels.push(
                `${new Date(data.data.data[i].date).getDate()}/${new Date(data.data.data[i].date).getMonth() + 1
                }`
            );
        }
        return { all, kn, pr, da, hh, labels };
    } catch (error) {
        return { message: error };
    }
};

export const getSuccessBrandYear = async (startDate, endDate, token, user) => {
    try {
        const data = await getReportBookingFn({
            token: token,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user: user
        })

        data.data.data.pop();

        const labels = [];
        const dateArray = [];
        let currentDate = new Date(startDate);
        for (
            let i = currentDate.getMonth() + 1;
            i <= new Date(endDate).getMonth() + 1;
            i++
        ) {
            dateArray.push(i);
            labels.push("Tháng " + i);
        }
        const all = [];
        const da = [];
        const hh = [];
        const kn = [];
        const pr = [];
        dateArray.forEach((item) => {
            let ALL = 0;
            let DA = 0;
            let HH = 0;
            let KN = 0;
            let PR = 0;
            for (let i = 0; i < data.data.data.length; i++) {
                if (new Date(data.data.data[i].date).getMonth() + 1 === item) {
                    ALL += data.data.data[i].sl_ngay;
                    DA += data.data.data[i].da;
                    HH += data.data.data[i].hh;
                    KN += data.data.data[i].kn;
                    PR += data.data.data[i].pr;
                }
            }
            all.push(ALL);
            da.push(DA);
            hh.push(HH);
            kn.push(KN);
            pr.push(PR);
        });

        return { all, kn, pr, da, hh, labels };
    } catch (error) {
        return { message: error };
    }
};

export const getCustomerSuccess = async (search, filter, startDate, endDate, token, user) => {
    try {
        const data = await getReportFn({
            token: token,
            brand_id: filter,
            group_service: "PR000003, PRP00002, PR000005, PR000006, PR000007, PRP00004, PRP00006, PRP00007, DAP00010, DAP00007, DAP00014, DAP00005, DAP00017, DAP00015, DAP00011, DAP00012, DAPL0002, DAPL0003, DAP00008, KNP00001, KNP00002, KNP00003, KNP00004, KNP00005, KNP00006, KNP00007, KNP00008, KNP00009, KNP00010, KNP00011, KNP00013, KNPL0027, HP011, HP013, HP002, HP014, HP005, HP007, HP012, HP018, HP008, HP030, HP031, HP032, KN00S046, PRP00005",
            limit: 0,
            offset: 0,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user_seeding: user
        })

        data.data.data.pop();
        const renderData = searchByName(data.data.data, search);
        return {
            error: data.data.error,
            message: data.data.message,
            tong_tien: renderData.sort((a, b) => b.tong_tien - a.tong_tien),
            so_luong: renderData.sort((a, b) => b.so_luong - a.so_luong)
        };
    } catch (error) {
        return { message: error };
    }
};

export const getRevenue = async (startDate, endDate, token, user) => {
    try {
        const data = await getReportBrandFn({
            token: token,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user: user
        })
        data.data.data.pop();
        const all = [];
        const kn = [];
        const pr = [];
        const da = [];
        const hh = [];
        const date = [];
        for (let i = 0; i < data.data.data.length; i++) {
            all.push(data.data.data[i].tong_tien_all_day);
            kn.push(data.data.data[i].tong_tien_KN);
            pr.push(data.data.data[i].tong_tien_PR);
            da.push(data.data.data[i].tong_tien_DA);
            hh.push(data.data.data[i].tong_tien_HN);
            date.push(`${new Date(data.data.data[i].date).getDate()}/${new Date(data.data.data[i].date).getMonth() + 1}`);
        }
        return { all: all, kn: kn, pr: pr, da: da, hh: hh, labels: date }
    } catch (error) {
        return { message: error };
    }
};

export const getRevenueByYear = async (startDate, endDate, token, user) => {
    try {
        const data = await getReportBrandFn({
            token: token,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            user: user
        })
        data.data.data.pop();

        const labelArr = [];
        const dateArray = [];
        let currentDate = new Date(startDate);
        for (
            let i = currentDate.getMonth() + 1;
            i <= new Date(endDate).getMonth() + 1;
            i++
        ) {
            dateArray.push(i);
            labelArr.push("Tháng " + i);
        }
        const arrAll = [];
        const arrDA = [];
        const arrHH = [];
        const arrKN = [];
        const arrPR = [];
        dateArray.forEach((item) => {
            let all = 0;
            let da = 0;
            let hh = 0;
            let kn = 0;
            let pr = 0;
            for (let i = 0; i < data.data.data.length; i++) {
                if (new Date(data.data.data[i].date).getMonth() + 1 === item) {
                    all += data.data.data[i].tong_tien_all_day;
                    da += data.data.data[i].tong_tien_DA;
                    hh += data.data.data[i].tong_tien_HN;
                    kn += data.data.data[i].tong_tien_KN;
                    pr += data.data.data[i].tong_tien_PR;
                }
            }
            arrAll.push(all);
            arrDA.push(da);
            arrHH.push(hh);
            arrKN.push(kn);
            arrPR.push(pr);
        });

        return {
            labels: labelArr, all: arrAll, da: arrDA, hh: arrHH, kn: arrKN, pr: arrPR
        };
    } catch (error) {
        return { message: error };
    }
};