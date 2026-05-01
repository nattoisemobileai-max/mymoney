import React, { useState, useEffect } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, 
  Menu, Settings, Utensils, Car, GraduationCap, Coffee, 
  ShoppingBag, Delete, Mic, Camera, Landmark, Smartphone, CreditCard
} from 'lucide-react';

const App = () => {
  // --- 基礎狀態 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  
  const [records, setRecords] = useState([
    { type: 'expense', amount: 500, category: '飲食', id: 1 },
    { type: 'income', amount: 1200, category: 'ATM', id: 2 }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace'
  });

  const [formData, setFormData] = useState({ amount: '0', category: '飲食', payment: '現金', note: '' });
  const [calcExpr, setCalcExpr] = useState('');

  // --- 1. 系統設定選項 ---
  const languages = ['繁體中文', 'English', '日本語', 'Deutsch', 'Español'];
  const themes = [
    { name: '翡翠綠', color: 'bg-emerald-500' },
    { name: '天空藍', color: 'bg-blue-500' },
    { name: '經典黑', color: 'bg-slate-800' }
  ];

  // --- 2. 計算邏輯 ---
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
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 px-2 bg-white rounded-3xl border border-gray-100">
               {[...Array(7)].map((_, i) => (
                 <div key={i} className={`flex-shrink-0 w-[65px] h-[90px] rounded-2xl border-2 flex flex-col items-center justify-center ${i===3 ? 'bg-[#3498db] text-white border-[#3498db]' : 'bg-white text-gray-400 border-gray-100'}`}>
                   <span className="text-[9px] font-bold">DAY {i+1}</span>
                   <span className="text-xl font-black">5/{10+i}</span>
                 </div>
               ))}
            </div>

            {/* 3. 恢復兩大主要功能 */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white border border-gray-100 p-6 rounded-[2rem] flex flex-col items-center gap-3 shadow-sm active:bg-gray-50">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><Mic size={24} /></div>
                <span className="font-bold text-gray-600">一語記帳</span>
              </button>
              <button className="bg-white border border-gray-100 p-6 rounded-[2rem] flex flex-col items-center gap-3 shadow-sm active:bg-gray-50">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Camera size={24} /></div>
                <span className="font-bold text-gray-600">拍照備存</span>
              </button>
            </div>

            {/* 4. 統計分析與 Bar Chart */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expense vs Income</p>
                    <div className="flex gap-4">
                      <span className="text-2xl font-black text-red-500">${totalExpense}</span>
                      <span className="text-2xl font-black text-emerald-500">${totalIncome}</span>
                    </div>
                  </div>
                </div>
                {/* Simple Bar Chart */}
                <div className="flex items-end gap-6 h-32 px-4">
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-red-100 rounded-t-xl relative overflow-hidden" style={{ height: '100%' }}>
                      <div className="absolute bottom-0 w-full bg-red-500 transition-all duration-500" style={{ height: `${(totalExpense/(totalExpense+totalIncome || 1))*100}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Exp</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-100 rounded-t-xl relative overflow-hidden" style={{ height: '100%' }}>
                      <div className="absolute bottom-0 w-full bg-emerald-500 transition-all duration-500" style={{ height: `${(totalIncome/(totalExpense+totalIncome || 1))*100}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Inc</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'wallet' && (
           <div className="text-center py-20 text-gray-400 font-bold">
             <Landmark size={60} className="mx-auto mb-4 opacity-20" />
             資金帳戶紀錄
           </div>
        )}
      </main>

      {/* 5. 新增收入/支出 頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto">
            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">* 金額 (HKD)</label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-4xl font-black text-right">{formData.amount}</div>
            </section>

            <section>
              <label className="text-xl font-black text-gray-700 mb-4 block">{inputType === 'expense' ? '支出分類' : '收入來源'}</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {(inputType === 'expense' 
                  ? ['飲食', '交通', '補習', '咖啡', '購物'] 
                  : ['ATM', '八達通', 'AlipayHK']
                ).map(name => (
                  <button key={name} onClick={() => setFormData({...formData, category: name})} className={`px-8 py-4 rounded-2xl border-2 whitespace-nowrap font-bold ${formData.category === name ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400'}`}>
                    {name}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 計算機 */}
          {showCalc && (
            <div className="fixed inset-0 bg-black/50 z-[80] flex items-end">
              <div className="bg-[#1e1e1e] w-full p-6 rounded-t-[3rem]">
                <div className="text-right text-white text-4xl font-mono mb-6 p-4 h-20 flex items-center justify-end">{calcExpr || '0'}</div>
                <div className="grid grid-cols-4 gap-3">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(key => (
                    <button key={key} onClick={() => handleCalcInput(key)} className={`h-14 rounded-xl text-xl font-black ${key === '=' ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-white'}`}>{key}</button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-4 text-gray-500 font-bold">DONE</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. 系統設定 (多語言 & 風格) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <div className="flex-1 space-y-10 overflow-y-auto">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">語言 Language</label>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-4 rounded-xl border-2 font-bold text-sm ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}>{lang}</button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">介面風格 Style</label>
                <div className="space-y-3">
                  {themes.map(t => (
                    <button key={t.name} onClick={() => setCurrentSettings({...currentSettings, themeColor: t.color})} className={`w-full p-4 rounded-xl flex items-center gap-4 border-2 ${currentSettings.themeColor === t.color ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}>
                      <div className={`w-6 h-6 rounded-full ${t.color}`}></div>
                      <span className="font-bold">{t.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="pt-8 border-t space-y-4">
              <button onClick={() => setShowSettingsModal(false)} className={`w-full py-5 ${currentSettings.themeColor} text-white rounded-[2rem] text-lg font-black`}>完成設定</button>
              <button onClick={() => setShowSettingsModal(false)} className="w-full py-5 bg-gray-100 text-gray-400 rounded-[2rem] text-lg font-bold">取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-bold">資金帳戶</span>
        </button>
        <div className="relative -top-8 w-1/3 flex justify-center">
          <button onClick={() => { setInputType(activeTab === 'wallet' ? 'income' : 'expense'); setShowInputPage(true); }} className={`${activeTab === 'wallet' ? 'bg-blue-500' : currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8] active:scale-95 transition-all`}>
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
