import React, { useState } from 'react';
import { Download, Wallet, Plus, X, ChevronLeft, ChevronRight, MapPin, Camera, Menu, Settings, Utensils, Car, ShoppingBag, Coffee, MoreHorizontal } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文'
  });

  const [tempSettings, setTempSettings] = useState({ ...currentSettings });

  // 支出分類選項
  const categories = [
    { name: '飲食', icon: <Utensils size={20} /> },
    { name: '交通', icon: <Car size={20} /> },
    { name: '購物', icon: <ShoppingBag size={20} /> },
    { name: '咖啡', icon: <Coffee size={20} /> },
    { name: '其他', icon: <MoreHorizontal size={20} /> },
  ];

  const [formData, setFormData] = useState({
    amount: '',
    category: '飲食',
    payment: '現金',
    note: '',
    location: ''
  });

  const i18n = {
    '繁體中文': { home: '我的帳本', wallet: '資金帳戶', settings: '系統設定', confirm: '確認更新', cancel: '取消' },
    'English': { home: 'My Ledger', wallet: 'Accounts', settings: 'Settings', confirm: 'Confirm', cancel: 'Cancel' }
  };
  const t = i18n[currentSettings.language] || i18n['繁體中文'];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-2xl tracking-wide">{t.home}</h1>
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} className="w-10 flex justify-end active:scale-90 transition-transform">
          <Menu size={28} />
        </button>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            {/* 簡潔日曆 */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center gap-2">
              <button className="p-2 text-gray-300"><ChevronLeft size={24} /></button>
              <div className="flex-1 flex justify-around text-center">
                <div className="flex flex-col"><span className="text-[10px] font-bold text-blue-500">5/1</span><span className="text-[10px] font-black text-blue-500">今</span></div>
              </div>
              <button className="p-2 text-gray-300"><ChevronRight size={24} /></button>
            </div>

            {/* 收支摘要 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500 p-6 rounded-[2.5rem] text-white shadow-lg"><div className="text-xs font-bold opacity-80 uppercase">Expenses</div><div className="text-3xl font-black">$13,719</div></div>
              <div className={`${currentSettings.themeColor} p-6 rounded-[2.5rem] text-white shadow-lg"><div className="text-xs font-bold opacity-80 uppercase">Income</div><div className="text-3xl font-black">$0</div></div>
            </div>
          </>
        )}
      </main>

      {/* 新增支出頁面 (精簡且保留核心功能) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col overflow-y-auto animate-in fade-in zoom-in duration-200">
          <div className={`${currentSettings.themeColor} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">新增支出</span>
            <button className="bg-white text-emerald-600 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          <div className="p-6 space-y-8 pb-24">
            {/* 1. 金額輸入 */}
            <section>
              <label className="text-sm font-bold text-red-500 mb-3 block">* 金額 (KRW)</label>
              <input type="number" placeholder="0" className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-4xl font-black border-none outline-none focus:ring-2 ring-emerald-200" />
            </section>

            {/* 2. 支出分類 */}
            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">支出分類</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {categories.map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setFormData({...formData, category: cat.name})}
                    className={`flex flex-col items-center justify-center min-w-[70px] p-4 rounded-2xl border-2 transition-all ${formData.category === cat.name ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm' : 'border-gray-100 text-gray-400 bg-white'}`}
                  >
                    {cat.icon}
                    <span className="text-xs font-bold mt-2">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. 支出工具 (支付方式) */}
            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">支出工具</label>
              <div className="grid grid-cols-2 gap-3">
                {['現金', '信用卡', 'WOWPASS', '行動支付'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setFormData({...formData, payment: p})} 
                    className={`py-4 rounded-xl border-2 font-bold transition-all ${formData.payment === p ? 'border-amber-400 text-amber-600 bg-amber-50' : 'border-gray-100 text-gray-400 bg-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. 備註 */}
            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">備註</label>
              <textarea 
                placeholder="輸入詳細資訊..."
                className="w-full bg-[#F5F5F0] p-5 rounded-2xl font-bold border-none outline-none min-h-[100px] resize-none"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </section>
          </div>
        </div>
      )}

      {/* 設定 Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">{t.settings}</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            <div className="flex-1 space-y-8">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">語言</label>
                <div className="grid grid-cols-1 gap-3">
                  {['繁體中文', 'English'].map(lang => (
                    <button key={lang} onClick={() => setTempSettings({...tempSettings, language: lang})} className={`w-full p-4 rounded-2xl border-2 text-left font-bold ${tempSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100 text-gray-400'}`}>{lang}</button>
                  ))}
                </div>
              </section>
            </div>
            <div className="pt-8 border-t space-y-4">
              <button onClick={() => { setCurrentSettings(tempSettings); setShowSettingsModal(false); }} className={`w-full py-5 ${tempSettings.themeColor} text-white rounded-[2rem] text-lg font-black`}>{t.confirm}</button>
              <button onClick={() => setShowSettingsModal(false)} className="w-full py-5 bg-gray-100 text-gray-500 rounded-[2rem] text-lg font-bold">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-emerald-500' : 'text-gray-400'}`}><Wallet size={26}/><span className="text-[11px] mt-1 font-bold">{t.wallet}</span></button>
        <div className="relative -top-8 w-1/3 flex justify-center"><button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8]`}><Plus size={40} /></button></div>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-emerald-500' : 'text-gray-400'}`}><Download size={26}/><span className="text-[11px] mt-1 font-bold">{t.home}</span></button>
      </nav>
    </div>
  );
};

export default App;
