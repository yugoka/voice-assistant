export const preprocess = (text: string) => {
  return (
    text
      // 強調用アスタリスクを読ませないために削除
      .replace("*", "")
  );
};
