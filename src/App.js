import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Trash2, TrendingUp, Globe, ChevronDown, ChevronUp
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // 設定頁面的摺疊狀態
  const [expandExp, setExpandExp] = useState(false);
  const [expandInc, setExpandInc] = useState(false);

  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', id: 1, date: '2026-04-21', note: '機票' },
    { type: 'income', amount: 500, category: 'ATM', id: 5, date: '2026-04-21', note: '提款' }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    language: '繁體中文',
    expCategories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通'],
    incCategories: ['薪金', '獎金', 'ATM', '投資收入', '其他']
  });

  const [newExpCat, setNewExpCat] = useState('');
  const [newIncCat, setNewIncCat] = useState('');

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className="bg-emerald-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center">
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">統計</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90"><Menu size={24} /></button>
      </div>

      {/* 主頁面內容 (Bar Chart 如 image_3.png) */}
      {activeTab === 'home' && (
        <main className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white p-6 rounded-[2rem]">
              <p className="text-xs font-bold opacity-60">支出</p>
              <p className="text-2xl font-black text-rose-300">HK$96</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400">收入</p>
              <p className="text-2xl font-black text-emerald-500">HK$500</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <h3 className="text-sm font-black text-gray-700 mb-6">每日概覽</h3>
            <div className="h-24 flex items-end justify-around gap-3 px-2">
              <div className="w-8 bg-emerald-500 rounded-t-sm h-12"></div>
              <div className="w-8 bg-rose-500 rounded-t-sm h-20"></div>
              <div className="w-8 bg-emerald-500 rounded-t-sm h-16"></div>
              <div className="w-8 bg-rose-500 rounded-t-sm h-10"></div>
            </div>
          </div>

          <div className="space-y-4">
            {records.map(record => (
              <div key={record.id} onClick={() => setSelectedRecord(record)} className="bg-white p-5 rounded-[1.8rem] flex justify-between items-center border border-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}><TrendingUp size={18}/></div>
                  <div><p className="font-black text-gray-800 text-sm">{record.category}</p></div>
                </div>
                <p className={`font-black ${record.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>HK${record.amount}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 設定 Modal - 實作點擊展開功能 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[110] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl overflow-y-auto animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <div className="space-y-6 flex-1">
              {/* 語言切換 */}
              <section className="bg-gray-50 p-4 rounded-2xl">
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase flex items-center gap-2"><Globe size={14}/> 語言 / Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {['繁體中文', 'English', '日本語', 'Español', 'Deutsch'].map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-2 rounded-xl border-2 font-bold text-[10px] ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-200 bg-white text-gray-400'}`}>{lang}</button>
                  ))}
                </div>
              </section>

              {/* 支出分類管理 (點擊標題展開) */}
              <section className="border-b border-gray-100 pb-4">
                <button 
                  onClick={() => setExpandExp(!expandExp)}
                  className="w-full flex justify-between items-center py-2 group"
                >
                  <span className="font-black text-gray-700 group-active:text-emerald-500">支出分類管理</span>
                  {expandExp ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
                {expandExp && (
                  <div className="mt-4 space-y-2 animate-in fade-in zoom-in-95">
                    {currentSettings.expCategories.map(cat => (
                      <div key={cat} className="flex justify-between bg-white border border-gray-100 p-3 rounded-xl text-sm font-bold shadow-sm">
                        {cat}
                        <Trash2 size={16} className="text-red-400 cursor-pointer active:scale-75" onClick={() => setCurrentSettings({...currentSettings, expCategories: currentSettings.expCategories.filter(c => c !== cat)})}/>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <input type="text" value={newExpCat} onChange={e=>setNewExpCat(e.target.value)} placeholder="新支出分類..." className="flex-1 bg-gray-50 p-3 rounded-xl text-sm outline-none border focus:border-emerald-500 transition-all"/>
                      <button onClick={()=>{if(newExpCat){setCurrentSettings({...currentSettings, expCategories:[...currentSettings.expCategories, newExpCat]}); setNewExpCat('')}}} className="bg-emerald-500 text-white px-5 rounded-xl font-black active:scale-90">+</button>
                    </div>
                  </div>
                )}
              </section>

              {/* 收入分類管理 (點擊標題展開) */}
              <section className="border-b border-gray-100 pb-4">
                <button 
                  onClick={() => setExpandInc(!expandInc)}
                  className="w-full flex justify-between items-center py-2 group"
                >
                  <span className="font-black text-gray-700 group-active:text-blue-500">收入分類管理</span>
                  {expandInc ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
                {expandInc && (
                  <div className="mt-4 space-y-2 animate-in fade-in zoom-in-95">
                    {currentSettings.incCategories.map(cat => (
                      <div key={cat} className="flex justify-between bg-white border border-gray-100 p-3 rounded-xl text-sm font-bold shadow-sm">
                        {cat}
                        <Trash2 size={16} className="text-blue-400 cursor-pointer active:scale-75" onClick={() => setCurrentSettings({...currentSettings, incCategories: currentSettings.incCategories.filter(c => c !== cat)})}/>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <input type="text" value={newIncCat} onChange={e=>setNewIncCat(e.target.value)} placeholder="新收入分類..." className="flex-1 bg-gray-50 p-3 rounded-xl text-sm outline-none border focus:border-blue-500 transition-all"/>
                      <button onClick={()=>{if(newIncCat){setCurrentSettings({...currentSettings, incCategories:[...currentSettings.incCategories, newIncCat]}); setNewIncCat('')}}} className="bg-blue-500 text-white px-5 rounded-xl font-black active:scale-90">+</button>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <button onClick={() => setShowSettingsModal(false)} className="w-full py-5 bg-emerald-500 text-white rounded-[2.5rem] text-xl font-black mt-10 shadow-lg active:scale-95 transition-all">儲存並返回</button>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 flex justify-around items-center py-4 z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-rose-500' : 'text-gray-300'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-black">我的帳本</span>
        </button>
        <div className="relative -top-10 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={40} /></button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className="flex flex-col items-center w-1/3 text-gray-300">
          <Wallet size={26}/><span className="text-[11px] mt-1 font-black">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
