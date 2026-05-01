import React, { useState, useRef } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, 
  Menu, Settings, Utensils, Car, GraduationCap, Coffee, 
  ShoppingBag, Delete, Check, Landmark
} from 'lucide-react';

const App = () => {
  // --- 頁面切換狀態 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense'); // 'expense' 或 'income'
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  // --- 數據存儲 ---
  const [records, setRecords] = useState([]);
  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace'
  });

  const [formData, setFormData] = useState({
    amount: '0',
    category: '飲食',
    payment: '現金',
    note: ''
  });

  // --- 計算機邏輯 ---
  const [calcExpr, setCalcExpr] = useState('');
  const handleCalcInput = (val) => {
    if (val === 'C') { setCalcExpr(''); return; }
    if (val === 'del') { setCalcExpr(calcExpr.slice(0, -1)); return; }
    if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(calcExpr).toString();
        setFormData({ ...formData, amount: res });
        setShowCalc(false);
        setCalcExpr('');
      } catch { setCalcExpr('Error'); }
      return;
    }
    setCalcExpr(calcExpr + val);
  };

  // --- 儲存功能 ---
  const handleSave = () => {
    const newRecord = { ...formData, type: inputType, id: Date.now() };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    // 重置表格
    setFormData({ amount: '0', category: '飲食', payment: '現金', note: '' });
  };

  // --- 日曆數據 (復刻 image_49df98.png) ---
  const [selectedIdx, setSelectedIdx] = useState(7);
  const generateDates = () => {
    const dates = [];
    for (let i = -7; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayLabel: `DAY ${i + 8}`, 
        dateText: `${d.getMonth() + 1}/${d.getDate()}`,
        weekday: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
      });
    }
    return dates;
  };
  const [dateList] = useState(generateDates());

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none">
      
      {/* Header - 修復 Setting 功能 */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-xl tracking-tight">{currentSettings.appName}</h1>
        <button 
          onClick={() => setShowSettingsModal(true)} 
          className="w-10 flex justify-end active:scale-90 transition-transform"
        >
          <Menu size={28} />
        </button>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' ? (
          <>
            {/* 日曆區塊 (復刻樣式) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 px-2 bg-[#F9F8F4] rounded-3xl border border-gray-100">
              {dateList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex-shrink-0 w-[72px] h-[100px] rounded-[20px] border-2 flex flex-col items-center justify-between py-3 transition-all ${
                    selectedIdx === idx 
                    ? 'bg-[#3498db] border-[#3498db] text-white shadow-lg' 
                    : 'bg-white border-gray-200 text-[#8b7d6b]'
                  }`}
                >
                  <span className="text-[10px] font-bold opacity-80 uppercase">{item.dayLabel}</span>
                  <span className="text-2xl font-black">{item.dateText}</span>
                  <span className="text-sm font-bold">{item.weekday}</span>
                </button>
              ))}
            </div>

            {/* 收支摘要 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500 p-6 rounded-[2.5rem] text-white shadow-lg">
                <div className="text-xs font-bold opacity-80 uppercase mb-1">Expenses</div>
                <div className="text-3xl font-black">${records.filter(r => r.type === 'expense').reduce((a, b) => a + Number(b.amount), 0) || '13,719'}</div>
              </div>
              <div className={`${currentSettings.themeColor} p-6 rounded-[2.5rem] text-white shadow-lg`}>
                <div className="text-xs font-bold opacity-80 uppercase mb-1">Income</div>
                <div className="text-3xl font-black">${records.filter(r => r.type === 'income').reduce((a, b) => a + Number(b.amount), 0) || '0'}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-10 text-center space-y-4">
             <Landmark size={64} className="mx-auto text-gray-200" />
             <p className="text-gray-400 font-bold">點擊下方 + 按鈕新增收入紀錄</p>
          </div>
        )}
      </main>

      {/* 新增 支出/收入 頁面 - 修復儲存功能 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <div className={`${inputType === 'expense' ? currentSettings.themeColor : 'bg-blue-500'} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black shadow-sm active:scale-95 transition-transform">儲存</button>
          </div>

          <div className="p-6 space-y-10 pb-24">
            <section>
              <label className="text-xl font-black text-red-500 mb-4 block">* 金額 (HKD)</label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-4xl font-black text-right border-2 border-transparent active:border-emerald-500">{formData.amount}</div>
            </section>

            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">支出分類</label>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {['飲食', '交通', '補習', '咖啡', '購物'].map(name => (
                  <button key={name} onClick={() => setFormData({...formData, category: name})} className={`flex flex-col items-center min-w-[85px] p-5 rounded-2xl border-2 transition-all ${formData.category === name ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100 bg-white text-gray-400'}`}>
                    <span className="text-sm font-bold">{name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">支出工具</label>
              <div className="grid grid-cols-2 gap-3">
                {['現金', '八達通', 'AlipayHK', 'PayMe', '支票'].map(p => (
                  <button key={p} onClick={() => setFormData({...formData, payment: p})} className={`py-5 rounded-2xl border-2 font-black text-lg transition-all ${formData.payment === p ? 'border-amber-400 text-amber-700 bg-amber-50 shadow-sm' : 'border-gray-100 bg-white text-gray-400'}`}>{p}</button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">備註</label>
              <textarea placeholder="寫點什麼..." className="w-full bg-[#F5F5F0] p-6 rounded-2xl font-bold border-none outline-none min-h-[120px]" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
            </section>
          </div>

          {/* 計算機彈窗 */}
          {showCalc && (
            <div className="fixed inset-0 bg-black/50 z-[80] flex items-end">
              <div className="bg-[#1e1e1e] w-full p-6 rounded-t-[3rem] animate-in slide-in-from-bottom">
                <div className="text-right text-white text-4xl font-mono mb-6 p-4 h-20 flex items-center justify-end">{calcExpr || '0'}</div>
                <div className="grid grid-cols-4 gap-3">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(key => (
                    <button key={key} onClick={() => handleCalcInput(key)} className={`h-16 rounded-2xl text-2xl font-black flex items-center justify-center active:scale-90 ${key === '=' ? 'bg-emerald-500 text-white' : ['+', '-', 'del', 'C'].includes(key) ? 'bg-gray-700 text-emerald-400' : 'bg-gray-800 text-white'}`}>{key === 'del' ? <Delete /> : key}</button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-6 py-4 text-gray-400 font-bold uppercase tracking-widest">Done</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 設定 Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            <div className="flex-1 space-y-8">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">語言 / Language</label>
                <div className="grid grid-cols-1 gap-3">
                  {['繁體中文', 'English'].map(lang => (
                    <button key={lang} className={`w-full p-5 rounded-2xl border-2 text-left font-bold ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100'}`}>{lang}</button>
                  ))}
                </div>
              </section>
            </div>
            <div className="pt-8 border-t space-y-4">
              <button onClick={() => setShowSettingsModal(false)} className={`w-full py-5 ${currentSettings.themeColor} text-white rounded-[2rem] text-lg font-black`}>確認</button>
              <button onClick={() => setShowSettingsModal(false)} className="w-full py-5 bg-gray-100 text-gray-500 rounded-[2rem] text-lg font-bold">取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 - 核心邏輯：根據分頁變更中間按鈕功能 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button 
          onClick={() => setActiveTab('wallet')} 
          className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}
        >
          <Wallet size={26}/><span className="text-[11px] mt-1 font-bold">資金帳戶</span>
        </button>
        
        <div className="relative -top-8 w-1/3 flex justify-center">
          <button 
            onClick={() => {
              setInputType(activeTab === 'wallet' ? 'income' : 'expense');
              setShowInputPage(true);
            }} 
            className={`${activeTab === 'wallet' ? 'bg-blue-500' : currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8] active:scale-95 transition-all`}
          >
            <Plus size={40} />
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}
        >
          <Download size={26}/><span className="text-[11px] mt-1 font-bold">我的帳本</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
