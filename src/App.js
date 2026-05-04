import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Trash2, TrendingUp, Globe, ChevronDown, ChevronUp, Check
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [expandExp, setExpandExp] = useState(false);
  const [expandInc, setExpandInc] = useState(false);

  const [formData, setFormData] = useState({
    amount: '0',
    category: '旅遊',
    nature: 'essential', 
    date: '2026-05-04'
  });

  const [currentSettings, setCurrentSettings] = useState({
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    expCategories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通'],
    incCategories: ['薪金', '獎金', 'ATM', '投資收入']
  });

  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', nature: 'desire', id: 1, date: '2026-05-04' },
    { type: 'income', amount: 500, category: 'ATM', nature: 'essential', id: 5, date: '2026-05-04' }
  ]);

  const handleSave = () => {
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setFormData({ amount: '0', category: '旅遊', nature: 'essential', note: '', date: '2026-05-04' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="bg-emerald-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90"><Menu size={24} /></button>
      </div>

      {/* 主內容區：僅在非輸入頁面顯示 */}
      {!showInputPage && (
        <main className="p-4 space-y-6 animate-in fade-in duration-300">
          {/* 數據卡片 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white p-6 rounded-[2rem] shadow-lg">
              <p className="text-xs font-bold opacity-60 uppercase">支出</p>
              <p className="text-2xl font-black text-rose-300">HK$96</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase">收入</p>
              <p className="text-2xl font-black text-emerald-500">HK$500</p>
            </div>
          </div>

          {/* 重要：Bar Chart 每日概覽 (強制渲染) */}
          <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-sm font-black text-gray-700">每日概覽</h3>
              <div className="flex gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 支出</span>
                <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 收入</span>
              </div>
            </div>
            <div className="h-32 flex items-end justify-around gap-2 px-2 border-b border-gray-50 pb-2">
              {[40, 75, 35, 90, 55, 65, 45].map((h, i) => (
                <div key={i} className="flex gap-1 items-end h-full group">
                  <div className="w-3 bg-rose-400 rounded-t-sm transition-all group-active:bg-rose-600" style={{ height: `${h-15}%` }}></div>
                  <div className="w-3 bg-emerald-500 rounded-t-sm transition-all group-active:bg-emerald-700" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-[9px] font-black text-gray-300 uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </section>

          {/* 最近紀錄 */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Recent History</h3>
            {records.map(record => (
              <div key={record.id} className="bg-white p-5 rounded-[1.8rem] flex justify-between items-center border border-gray-50 active:bg-gray-100 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}><TrendingUp size={18}/></div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{record.category}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{record.date} • {record.type === 'expense' ? (record.nature === 'essential' ? '必要' : '想要') : '收入'}</p>
                  </div>
                </div>
                <p className={`font-black ${record.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>HK${record.amount}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 新增頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-bottom duration-300 overflow-hidden">
          <div className={`${inputType === 'expense' ? 'bg-rose-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center shadow-lg`}>
            <button onClick={() => setShowInputPage(false)} className="p-2"><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black shadow-md active:scale-95">儲存</button>
          </div>

          {/* Calendar Bar - 日曆列還原 */}
          <section className="bg-gray-50 py-6 border-b border-gray-100">
            <div className="flex items-center justify-center gap-6 mb-4 font-black text-gray-800">
              <ChevronLeft size={20} className="text-gray-300"/> 2026年5月 <ChevronRight size={20} className="text-gray-300"/>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
                <button key={d} onClick={() => setFormData({...formData, date: `2026-05-${d < 10 ? '0'+d : d}`})} className={`min-w-[60px] py-4 rounded-2xl flex flex-col items-center border-2 transition-all ${formData.date.endsWith(d < 10 ? '0'+d : d.toString()) ? 'border-black bg-white shadow-lg' : 'border-transparent bg-gray-100 text-gray-400'}`}>
                  <span className="text-[10px] font-bold opacity-50">週一</span>
                  <span className="text-lg font-black">{d}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-20">
            <section>
              <label className="text-[10px] font-black text-gray-400 mb-4 block uppercase tracking-widest">金額 (HKD)</label>
              <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full bg-gray-50 p-8 rounded-[2rem] text-6xl font-black text-right outline-none focus:ring-4 focus:ring-gray-100"/>
            </section>

            {/* 必要 & 想要：僅在支出時顯示 */}
            {inputType === 'expense' && (
              <section className="animate-in fade-in">
                <label className="text-[10px] font-black text-gray-400 mb-4 block uppercase tracking-widest">消費性質</label>
                <div className="flex gap-4">
                  <button onClick={() => setFormData({...formData, nature: 'essential'})} className={`flex-1 py-5 rounded-2xl font-black flex items-center justify-center gap-2 border-2 ${formData.nature === 'essential' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {formData.nature === 'essential' && <Check size={18}/>} 必要
                  </button>
                  <button onClick={() => setFormData({...formData, nature: 'desire'})} className={`flex-1 py-5 rounded-2xl font-black flex items-center justify-center gap-2 border-2 ${formData.nature === 'desire' ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {formData.nature === 'desire' && <Check size={18}/>} 想要
                  </button>
                </div>
              </section>
            )}

            <section>
              <label className="text-[10px] font-black text-gray-400 mb-4 block uppercase tracking-widest">選擇分類</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
                {(inputType === 'expense' ? currentSettings.expCategories : currentSettings.incCategories).map(cat => (
                  <button key={cat} onClick={() => setFormData({...formData, category: cat})} className={`px-10 py-5 rounded-[1.8rem] border-2 whitespace-nowrap font-black transition-all ${formData.category === cat ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}>{cat}</button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* 設定 Modal - 點擊展開分類 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[300] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <section className="bg-gray-50 p-6 rounded-3xl mb-8">
              <label className="text-[10px] font-black text-gray-400 mb-4 block uppercase flex items-center gap-2"><Globe size={14}/> Language</label>
              <div className="grid grid-cols-2 gap-2">
                {['繁體中文', 'English', '日本語', 'Español', 'Deutsch'].map(lang => (
                  <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-3 rounded-xl border-2 font-bold text-[10px] ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'bg-white text-gray-400 border-gray-100'}`}>{lang}</button>
                ))}
              </div>
            </section>

            <section className="border-b border-gray-100 pb-2 mb-4">
              <button onClick={() => setExpandExp(!expandExp)} className="w-full flex justify-between font-black text-gray-700 py-3">支出分類管理 {expandExp ? <ChevronUp/> : <ChevronDown/>}</button>
              {expandExp && <div className="mt-2 space-y-2 animate-in slide-in-from-top-2">{currentSettings.expCategories.map(c => <div key={c} className="p-4 bg-gray-50 rounded-2xl text-xs font-bold border border-gray-100 flex justify-between items-center">{c}<Trash2 size={16} className="text-rose-300"/></div>)}</div>}
            </section>

            <section className="border-b border-gray-100 pb-2">
              <button onClick={() => setExpandInc(!expandInc)} className="w-full flex justify-between font-black text-gray-700 py-3">收入分類管理 {expandInc ? <ChevronUp/> : <ChevronDown/>}</button>
              {expandInc && <div className="mt-2 space-y-2 animate-in slide-in-from-top-2">{currentSettings.incCategories.map(c => <div key={c} className="p-4 bg-gray-50 rounded-2xl text-xs font-bold border border-gray-100 flex justify-between items-center">{c}<Trash2 size={16} className="text-blue-300"/></div>)}</div>}
            </section>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center py-5 z-40 px-6">
        <button onClick={() => {setActiveTab('home'); setShowInputPage(false);}} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' && !showInputPage ? 'text-rose-500 scale-110 font-black' : 'text-gray-300'}`}>
          <Download size={28}/><span className="text-[10px] mt-1">我的帳本</span>
        </button>
        <div className="relative -top-12 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-22 h-22 rounded-full flex items-center justify-center text-white shadow-2xl border-[10px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={45} /></button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className={`flex flex-col items-center w-1/3 ${showInputPage && inputType === 'income' ? 'text-blue-500 scale-110 font-black' : 'text-gray-300'}`}>
          <Wallet size={28}/><span className="text-[10px] mt-1">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
