class QlhsApi {
  getQlhs(page) {
    const listHoSo = [
      {
        id: 1,
        contractNo: "1234561",
        cifNo: "012345678",
        fullname: "BTS VIB 1",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641168000,
      },
      {
        id: 2,
        contractNo: "1234562",
        cifNo: "012345679",
        fullname: "BTS VIB 2",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641254400,
      },
      {
        id: 3,
        contractNo: "1234563",
        cifNo: "012345680",
        fullname: "BTS VIB 3",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641340800,
      },
      {
        id: 4,
        contractNo: "1234564",
        cifNo: "012345681",
        fullname: "BTS VIB 4",
        reqTypeId: 2,
        reqType: "Hoàn trả/Gia hạn",
        createdAt: 1641427200,
      },
      {
        id: 5,
        contractNo: "1234565",
        cifNo: "012345682",
        fullname: "BTS VIB 5",
        reqTypeId: 2,
        reqType: "Hoàn trả/Gia hạn",
        createdAt: 1641513600,
      },
      {
        id: 6,
        contractNo: "1234566",
        cifNo: "012345683",
        fullname: "BTS VIB 6",
        reqTypeId: 3,
        reqType: "Mượn để bổ sung",
        createdAt: 1641600000,
      },
      {
        id: 7,
        contractNo: "1234567",
        cifNo: "012345684",
        fullname: "BTS VIB 7",
        reqTypeId: 3,
        reqType: "Mượn để bổ sung",
        createdAt: 1641686400,
      },
      {
        id: 8,
        contractNo: "1234568",
        cifNo: "012345685",
        fullname: "BTS VIB 8",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641772800,
      },
      {
        id: 9,
        contractNo: "1234569",
        cifNo: "012345686",
        fullname: "BTS VIB 9",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641859200,
      },
      {
        id: 10,
        contractNo: "1234570",
        cifNo: "012345686",
        fullname: "BTS VIB 10",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641859200,
      },
      {
        id: 11,
        contractNo: "1234571",
        cifNo: "012345686",
        fullname: "BTS VIB 11",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641859200,
      },
      {
        id: 12,
        contractNo: "1234572",
        cifNo: "012345686",
        fullname: "BTS VIB 13",
        reqTypeId: 1,
        reqType: "Lưu mới",
        createdAt: 1641859200,
      },
    ];

    const rowPerPage = 10;

    const pagination = listHoSo.slice(
      (page - 1) * rowPerPage,
      (page - 1) * rowPerPage + rowPerPage
    );

    return Promise.resolve({
      items: pagination,
      currentPage: page,
      totalPage: Math.ceil(listHoSo.length / rowPerPage),
    });
  }
}
export const qlhsApi = new QlhsApi();
