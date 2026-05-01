import React, { useState, useEffect } from 'react';
import { Mic, Camera, Download, Wallet, Settings, Home, Menu, ChevronDown, Check, Plus, X, Trash2, Globe, Palette, Coins, BarChart3 } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [timeRange, setTimeRange] = useState('all'); // 'all' or 'month'
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('my_ledger_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentSettings, setCurrentSettings] = useState(() => {
    const saved = localStorage.getItem('my_app_settings');
    return saved ? JSON.parse(saved) : {
      themeColor: 'bg-emerald-500',
      language: 'zh-Hant',
      currency: 'HKD ($)'
    };
  });

  const [tempSettings, setTempSettings] = useState({ ...currentSettings });

  useEffect(() => {
    localStorage.setItem('my_ledger_data', JSON.stringify(transactions));
    localStorage.setItem('my_app_settings', JSON.stringify(currentSettings));
  }, [transactions, currentSettings]);

  // --- 數據過濾與計算 ---
  const filteredTransactions = transactions.filter(t => {
    if (timeRange === 'all') return true;
    const date = new Date(t.timestamp);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const totalExpense = filteredTransactions.filter(i => i.type === 'expense').reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalIncome = filteredTransactions.filter(i => i.type === 'income').reduce((acc, cur) => acc + Number(cur.amount), 0);

  const categories = [
    { name: '飲食', color: '#f59e0b' }, // 橘黃
    { name: '交通', color: '#ef4444' }, // 紅
    { name: '娛樂', color: '#06b6d4' }, // 青藍
    { name: '其他', color: '#10b981' }  // 綠
  ];

  const categoryData = categories.map(cat => {
    const amount = filteredTransactions
      .filter(i => i.type === 'expense' && i.category === cat.name)
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
    return { ...cat, amount };
  });

  // 生成圓環圖的 CSS Conic Gradient
  const generatePieStyle = () => {
    let currentPercentage = 0;
    const gradients = categoryData.map(cat => {
      if (totalExpense === 0) return '';
      const percentage = (cat.amount / totalExpense) * 100;
      const start = currentPercentage;
      currentPercentage += percentage;
      return `${cat.color} ${start}% ${currentPercentage}%`;
    }).filter(g => g !== '').join(', ');

    return totalExpense > 0 
      ? { background: `conic-gradient(${gradients})` }
      : { background: '#e5e7eb' };
  };

  // --- 手動輸入頁面邏輯 ---
  const [formData, setFormData] = useState({ amount: '', note: '', category: '飲食' });
  const [displayAmount, setDisplayAmount] = useState('');

  const calculateInput = (val) => {
    setDisplayAmount(val);
    try {
      const sanitized = val.replace(/[^-+*/0-9.]/g, '');
      if (sanitized) {
        const result = eval(sanitized);
        if (isFinite(result)) setFormData({ ...formData, amount: result });
      }
    } catch (e) {}
  };

  const handleSave = () => {
    if (!formData.amount || formData.amount <= 0) return alert("請輸入有效金額");
    const type = activeTab === 'wallet' ? 'income' : 'expense';
    setTransactions([{ 
      id: Date.now(), 
      timestamp: new Date().toISOString(), 
      ...formData, 
      type, 
      date: new Date().toLocaleDateString() 
    }, ...transactions]);
    setFormData({ amount: '', note: '', category: '飲食' });
    setDisplayAmount('');
    setShowInputPage(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-24 font-sans">
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end">
          <div className="bg-white w-3/4 max-w-sm h-full shadow-xl p-6 flex flex-col animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2"><Settings /> 設定</h2>
              <button onClick={() => setShowSettingsModal(false)}><X /></button>
            </div>
            <div className="flex-1 space-y-8">
              <section>
                <label className="text-sm font-bold text-gray-500 mb-3 block">語言 / Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {['zh-Hant', 'English'].map(l => (
                    <button key={l} onClick={() => setTempSettings({...tempSettings, language: l})} className={`p-2 rounded-lg border text-xs ${tempSettings.language === l ? 'bg-emerald-500 text-white' : 'bg-gray-50'}`}>{l}</button>
                  ))}
                </div>
              </section>
              <section>
                <label className="text-sm font-bold text-gray-500 mb-3 block">主題色</label>
                <div className="flex gap-4">
                  {['bg-emerald-500', 'bg-blue-500', 'bg-slate-800'].map(c => (
                    <button key={c} onClick={() => setTempSettings({...tempSettings, themeColor: c})} className={`w-10 h-10 rounded-full ${c} border-4 ${tempSettings.themeColor === c ? 'border-gray-300' : 'border-transparent'}`} />
                  ))}
                </div>
              </section>
            </div>
            <div className="pt-6 border-t space-y-3">
              <button onClick={() => { setCurrentSettings(tempSettings); setShowSettingsModal(false); }} className={`w-full py-3 ${tempSettings.themeColor} text-white rounded-xl font-bold`}>Confirm</button>
              <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(false); }} className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {/* 頂部導航 - 已移除左側標籤 */}
      <div className={`${currentSettings.themeColor} text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center`}>
        <div className="w-10"></div> {/* 佔位保持標題居中 */}
        <h1 className="font-bold tracking-tight text-lg">我的帳本</h1>
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} className="w-10 flex justify-end"><Menu size={24} /></button>
      </div>

      <main className="p-4 space-y-4">
        {activeTab === 'home' && (
          <>
            {/* 時間範圍選擇 */}
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <button onClick={() => setTimeRange('all')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${timeRange === 'all' ? currentSettings.themeColor + ' text-white shadow-sm' : 'text-gray-400'}`}>全部紀錄 (All)</button>
              <button onClick={() => setTimeRange('month')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${timeRange === 'month' ? currentSettings.themeColor + ' text-white shadow-sm' : 'text-gray-400'}`}>本月紀錄 (Month)</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500 p-4 rounded-2xl text-white shadow-sm">
                <div className="text-xs opacity-80">期間支出</div>
                <div className="text-lg font-bold">{currentSettings.currency.split(' ')[0]} ${totalExpense.toLocaleString()}</div>
              </div>
              <div className={`${currentSettings.themeColor} p-4 rounded-2xl text-white shadow-sm`}>
                <div className="text-xs opacity-80">期間收入</div>
                <div className="text-lg font-bold">{currentSettings.currency.split(' ')[0]} ${totalIncome.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all"><Mic className="text-emerald-500 mb-2" size={28} /><span className="text-sm font-bold text-gray-700">一語記帳</span></button>
              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all"><Camera className="text-emerald-500 mb-2" size={28} /><span className="text-sm font-bold text-gray-700">拍照記存</span></button>
            </div>

            {/* 分類統計 - 圓環圖 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 mb-6 font-bold text-gray-800">
                 <BarChart3 size={20} className="text-gray-400" /> 
                 <span>分類統計</span>
               </div>
               
               <div className="flex flex-col items-center">
                 <div className="relative w-48 h-48 rounded-full mb-8 flex items-center justify-center shadow-inner" style={generatePieStyle()}>
                   {/* 中間挖空的圓形 */}
                   <div className="absolute w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                     <span className="text-[10px] text-gray-400 uppercase font-bold">Total</span>
                     <span className="text-lg font-black text-gray-800">${totalExpense}</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full px-2">
                    {categoryData.map(cat => (
                      <div key={cat.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                          <span className="text-xs font-medium text-gray-600">{cat.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-800">${cat.amount}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </>
        )}
      </main>

      {/* 手動輸入頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${currentSettings.themeColor} p-4 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)}><X size={24} /></button>
            <span className="font-bold">新增帳目</span>
            <button onClick={handleSave} className="bg-white text-emerald-600 px-5 py-1.5 rounded-full font-bold shadow-sm">儲存</button>
          </div>
          <div className="p-6 space-y-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">金額</label>
              <input type="text" value={displayAmount} onChange={(e) => calculateInput(e.target.value)} placeholder="0.00" className="w-full text-4xl font-bold bg-transparent outline-none py-2" />
              {displayAmount.match(/[+*/-]/) && <div className="text-emerald-600 font-bold text-sm mt-1">計算結果: {formData.amount}</div>}
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wider">分類</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none">
                  {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wider">備註</label>
                <input type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="備註..." className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 ${activeTab === 'wallet' ? 'text-emerald-500' : 'text-gray-400'}`}><Wallet size={20}/><span className="text-[10px] mt-1 font-medium">資金帳戶</span></button>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 ${activeTab === 'home' ? 'text-emerald-500' : 'text-gray-400'}`}><Download size={20}/><span className="text-[10px] mt-1 font-medium">我的帳本</span></button>
        <div className="relative -top-5">
          <button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-all`}>
            <Plus size={32} />
          </button>
        </div>
        <button className="flex flex-col items-center w-1/4 text-gray-400"><Home size={20}/><span className="text-[10px] mt-1 font-medium">固定開支</span></button>
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} className="flex flex-col items-center w-1/4 text-gray-400"><Settings size={20}/><span className="text-[10px] mt-1 font-medium">系統設定</span></button>
      </nav>
    </div>
  );
};

export default App;
