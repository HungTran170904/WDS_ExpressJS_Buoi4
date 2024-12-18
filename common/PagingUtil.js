class PagingUtil{
          getIndexRange(pageSize, pageNum){
                    const firstBookIndex= pageSize*(pageNum-1);
                    const lastBookIndex= firstBookIndex+pageSize-1;
                    return [firstBookIndex, lastBookIndex];
          }
}

export default new PagingUtil();