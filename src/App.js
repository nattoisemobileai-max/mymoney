import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Settings, Delete, Mic, Camera, Calendar, Trash2, TrendingUp, Globe
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense'); // expense 或 income
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  
  // 核心數據
  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', id: 1, color: '#4ADE80', date: '2026-04-21', note: '機票' },
    { type: 'expense', amount: 30, category: '購物', id: 2, color: '#F43F5E', date: '2026-04-21', note: '超市' },
    { type: 'income', amount: 500, category: 'ATM', id: 5, color: '#10B981', date: '2026-04-21', note: '提款' }
  ]);

  // 設定數據 (含分類與語言)
  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    categories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通']
  });

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({ 
    amount: '0', category: '旅遊', note: '', date: getTodayStr()
  });
  
  const [calcExpr, setCalcExpr] = useState('');
  const [newCatInput, setNewCatInput] = useState('');

  // 儲存邏輯 (含驗證與成功提示)
  const handleSave = () => {
    if (parseFloat(formData.amount) === 0 || formData.amount === '0') {
      alert("⚠️ 金額不能為 0！"); return;
    }
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() };
    setRecords([newRecord, ...records]);
    alert("✅ 儲存成功！");
    setShowInputPage(false);
    setFormData({ amount: '0', category: currentSettings.categories[0], note: '', date: getTodayStr() });
  };

  const handleCalcInput = (val) => {
    if (val === 'C') { setCalcExpr(''); return; }
    if (val === 'del') { setCalcExpr(calcExpr.slice(0, -1)); return; }
    if (val === '=') {
      try { setFormData({ ...formData, amount: eval(calcExpr).toString() }); setShowCalc(false); setCalcExpr(''); } catch { setCalcExpr('Error'); }
      return;
    }
    setCalcExpr(calcExpr + val);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-sm flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-75 transition-all">
          <Menu size={24} />
        </button>
      </div>

      {/* 主頁內容：統計與明細 (同 image_3.png) */}
      {activeTab === 'home' && (
        <main className="p-4 space-y-6 animate-in fade-in">
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

          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <h3 className="text-sm font-black text-gray-700 mb-6">每日概覽</h3>
            <div className="h-24 flex items-end justify-around gap-2 px-2">
              {[40, 70, 20, 90, 50, 30, 60].map((h, i) => (
                <div key={i} className="w-full bg-emerald-500/20 rounded-t-md relative" style={{ height: `${h}px` }}>
                  <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-md" style={{ height: `${h/2}px` }}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-gray-400 px-2 uppercase tracking-widest">最近明細</h3>
            {records.map(record => (
              <div key={record.id} className="bg-white p-5 rounded-[1.8rem] shadow-sm flex justify-between items-center border border-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    <TrendingUp size={18} className={record.type === 'expense' ? 'rotate-180' : ''}/>
                  </div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{record.category}</p>
                    <p className="text-[10px] font-bold text-gray-400">{record.date} {record.note && `· ${record.note}`}</p>
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

      {/* 新增支出/收入頁面 (統一顯示邏輯) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-300 overflow-y-auto pb-40">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black active:scale-95 transition-all">儲存</button>
          </div>

          {/* 橫向日曆列 (同 image_2.png) */}
          <section className="bg-gray-50/50 py-6">
            <div className="flex items-center justify-center gap-6 mb-6 font-black text-gray-800">
              <ChevronLeft size={20} className="text-gray-300"/> 2026年4月 <ChevronRight size={20} className="text-gray-300"/>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
              {[20, 21, 22, 23, 24, 25, 26].map(d => (
                <button key={d} onClick={() => setFormData({...formData, date: `2026-04-${d}`})} className={`min-w-[60px] py-4 rounded-2xl flex flex-col items-center border-2 transition-all ${formData.date.includes(d.toString()) ? 'border-black bg-white shadow-md' : 'border-transparent bg-gray-100 text-gray-400'}`}>
                  <span className="text-[10px] font-bold mb-1">二</span>
                  <span className="text-xl font-black">{d}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="p-6 space-y-10">
            <section>
              <label className="text-sm font-black text-gray-400 mb-4 block underline decoration-rose-500 decoration-4 uppercase tracking-tighter">
                * Amount / 金額 (HKD $)
              </label>
              <div onClick={() => setShowCalc(true)} className="w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] text-5xl font-black text-right shadow-inner text-gray-800">{formData.amount}</div>
            </section>

            <section>
              <label className="text-sm font-black text-gray-400 mb-4 block uppercase tracking-widest">Category / 分類</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {(inputType === 'expense' ? currentSettings.categories : ['ATM', '八達通', 'AlipayHK', '薪金']).map(name => (
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

      {/* 設定 Modal (修復點：分類管理、語言切換) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10 text-gray-800"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            
            <div className="flex-1 space-y-10 overflow-y-auto">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest flex items-center gap-2"><Globe size={14}/> 語言 / Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {['繁體中文', 'English', '日本語'].map(lang => (
                    <button key={lang} onClick={() => setCurrentSettings({...currentSettings, language: lang})} className={`p-3 rounded-xl border-2 font-bold text-sm ${currentSettings.language === lang ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100 text-gray-400'}`}>{lang}</button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">支出分類管理</label>
                <div className="space-y-2 mb-4">
                  {currentSettings.categories.map(cat => (
                    <div key={cat} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                      <span className="font-bold text-gray-700">{cat}</span>
                      <button onClick={() => setCurrentSettings({...currentSettings, categories: currentSettings.categories.filter(c => c !== cat)})} className="text-red-400 active:scale-75"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="新增分類..." value={newCatInput} onChange={(e) => setNewCatInput(e.target.value)} className="flex-1 bg-gray-100 p-3 rounded-xl font-bold outline-none border focus:border-emerald-500"/>
                  <button onClick={() => { if(newCatInput) { setCurrentSettings({...currentSettings, categories: [...currentSettings.categories, newCatInput]}); setNewCatInput(''); } }} className="bg-emerald-500 text-white px-5 rounded-xl font-black active:scale-90">+</button>
                </div>
              </section>
            </div>
            <button onClick={() => setShowSettingsModal(false)} className={`w-full py-5 ${currentSettings.themeColor} text-white rounded-[2.5rem] text-xl font-black mt-4 shadow-lg active:scale-95 transition-all`}>儲存設定</button>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-4 z-40 px-6">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 transition-all ${activeTab === 'home' ? 'text-rose-500' : 'text-gray-300'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-black">我的帳本</span>
        </button>
        <div className="relative -top-10 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={40} /></button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className={`flex flex-col items-center w-1/3 transition-all text-gray-300`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-black">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
