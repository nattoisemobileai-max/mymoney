import React, { useState } from 'react';
import { Mic, Camera, Download, Wallet, Wand2, Settings, Home, Menu, Plus } from 'lucide-react';

const COLORS = {
  header: '#14C784',
  expense: 'linear-gradient(135deg, #FF3B30, #FF7A70)',
  income: 'linear-gradient(135deg, #14C784, #5AF2B4)',
  balance: 'linear-gradient(135deg, #4A69BD, #829FD9)',
  asset: 'linear-gradient(135deg, #10AC84, #48DBFB)',
  bg: '#F5F7FA'
};

export default function App() {
  const [isListening, setIsListening] = useState(false);

  // 1. 語音記帳功能
  const startVoice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return alert("您的設備不支持語音辨識");
    const rec = new Recognition();
    rec.lang = 'zh-HK';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => alert(`聽到了："${e.results[0][0].transcript}"\nAI 解析中...`);
    rec.start();
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: COLORS.bg, minHeight: '100vh', paddingBottom: '100px' }}>
      {/* 頂部欄 (Style: image_e3ed95.jpg) */}
      <div style={{ backgroundColor: COLORS.header, color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
          <Home size={18} style={{ marginRight: '5px' }} /> 我的帳本 ∨
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>我的帳本</div>
        <Menu size={24} />
      </div>

      <div style={{ padding: '15px' }}>
        {/* 漸層數據卡片 (Style: image_e3ed95.jpg) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div style={{ ...cardStyle, background: COLORS.expense }}>
            <span style={cardTitleStyle}>期間支出</span>
            <span style={cardAmtStyle}>$13,719</span>
          </div>
          <div style={{ ...cardStyle, background: COLORS.income }}>
            <span style={cardTitleStyle}>期間收入</span>
            <span style={cardAmtStyle}>$0</span>
          </div>
          <div style={{ ...cardStyle, background: COLORS.balance }}>
            <span style={cardTitleStyle}>期間差額</span>
            <span style={cardAmtStyle}>$-13,719</span>
          </div>
          <div style={{ ...cardStyle, background: COLORS.asset }}>
            <span style={cardTitleStyle}>帳本資產</span>
            <span style={cardAmtStyle}>$38,939</span>
          </div>
        </div>

        {/* 快捷功能區 */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <button onClick={startVoice} style={actionButtonStyle}>
            <Mic size={24} color={isListening ? 'red' : COLORS.header} />
            <span style={{ fontSize: '12px', marginTop: '5px' }}>語音記帳</span>
          </button>
          <label style={actionButtonStyle}>
            <Camera size={24} color={COLORS.header} />
            <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} />
            <span style={{ fontSize: '12px', marginTop: '5px' }}>拍照記存</span>
          </label>
        </div>

        {/* 分類進度條 (Style: image_e3ed7a.jpg) */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ borderLeft: `4px solid ${COLORS.header}`, paddingLeft: '10px', marginBottom: '15px', fontWeight: 'bold' }}>分類統計</div>
          <ProgressItem label="汽車相關" amt="-$9,545" percent="69%" color="#FFD93D" icon="🚗" />
          <ProgressItem label="外食餐點" amt="-$2,495" percent="18%" color="#FF6B6B" icon="🍔" />
          <ProgressItem label="居家生活" amt="-$1,579" percent="11%" color="#4D96FF" icon="🏠" />
        </div>
      </div>

      {/* 底部導航欄 (Style: image_e3ed95.jpg) */}
      <div style={navBarStyle}>
        <NavItem icon={<Wallet size={20} />} label="資金帳戶" />
        <NavItem icon={<Download size={20} />} label="我的帳本" active />
        <div style={centerIconStyle}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" style={{ width: '100%', borderRadius: '50%' }} alt="AI" />
        </div>
        <NavItem icon={<Wand2 size={20} />} label="生活神器" />
        <NavItem icon={<Settings size={20} />} label="系統設定" />
      </div>
    </div>
  );
}

// 輔助組件與樣式
const cardStyle = { padding: '15px', borderRadius: '18px', color: 'white', display: 'flex', flexDirection: 'column', height: '80px', justifyContent: 'center' };
const cardTitleStyle = { fontSize: '12px', opacity: 0.9, marginBottom: '5px' };
const cardAmtStyle = { fontSize: '20px', fontWeight: 'bold' };
const actionButtonStyle = { flex: 1, backgroundColor: 'white', border: '1px solid #E0E0E0', borderRadius: '15px', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' };
const navBarStyle = { position: 'fixed', bottom: 0, width: '100%', maxWidth: '500px', height: '70px', backgroundColor: 'white', borderTop: '1px solid #EEE', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '10px' };
const centerIconStyle = { width: '55px', height: '55px', backgroundColor: COLORS.header, borderRadius: '50%', marginTop: '-35px', border: '5px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };

const ProgressItem = ({ label, amt, percent, color, icon }) => (
  <div style={{ marginBottom: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
      <span>{icon} {label}</span>
      <span style={{ color: '#FF3B30', fontWeight: 'bold' }}>{amt}</span>
    </div>
    <div style={{ height: '8px', backgroundColor: '#F0F0F0', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: percent, height: '100%', backgroundColor: color }} />
    </div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: active ? COLORS.header : '#999', fontSize: '10px' }}>
    {icon}
    <span style={{ marginTop: '3px' }}>{label}</span>
  </div>
);
