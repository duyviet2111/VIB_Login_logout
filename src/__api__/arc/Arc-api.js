class ArcApi {
  getRecordwithCoverNumber(coverNum) {
    let items = [
      {
        numOfCover: 1234,
        recordStatus: "chuyển kho Crown",
        memberManagement: "Nguyễn Văn A",
      },
      {
        numOfCover: 1235,
        recordStatus: "chuyển kho Crown",
        memberManagement: "Nguyễn Văn A",
      },
      {
        numOfCover: 1236,
        recordStatus: "chuyển kho Crown",
        memberManagement: "Nguyễn Văn A",
      },
      {
        numOfCover: 1237,
        recordStatus: "chuyển kho Crown",
        memberManagement: "Nguyễn Văn A",
      },
    ];

    const value = items.find((el) => el.numOfCover == coverNum);
    let status;
    let message;
    if (value) {
      status = 200;
      message = "ok";
    } else {
      status = 400;
      message = "không tìm thấy";
    }

    const response = {
      status,
      value,
      message,
    };

    return Promise.resolve(response);
  }
  getDropDownList(value) {
    const res = {
      status: 200,
      message: "OK",
      items: [
        {
          id: 9897,
          name: "Trần Văn A",
        },
        {
          id: 9896,
          name: "Trần Văn B",
        },
        {
          id: 9895,
          name: "Trần Văn C",
        },
        {
          id: 9894,
          name: "Trần Văn D",
        },
        {
          id: 9893,
          name: "Trần Văn E",
        },
        {
          id: 9892,
          name: "Trần Văn F",
        },
        {
          id: 9891,
          name: "Trần Văn G",
        },
        {
          id: 9890,
          name: "Trần Văn H",
        },
      ],
    };
    return Promise.resolve(res);
  }

  getWaitingCrownStore() {
    const items = [
      {
        boxId: 12345,
        seal1: 4567,
        seal2: 2345,
        status: "chờ chuyển Crown",
        quantityOfRecords: 10,
      },
      {
        boxId: 12346,
        seal1: 4567,
        seal2: 2345,
        status: "chờ chuyển Crown",
        quantityOfRecords: 10,
      },
      {
        boxId: 123457,
        seal1: 4567,
        seal2: 2345,
        status: "chờ chuyển Crown",
        quantityOfRecords: 10,
      },
    ];
    return Promise.resolve(items);
  }

  getRecordData(cover) {
    const items = [
      {
        id: "123987",
        numOfCover: "3456",
        numOfSeal: "4567",
        memberManagement: "Trần Văn A",
        recordStatus: "Cho mượn",
      },
      {
        id: "124688",
        numOfCover: "3457",
        numOfSeal: "4567",
        memberManagement: "Trần Văn A",
        recordStatus: "Cho mượn",
      },
      {
        id: "1253565",
        numOfCover: "3458",
        numOfSeal: "4567",
        memberManagement: "Trần Văn A",
        recordStatus: "Cho mượn",
      },
    ];

    const data = items.find((el) => el.numOfCover == cover);
    let status = 200;
    let message = "ok";
    if (!data) {
      status = 400;
      message = "không tìm thấy";
    }

    return Promise.resolve({ ...data, status, message });
  }

  postFinish() {
    const response = { status: 200, message: "ok" };
    return Promise.resolve(response);
  }

  getDestroyRecords(data) {
    const response = {
      status: 200,
      message: "ok",
      totalPage: 2,
      currentPage: 1,
      items: [
        {
          numOfCover: "234",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2341",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2342",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2343",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2344",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2345",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2346",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2347",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2348",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
        {
          numOfCover: "2349",
          saveTime: "10 năm",
          numOfSeal: "123",
          status: "Lưu DKVKD",
          memberManagement: "Nguyễn Văn A",
        },
      ],
    };
    return Promise.resolve(response);
  }
  getInventoryMembers() {
    const res = {
      status: 200,
      message: "OK",
      items: [
        { id: 123, name: "Trần Văn A" },
        { id: 124, name: "Trần Văn B" },
        { id: 125, name: "Trần Văn C" },
      ],
    };

    return Promise.resolve(res);
  }
  getSummaryRecords(value) {
    const members = { recordsOfSystem: 10, status: 200, message: "Ok" };
    return Promise.resolve(members);
  }
  getConfirmCover(cover, member) {
    const res = { status: 300, message: "Ok" };
    return Promise.resolve(res);
  }

  getRecordNotInSystemOfMember(value, member) {
    const res = {
      status: 400,
      message: "OK",
      value: {
        typeOfInventory: "Thêm",
        numOfCover: 12348,
        numOfSeal: 2345,
        saveTime: "10 năm",
        memberManagement: "Trần Văn C",
        status: "Lưu ĐVKD",
        updateStatus: {},
      },
    };

    return Promise.resolve(res);
  }

  getCompareData(value, page) {
    const res = {
      status: 200,
      message: "Ok",
      currentPage: page,
      totalPage: 2,
      items: [
        {
          typeOfInventory: "Thiếu",
          numOfCover: 1234,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Dư",
          numOfCover: 1235,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu Crown",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 1236,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 1237,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 1238,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 1239,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 123499,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 123498,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 123497,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 123496,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 123495,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
        {
          typeOfInventory: "Thiếu",
          numOfCover: 123494,
          numOfSeal: 2345,
          saveTime: "10 năm",
          memberManagement: "Trần Văn A",
          status: "Lưu ĐVKD",
          updateStatus: {},
        },
      ],
    };

    // const rowPerPage = 10;

    // const pagination = items.slice((page - 1) * rowPerPage, (page - 1) * rowPerPage + rowPerPage);

    return Promise.resolve(res);
  }

  getSearchData(value) {
    const res = {
      status: 200,
      message: "Ok",
      currentPage: 1,
      totalPage: 2,
      items: [
        {
          id: 5679,
          numOfLOS: 1234,
          numOfCover: 234,
          numOfSeal: 658,
          boxId: 954,
          status: "Lưu ĐVKD",
          memberManagement: "Trần Văn A",
        },
        {
          id: 5678,
          numOfLOS: 1234,
          numOfCover: 234,
          numOfSeal: 658,
          boxId: 954,
          status: "Lưu ĐVKD",
          memberManagement: "Trần Văn A",
        },
        {
          id: 5677,
          numOfLOS: 1234,
          numOfCover: 234,
          numOfSeal: 658,
          boxId: 954,
          status: "Lưu ĐVKD",
          memberManagement: "Trần Văn A",
        },
        {
          id: 5676,
          numOfLOS: 1234,
          numOfCover: 234,
          numOfSeal: 658,
          boxId: 954,
          status: "Lưu ĐVKD",
          memberManagement: "Trần Văn A",
        },
        {
          id: 5675,
          numOfLOS: 1234,
          numOfCover: 234,
          numOfSeal: 658,
          boxId: 954,
          status: "Lưu ĐVKD",
          memberManagement: "Trần Văn A",
        },
      ],
    };
    return Promise.resolve(res);
  }

  getInventoryStatus() {
    const res = {
      status: 200,
      message: "OK",
      items: [
        {
          name: "Mất, thất lạc",
          code: 65432,
        },
        {
          name: "Cho mượn",
          code: 65438,
        },
      ],
    };

    return Promise.resolve(res);
  }

  getConfirmCoverAtDestroy() {
    const res = {
      status: 200,
      message: "OK",
      value: {
        numOfCover: "234",
        saveTime: "10 năm",
        numOfSeal: "123",
        status: "Lưu DKVKD",
        memberManagement: "Nguyễn Văn A",
      },
    };

    return Promise.resolve(res);
  }

  postFinishInventory(data) {
    const res = {
      status: 200,
      message: "OK",
    };

    return Promise.resolve(res);
  }
}
export const arcApi = new ArcApi();
