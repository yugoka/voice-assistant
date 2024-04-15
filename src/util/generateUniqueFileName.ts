export function generateUniqueFileName() {
  // 日時を「YYYYMMDD-HHMMSS」形式で取得
  const now = new Date();
  const dateTime = now
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);

  // ランダムな文字列を生成（例: 6文字の英数字）
  const randomChars = Math.random().toString(36).substring(2, 8);

  // ファイル名を組み立てる
  const fileName = `output-${dateTime}-${randomChars}`;
  return fileName;
}
