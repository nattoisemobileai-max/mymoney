import React, { useState } from 'react';
import { Mic, Camera, Download, Wallet, Settings, Home, Menu, ChevronDown, Check, Plus, X } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [themeColor, setThemeColor] = useState('bg-emerald-500'); 
  const [language, setLanguage] = useState('zh-Hant');
  const [showInputPage, setShowInputPage] = useState(false); // 控制手動輸入頁面

  // 1. 多語言字典
  const i18n = {
    'zh-Hant': { home: '我的帳本', wallet: '資金帳戶', fixed: '固定開支', settings: '系統設定', langName: '繁體中文', income: '期間收入', expense: '期間支出', asset: '帳本資產' },
    'English': { home: 'My Ledger', wallet: 'Accounts', fixed: 'Fixed Bills', settings: 'Settings', langName: 'English', income: 'Income', expense: 'Expenses', asset: 'Assets' },
    'Spanish': { home: 'Mi Libro', wallet: 'Cuentas', fixed: 'Gastos Fijos', settings: 'Ajustes', langName: 'Español', income: 'Ingresos', expense: 'Gastos', asset: 'Activos' },
    '日文': { home: '私の家計簿', wallet: '資金口座', fixed: '固定費', settings: '設定', langName: '日本語', income: '収入', expense: '支出', asset: '資産' }
  };

  const t = i18n[language];

  // --- 子組件：手動輸入頁面 (Input Page) ---
  const ManualInputPage = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className={`${themeColor} p-4 text-white flex justify-between items-center`}>
        <button onClick={() => setShowInputPage(false)}><X size={24} /></button>
        <span className="font-bold text-lg">新增帳目</span>
        <button className="bg-white text-emerald-600 px-4 py-1 rounded-full text-sm font-bold">儲存</button>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm text-gray-500 mb-2">金額 (HKD)</label>
          <input type="number" placeholder="0.00" className="w-full text-4xl font-bold border-b-2 border-gray-100 focus:border-emerald-500 outline-none pb-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">備註描述</label>
          <input type="text" placeholder="買了什麼？" className="w-full border-b border-gray-100 focus:border-emerald-500 outline-none py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-2">分類</label>
          <select className="w-full border rounded-lg p-3 bg-gray-50 outline-none">
            <option>交通</option><option>飲食</option><option>教育</option><option>娛樂</option><option>其他</option>
          </select>
        </div>
      </div>
    </div>
  );

  // --- 子組件：資金帳戶 (Wallet) ---
  const WalletView = () => (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-gray-800 mb-4">{t.wallet}</h2>
      {['銀行提取現金', '八達通', 'Alipay HK', 'PayMe'].map(item => (
        <div key={item} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <span className="font-medium">{item}</span>
          <span className="text-emerald-600 font-bold">HKD $1,000.00</span>
        </div>
      ))}
    </div>
  );

  // --- 子組件：固定開支 (Fixed Expenses) ---
  const FixedExpenseView = () => (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-gray-800 mb-4">{t.fixed}</h2>
      {[
        { n: '補習', a: '2000' }, { n: '交通(返工日子)', a: '800' }, 
        { n: '手提電話費', a: '188' }, { n: '家居寬頻', a: '250' }
      ].map(item => (
        <div key={item.n} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between">
          <span className="text-gray-700">{item.n}</span>
          <span className="text-red-500 font-bold">HKD -{item.a}</span>
        </div>
      ))}
    </div>
  );

  // --- 子組件：系統設置 ---
  const SettingView = () => (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="font-bold mb-4 text-gray-800">語言設定 / Language</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(i18n).map(lang => (
            <button key={lang} onClick={() => setLanguage(lang)} 
              className={`p-2 rounded-lg border transition-all text-sm ${language === lang ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-gray-50 border-gray-100'}`}>
              {lang}
            </button>
          ))}
        </div>
      </div>
      {/* 原有的顏色切換保持不變 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="font-bold mb-4 text-gray-800">主題顏色</div>
        <div className="flex space-x-4">
          {['bg-emerald-500', 'bg-blue-500', 'bg-slate-800'].map(c => (
            <button key={c} onClick={() => setThemeColor(c)} className={`w-10 h-10 rounded-full ${c} border-4 ${themeColor === c ? 'border-gray-300' : 'border-transparent'}`} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-24 transition-all">
      {showInputPage && <ManualInputPage />}
      
      {/* 頂部 */}
      <div className={`${themeColor} text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center`}>
        <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded-full"><Home size={16} /> <span className="text-sm">{t.home}</span></div>
        <h1 className="font-bold">{t.home}</h1>
        <Menu size={24} />
      </div>

      <main>
        {activeTab === 'home' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500 p-4 rounded-2xl text-white"><div>{t.expense}</div><div className="text-xl font-bold">HKD $13,719</div></div>
              <div className={`${themeColor} p-4 rounded-2xl text-white`}><div>{t.income}</div><div className="text-xl font-bold">HKD $0</div></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
               <div className="flex items-center mb-4"><div className={`w-1 h-5 ${themeColor} rounded-full mr-2`}></div><h3 className="font-bold">分類統計</h3></div>
               {['交通', '飲食', '教育', '娛樂', '其他'].map(cat => (
                 <div key={cat} className="flex justify-between py-2 border-b border-gray-50 text-sm"><span>{cat}</span><span className="text-red-500">-HKD 0</span></div>
               ))}
            </div>
          </div>
        )}
        {activeTab === 'wallet' && <WalletView />}
        {activeTab === 'tool' && <FixedExpenseView />}
        {activeTab === 'settings' && <SettingView />}
      </main>

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 z-20">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/5 ${activeTab === 'wallet' ? 'text-emerald-500' : 'text-gray-400'}`}><Wallet size={20}/><span className="text-[10px]">{t.wallet}</span></button>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/5 ${activeTab === 'home' ? 'text-emerald-500' : 'text-gray-400'}`}><Download size={20}/><span className="text-[10px]">{t.home}</span></button>
        
        <div className="relative -top-5">
          <button onClick={() => setShowInputPage(true)} className={`${themeColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all`}>
            <Plus size={32} />
          </button>
        </div>

        <button onClick={() => setActiveTab('tool')} className={`flex flex-col items-center w-1/5 ${activeTab === 'tool' ? 'text-emerald-500' : 'text-gray-400'}`}><Wand2 size={20}/><span className="text-[10px]">{t.fixed}</span></button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center w-1/5 ${activeTab === 'settings' ? 'text-emerald-500' : 'text-gray-400'}`}><Settings size={20}/><span className="text-[10px]">{t.settings}</span></button>
      </nav>
    </div>
  );
};

export default App;
