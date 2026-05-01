import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, 
  Menu, Settings, Utensils, Car, GraduationCap, Coffee, 
  ShoppingBag, Delete, Check
} from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

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

  // --- 日曆數據 (復刻 image.png) ---
  const [selectedIdx, setSelectedIdx] = useState(7); // 預設今天
  const generateDates = () => {
    const dates = [];
    for (let i = -7; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayLabel: `DAY ${i + 8}`, 
        dateText: `${d.getMonth() + 1}/${d.getDate()}`,
        weekday: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
        isToday: i === 0
      });
    }
    return dates;
  };
  const [dateList] = useState(generateDates());

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

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-xl tracking-tight">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90 transition-transform">
          <Menu size={28} />
        </button>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            {/* 日期選擇器 (復刻 image.png 樣式) */}
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
                <div className="text-3xl font-black">$13,719</div>
              </div>
              <div className={`${currentSettings.themeColor} p-6 rounded-[2.5rem] text-white shadow-lg`}>
                <div className="text-xs font-bold opacity-80 uppercase mb-1">Income</div>
                <div className="text-3xl font-black">$0</div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 新增支出頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <div className={`${currentSettings.themeColor} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">新增支出</span>
            <button className="bg-white text-emerald-600 px-8 py-2 rounded-full font-black shadow-sm">儲存</button>
          </div>

          <div className="p-6 space-y-10 pb-24">
            {/* 1. 金額 (點擊彈出計算機) */}
            <section>
              <label className="text-xl font-black text-red-500 mb-4 block">* 金額 (HKD)</label>
              <div 
                onClick={() => { setShowCalc(true); setCalcExpr(formData.amount === '0' ? '' : formData.amount); }}
                className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-4xl font-black text-right border-2 border-transparent active:border-emerald-500"
              >
                {formData.amount}
              </div>
            </section>

            {/* 2. 支出分類 */}
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">支出分類</label>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {[
                  { name: '飲食', icon: <Utensils /> },
                  { name: '交通', icon: <Car /> },
                  { name: '補習', icon: <GraduationCap /> },
                  { name: '咖啡', icon: <Coffee /> },
                  { name: '購物', icon: <ShoppingBag /> }
                ].map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setFormData({...formData, category: cat.name})}
                    className={`flex flex-col items-center min-w-[85px] p-5 rounded-2xl border-2 transition-all ${formData.category === cat.name ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-md' : 'border-gray-100 bg-white text-gray-400'}`}
                  >
                    {cat.icon}
                    <span className="text-sm font-bold mt-2">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. 支出工具 */}
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">支出工具</label>
              <div className="grid grid-cols-2 gap-3">
                {['現金', '八達通', 'AlipayHK', 'PayMe', '支票'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setFormData({...formData, payment: p})} 
                    className={`py-5 rounded-2xl border-2 font-black text-lg transition-all ${formData.payment === p ? 'border-amber-400 text-amber-700 bg-amber-50 shadow-sm' : 'border-gray-100 bg-white text-gray-400'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. 備註 */}
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">備註</label>
              <textarea 
                placeholder="寫點什麼..."
                className="w-full bg-[#F5F5F0] p-6 rounded-2xl font-bold border-none outline-none min-h-[120px] text-lg"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </section>
          </div>

          {/* 計算機彈窗 */}
          {showCalc && (
            <div className="fixed inset-0 bg-black/50 z-[80] flex items-end">
              <div className="bg-[#1e1e1e] w-full p-6 rounded-t-[3rem] animate-in slide-in-from-bottom duration-300">
                <div className="text-right text-white text-4xl font-mono mb-6 p-4 h-20 flex items-center justify-end overflow-hidden">
                  {calcExpr || '0'}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(key => (
                    <button
                      key={key}
                      onClick={() => handleCalcInput(key)}
                      className={`h-16 rounded-2xl text-2xl font-black flex items-center justify-center transition-transform active:scale-90 ${
                        key === '=' ? 'bg-emerald-500 text-white row-span-1' : 
                        ['+', '-', 'del', 'C'].includes(key) ? 'bg-gray-700 text-emerald-400' : 'bg-gray-800 text-white'
                      }`}
                    >
                      {key === 'del' ? <Delete /> : key}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-6 py-4 text-gray-400 font-bold">隱藏計算機</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-bold">資金帳戶</span>
        </button>
        <div className="relative -top-8 w-1/3 flex justify-center">
          <button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8] active:scale-95 transition-transform`}>
            <Plus size={40} />
          </button>
        </div>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-bold">我的帳本</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
