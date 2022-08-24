class BorrowApi {
  getBorrow(page) {
    const listMember = [
      {
        numberOfLOS: 12345671,
        numberOfCIF: 775641231,
        fullName: "Hoàng Xuân Xinh Ngọc 1",
        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345671,
        numberOfCIF: 775641232,
        fullName: "Hoàng Xuân Xinh Ngọc 2",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345673,
        numberOfCIF: 775641233,
        fullName: "Hoàng Xuân Xinh Ngọc 3",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345674,
        numberOfCIF: 775641234,
        fullName: "Hoàng Xuân Xinh Ngọc 4",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345675,
        numberOfCIF: 775641235,
        fullName: "Hoàng Xuân Xinh Ngọc 5",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345676,
        numberOfCIF: 775641236,
        fullName: "Hoàng Xuân Xinh Ngọc 6",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345677,
        numberOfCIF: 775641237,
        fullName: "Hoàng Xuân Xinh Ngọc 7",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345678,
        numberOfCIF: 775641238,
        fullName: "Hoàng Xuân Xinh Ngọc 8",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345679,
        numberOfCIF: 775641239,
        fullName: "Hoàng Xuân Xinh Ngọc 9",

        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345680,
        numberOfCIF: 775641240,
        fullName: "Hoàng Xuân Xinh Ngọc 10",
        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345681,
        numberOfCIF: 775641241,
        fullName: "Hoàng Xuân Xinh Ngọc 11",
        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345682,
        numberOfCIF: 775641242,
        fullName: "Hoàng Xuân Xinh Ngọc 12",
        status: "Lưu kho",
      },
      {
        numberOfLOS: 12345683,
        numberOfCIF: 77564143,
        fullName: "Hoàng Xuân Xinh Ngọc 13",
        status: "Lưu kho",
      },
      {
        numberOfLOS: 1234584,
        numberOfCIF: 77564144,
        fullName: "Hoàng Xuân Xinh Ngọc 14",
        status: "Lưu kho",
      },
      {
        numberOfLOS: 1234585,
        numberOfCIF: 77564145,
        fullName: "Hoàng Xuân Xinh Ngọc 15",
        status: "Lưu kho",
      },
    ];

    const rowPerPage = 10;

    const pagination = listMember.slice(
      (page - 1) * rowPerPage,
      (page - 1) * rowPerPage + rowPerPage
    );

    return Promise.resolve({
      items: pagination,
      currentPage: page,
      totalPage: Math.ceil(listMember.length / rowPerPage),
    });
  }
}
export const borrowApi = new BorrowApi();
