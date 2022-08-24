class SearchBorrowApi {
  getBorrowList(inputValue) {
    const borrowList = [12341, 12342, 12343, 12344, 12345, 12346, 12347, 12348];

    return Promise.resolve(borrowList);
  }

  getBorrowListData()
}
export const searchBorrowApi = new SearchBorrowApi();
