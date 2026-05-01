import React, { useState, useEffect } from 'react';
import { Mic, Camera, Download, Wallet, Settings, Home, Menu, ChevronDown, Check, Plus, X, Trash2 } from 'lucide-react';

const App = () => {
  // --- 1. 狀態管理與 LocalStorage 讀取 ---
  const [activeTab, setActiveTab] = useState('home');
  const [themeColor, setThemeColor] = useState('bg-emerald-500');
  const [language, setLanguage] = useState('zh-Hant');
  const [showInputPage, setShowInputPage] = useState(false);

  // 帳目列表 (從 LocalStorage 讀取，若無則為空陣列)
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('my_ledger_data');
    return saved ? JSON.parse(saved) : [];
  });

  // 當 transactions 改變時，自動存入 LocalStorage
  useEffect(() => {
    localStorage.setItem('my_ledger_data', JSON.stringify(transactions));
  }, [transactions]);

  // --- 2. 計算邏輯 ---
  const totalExpense = transactions.reduce((acc, cur) => acc + Number(cur.amount), 0);
  
  const categoryTotals = {
    '交通': 0, '飲食': 0, '教育': 0, '娛樂': 0, '其他': 0
  };
  transactions.forEach(t => {
    if (categoryTotals[t.category] !== undefined) {
      categoryTotals[t.category] += Number(t.amount);
    }
  });

  // --- 3. 新增帳目功能 ---
  const [formData, setFormData] = useState({ amount: '', note: '', category: '飲食' });

  const handleSave = () => {
    if (!formData.amount || formData.amount <= 0) return alert("請輸入有效金額");
    const newEntry = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString()
    };
    setTransactions([newEntry, ...transactions]);
    setFormData({ amount: '', note: '', category: '飲食' });
    setShowInputPage(false);
  };

  const clearData = () => {
    if (window.confirm("確定要刪除所有紀錄並重設為 0 嗎？")) {
      setTransactions([]);
    }
  };

  // --- UI 組件 ---
  const ManualInputPage = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom">
      <div className={`${themeColor} p-4 text-white flex justify-between items-center`}>
        <button onClick={() => setShowInputPage(false)}><X size={24} /></button>
        <span className="font-bold">新增手動帳目</span>
        <button onClick={handleSave} className="bg-white text-emerald-600 px-4 py-1 rounded-full font-bold">儲存</button>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="text-xs text-gray-400">金額 (HKD)</label>
          <input 
            type="number" 
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="0.00" 
            className="w-full text-4xl font-bold border-b-2 outline-none focus:border-emerald-500 py-2" 
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">備註</label>
          <input 
            type="text" 
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
            placeholder="例如: 午餐、巴士..." 
            className="w-full border-b outline-none py-2" 
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">分類</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-3 bg-gray-50 rounded-lg mt-1 outline-none"
          >
            {Object.keys(categoryTotals).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-24">
      {showInputPage && <ManualInputPage />}
      
      {/* 頂部導航 */}
      <div className={`${themeColor} text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center`}>
        <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full"><Home size={16} /> <span className="text-sm">我的帳本</span></div>
        <h1 className="font-bold">我的帳本</h1>
        <Menu size={24} />
      </div>

      <main className="p-4 space-y-4">
        {activeTab === 'home' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500 p-4 rounded-2xl text-white shadow-sm">
                <div className="text-xs opacity-80">期間支出</div>
                <div className="text-xl font-bold">HKD ${totalExpense.toLocaleString()}</div>
              </div>
              <div className={`${themeColor} p-4 rounded-2xl text-white shadow-sm`}>
                <div className="text-xs opacity-80">期間收入</div>
                <div className="text-xl font-bold">HKD $0</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold mb-4 border-l-4 border-emerald-500 pl-2">分類統計</h3>
               <div className="space-y-4">
                 {Object.entries(categoryTotals).map(([name, val]) => (
                   <div key={name}>
                     <div className="flex justify-between text-sm mb-1">
                       <span>{name}</span>
                       <span className="font-bold text-red-500">HKD -{val.toLocaleString()}</span>
                     </div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <div 
                        className={`${themeColor} h-full transition-all duration-500`} 
                        style={{ width: `${totalExpense > 0 ? (val/totalExpense)*100 : 0}%` }}
                       ></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-red-100">
              <h4 className="text-red-500 font-bold mb-2">危險區域</h4>
              <button onClick={clearData} className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg w-full justify-center">
                <Trash2 size={18} /> <span>清除所有記帳數據</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-20">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 ${activeTab === 'home' ? 'text-emerald-500' : 'text-gray-400'}`}><Download size={20}/><span className="text-[10px]">我的帳本</span></button>
        
        <div className="relative -top-5">
          <button onClick={() => setShowInputPage(true)} className={`${themeColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg`}>
            <Plus size={32} />
          </button>
        </div>

        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center w-1/4 ${activeTab === 'settings' ? 'text-emerald-500' : 'text-gray-400'}`}><Settings size={20}/><span className="text-[10px]">系統設定</span></button>
      </nav>
    </div>
  );
};

export default App;
