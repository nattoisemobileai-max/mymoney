import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, 
  MapPin, Camera, Menu, Settings, Utensils, Car, 
  ShoppingBag, Coffee, MoreHorizontal, CreditCard, Banknote 
} from 'lucide-react';

const App = () => {
  // --- 頁面與 Modal 狀態 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // --- 設定狀態 (含語言與主題) ---
  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文'
  });
  const [tempSettings, setTempSettings] = useState({ ...currentSettings });

  // --- 支出數據狀態 ---
  const [formData, setFormData] = useState({
    amount: '',
    category: '飲食',
    payment: '現金',
    note: ''
  });

  // 支出分類配置
  const categories = [
    { name: '飲食', icon: <Utensils size={20} /> },
    { name: '交通', icon: <Car size={20} /> },
    { name: '購物', icon: <ShoppingBag size={20} /> },
    { name: '咖啡', icon: <Coffee size={20} /> },
    { name: '其他', icon: <MoreHorizontal size={20} /> },
  ];

  // 多語言字典
  const i18n = {
    '繁體中文': { home: '我的帳本', wallet: '資金帳戶', settings: '系統設定', confirm: '確認', cancel: '取消', save: '儲存', amount: '金額', category: '支出分類', tool: '支出工具', note: '備註' },
    'English': { home: 'My Ledger', wallet: 'Accounts', settings: 'Settings', confirm: 'Confirm', cancel: 'Cancel', save: 'Save', amount: 'Amount', category: 'Category', tool: 'Payment', note: 'Note' }
  };
  const t = i18n[currentSettings.language] || i18n['繁體中文'];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* 頂部 Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center transition-colors duration-300`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-2xl tracking-wide">{t.home}</h1>
        <button 
          onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} 
          className="w-10 flex justify-end active:scale-90 transition-transform"
        >
          <Menu size={28} />
        </button>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            {/* 簡潔日曆 - 只有箭頭與今日日期 */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <button className="p-2 text-gray-300"><ChevronLeft size={24} /></button>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-blue-500">2024/05/01</span>
                <span className="text-lg font-black text-blue-600">今天</span>
              </div>
              <button className="p-2 text-gray-300"><ChevronRight size={24} /></button>
            </div>

            {/* 收支摘要卡片 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500 p-6 rounded-[2.5rem] text-white shadow-lg shadow-red-100">
                <div className="text-xs font-bold opacity-80 uppercase mb-1">Expenses</div>
                <div className="text-3xl font-black">$13,719</div>
              </div>
              <div className={`${currentSettings.themeColor} p-6 rounded-[2.5rem] text-white shadow-lg shadow-emerald-100 transition-colors`}>
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
            <button className="bg-white text-emerald-600 px-8 py-2 rounded-full font-black shadow-sm">{t.save}</button>
          </div>

          <div className="p-6 space-y-8 pb-24">
            {/* 金額 */}
            <section>
              <label className="text-sm font-bold text-red-500 mb-3 block">* {t.amount} (KRW)</label>
              <input type="number" placeholder="0" className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-4xl font-black border-none outline-none focus:ring-2 ring-emerald-200 transition-all" />
            </section>

            {/* 支出分類 */}
            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">{t.category}</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {categories.map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setFormData({...formData, category: cat.name})}
                    className={`flex flex-col items-center justify-center min-w-[75px] p-4 rounded-2xl border-2 transition-all ${formData.category === cat.name ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100 text-gray-400 bg-white'}`}
                  >
                    {cat.icon}
                    <span className="text-xs font-bold mt-2">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 支出工具 */}
            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">{t.tool}</label>
              <div className="grid grid-cols-2 gap-3">
                {['現金', '信用卡', 'WOWPASS', '行動支付'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setFormData({...formData, payment: p})} 
                    className={`py-4 rounded-xl border-2 font-bold transition-all ${formData.payment === p ? 'border-amber-400 text-amber-600 bg-amber-50 shadow-sm' : 'border-gray-100 text-gray-400 bg-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </section>

            {/* 備註 */}
            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">{t.note}</label>
              <textarea 
                placeholder="輸入詳細資訊..."
                className="w-full bg-[#F5F5F0] p-5 rounded-2xl font-bold border-none outline-none min-h-[120px] resize-none"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </section>
          </div>
        </div>
      )}

      {/* 設定 Modal (含語言切換與取消) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black flex items-center gap-3"><Settings size={28} /> {t.settings}</h2>
              <button onClick={() => setShowSettingsModal(false)}><X size={32} /></button>
            </div>
            
            <div className="flex-1 space-y-10">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">Language / 語言</label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.keys(i18n).map(lang => (
                    <button 
                      key={lang} 
                      onClick={() => setTempSettings({...tempSettings, language: lang})} 
                      className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all ${tempSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-md' : 'border-gray-100 text-gray-400'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="pt-8 border-t space-y-4">
              <button 
                onClick={() => { setCurrentSettings(tempSettings); setShowSettingsModal(false); }} 
                className={`w-full py-5 ${tempSettings.themeColor} text-white rounded-[2rem] text-lg font-black shadow-xl active:scale-95 transition-transform`}
              >
                {t.confirm}
              </button>
              <button 
                onClick={() => setShowSettingsModal(false)} 
                className="w-full py-5 bg-gray-100 text-gray-500 rounded-[2rem] text-lg font-bold active:scale-95 transition-transform"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 transition-all ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-bold">{t.wallet}</span>
        </button>
        <div className="relative -top-8 w-1/3 flex justify-center">
          <button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8] active:scale-90 transition-transform`}>
            <Plus size={40} />
          </button>
        </div>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 transition-all ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-bold">{t.home}</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
