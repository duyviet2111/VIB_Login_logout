class BorrowApi {
  getBorrow(page, searchValue, recordId) {
    let items = [
      {
        id: 451,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 452,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 453,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 454,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 455,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 456,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 457,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 458,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 459,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 4561,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 4562,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
      {
        id: 4563,
        numOfHDTD: 123456,
        numOfSeal: 1234567,
        timeReturn: "3/4/2022",
        recordStatus: "Lưu ĐVKD",
      },
    ];

    const rowPerPage = 10;
    let pagination = items.slice((page - 1) * rowPerPage, (page - 1) * rowPerPage + rowPerPage);

    if (recordId) {
      const filters = items.filter((value) => !recordId.some((v) => v === value.id));
      pagination = filters.slice((page - 1) * rowPerPage, (page - 1) * rowPerPage + rowPerPage);
      items = filters;
    }

    return Promise.resolve({
      status: 200,
      message: "OK",
      items: pagination,
      currentPage: page,
      totalPage: Math.ceil(items.length / rowPerPage),
    });
  }
}
export const borrowApi = new BorrowApi();
