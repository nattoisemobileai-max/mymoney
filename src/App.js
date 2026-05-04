import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Settings, Delete, Mic, Camera, Calendar, Trash2, TrendingUp, Globe, Info
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // 用於 Detail Page
  
  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', id: 1, color: '#4ADE80', date: '2026-04-21', note: '機票分期' },
    { type: 'expense', amount: 30, category: '購物', id: 2, color: '#F43F5E', date: '2026-04-21', note: '超市買菜' },
    { type: 'income', amount: 500, category: 'ATM', id: 5, color: '#10B981', date: '2026-04-21', note: '現金提款' }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    expCategories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通'],
    incCategories: ['薪金', '獎金', 'ATM', '投資收入', '其他']
  });

  const [formData, setFormData] = useState({ amount: '0', category: '旅遊', note: '', date: '2026-04-21' });
  const [calcExpr, setCalcExpr] = useState('');
  const [newExpCat, setNewExpCat] = useState('');
  const [newIncCat, setNewIncCat] = useState('');

  const handleSave = () => {
    if (parseFloat(formData.amount) === 0) { alert("⚠️ 金額不能為 0"); return; }
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setFormData({ amount: '0', category: inputType === 'expense' ? currentSettings.expCategories[0] : currentSettings.incCategories[0], note: '', date: '2026-04-21' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-sm flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end"><Menu size={24} /></button>
      </div>

      {activeTab === 'home' && (
        <main className="p-4 space-y-6 animate-in fade-in">
          {/* 收支總覽 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white p-6 rounded-[2rem] shadow-lg">
              <p className="text-xs font-bold opacity-60">支出</p>
              <p className="text-2xl font-black text-rose-300">HK${records.filter(r=>r.type==='expense').reduce((s,r)=>s+r.amount,0)}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
              <p className="text-xs font-bold text-gray-400">收入</p>
              <p className="text-2xl font-black text-emerald-500">HK${records.filter(r=>r.type==='income').reduce((s,r)=>s+r.amount,0)}</p>
            </div>
          </div>

          {/* Bar Chart 補回 (根據 image_3.png) */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-gray-700">每日概覽</h3>
              <div className="flex gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 支出</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 收入</span>
              </div>
            </div>
            <div className="h-24 flex items-end justify-around gap-2 px-2">
              {[30, 80, 45, 100, 60, 40, 75].map((h, i) => (
                <div key={i} className="w-full bg-emerald-500/20 rounded-t-md relative" style={{ height: `${h}px` }}>
                  <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-md" style={{ height: `${h/0.6}px` }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* 明細列表 (點擊進入 Detail Page) */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-gray-400 px-2 uppercase">最近明細</h3>
            {records.map(record => (
              <div 
                key={record.id} 
                onClick={() => setSelectedRecord(record)} // 點擊事件
                className="bg-white p-5 rounded-[1.8rem] shadow-sm flex justify-between items-center border border-gray-50 active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    <TrendingUp size={18} className={record.type === 'expense' ? 'rotate-180' : ''}/>
                  </div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{record.category}</p>
                    <p className="text-[10px] font-bold text-gray-400">{record.date}</p>
                  </div>
                </div>
                <p className={`font-black ${record.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {record.type === 'expense' ? '-' : '+'}HK${record.amount}
                </p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Detail Page 彈窗 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-white z-[90] flex flex-col p-8 animate-in zoom-in-95">
          <div className="flex justify-between items-center mb-10">
            <button onClick={() => setSelectedRecord(null)}><ChevronLeft size={32}/></button>
            <h2 className="text-xl font-black">明細詳情</h2>
            <button onClick={() => { setRecords(records.filter(r => r.id !== selectedRecord.id)); setSelectedRecord(null); }} className="text-rose-500"><Trash2/></button>
          </div>
          <div className="bg-gray-50 rounded-[3rem] p-10 text-center space-y-4">
            <p className="text-gray-400 font-bold uppercase">{selectedRecord.category}</p>
            <p className="text-5xl font-black">HK${selectedRecord.amount}</p>
            <p className="text-sm text-gray-500">{selectedRecord.date}</p>
          </div>
          <div className="mt-10 p-6 bg-white border rounded-3xl">
            <label className="text-xs font-black text-gray-400 block mb-2 uppercase">Remarks / 備註</label>
            <p className="font-bold text-gray-700">{selectedRecord.note || '無備註'}</p>
          </div>
        </div>
      )}

      {/* 新增頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black">儲存</button>
          </div>
          
          {/* image_2.png 橫向日曆 */}
          <section className="bg-gray-50/50 py-6">
            <div className="flex items-center justify-center gap-6 mb-6 font-black text-gray-800">
              <ChevronLeft size={20} className="text-gray-300"/> 2026年4月 <ChevronRight size={20} className="text-gray-300"/>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
              {[20, 21, 22, 23, 24, 25, 26].map(d => (
                <button key={d} onClick={() => setFormData({...formData, date: `2026-04-${d}`})} className={`min-w-[60px] py-4 rounded-2xl flex flex-col items-center border-2 ${formData.date.includes(d.toString()) ? 'border-black bg-white shadow-md' : 'border-transparent bg-gray-100 text-gray-400'}`}>
                  <span className="text-[10px] font-bold mb-1">二</span><span className="text-xl font-black">{d}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="p-6 space-y-10">
            <section>
              <label className="text-sm font-black text-gray-400 mb-4 block underline decoration-rose-500 decoration-4 uppercase tracking-tighter">
                * Amount / 金額 (HKD $)
              </label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] text-5xl font-black text-right shadow-inner">{formData.amount}</div>
            </section>
            <section>
              <label className="text-sm font-black text-gray-400 mb-4 block uppercase tracking-widest">Category / 分類</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {(inputType === 'expense' ? currentSettings.expCategories : currentSettings.incCategories).map(name => (
                  <button key={name} onClick={() => setFormData({...formData, category: name})} className={`px-8 py-4 rounded-2xl border-2 whitespace-nowrap font-black transition-all ${formData.category === name ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-gray-400'}`}>{name}</button>
                ))}
              </div>
            </section>
            <section className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <label className="text-xs font-black text-gray-400 mb-3 block uppercase tracking-widest">Remarks / 備註</label>
              <textarea placeholder="點此輸入備註內容..." value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} className="w-full bg-[#F9F9F6] p-4 rounded-2xl outline-none font-bold text-gray-700 min-h-[100px]"/>
            </section>
          </div>
        </div>
      )}

      {/* 設定頁面 (補回支出、收入管理與完整語言) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-8 text-gray-800"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <div className="space-y-10">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest flex items-center gap-2"><Globe size={14}/> 語言 / Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {['繁體中文', 'English', '日本語', 'Español', 'Deutsch'].map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-3 rounded-xl border-2 font-bold text-xs ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100 text-gray-400'}`}>{lang}</button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">支出分類管理</label>
                <div className="space-y-2 mb-4">
                  {currentSettings.expCategories.map(cat => (
                    <div key={cat} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                      <span className="font-bold text-gray-700 text-sm">{cat}</span>
                      <button onClick={() => setCurrentSettings({...currentSettings, expCategories: currentSettings.expCategories.filter(c => c !== cat)})} className="text-red-400"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="新增支出分類..." value={newExpCat} onChange={(e) => setNewExpCat(e.target.value)} className="flex-1 bg-gray-100 p-3 rounded-xl font-bold outline-none text-sm"/>
                  <button onClick={() => { if(newExpCat) { setCurrentSettings({...currentSettings, expCategories: [...currentSettings.expCategories, newExpCat]}); setNewExpCat(''); } }} className="bg-emerald-500 text-white px-4 rounded-xl font-black">+</button>
                </div>
              </section>

              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">收入分類管理</label>
                <div className="space-y-2 mb-4">
                  {currentSettings.incCategories.map(cat => (
                    <div key={cat} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                      <span className="font-bold text-gray-700 text-sm">{cat}</span>
                      <button onClick={() => setCurrentSettings({...currentSettings, incCategories: currentSettings.incCategories.filter(c => c !== cat)})} className="text-blue-400"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="新增收入分類..." value={newIncCat} onChange={(e) => setNewIncCat(e.target.value)} className="flex-1 bg-gray-100 p-3 rounded-xl font-bold outline-none text-sm"/>
                  <button onClick={() => { if(newIncCat) { setCurrentSettings({...currentSettings, incCategories: [...currentSettings.incCategories, newIncCat]}); setNewIncCat(''); } }} className="bg-blue-500 text-white px-4 rounded-xl font-black">+</button>
                </div>
              </section>
            </div>
            <button onClick={() => setShowSettingsModal(false)} className={`w-full py-5 ${currentSettings.themeColor} text-white rounded-[2.5rem] text-xl font-black mt-10 mb-20`}>儲存設定</button>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 flex justify-around items-center py-4 z-40 px-6">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-rose-500' : 'text-gray-300'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-black">我的帳本</span>
        </button>
        <div className="relative -top-10 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={40} /></button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className={`flex flex-col items-center w-1/3 text-gray-300`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-black">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
