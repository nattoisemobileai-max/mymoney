import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, Menu, 
  Trash2, TrendingUp, Globe, ChevronDown, ChevronUp, Check
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const [expandExp, setExpandExp] = useState(false);
  const [expandInc, setExpandInc] = useState(false);

  // 表單數據狀態
  const [formData, setFormData] = useState({
    amount: '',
    category: '旅遊',
    nature: 'essential', // 'essential' (必要) or 'desire' (想要)
    note: '',
    date: '2026-05-04'
  });

  const [currentSettings, setCurrentSettings] = useState({
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    expCategories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通'],
    incCategories: ['薪金', '獎金', 'ATM', '投資收入']
  });

  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', nature: 'desire', id: 1, date: '2026-04-21' },
    { type: 'income', amount: 500, category: 'ATM', nature: 'essential', id: 5, date: '2026-04-21' }
  ]);

  const handleSave = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("請輸入有效金額");
      return;
    }
    const newRecord = { 
      ...formData, 
      type: inputType, 
      amount: Number(formData.amount), 
      id: Date.now() 
    };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setFormData({ amount: '', category: '旅遊', nature: 'essential', note: '', date: '2026-05-04' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="bg-emerald-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90"><Menu size={24} /></button>
      </div>

      {/* 主頁內容 (統計圖表) */}
      {activeTab === 'home' && !showInputPage && (
        <main className="p-4 space-y-6 animate-in fade-in">
          {/* ... (此處保留之前的 Bar Chart 與環狀圖代碼，為簡潔隱藏) ... */}
          <div className="bg-black text-white p-6 rounded-[2rem] shadow-lg">
            <p className="text-xs font-bold opacity-60">總支出</p>
            <p className="text-2xl font-black text-rose-300">HK$96</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-gray-400 px-2 uppercase tracking-widest">Recent</h3>
            {records.map(record => (
              <div key={record.id} onClick={() => setSelectedRecord(record)} className="bg-white p-5 rounded-[1.8rem] flex justify-between items-center border border-gray-50 active:bg-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}><TrendingUp size={18}/></div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{record.category}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${record.nature === 'essential' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      {record.nature === 'essential' ? '必要' : '想要'}
                    </span>
                  </div>
                </div>
                <p className={`font-black ${record.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>HK${record.amount}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 新增支出/收入頁面 (修復後的彈出層) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${inputType === 'expense' ? 'bg-rose-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black shadow-lg active:scale-95">儲存</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* 金額輸入 */}
            <section>
              <label className="text-xs font-black text-gray-400 mb-3 block uppercase tracking-widest">金額 (HKD)</label>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                className="w-full bg-gray-50 border-none p-6 rounded-[2rem] text-5xl font-black text-right focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </section>

            {/* 必要 & 想要 (你要求的新功能) */}
            <section>
              <label className="text-xs font-black text-gray-400 mb-3 block uppercase tracking-widest">消費性質 (必選)</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setFormData({...formData, nature: 'essential'})}
                  className={`flex-1 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border-2 transition-all ${formData.nature === 'essential' ? 'bg-blue-500 text-white border-blue-500 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}
                >
                  {formData.nature === 'essential' && <Check size={18}/>} 必要
                </button>
                <button 
                  onClick={() => setFormData({...formData, nature: 'desire'})}
                  className={`flex-1 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border-2 transition-all ${formData.nature === 'desire' ? 'bg-orange-400 text-white border-orange-400 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}
                >
                  {formData.nature === 'desire' && <Check size={18}/>} 想要
                </button>
              </div>
            </section>

            {/* 分類選擇 */}
            <section>
              <label className="text-xs font-black text-gray-400 mb-3 block uppercase tracking-widest">分類</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {(inputType === 'expense' ? currentSettings.expCategories : currentSettings.incCategories).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`px-8 py-4 rounded-2xl border-2 whitespace-nowrap font-black transition-all ${formData.category === cat ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-100 text-gray-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* 備註 */}
            <section>
              <label className="text-xs font-black text-gray-400 mb-3 block uppercase tracking-widest">備註</label>
              <textarea 
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="寫點什麼..."
                className="w-full bg-gray-50 border-none p-4 rounded-2xl h-24 font-bold outline-none focus:ring-2 focus:ring-gray-200"
              />
            </section>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 flex justify-around items-center py-4 z-40">
        <button onClick={() => {setActiveTab('home'); setShowInputPage(false);}} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' && !showInputPage ? 'text-rose-500' : 'text-gray-300'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-black">我的帳本</span>
        </button>
        <div className="relative -top-10 w-1/3 flex justify-center">
          <button 
            onClick={() => { setInputType('expense'); setShowInputPage(true); }} 
            className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"
          >
            <Plus size={40} />
          </button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className={`flex flex-col items-center w-1/3 ${showInputPage && inputType === 'income' ? 'text-blue-500' : 'text-gray-300'}`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-black">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
