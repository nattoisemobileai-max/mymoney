import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Parser } from 'json2csv';

/**
 * 導出 CSV 功能[cite: 1]
 */
export const exportToCSV = async (data) => {
  try {
    const parser = new Parser();
    const csv = parser.parse(data);
    const fileUri = FileSystem.documentDirectory + 'expenses_summary.csv';
    
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri);
  } catch (err) {
    console.error("Export failed:", err);
  }
};

/**
 * AI 語音解析邏輯
 * 範例輸入: "晚餐 180 Alipay"
 */
export const parseAIInput = (inputString) => {
  const amount = inputString.match(/\d+/)?.[0] || 0;
  const tool = inputString.toLowerCase().includes('alipay') ? 'Alipay HK' : '現金';
  const category = inputString.includes('餐') ? '飲食' : '其他';
  
  return {
    amount: parseFloat(amount),
    category,
    tool,
    date: new Date().toLocaleDateString()
  };
};
