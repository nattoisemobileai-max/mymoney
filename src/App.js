import React, { useState, useEffect } from 'react';
import { Mic, Camera, Download, Wallet, Settings, Home, Menu, ChevronDown, Check, Plus, X, Trash2, Globe, Palette, Coins } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [themeColor, setThemeColor] = useState('bg-emerald-500');
  const [language, setLanguage] = useState('zh-Hant');
  const [currency, setCurrency] = useState('HKD ($)');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('my_ledger_data');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my_ledger_data', JSON.stringify(transactions));
  }, [transactions]);

  // --- 多語言字典 ---
  const i18n = {
    'zh-Hant': { home: '我的帳本', wallet: '資金帳戶', fixed: '固定開支', settings: '系統設定', income: '期間收入', expense: '期間支出', save: '儲存', amount: '金額', category: '分類', note: '備註' },
    'English': { home: 'My Ledger', wallet: 'Accounts', fixed: 'Fixed Bills', settings: 'Settings', income: 'Income', expense: 'Expenses', save: 'Save', amount: 'Amount', category: 'Category', note: 'Note' },
    'Spanish': { home: 'Mi Libro', wallet: 'Cuentas', fixed: 'Gastos Fijos', settings: 'Ajustes', income: 'Ingresos', expense: 'Gastos', save: 'Guardar', amount: 'Monto', category: 'Categoría', note: 'Nota' },
    '日文': { home: '私の家計簿', wallet: '資金口座', fixed: '固定費', settings: '設定', income: '収入', expense: '支出', save: '保存', amount: '金額', category: 'カテゴリ', note: '備考' }
  };
  const t = i18n[language];

  // --- 計算邏輯 ---
  const totalExpense = transactions.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const categoryTotals = { '交通': 0, '飲食': 0, '教育': 0, '娛樂': 0, '其他': 0 };
  transactions.forEach(item => { if (categoryTotals[item.category] !== undefined) categoryTotals[item.category] += Number(item.amount); });

  // --- 手動輸入頁面邏輯 (含簡易計算機) ---
  const [formData, setFormData] = useState({ amount: '', note: '', category: '飲食' });
  const [displayAmount, setDisplayAmount] = useState('');

  const calculateInput = (val) => {
    setDisplayAmount(val);
    try {
      // 僅允許數字與基礎運算符: + - * /
      const sanitized = val.replace(/[^-+*/0-9.]/g, '');
      if (sanitized) {
        // eslint-disable-next-line no-eval
        const result = eval(sanitized);
        if (isFinite(result)) setFormData({ ...formData, amount: result });
      }
    } catch (e) { /* 計算中不處理錯誤 */ }
  };

  const handleSave = () => {
    if (!formData.amount || formData.amount <= 0) return alert("請輸入有效金額");
    setTransactions([{ id: Date.now(), ...formData, date: new Date().toLocaleDateString() }, ...transactions]);
    setFormData({ amount: '', note: '', category: '飲食' });
    setDisplayAmount('');
    setShowInputPage(false);
  };

  // --- 設定選單組件 (置於右上角) ---
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end">
      <div className="bg-white w-3/4 max-w-sm h-full shadow-xl animate-in slide-in-from-right p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2"><Settings /> {t.settings}</h2>
          <button onClick={() => setShowSettingsModal(false)}><X /></button>
        </div>

        <div className="space-y-8">
          <section>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3"><Globe size={16}/> 語言 / Language</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(i18n).map(l => (
                <button key={l} onClick={() => setLanguage(l)} className={`p-2 rounded-lg border text-xs ${language === l ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-gray-50'}`}>{l}</button>
              ))}
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3"><Palette size={16}/> 主題色 / Theme</label>
            <div className="flex gap-4">
              {['bg-emerald-500', 'bg-blue-500', 'bg-slate-800'].map(c => (
                <button key={c} onClick={() => setThemeColor(c)} className={`w-10 h-10 rounded-full ${c} border-4 ${themeColor === c ? 'border-gray-300' : 'border-transparent'}`} />
              ))}
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3"><Coins size={16}/> 預設貨幣 / Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 outline-none">
              <option>HKD ($)</option><option>USD ($)</option><option>EUR (€)</option><option>JPY (¥)</option><option>TWD ($)</option>
            </select>
          </section>

          <button onClick={() => { if(window.confirm("確定清空數據?")) setTransactions([]); }} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 border border-red-100 mt-10"><Trash2 size={18}/> 清除所有紀錄</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-24 font-sans">
      {showSettingsModal && <SettingsModal />}
      
      {/* 頂部導航 */}
      <div className={`${themeColor} text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center transition-colors duration-500`}>
        <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full"><Home size={16} /> <span className="text-sm">{t.home}</span></div>
        <h1 className="font-bold tracking-tight">{t.home}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="p-1 active:scale-90 transition-transform"><Menu size={24} /></button>
      </div>

      <main className="p-4 space-y-4">
        {activeTab === 'home' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500 p-4 rounded-2xl text-white shadow-sm">
                <div className="text-xs opacity-80">{t.expense}</div>
                <div className="text-lg font-bold">{currency.split(' ')[0]} ${totalExpense.toLocaleString()}</div>
              </div>
              <div className={`${themeColor} p-4 rounded-2xl text-white shadow-sm transition-colors`}>
                <div className="text-xs opacity-80">{t.income}</div>
                <div className="text-lg font-bold">{currency.split(' ')[0]} $0</div>
              </div>
            </div>
            {/* 分類統計區域保持不變 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold mb-4 border-l-4 border-emerald-500 pl-2">分類統計</h3>
               <div className="space-y-4">
                 {Object.entries(categoryTotals).map(([name, val]) => (
                   <div key={name}>
                     <div className="flex justify-between text-xs mb-1"><span>{name}</span><span className="font-bold text-red-500">-{currency.split(' ')[0]} {val.toLocaleString()}</span></div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <div className={`${themeColor} h-full transition-all duration-700`} style={{ width: `${totalExpense > 0 ? (val/totalExpense)*100 : 0}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </>
        )}
        {activeTab === 'wallet' && (
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-gray-800 mb-4">{t.wallet}</h2>
            {['銀行提取現金', '八達通', 'Alipay HK', 'PayMe'].map(item => (
              <div key={item} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition-all active:bg-gray-50">
                <span className="font-medium text-gray-700">{item}</span>
                <span className="text-emerald-600 font-bold">{currency.split(' ')[0]} $0</span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 手動輸入頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${themeColor} p-4 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)}><X size={24} /></button>
            <span className="font-bold">新增手動帳目</span>
            <button onClick={handleSave} className="bg-white text-emerald-600 px-5 py-1.5 rounded-full font-bold shadow-sm active:scale-95 transition-transform">{t.save}</button>
          </div>
          <div className="p-6 space-y-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">{t.amount}</label>
              <input type="text" value={displayAmount} onChange={(e) => calculateInput(e.target.value)} placeholder="0.00" className="w-full text-4xl font-bold bg-transparent outline-none py-2" />
              {displayAmount.match(/[+*/-]/) && (
                <div className="text-emerald-600 font-bold text-sm mt-1 animate-pulse">即時計算結果: {currency.split(' ')[0]} ${formData.amount}</div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wider">{t.category}</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-500/20">
                  {Object.keys(categoryTotals).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wider">{t.note}</label>
                <input type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="輸入備註..." className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 z-20 shadow-lg">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}><Wallet size={20}/><span className="text-[10px] mt-1 font-medium">{t.wallet}</span></button>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}><Download size={20}/><span className="text-[10px] mt-1 font-medium">{t.home}</span></button>
        <div className="relative -top-5"><button onClick={() => setShowInputPage(true)} className={`${themeColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-all`}><Plus size={32} /></button></div>
        <button className="flex flex-col items-center w-1/4 text-gray-400 opacity-50"><Settings size={20}/><span className="text-[10px] mt-1 font-medium">{t.fixed}</span></button>
        <button className="flex flex-col items-center w-1/4 text-gray-400 opacity-50"><Check size={20}/><span className="text-[10px] mt-1 font-medium">{t.settings}</span></button>
      </nav>
    </div>
  );
};

export default App;
