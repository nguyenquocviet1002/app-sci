import { getBookingFn } from "@/api/booking";
import { getFormFn } from "@/api/form";

export const formatDate = (date) => {
    if (date) {
        const newDate = new Date(date);
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1
            }-${newDate.getDate()}`;
    }
    return "";
};

export const getNumberByDate = (startDate, endDate, dataForm, dataBooking) => {
    let steps = 1;
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate));
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    const dayArr = [];
    const arrLead = [];
    const arrBooking = [];
    dateArray.forEach((item) => {
        dayArr.push(`${new Date(item).getDate()}/${new Date(item).getMonth() + 1}`);
        const dateArrLead = [];
        for (let i = 1; i < dataForm.data.data.length; i++) {
            if (new Date(dataForm.data.data[i].create_date).toDateString() === new Date(item).toDateString()) {
                dateArrLead.push(dataForm.data.data[i]);
            }
        }
        arrLead.push(dateArrLead.length);

        const dateArrBooking = [];
        for (let i = 1; i < dataBooking.data.data.length - 1; i++) {
            if (new Date(dataBooking.data.data[i].create_date).toDateString() === new Date(item).toDateString()) {
                dateArrBooking.push(dataBooking.data.data[i]);
            }
        }
        arrBooking.push(dateArrBooking.length);
    });
    return { labels: dayArr, lead: arrLead, booking: arrBooking };
};

export const getNumberByYear = (startDate, endDate, dataForm, dataBooking) => {
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

    const arrLead = [];
    const arrBooking = [];
    dateArray.forEach((item) => {
        const dateArrLead = [];
        for (let i = 1; i < dataForm.data.data.length; i++) {
            if (new Date(dataForm.data.data[i].create_date).getMonth() + 1 === item) {
                dateArrLead.push(dataForm.data.data[i]);
            }
        }
        arrLead.push(dateArrLead.length);

        const dateArrBooking = [];
        for (let i = 1; i < dataBooking.data.data.length - 1; i++) {
            if (new Date(dataBooking.data.data[i].create_date).getMonth() + 1 === item) {
                dateArrBooking.push(dataBooking.data.data[i]);
            }
        }
        arrBooking.push(dateArrBooking.length);
    });
    return { labels: labelArr, lead: arrLead, booking: arrBooking };
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
            user_seeding: user,
        })

        const dataBooking = await getBookingFn({
            token: token,
            type: 'opportunity',
            check: 'seeding',
            limit: '',
            offset: '',
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            name: '',
            phone: '',
            code: '',
            user_seeding: user,
        })

        let leadKN = 0;
        let leadPR = 0;
        let leadDA = 0;
        let leadHH = 0;
        for (let i = 1; i < dataForm.data.data.length; i++) {
            if (dataForm.data.data[i].brand === "KN") {
                leadKN++;
            }
            if (dataForm.data.data[i].brand === "PR") {
                leadPR++;
            }
            if (dataForm.data.data[i].brand === "DA") {
                leadDA++;
            }
            if (dataForm.data.data[i].brand === "HH") {
                leadHH++;
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
                lead: leadKN,
                booking: bookingKN
            },
            {
                name: "Paris",
                lead: leadPR,
                booking: bookingPR
            },
            {
                name: "Đông Á",
                lead: leadDA,
                booking: bookingDA
            },
            {
                name: "Hồng Hà",
                lead: leadHH,
                booking: bookingHH
            }

        ];
    } catch (error) {
        return [];
    }
};
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

export const getCustomerSuccess = async (
    search,
    filter,
    startDate,
    endDate,
    token, user
) => {
    try {

        const response =
            await fetch(`https://scigroup.com.vn/cp/seeding/api/get-report?
      token=${token}&
      brand_id=${filter}&
      group_service="PR000003, PRP00002, PR000005, PR000006, PR000007, PRP00004, PRP00006, PRP00007, DAP00010, DAP00007, DAP00014, DAP00005, DAP00017, DAP00015, DAP00011, DAP00012, DAPL0002, DAPL0003, DAP00008, KNP00001, KNP00002, KNP00003, KNP00004, KNP00005, KNP00006, KNP00007, KNP00008, KNP00009, KNP00010, KNP00011, KNP00013, KNPL0027, HP011, HP013, HP002, HP014, HP005, HP007, HP012, HP018, HP008, HP030, HP031, HP032, KN00S046, PRP00005"&
      limit=&
      offset=&
      start_date=${formatDate(startDate)}&
      end_date=${formatDate(endDate)}&
      user_seeding=${user}`);
        const data = await response.json();
        data.data.pop();
        const renderData = searchByName(data.data, search);
        return {
            error: data.error,
            message: data.message,
            tong_tien: renderData.sort((a, b) => b.tong_tien - a.tong_tien),
            so_luong: renderData.sort((a, b) => b.so_luong - a.so_luong)
        };
    } catch (error) {
        return { message: error };
    }
};

export const getSuccessByBrand = async (startDate, endDate, token, user) => {
    const response =
        await fetch(`https://scigroup.com.vn/cp/seeding/api/get-report-booking?
  token=${token}&
  start_date=${formatDate(startDate)}&
  end_date=${formatDate(endDate)}&
  user_seeding=${user}`);
    const data = await response.json();
    data.data.pop();

    const all = [];
    const kn = [];
    const pr = [];
    const da = [];
    const hh = [];
    const date = [];
    for (let i = 0; i < data.data.length; i++) {
        all.push(data.data[i].sl_ngay);
        kn.push(data.data[i].kn);
        pr.push(data.data[i].pr);
        da.push(data.data[i].da);
        hh.push(data.data[i].hh);
        date.push(
            `${new Date(data.data[i].date).getDate()}/${new Date(data.data[i].date).getMonth() + 1
            }`
        );
    }
    return {
        data: {
            all,
            kn,
            pr,
            da,
            hh,
            date
        }
    };
};

export const getSuccessBrandYear = async (startDate, endDate, token, user) => {
    const response =
        await fetch(`https://scigroup.com.vn/cp/seeding/api/get-report-booking?
  token=${token}&
  start_date=${formatDate(startDate)}&
  end_date=${formatDate(endDate)}&
  user_seeding=${user}`);
    const data = await response.json();

    data.data.pop();
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
        for (let i = 0; i < data.data.length; i++) {
            if (new Date(data.data[i].date).getMonth() + 1 === item) {
                all += data.data[i].sl_ngay;
                da += data.data[i].da;
                hh += data.data[i].hh;
                kn += data.data[i].kn;
                pr += data.data[i].pr;
            }
        }
        arrAll.push(all);
        arrDA.push(da);
        arrHH.push(hh);
        arrKN.push(kn);
        arrPR.push(pr);
    });

    return {
        data: {
            date: labelArr,
            all: arrAll,
            da: arrDA,
            hh: arrHH,
            kn: arrKN,
            pr: arrPR
        }
    };
};

export const getRevenue = async (startDate, endDate, user, token) => {
    const response = await fetch(`
      https://scigroup.com.vn/cp/seeding/api/get-report-brand?
      token=${token}&start_date=${formatDate(startDate)}&end_date=${formatDate(
        endDate
    )}&user_seeding=${user}`);
    const data = await response.json();
    data.data.pop();
    const all = [];
    const kn = [];
    const pr = [];
    const da = [];
    const hh = [];
    const date = [];
    for (let i = 0; i < data.data.length; i++) {
        all.push(data.data[i].tong_tien_all_day);
        kn.push(data.data[i].tong_tien_KN);
        pr.push(data.data[i].tong_tien_PR);
        da.push(data.data[i].tong_tien_DA);
        hh.push(data.data[i].tong_tien_HN);
        date.push(
            `${new Date(data.data[i].date).getDate()}/${new Date(data.data[i].date).getMonth() + 1
            }`
        );
    }
    return {
        data: {
            all,
            kn,
            pr,
            da,
            hh,
            date
        }
    };
};