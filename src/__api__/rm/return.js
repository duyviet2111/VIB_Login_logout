class CreateFormReturnApi {
  getCreateFormsReturn(record) {
    const formGroup = {
      productId: 1,
      items: [
        {
          id: "9989786565ads",
          formGroupField: "Hồ sơ pháp lý",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [
            {
              detailId: { id: 1235, typeRecord: "Đề nghị vay vốn" },
              pageNumber: 20,
              disbursementRecords: "Bản gốc",
            },
            {
              detailId: { id: 1236, typeRecord: "Chứng minh nhân dân" },
              pageNumber: 20,
              disbursementRecords: "Bản gốc",
            },
          ],
        },
        {
          id: "998976efg",
          formGroupField: "Hồ sơ mục đích vay",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [
            {
              detailId: { id: 1235, typeRecord: "Đề nghị vay vốn" },
              pageNumber: 20,
              disbursementRecords: "Bản gốc",
            },
          ],
        },
        {
          id: "998975gfh",
          formGroupField: "Hồ sơ nguồn thu nhập",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [
            {
              detailId: { id: 1235, typeRecord: "Đề nghị vay vốn" },
              pageNumber: 20,
              disbursementRecords: "Bản gốc",
            },
          ],
        },
        {
          id: "998974hgj",
          formGroupField: "Hồ sơ giải ngân",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [
            {
              detailId: { id: 1235, typeRecord: "Đề nghị vay vốn" },
              pageNumber: 20,
              disbursementRecords: "Bản gốc",
            },
          ],
        },
        {
          id: "998973ret",
          formGroupField: "Hồ sơ khác",
          dropDownList: [
            { id: 1235, typeRecord: "Đề nghị vay vốn" },
            { id: 1236, typeRecord: "Chứng minh nhân dân" },
            { id: 1237, typeRecord: "Giấy chứng nhận quyển sở hữu" },
          ],
          detailRecord: [
            {
              detailId: { id: 1235, typeRecord: "Đề nghị vay vốn" },
              pageNumber: 20,
              disbursementRecords: "Bản gốc",
            },
          ],
        },
      ],
    };

    return Promise.resolve(formGroup);
  }
}
export const createFormReturnApi = new CreateFormReturnApi();
