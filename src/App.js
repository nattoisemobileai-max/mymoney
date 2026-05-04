import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, Menu, 
  Trash2, TrendingUp, Globe, ChevronDown, ChevronUp
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // 分類展開狀態
  const [expandExp, setExpandExp] = useState(false);
  const [expandInc, setExpandInc] = useState(false);

  // 原始數據還原
  const [currentSettings, setCurrentSettings] = useState({
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    expCategories: ['旅遊', '購物', '醫療', '水電費'],
    incCategories: ['薪金', '獎金', 'ATM', '其他']
  });

  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', id: 1, date: '2026-04-21', note: '機票' },
    { type: 'expense', amount: 30, category: '購物', id: 2, date: '2026-04-21', note: '超市' },
    { type: 'income', amount: 500, category: 'ATM', id: 5, date: '2026-04-21', note: '提款' }
  ]);

  const [newExpCat, setNewExpCat] = useState('');
  const [newIncCat, setNewIncCat] = useState('');

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header - 標題還原 */}
      <div className="bg-emerald-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90 transition-transform"><Menu size={24} /></button>
      </div>

      {activeTab === 'home' && (
        <main className="p-4 space-y-6">
          {/* 1. 總覽卡片 */}
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

          {/* 2. 支出分佈 (Donut Chart - image_4.png 核心) */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <h3 className="text-sm font-black text-gray-700 mb-6 px-2">支出分佈</h3>
            <div className="flex justify-center mb-8 relative">
              {/* 這裡使用圓形容器模擬 image_4.png 的環狀圖 */}
              <div className="w-48 h-48 rounded-full border-[25px] border-emerald-500 relative flex items-center justify-center">
                <div className="absolute inset-[-25px] rounded-full border-[25px] border-transparent border-t-rose-500 border-l-rose-500 rotate-[45deg]"></div>
                <div className="absolute inset-[-25px] rounded-full border-[25px] border-transparent border-r-orange-400 rotate-[-20deg]"></div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold">總支出</p>
                  <p className="text-xl font-black text-gray-800">HK$96</p>
                </div>
              </div>
            </div>
            {/* 分類清單 */}
            <div className="grid grid-cols-2 gap-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p className="text-[11px] font-bold text-gray-600">旅遊 <span className="text-gray-400 ml-1">32.3%</span></p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <p className="text-[11px] font-bold text-gray-600">購物 <span className="text-gray-400 ml-1">31.3%</span></p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <p className="text-[11px] font-bold text-gray-600">醫療 <span className="text-gray-400 ml-1">20.8%</span></p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <p className="text-[11px] font-bold text-gray-600">水電費 <span className="text-gray-400 ml-1">15.6%</span></p>
              </div>
            </div>
          </div>

          {/* 3. 必要 vs 非必要 (Progress Bar) */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <h3 className="text-sm font-black text-gray-700 mb-4 px-2">必要 vs 非必要</h3>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-6">
              <div className="bg-blue-600 h-full w-[36%]"></div>
            </div>
            <div className="space-y-2 px-2">
              <div className="flex justify-between text-xs font-black">
                <span className="flex items-center gap-2 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-600"></div> 必要 HK$35</span>
                <span className="text-gray-400">36%</span>
              </div>
              <div className="flex justify-between text-xs font-black">
                <span className="flex items-center gap-2 text-orange-400"><div className="w-2 h-2 rounded-full bg-orange-400"></div> 非必要 HK$61</span>
                <span className="text-gray-400">64%</span>
              </div>
            </div>
          </div>

          {/* 4. 每日概覽 (Bar Chart還原 - image_4.png 底部) */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-sm font-black text-gray-700">每日概覽</h3>
              <div className="flex gap-4 text-[9px] font-bold">
                <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 支出</span>
                <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 收入</span>
              </div>
            </div>
            <div className="h-24 flex items-end justify-around gap-2 px-2">
              {/* 渲染雙柱狀圖 */}
              {[30, 80, 45, 60].map((h, i) => (
                <div key={i} className="flex gap-1 items-end h-full">
                  <div className="w-4 bg-rose-400 rounded-t-sm" style={{ height: `${h-15}%` }}></div>
                  <div className="w-4 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* 設定 Modal - 實作摺疊分類 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[110] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 no-scrollbar">
              <section className="bg-gray-50 p-4 rounded-2xl mb-4">
                <label className="text-[10px] font-black text-gray-400 mb-4 block uppercase flex items-center gap-2"><Globe size={14}/> Language / 語言</label>
                <div className="grid grid-cols-2 gap-2">
                  {['繁體中文', 'English', '日本語', 'Español', 'Deutsch'].map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-2 rounded-xl border-2 font-bold text-[10px] transition-all ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-200 bg-white text-gray-400'}`}>{lang}</button>
                  ))}
                </div>
              </section>

              {/* 支出分類 - Tree/摺疊邏輯 */}
              <section className="border-b border-gray-100 pb-2">
                <button onClick={() => setExpandExp(!expandExp)} className="w-full flex justify-between items-center py-3">
                  <span className="font-black text-gray-700">支出分類管理</span>
                  {expandExp ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
                {expandExp && (
                  <div className="space-y-2 mt-2 pb-4 animate-in slide-in-from-top-2">
                    {currentSettings.expCategories.map(cat => (
                      <div key={cat} className="flex justify-between bg-white border border-gray-100 p-3 rounded-xl text-xs font-bold shadow-sm">{cat}<Trash2 size={16} className="text-rose-400" onClick={() => setCurrentSettings({...currentSettings, expCategories: currentSettings.expCategories.filter(c => c !== cat)})}/></div>
                    ))}
                    <div className="flex gap-2 pt-2"><input type="text" value={newExpCat} onChange={e=>setNewExpCat(e.target.value)} placeholder="新分類..." className="flex-1 bg-gray-50 p-3 rounded-xl text-xs font-bold outline-none focus:border-emerald-500"/><button onClick={()=>{if(newExpCat){setCurrentSettings({...currentSettings, expCategories:[...currentSettings.expCategories, newExpCat]}); setNewExpCat('')}}} className="bg-emerald-500 text-white px-5 rounded-xl font-black">+</button></div>
                  </div>
                )}
              </section>

              {/* 收入分類 - Tree/摺疊邏輯 */}
              <section className="border-b border-gray-100 pb-2">
                <button onClick={() => setExpandInc(!expandInc)} className="w-full flex justify-between items-center py-3">
                  <span className="font-black text-gray-700">收入分類管理</span>
                  {expandInc ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
                {expandInc && (
                  <div className="space-y-2 mt-2 pb-4 animate-in slide-in-from-top-2">
                    {currentSettings.incCategories.map(cat => (
                      <div key={cat} className="flex justify-between bg-white border border-gray-100 p-3 rounded-xl text-xs font-bold shadow-sm">{cat}<Trash2 size={16} className="text-blue-400" onClick={() => setCurrentSettings({...currentSettings, incCategories: currentSettings.incCategories.filter(c => c !== cat)})}/></div>
                    ))}
                    <div className="flex gap-2 pt-2"><input type="text" value={newIncCat} onChange={e=>setNewIncCat(e.target.value)} placeholder="新分類..." className="flex-1 bg-gray-50 p-3 rounded-xl text-xs font-bold outline-none focus:border-blue-500"/><button onClick={()=>{if(newIncCat){setCurrentSettings({...currentSettings, incCategories:[...currentSettings.incCategories, newIncCat]}); setNewIncCat('')}}} className="bg-blue-500 text-white px-5 rounded-xl font-black">+</button></div>
                  </div>
                )}
              </section>
            </div>
            <button onClick={() => setShowSettingsModal(false)} className="w-full py-5 bg-black text-white rounded-[2.5rem] text-xl font-black mt-10 active:scale-95 transition-all">完成</button>
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
