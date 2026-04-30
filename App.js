import React, { useState, useEffect } from 'react';
import { Mic, Camera, Download, Plus, Menu, Home, Settings, Wand2, Wallet } from 'lucide-react';

const COLORS = {
  header: '#14C784', // 圖片中的綠色頂欄
  expense: 'linear-gradient(135deg, #FF3B30, #FF7A70)', // 期間支出紅色漸層
  income: 'linear-gradient(135deg, #14C784, #5AF2B4)',  // 期間收入綠色漸層
  balance: 'linear-gradient(135deg, #4A69BD, #829FD9)', // 期間差額藍色漸層
  asset: 'linear-gradient(135deg, #10AC84, #48DBFB)',   // 帳本資產青色漸層
  bg: '#F8F9FA'
};

export default function App() {
  const [records, setRecords] = useState([]);
  const [isListening, setIsListening] = useState(false);

  // 語音辨識功能 (Web Speech API)
  const handleVoiceInput = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return alert("您的瀏覽器不支持語音辨識");

    const recognition = new Recognition();
    recognition.lang = 'zh-HK';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      alert(`識別結果：${text} (AI 解析中...)`);
      // 此處串接先前的 parseAIInput 邏輯[cite: 1]
    };
    recognition.start();
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* 頂部導航欄 (參照 image_e3ed95.jpg) */}
      <div style={{ backgroundColor: COLORS.header, color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Home size={20} style={{ marginRight: 8 }} />
          <span style={{ fontWeight: 'bold' }}>我的帳本 ∨</span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 'bold' }}>我的帳本</span>
        <Menu size={24} />
      </div>

      <div style={{ padding: '15px' }}>
        {/* 四格漸層卡片 (參照 image_e3ed95.jpg) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <SummaryCard title="期間支出" amount="$13,719" gradient={COLORS.expense} />
          <SummaryCard title="期間收入" amount="$0" gradient={COLORS.income} />
          <SummaryCard title="期間差額" amount="$-13,719" gradient={COLORS.balance} />
          <SummaryCard title="帳本資產" amount="$38,939" gradient={COLORS.asset} />
        </div>

        {/* 拍照與語音快捷鍵 */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
          <button onClick={handleVoiceInput} style={actionBtnStyle}>
            <Mic color={isListening ? 'red' : 'black'} />
            <span style={{ fontSize: 12 }}>語音記帳</span>
          </button>
          
          <label style={actionBtnStyle}>
            <Camera />
            <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} />
            <span style={{ fontSize: 12 }}>拍照記存</span>
          </label>
        </div>

        {/* 分類統計卡片 (參照 image_e3ed7a.jpg) */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ width: '4px', height: '18px', backgroundColor: COLORS.header, marginRight: '10px' }}></div>
            <span style={{ fontWeight: 'bold' }}>分類統計</span>
          </div>
          <ProgressBar label="汽車相關" amount="-$9,545" percent="69.58%" color="#F1C40F" />
          <ProgressBar label="外食餐點" amount="-$2,495" percent="18.19%" color="#FF5E57" />
        </div>
      </div>

      {/* 底部導航欄 */}
      <div style={bottomTabStyle}>
        <TabItem icon={<Wallet />} label="資金帳戶" />
        <TabItem icon={<Download />} label="我的帳本" active />
        <div style={centerAvatarStyle}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" style={{ width: '100%', borderRadius: '50%' }} alt="AI" />
        </div>
        <TabItem icon={<Wand2 />} label="生活神器" />
        <TabItem icon={<Settings />} label="系統設定" />
      </div>
    </div>
  );
}

// 子組件：漸層卡片
const SummaryCard = ({ title, amount, gradient }) => (
  <div style={{ background: gradient, padding: '15px', borderRadius: '15px', color: 'white', position: 'relative' }}>
    <div style={{ fontSize: '12px', opacity: 0.9 }}>{title}</div>
    <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>{amount}</div>
  </div>
);

// 子組件：進度條 (參照 image_e3ed7a.jpg)
const ProgressBar = ({ label, amount, percent, color }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
      <span>{label}</span>
      <span style={{ color: '#FF5E57', fontWeight: 'bold' }}>{amount}</span>
    </div>
    <div style={{ height: '8px', backgroundColor: '#EEE', borderRadius: '4px' }}>
      <div style={{ width: percent, height: '100%', backgroundColor: color, borderRadius: '4px' }}></div>
    </div>
  </div>
);

const TabItem = ({ icon, label, active }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: active ? COLORS.header : '#AFAFAF' }}>
    {icon}
    <span style={{ fontSize: '10px', marginTop: '4px' }}>{label}</span>
  </div>
);

const actionBtnStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
  background: 'white', border: '1px solid #EEE', padding: '15px', borderRadius: '12px', cursor: 'pointer', width: '80px'
};

const bottomTabStyle = {
  position: 'fixed', bottom: 0, width: '100%', height: '70px', backgroundColor: 'white',
  borderTop: '1px solid #EEE', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '10px'
};

const centerAvatarStyle = {
  width: '60px', height: '60px', border: '4px solid white', borderRadius: '50%',
  marginTop: '-40px', backgroundColor: COLORS.header, boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};
