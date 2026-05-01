import React, { useState, useEffect } from 'react';
import { Mic, Camera, Download, Wallet, Settings, Home, Menu, ChevronDown, Check, Plus, X, Trash2, Globe, Palette, Coins } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // --- 持久化數據 ---
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('my_ledger_data');
    return saved ? JSON.parse(saved) : [];
  });

  // --- 設定暫存 (用於 Confirm/Cancel 機制) ---
  const [currentSettings, setCurrentSettings] = useState(() => {
    const saved = localStorage.getItem('my_app_settings');
    return saved ? JSON.parse(saved) : {
      themeColor: 'bg-emerald-500',
      language: 'zh-Hant',
      currency: 'HKD ($)'
    };
  });

  // 用於在 Setting Modal 中編輯的臨時狀態
  const [tempSettings, setTempSettings] = useState({ ...currentSettings });

  useEffect(() => {
    localStorage.setItem('my_ledger_data', JSON.stringify(transactions));
    localStorage.setItem('my_app_settings', JSON.stringify(currentSettings));
  }, [transactions, currentSettings]);

  // --- 多語言字典 ---
  const i18n = {
    'zh-Hant': { home: '我的帳本', wallet: '資金帳戶', fixed: '固定開支', settings: '系統設定', income: '期間收入', expense: '期間支出', save: '儲存', amount: '金額', category: '分類', note: '備註' },
    'English': { home: 'My Ledger', wallet: 'Accounts', fixed: 'Fixed Bills', settings: 'Settings', income: 'Income', expense: 'Expenses', save: 'Save', amount: 'Amount', category: 'Category', note: 'Note' },
    'Spanish': { home: 'Mi Libro', wallet: 'Cuentas', fixed: 'Gastos Fijos', settings: 'Ajustes', income: 'Ingresos', expense: 'Gastos', save: 'Guardar', amount: 'Monto', category: 'Categoría', note: 'Nota' },
    '日文': { home: '私の家計簿', wallet: '資金口座', fixed: '固定費', settings: '設定', income: '收入', expense: '支出', save: '保存', amount: '金額', category: 'カテゴリ', note: '備考' }
  };
  const t = i18n[currentSettings.language];

  // --- 計算邏輯 ---
  const totalExpense = transactions.filter(i => i.type === 'expense').reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalIncome = transactions.filter(i => i.type === 'income').reduce((acc, cur) => acc + Number(cur.amount), 0);
  
  const categoryTotals = { '交通': 0, '飲食': 0, '教育': 0, '娛樂': 0, '其他': 0 };
  transactions.filter(i => i.type === 'expense').forEach(item => { 
    if (categoryTotals[item.category] !== undefined) categoryTotals[item.category] += Number(item.amount); 
  });

  // --- 手動輸入頁面邏輯 ---
  const [formData, setFormData] = useState({ amount: '', note: '', category: '飲食' });
  const [displayAmount, setDisplayAmount] = useState('');

  const calculateInput = (val) => {
    setDisplayAmount(val);
    try {
      const sanitized = val.replace(/[^-+*/0-9.]/g, '');
      if (sanitized) {
        // eslint-disable-next-line no-eval
        const result = eval(sanitized);
        if (isFinite(result)) setFormData({ ...formData, amount: result });
      }
    } catch (e) {}
  };

  const handleSave = () => {
    if (!formData.amount || formData.amount <= 0) return alert("請輸入有效金額");
    const type = activeTab === 'wallet' ? 'income' : 'expense';
    setTransactions([{ id: Date.now(), ...formData, type, date: new Date().toLocaleDateString() }, ...transactions]);
    setFormData({ amount: '', note: '', category: '飲食' });
    setDisplayAmount('');
    setShowInputPage(false);
  };

  // --- 設定選單 (帶 Confirm/Cancel) ---
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end">
      <div className="bg-white w-3/4 max-w-sm h-full shadow-xl animate-in slide-in-from-right p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2"><Settings /> {t.settings}</h2>
          <button onClick={() => setShowSettingsModal(false)}><X /></button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto">
          <section>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3"><Globe size={16}/> 語言 / Language</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(i18n).map(l => (
                <button key={l} onClick={() => setTempSettings({...tempSettings, language: l})} className={`p-2 rounded-lg border text-xs ${tempSettings.language === l ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-gray-50'}`}>{l}</button>
              ))}
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3"><Palette size={16}/> 主題色 / Theme</label>
            <div className="flex gap-4">
              {['bg-emerald-500', 'bg-blue-500', 'bg-slate-800'].map(c => (
                <button key={c} onClick={() => setTempSettings({...tempSettings, themeColor: c})} className={`w-10 h-10 rounded-full ${c} border-4 ${tempSettings.themeColor === c ? 'border-gray-300' : 'border-transparent'}`} />
              ))}
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3"><Coins size={16}/> 預設貨幣 / Currency</label>
            <select value={tempSettings.currency} onChange={(e) => setTempSettings({...tempSettings, currency: e.target.value})} className="w-full p-2 border rounded-lg bg-gray-50 outline-none">
              <option>HKD ($)</option><option>USD ($)</option><option>JPY (¥)</option>
            </select>
          </section>
        </div>

        <div className="pt-6 border-t space-y-3">
          <button onClick={() => { setCurrentSettings(tempSettings); setShowSettingsModal(false); }} className={`w-full py-3 ${tempSettings.themeColor} text-white rounded-xl font-bold shadow-lg`}>Confirm (套用修改)</button>
          <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(false); }} className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">Cancel (取消)</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-24 font-sans">
      {showSettingsModal && <SettingsModal />}
      
      <div className={`${currentSettings.themeColor} text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center`}>
        <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full"><Home size={16} /> <span className="text-sm">{t.home}</span></div>
        <h1 className="font-bold tracking-tight">{t.home}</h1>
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }}><Menu size={24} /></button>
      </div>

      <main className="p-4 space-y-4">
        {activeTab === 'home' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500 p-4 rounded-2xl text-white shadow-sm">
                <div className="text-xs opacity-80">{t.expense}</div>
                <div className="text-lg font-bold">{currentSettings.currency.split(' ')[0]} ${totalExpense.toLocaleString()}</div>
              </div>
              <div className={`${currentSettings.themeColor} p-4 rounded-2xl text-white shadow-sm`}>
                <div className="text-xs opacity-80">{t.income}</div>
                <div className="text-lg font-bold">{currentSettings.currency.split(' ')[0]} ${totalIncome.toLocaleString()}</div>
              </div>
            </div>

            {/* 新增回歸的兩大功能按鈕 */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all">
                <Mic className="text-emerald-500 mb-2" size={28} />
                <span className="text-sm font-bold text-gray-700">一語記帳</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all">
                <Camera className="text-emerald-500 mb-2" size={28} />
                <span className="text-sm font-bold text-gray-700">拍照記存</span>
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold mb-4 border-l-4 border-emerald-500 pl-2">分類統計</h3>
               <div className="space-y-4">
                 {Object.entries(categoryTotals).map(([name, val]) => (
                   <div key={name}>
                     <div className="flex justify-between text-xs mb-1"><span>{name}</span><span className="font-bold text-red-500">-{val.toLocaleString()}</span></div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <div className={`${currentSettings.themeColor} h-full transition-all`} style={{ width: `${totalExpense > 0 ? (val/totalExpense)*100 : 0}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </>
        )}

        {activeTab === 'wallet' && (
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-gray-800 mb-4">{t.wallet} (點擊下方 + 號存入收入)</h2>
            {['銀行提取現金', '八達通', 'Alipay HK', 'PayMe'].map(item => (
              <div key={item} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <span className="font-medium text-gray-700">{item}</span>
                <span className="text-emerald-600 font-bold">{currentSettings.currency.split(' ')[0]} $0</span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 手動輸入頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${currentSettings.themeColor} p-4 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)}><X size={24} /></button>
            <span className="font-bold">新增{activeTab === 'wallet' ? '收入' : '支出'}</span>
            <button onClick={handleSave} className="bg-white text-emerald-600 px-5 py-1.5 rounded-full font-bold shadow-sm">{t.save}</button>
          </div>
          <div className="p-6 space-y-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <label className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">{t.amount}</label>
              <input type="text" value={displayAmount} onChange={(e) => calculateInput(e.target.value)} placeholder="0.00" className="w-full text-4xl font-bold bg-transparent outline-none py-2" />
              {displayAmount.match(/[+*/-]/) && <div className="text-emerald-600 font-bold text-sm mt-1">計算結果: {formData.amount}</div>}
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wider">{t.category}</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none">
                  {Object.keys(categoryTotals).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-wider">{t.note}</label>
                <input type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="備註..." className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 outline-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-20 shadow-lg">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}><Wallet size={20}/><span className="text-[10px] mt-1 font-medium">{t.wallet}</span></button>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}><Download size={20}/><span className="text-[10px] mt-1 font-medium">{t.home}</span></button>
        <div className="relative -top-5">
          <button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-all`}>
            <Plus size={32} />
          </button>
        </div>
        {/* 固定開支 */}
        <button className="flex flex-col items-center w-1/4 text-gray-400"><Home size={20}/><span className="text-[10px] mt-1 font-medium">固定開支</span></button>
        {/* 設定佔位 */}
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} className="flex flex-col items-center w-1/4 text-gray-400"><Settings size={20}/><span className="text-[10px] mt-1 font-medium">系統設定</span></button>
      </nav>
    </div>
  );
};

export default App;
