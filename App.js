import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { exportToCSV } from './src/utils/csvExport'; // 引用匯出工具

// 色彩定義 (模仿附件二)
const COLORS = {
  primary: '#58CC02', // Duolingo 綠
  secondary: '#FFC800', // 金幣黃
  accent: '#AF64EE', // 紫色按鈕
  danger: '#FF4B4B', // 火焰紅
  bg: '#FFFFFF',
  card: '#F7F7F7',
  text: '#4B4B4B'
};

export default function App() {
  const [streak, setStreak] = useState(3);
  const [balance, setBalance] = useState(2453.10);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Where is my $?</Text>
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>🔥 {streak} 天連勝</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {/* 預算進度卡片 */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>預算進度 (含固定開銷)</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: '43%' }]} />
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.amountText}>HKD {balance.toFixed(2)}</Text>
            <Text style={styles.totalLimit}>/ 5,000</Text>
          </View>
        </View>

        {/* 語音一鍵記帳按鈕 */}
        <TouchableOpacity style={styles.voiceButton}>
          <Text style={styles.voiceButtonText}>🎤 說「晚餐 180 Alipay」</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => exportToCSV([{date: '2026-04-30', amount: 180, cat: '飲食'}])}>
          <Text style={styles.downloadLink}>⬇️ 下載本月開支報表 (.csv)</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 底部導航欄 */}
      <View style={styles.tabBar}>
        <Text style={styles.tabItem}>記帳</Text>
        <View style={styles.fab}><Text style={styles.fabIcon}>+</Text></View>
        <Text style={styles.tabItem}>管理</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.text },
  streakContainer: { backgroundColor: COLORS.danger, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  streakText: { color: 'white', fontWeight: 'bold' },
  scrollBody: { padding: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 2, borderColor: '#E5E5E5' },
  cardLabel: { color: '#AFAFAF', fontWeight: 'bold', marginBottom: 10 },
  progressContainer: { height: 12, backgroundColor: '#E5E5E5', borderRadius: 6, marginBottom: 10 },
  progressBar: { height: 12, backgroundColor: COLORS.primary, borderRadius: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  amountText: { fontSize: 22, fontWeight: 'bold' },
  voiceButton: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 16, alignItems: 'center', shadowColor: '#46A302', shadowOffset: {width: 0, height: 4}, shadowOpacity: 1, shadowRadius: 0 },
  voiceButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  downloadLink: { textAlign: 'center', marginTop: 20, color: COLORS.accent, fontWeight: 'bold' },
  tabBar: { height: 80, borderTopWidth: 2, borderColor: '#E5E5E5', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  fab: { width: 60, height: 60, backgroundColor: COLORS.accent, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 40, borderWidth: 4, borderColor: 'white' },
  fabIcon: { color: 'white', fontSize: 32, fontWeight: 'bold' }
});
