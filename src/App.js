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
  
  // 核心數據
  const [records, setRecords] = useState([
    { type: 'expense', amount: 2290, category: '餐飲', id: 1, color: '#C5B358', date: '2026-05-02' },
    { type: 'expense', amount: 1270, category: '教育', id: 2, color: '#778899', date: '2026-05-02' }
  ]);

  // 設定狀態
  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    categories: ['餐飲', '交通', '教育', '補習', '咖啡', '購物']
  });

  const [formData, setFormData] = useState({ 
    amount: '0', 
    category: '餐飲', 
    payment: '現金', 
    note: '', 
    date: new Date().toISOString().split('T')[0] // 預設 Today
  });
  
  const [calcExpr, setCalcExpr] = useState('');
  const [newCatInput, setNewCatInput] = useState('');

  // 儲存邏輯 (含驗證與提示)
  const handleSave = () => {
    if (parseFloat(formData.amount) === 0 || formData.amount === '0') {
      alert("⚠️ 金額不能為 0，請輸入有效數值！");
      return;
    }
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now(), color: '#3498db' };
    setRecords([newRecord, ...records]);
    alert("✅ 儲存成功！");
    setShowInputPage(false);
    setFormData({ ...formData, amount: '0', note: '' });
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
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-sm flex justify-between items-center transition-all`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-lg tracking-tight">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90 transition-transform">
          <Menu size={24} />
        </button>
      </div>

      <main className="p-4 space-y-5">
        {activeTab === 'home' && (
          <>
            {/* 頂部月份與圓環圖 (保持原樣) */}
            <div className="flex items-center justify-between px-2 pt-2">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"><ChevronLeft size={20}/></button>
              <h2 className="text-xl font-black text-gray-800">4月明細</h2>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"><ChevronRight size={20}/></button>
            </div>

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

            {/* 恢復快捷按鈕 */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white p-4 rounded-2xl flex items-center gap-3 border border-gray-100 shadow-sm"><Mic className="text-amber-500"/><span className="font-bold text-sm">一語記帳</span></button>
              <button className="bg-white p-4 rounded-2xl flex items-center gap-3 border border-gray-100 shadow-sm"><Camera className="text-blue-500"/><span className="font-bold text-sm">拍照備存</span></button>
            </div>
          </>
        )}
      </main>

      {/* 新增支出頁面 (優化內容) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col animate-in slide-in-from-bottom duration-300 overflow-y-auto pb-40">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          <div className="p-6 space-y-8">
            {/* 1. 日期選擇 Today */}
            <section className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <label className="text-sm font-black text-gray-400 mb-2 block uppercase tracking-widest flex items-center gap-2"><Calendar size={14}/> Today</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full text-lg font-bold bg-transparent outline-none text-gray-700"
              />
            </section>

            {/* 2. 金額 */}
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block underline decoration-red-500 decoration-4">* 金額 (HKD)</label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] text-5xl font-black text-right shadow-inner">{formData.amount}</div>
            </section>

            {/* 3. 分類與備註 (新增 Remark 於分類下) */}
            <section className="space-y-6">
              <div>
                <label className="text-xl font-black text-gray-700 mb-4 block uppercase tracking-wider">{inputType === 'expense' ? '支出分類' : '收入來源'}</label>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {(inputType === 'expense' ? currentSettings.categories : ['ATM', '八達通', 'AlipayHK']).map(name => (
                    <button key={name} onClick={() => setFormData({...formData, category: name})} className={`px-8 py-4 rounded-2xl border-2 whitespace-nowrap font-black transition-all ${formData.category === name ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400'}`}>{name}</button>
                  ))}
                </div>
              </div>

              <div className="bg-[#F5F5F0] p-5 rounded-3xl">
                <label className="text-xs font-black text-gray-400 mb-2 block uppercase">Remark (備註)</label>
                <input 
                  type="text" 
                  placeholder="點此輸入備註內容..."
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full bg-transparent outline-none font-bold text-gray-700"
                />
              </div>
            </section>
          </div>

          {/* 計算機保持不變... */}
          {showCalc && (
            <div className="fixed inset-0 bg-black/70 z-[80] flex items-end">
              <div className="bg-[#121212] w-full p-8 rounded-t-[3.5rem]">
                <div className="text-right text-white text-5xl font-mono mb-8 p-4 flex justify-end">{calcExpr || '0'}</div>
                <div className="grid grid-cols-4 gap-4">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(k => (
                    <button key={k} onClick={()=>handleCalcInput(k)} className="h-14 rounded-xl bg-gray-900 text-white font-black text-xl">{k}</button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-6 text-gray-500 font-bold">HIDE</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 設定頁面 (新增分類管理功能) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-black text-gray-800">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <div className="flex-1 space-y-10 overflow-y-auto">
              {/* 分類管理區 */}
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">支出分類管理</label>
                <div className="space-y-2 mb-4">
                  {currentSettings.categories.map(cat => (
                    <div key={cat} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                      <span className="font-bold text-gray-700">{cat}</span>
                      <button onClick={() => setCurrentSettings({...currentSettings, categories: currentSettings.categories.filter(c => c !== cat)})} className="text-red-400"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="新增分類..." 
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    className="flex-1 bg-gray-100 p-3 rounded-xl font-bold outline-none"
                  />
                  <button 
                    onClick={() => { if(newCatInput) { setCurrentSettings({...currentSettings, categories: [...currentSettings.categories, newCatInput]}); setNewCatInput(''); } }}
                    className="bg-emerald-500 text-white px-4 rounded-xl font-black"
                  >+</button>
                </div>
              </section>

              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">語言 Language</label>
                <div className="grid grid-cols-2 gap-3">
                  {['繁體中文', 'English', '日本語', 'Deutsch', 'Español'].map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-4 rounded-xl border-2 font-bold text-xs ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-50'}`}>{lang}</button>
                  ))}
                </div>
              </section>
            </div>
            <button onClick={() => setShowSettingsModal(false)} className={`w-full py-5 ${currentSettings.themeColor} text-white rounded-[2.5rem] text-xl font-black mt-4 shadow-lg active:scale-95 transition-all`}>完成</button>
          </div>
        </div>
      )}

      {/* 底部導航保持不變... */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-4 z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-300'}`}><Download size={24}/><span className="text-[10px] mt-1 font-black">我的帳本</span></button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'wallet' ? 'text-blue-500' : 'text-gray-300'}`}><Wallet size={24}/><span className="text-[10px] mt-1 font-black">明細</span></button>
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
