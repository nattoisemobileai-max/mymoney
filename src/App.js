import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Settings, Utensils, Car, GraduationCap, Coffee, ShoppingBag, 
  Delete, Mic, Camera, Landmark, PieChart, BookOpen, Music, Calendar, Trash2
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  
  // 核心數據與設定
  const [records, setRecords] = useState([
    { type: 'expense', amount: 2290, category: '餐飲', id: 1, color: '#C5B358', date: '2026-05-03' },
    { type: 'expense', amount: 1270, category: '教育', id: 2, color: '#778899', date: '2026-05-03' }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    categories: ['餐飲', '交通', '教育', '補習', '咖啡', '購物']
  });

  // 初始狀態包含預設今天日期
  const getToday = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({ 
    amount: '0', 
    category: '餐飲', 
    payment: '現金', 
    note: '', 
    date: getToday()
  });
  
  const [calcExpr, setCalcExpr] = useState('');

  // 儲存邏輯
  const handleSave = () => {
    if (parseFloat(formData.amount) === 0 || formData.amount === '0') {
      alert("⚠️ 金額不能為 0，請輸入有效數值！");
      return;
    }
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now(), color: '#3498db' };
    setRecords([newRecord, ...records]);
    alert("✅ 儲存成功！");
    setShowInputPage(false);
    // 重置表格但保留今天日期
    setFormData({ ...formData, amount: '0', note: '', date: getToday() });
  };

  const handleCalcInput = (val) => {
    if (val === 'C') { setCalcExpr(''); return; }
    if (val === 'del') { setCalcExpr(calcExpr.slice(0, -1)); return; }
    if (val === '=') {
      try { setFormData({ ...formData, amount: eval(calcExpr).toString() }); setShowCalc(false); setCalcExpr(''); } catch { setCalcExpr('Error'); }
      return;
    }
    setCalcExpr(calcExpr + val);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-sm flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-lg tracking-tight">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90 transition-transform">
          <Menu size={24} />
        </button>
      </div>

      <main className="p-4 space-y-5">
        {activeTab === 'home' && (
          <div className="space-y-5 animate-in fade-in duration-500">
            <div className="flex items-center justify-between px-2 pt-2">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"><ChevronLeft size={20}/></button>
              <h2 className="text-xl font-black text-gray-800">4月明細</h2>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"><ChevronRight size={20}/></button>
            </div>

            {/* 圓環統計圖與快捷按鈕內容 (略，保持同前一版本樣式) */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-6">
              <div className="relative w-32 h-32 rounded-full border-[12px] border-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[12px] border-[#C5B358]" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)' }}></div>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-bold text-gray-400">總支出</p>
                <p className="text-2xl font-black text-[#8B4513]">- HKD {records.reduce((s,r)=>s+r.amount,0).toLocaleString()}</p>
                <p className="text-xs font-bold text-gray-400">預算使用率 14%</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 新增支出頁面 - 核心修改處 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col animate-in slide-in-from-bottom duration-300 overflow-y-auto pb-40">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black shadow-sm active:scale-95 transition-transform">儲存</button>
          </div>

          <div className="p-6 space-y-8">
            {/* 1. Date Selection (Default: Today) */}
            <section className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <label className="text-xs font-black text-gray-400 mb-2 block uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-blue-500"/> Date / 日期
              </label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full text-lg font-bold bg-transparent outline-none text-gray-800 cursor-pointer"
              />
            </section>

            {/* 2. Amount */}
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block underline decoration-red-500 decoration-4 uppercase tracking-tighter">
                * Amount (HKD)
              </label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] text-5xl font-black text-right shadow-inner text-gray-800 active:bg-gray-50 transition-colors">
                {formData.amount}
              </div>
            </section>

            {/* 3. Category Selection */}
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block uppercase tracking-wider">
                {inputType === 'expense' ? 'Category / 分類' : 'Source / 來源'}
              </label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {(inputType === 'expense' ? currentSettings.categories : ['ATM', '八達通', 'AlipayHK']).map(name => (
                  <button key={name} onClick={() => setFormData({...formData, category: name})} className={`px-8 py-4 rounded-2xl border-2 whitespace-nowrap font-black transition-all ${formData.category === name ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400'}`}>
                    {name}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. Remarks Section */}
            <section className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <label className="text-xs font-black text-gray-400 mb-3 block uppercase tracking-[0.2em]">Remarks / 備註</label>
              <textarea 
                placeholder="在此輸入詳情..."
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                className="w-full bg-[#F9F9F6] p-4 rounded-2xl outline-none font-bold text-gray-700 min-h-[100px] border border-transparent focus:border-blue-200 transition-all"
              />
            </section>
          </div>

          {/* 計算機彈窗 (保持不變) */}
          {showCalc && (
            <div className="fixed inset-0 bg-black/70 z-[80] flex items-end">
              <div className="bg-[#121212] w-full p-8 rounded-t-[3.5rem] shadow-2xl">
                <div className="text-right text-white text-5xl font-mono mb-8 p-4 flex justify-end border-b border-gray-800">{calcExpr || '0'}</div>
                <div className="grid grid-cols-4 gap-4">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(k => (
                    <button key={k} onClick={()=>handleCalcInput(k)} className={`h-16 rounded-xl font-black text-xl transition-all active:scale-90 ${k === '=' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'}`}>
                      {k === 'del' ? <Delete size={20} className="mx-auto"/> : k}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-6 text-gray-500 font-bold tracking-widest uppercase">Close</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 底部導航與設定頁面 (略，保持同前一版本邏輯) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-4 z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-300'}`}><Download size={24}/><span className="text-[10px] mt-1 font-black">我的帳本</span></button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 ${activeTab === 'wallet' ? 'text-blue-500' : 'text-gray-300'}`}><Wallet size={24}/><span className="text-[10px] mt-1 font-black">明細</span></button>
        <div className="relative -top-10 w-1/5 flex justify-center">
          <button onClick={() => { setInputType(activeTab === 'wallet' ? 'income' : 'expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={40} /></button>
        </div>
        <button className="flex flex-col items-center w-1/4 text-gray-300"><PieChart size={24}/><span className="text-[10px] mt-1 font-black">投資</span></button>
        <button onClick={() => setShowSettingsModal(true)} className="flex flex-col items-center w-1/4 text-gray-300"><Settings size={24}/><span className="text-[10px] mt-1 font-black">管理</span></button>
      </nav>
    </div>
  );
};

export default App;
