import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Settings, Utensils, Car, GraduationCap, Coffee, ShoppingBag, 
  Delete, Mic, Camera, Landmark, PieChart, TrendingDown, TrendingUp
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  
  const [records, setRecords] = useState([
    { type: 'expense', amount: 1152, category: '購物', id: 1 },
    { type: 'expense', amount: 1051, category: '餐飲', id: 2 },
    { type: 'expense', amount: 250, category: '補習', id: 3 },
    { type: 'income', amount: 5000, category: 'ATM', id: 4 }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace'
  });

  const [formData, setFormData] = useState({ amount: '0', category: '飲食', payment: '現金', note: '' });
  const [calcExpr, setCalcExpr] = useState('');

  // 計算邏輯
  const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + Number(r.amount), 0);
  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + Number(r.amount), 0);

  const handleSave = () => {
    const newRecord = { ...formData, type: inputType, id: Date.now() };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setFormData({ amount: '0', category: '飲食', payment: '現金', note: '' });
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
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center transition-all`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-xl tracking-tight">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90 transition-transform">
          <Menu size={28} />
        </button>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            {/* 復刻日曆 */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 px-2 bg-white rounded-3xl border border-gray-100 shadow-sm">
               {[...Array(7)].map((_, i) => (
                 <div key={i} className={`flex-shrink-0 w-[68px] h-[95px] rounded-2xl border-2 flex flex-col items-center justify-center ${i===3 ? 'bg-[#3498db] text-white border-[#3498db] shadow-md scale-105' : 'bg-white text-gray-400 border-gray-50'}`}>
                   <span className="text-[9px] font-bold opacity-70">DAY {i+1}</span>
                   <span className="text-xl font-black">5/{10+i}</span>
                   <span className="text-[10px] font-bold">二</span>
                 </div>
               ))}
            </div>

            {/* 一語記帳 & 拍照備存 */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white border border-gray-100 p-5 rounded-[2rem] flex flex-col items-center gap-2 shadow-sm active:bg-gray-50 transition-all">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><Mic size={24} /></div>
                <span className="font-bold text-sm text-gray-600">一語記帳</span>
              </button>
              <button className="bg-white border border-gray-100 p-5 rounded-[2rem] flex flex-col items-center gap-2 shadow-sm active:bg-gray-50 transition-all">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Camera size={24} /></div>
                <span className="font-bold text-sm text-gray-600">拍照備存</span>
              </button>
            </div>

            {/* 圓環圖分析區塊 (復刻圖片樣式) */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
              <div className="text-center">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">總消費分析</p>
                <h2 className="text-3xl font-black text-blue-600">HKD {totalExpense.toLocaleString()}</h2>
                <p className="text-[10px] text-gray-400 mt-1 font-bold">涵蓋了最近的支出類別比例</p>
              </div>

              {/* 圖表展示區 */}
              <div className="flex flex-col items-center gap-6 py-4">
                {/* 模擬圓環圖 */}
                <div className="relative w-40 h-40 rounded-full border-[15px] border-orange-500 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[15px] border-yellow-400" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-[15px] border-emerald-400" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 80%)' }}></div>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <PieChart className="text-gray-200" size={32} />
                  </div>
                </div>

                {/* 類別比例 (文字標籤) */}
                <div className="w-full grid grid-cols-1 gap-4 text-sm">
                  <div className="flex justify-between items-center border-l-4 border-orange-500 pl-3">
                    <div><span className="font-black text-gray-700">購物與娛樂</span><p className="text-[10px] text-gray-400">約 47%</p></div>
                    <span className="font-mono font-bold">$1,152.10</span>
                  </div>
                  <div className="flex justify-between items-center border-l-4 border-yellow-400 pl-3">
                    <div><span className="font-black text-gray-700">餐飲飲品</span><p className="text-[10px] text-gray-400">約 43%</p></div>
                    <span className="font-mono font-bold">$1,051.00</span>
                  </div>
                  <div className="flex justify-between items-center border-l-4 border-emerald-400 pl-3">
                    <div><span className="font-black text-gray-700">補習/其他</span><p className="text-[10px] text-gray-400">約 10%</p></div>
                    <span className="font-mono font-bold">$250.00</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 新增收入/支出頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center shadow-lg`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black active:scale-95 transition-all">儲存</button>
          </div>

          <div className="p-6 space-y-10 overflow-y-auto">
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block underline decoration-red-500 decoration-4 uppercase">* 金額 (HKD)</label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] text-5xl font-black text-right shadow-inner">{formData.amount}</div>
            </section>

            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block underline decoration-blue-500 decoration-4 uppercase">{inputType === 'expense' ? '支出分類' : '收入來源'}</label>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {(inputType === 'expense' 
                  ? ['飲食', '交通', '補習', '咖啡', '購物'] 
                  : ['ATM', '八達通', 'AlipayHK']
                ).map(name => (
                  <button key={name} onClick={() => setFormData({...formData, category: name})} className={`px-10 py-5 rounded-2xl border-2 whitespace-nowrap font-black text-lg transition-all ${formData.category === name ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400'}`}>
                    {name}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 計算機 */}
          {showCalc && (
            <div className="fixed inset-0 bg-black/70 z-[80] flex items-end">
              <div className="bg-[#121212] w-full p-8 rounded-t-[3.5rem] shadow-2xl">
                <div className="text-right text-white text-5xl font-mono mb-8 p-4 h-24 flex items-center justify-end border-b border-gray-800">{calcExpr || '0'}</div>
                <div className="grid grid-cols-4 gap-4">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(key => (
                    <button key={key} onClick={() => handleCalcInput(key)} className={`h-16 rounded-[1.5rem] text-2xl font-black transition-all active:scale-90 ${key === '=' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : ['+', '-', 'del', 'C'].includes(key) ? 'bg-gray-800 text-blue-400' : 'bg-gray-900 text-white'}`}>{key === 'del' ? <Delete /> : key}</button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-6 py-4 text-gray-500 font-bold tracking-widest">HIDE CALCULATOR</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 系統設定 (5國語言 + 3個風格) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <div className="flex-1 space-y-12 overflow-y-auto">
              <section>
                <label className="text-xs font-black text-gray-400 mb-5 block uppercase tracking-[0.2em]">語言選擇 Language</label>
                <div className="grid grid-cols-1 gap-3">
                  {['繁體中文', 'English', '日本語', 'Deutsch', 'Español'].map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-5 rounded-2xl border-2 font-black text-left transition-all ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-50 text-gray-400'}`}>{lang}</button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-xs font-black text-gray-400 mb-5 block uppercase tracking-[0.2em]">主題風格 Style</label>
                <div className="space-y-4">
                  {[
                    { name: '清新綠', color: 'bg-emerald-500' },
                    { name: '活力藍', color: 'bg-blue-600' },
                    { name: '高級黑', color: 'bg-zinc-900' }
                  ].map(t => (
                    <button key={t.name} onClick={() => setCurrentSettings({...currentSettings, themeColor: t.color})} className={`w-full p-5 rounded-2xl flex items-center gap-4 border-2 transition-all ${currentSettings.themeColor === t.color ? 'border-emerald-500 bg-emerald-50' : 'border-gray-50'}`}>
                      <div className={`w-8 h-8 rounded-full ${t.color} shadow-sm`}></div>
                      <span className="font-black text-gray-700">{t.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="pt-8 border-t space-y-4">
              <button onClick={() => setShowSettingsModal(false)} className={`w-full py-5 ${currentSettings.themeColor} text-white rounded-[2.5rem] text-xl font-black shadow-lg shadow-emerald-900/10 active:scale-95 transition-all`}>完成並保存</button>
              <button onClick={() => setShowSettingsModal(false)} className="w-full py-5 bg-gray-50 text-gray-400 rounded-[2.5rem] text-lg font-bold">取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-6 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'wallet' ? 'text-blue-500 scale-110' : 'text-gray-300'}`}>
          <Wallet size={28}/><span className="text-[10px] mt-1 font-black">資金帳戶</span>
        </button>
        
        <div className="relative -top-10 w-1/4 flex justify-center">
          <button 
            onClick={() => { setInputType(activeTab === 'wallet' ? 'income' : 'expense'); setShowInputPage(true); }} 
            className={`${activeTab === 'wallet' ? 'bg-blue-500' : currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-[8px] border-[#FDFCF8] active:scale-90 transition-all`}
          >
            <Plus size={42} />
          </button>
        </div>

        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-gray-300'}`}>
          <Download size={28}/><span className="text-[10px] mt-1 font-black">我的帳本</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
