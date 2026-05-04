import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Settings, Delete, Mic, Camera, Calendar, Trash2, TrendingUp
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  
  // 核心數據：包含類型、金額、類別、日期、備註
  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', id: 1, color: '#4ADE80', date: '2026-04-21', note: '機票分期' },
    { type: 'expense', amount: 30, category: '購物', id: 2, color: '#F43F5E', date: '2026-04-21', note: '超市買菜' },
    { type: 'expense', amount: 20, category: '醫療', id: 3, color: '#E11D48', date: '2026-04-20', note: '看診' },
    { type: 'expense', amount: 15, category: '水電費', id: 4, color: '#FB923C', date: '2026-04-19', note: '4月水費' },
    { type: 'income', amount: 500, category: 'ATM', id: 5, color: '#10B981', date: '2026-04-21', note: '提款' }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    appName: '隨手記 | Spending Ace',
    categories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通']
  });

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({ 
    amount: '0', category: '旅遊', note: '', date: getTodayStr()
  });
  
  const [calcExpr, setCalcExpr] = useState('');

  // 計算統計數據
  const totalExp = records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const totalInc = records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);

  // 儲存邏輯
  const handleSave = () => {
    if (parseFloat(formData.amount) === 0 || formData.amount === '0') {
      alert("⚠️ 金額不能為 0！"); return;
    }
    setRecords([{ ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() }, ...records]);
    alert("✅ 儲存成功！");
    setShowInputPage(false);
    setFormData({ ...formData, amount: '0', note: '', date: getTodayStr() });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-sm flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end"><Menu size={24} /></button>
      </div>

      <main className="p-4 space-y-5">
        {activeTab === 'home' && (
          <div className="animate-in fade-in space-y-6">
            {/* 1. 頂部收支總覽卡片 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black text-white p-6 rounded-[2rem] shadow-lg">
                <p className="text-xs font-bold opacity-60 mb-1">支出</p>
                <p className="text-2xl font-black text-rose-300">HK${totalExp}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
                <p className="text-xs font-bold text-gray-400 mb-1">收入</p>
                <p className="text-2xl font-black text-emerald-500">HK${totalInc}</p>
              </div>
            </div>

            {/* 2. 支出分佈 (Donut Chart Style) */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
              <h3 className="text-sm font-black text-gray-700 mb-6">支出分佈</h3>
              <div className="flex justify-center mb-8 relative">
                <div className="w-40 h-40 rounded-full border-[15px] border-emerald-400 border-t-rose-500 border-r-amber-400 border-l-pink-500 transform rotate-45 flex items-center justify-center">
                  <div className="rotate-[-45deg] text-center">
                    <p className="text-[10px] text-gray-400 font-bold">總支出</p>
                    <p className="text-lg font-black text-gray-800">HK${totalExp}</p>
                  </div>
                </div>
              </div>
              {/* 圖例詳情 */}
              <div className="grid grid-cols-2 gap-4 px-2">
                {records.filter(r => r.type === 'expense').slice(0, 4).map(r => (
                  <div key={r.id} className="flex items-start gap-2">
                    <div className="w-3 h-3 rounded-full mt-1" style={{ backgroundColor: r.color || '#4ADE80' }}></div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">{r.category}</p>
                      <p className="text-[10px] text-gray-400">HK${r.amount} · {((r.amount/totalExp)*100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 每日概覽 Bar Chart (仿圖片) */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-gray-700">每日概覽</h3>
                <div className="flex gap-4 text-[10px] font-bold">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 支出</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 收入</span>
                </div>
              </div>
              <div className="h-24 flex items-end justify-around gap-2 px-2">
                {[40, 70, 20, 90, 50, 30, 60].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full bg-emerald-500/20 rounded-t-md relative" style={{ height: `${h}px` }}>
                      <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-md" style={{ height: `${h/2}px` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 明細列表 (Detail Records) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-black text-gray-400 px-2 uppercase tracking-widest">最近明細</h3>
              {records.map(record => (
                <div key={record.id} className="bg-white p-5 rounded-[1.8rem] shadow-sm flex justify-between items-center border border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      <TrendingUp size={20} className={record.type === 'expense' ? 'rotate-180' : ''}/>
                    </div>
                    <div>
                      <p className="font-black text-gray-800">{record.category}</p>
                      <p className="text-xs font-bold text-gray-400">{record.date} {record.note && `· ${record.note}`}</p>
                    </div>
                  </div>
                  <p className={`text-lg font-black ${record.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {record.type === 'expense' ? '-' : '+'}HK${record.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 新增支出頁面 (保留橫向日曆列) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-300 overflow-y-auto pb-40">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center sticky top-0`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          {/* 橫向日曆列 */}
          <section className="bg-gray-50/50 py-6">
            <div className="flex items-center justify-center gap-6 mb-6 font-black">
              <ChevronLeft size={20} className="text-gray-300"/> 2026年4月 <ChevronRight size={20} className="text-gray-300"/>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
              {[20, 21, 22, 23, 24, 25, 26].map(d => (
                <button key={d} onClick={() => setFormData({...formData, date: `2026-04-${d}`})} className={`min-w-[60px] py-4 rounded-2xl flex flex-col items-center border-2 transition-all ${formData.date.includes(d.toString()) ? 'border-black bg-white shadow-md' : 'border-transparent bg-gray-100 text-gray-400'}`}>
                  <span className="text-[10px] font-bold mb-1">二</span>
                  <span className="text-xl font-black">{d}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="p-6 space-y-10">
            <section>
              <label className="text-sm font-black text-gray-400 mb-4 block underline decoration-rose-500 decoration-4">* Amount / 金額 (HKD $)</label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] text-5xl font-black text-right shadow-inner">{formData.amount}</div>
            </section>
            <section>
              <label className="text-sm font-black text-gray-400 mb-3 block">Remarks / 備註</label>
              <textarea placeholder="點此輸入備註..." value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-bold text-gray-700 min-h-[100px] border border-gray-100"/>
            </section>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-4 z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-rose-500' : 'text-gray-300'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-black">我的帳本</span>
        </button>
        <div className="relative -top-10 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={40} /></button>
        </div>
        <button onClick={() => setActiveTab('income')} className={`flex flex-col items-center w-1/3 ${activeTab === 'income' ? 'text-emerald-500' : 'text-gray-300'}`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-black">收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
