import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Trash2, TrendingUp, Globe, ChevronDown, ChevronUp, Check, MessageSquare
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
    note: '',
    date: '2026-05-04'
  });

  const [currentSettings, setCurrentSettings] = useState({
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    expCategories: ['旅遊', '購物', '醫療', '水電費', '餐飲', '交通'],
    incCategories: ['薪金', '獎金', 'ATM', '投資收入']
  });

  const [records, setRecords] = useState([
    { type: 'expense', amount: 31, category: '旅遊', nature: 'desire', note: 'Coffee', id: 1, date: '2026-05-04' },
    { type: 'income', amount: 500, category: 'ATM', nature: 'essential', note: 'Salary', id: 5, date: '2026-05-04' }
  ]);

  const handleSave = () => {
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setFormData({ amount: '0', category: '旅遊', nature: 'essential', note: '', date: '2026-05-04' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* 頂部 Header */}
      <div className="bg-emerald-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end active:scale-90"><Menu size={24} /></button>
      </div>

      {/* 主頁面 */}
      {!showInputPage && (
        <main className="p-4 space-y-6 animate-in fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white p-6 rounded-[2rem] shadow-lg">
              <p className="text-xs font-bold opacity-60">支出</p>
              <p className="text-2xl font-black text-rose-300">HK$96</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400">收入</p>
              <p className="text-2xl font-black text-emerald-500">HK$500</p>
            </div>
          </div>

          {/* Bar Chart 每日概覽 */}
          <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-sm font-black text-gray-700">每日概覽</h3>
              <div className="flex gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 支出</span>
                <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 收入</span>
              </div>
            </div>
            <div className="h-28 flex items-end justify-around gap-2 px-2 border-b border-gray-50 pb-2">
              {[40, 75, 35, 90, 55, 65, 45].map((h, i) => (
                <div key={i} className="flex gap-1 items-end h-full">
                  <div className="w-3 bg-rose-400 rounded-t-sm" style={{ height: `${h-15}%` }}></div>
                  <div className="w-3 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
          </section>

          {/* 最近紀錄 */}
          <div className="space-y-4">
            {records.map(record => (
              <div key={record.id} className="bg-white p-5 rounded-[1.8rem] flex justify-between items-center border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}><TrendingUp size={18}/></div>
                  <div>
                    <p className="font-black text-gray-800 text-sm">{record.category}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{record.note || record.date}</p>
                  </div>
                </div>
                <p className={`font-black ${record.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>HK${record.amount}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 新增頁面 - 嚴格遵守所有欄位要求 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className={`${inputType === 'expense' ? 'bg-rose-500' : 'bg-blue-500'} p-5 text-white flex justify-between items-center shadow-md`}>
            <button onClick={() => setShowInputPage(false)} className="p-2"><X size={30} /></button>
            <span className="text-lg font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-black active:scale-95 shadow-md">儲存</button>
          </div>

          {/* 1. Calendar Bar */}
          <section className="bg-gray-50 py-4 border-b border-gray-100 shadow-inner">
            <div className="flex items-center justify-center gap-4 mb-3 font-black text-gray-800 text-sm">
              <ChevronLeft size={16} className="text-gray-300"/> 2026年5月 <ChevronRight size={16} className="text-gray-300"/>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-6">
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                <button key={d} onClick={() => setFormData({...formData, date: `2026-05-0${d}`})} className={`min-w-[55px] py-3 rounded-xl flex flex-col items-center border-2 transition-all ${formData.date.endsWith(d.toString()) ? 'border-black bg-white shadow-sm' : 'border-transparent bg-gray-100 text-gray-400'}`}>
                  <span className="text-[8px] font-bold opacity-50 uppercase">週一</span>
                  <span className="text-base font-black">{d}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="flex-1 p-5 space-y-6 overflow-y-auto no-scrollbar pb-24">
            {/* 2. 金額輸入 */}
            <section className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-rose-400">金額 (HKD $)</label>
              <input 
                type="number" 
                value={formData.amount} 
                onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                className="bg-transparent text-4xl font-black text-right outline-none w-1/2"
                autoFocus
              />
            </section>

            {/* 3. 必要/想要 (支出頁面核心功能) */}
            {inputType === 'expense' && (
              <section className="animate-in fade-in">
                <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest">消費性質 (必選)</label>
                <div className="flex gap-3">
                  <button onClick={() => setFormData({...formData, nature: 'essential'})} className={`flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 border-2 transition-all ${formData.nature === 'essential' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {formData.nature === 'essential' && <Check size={16}/>} 必要
                  </button>
                  <button onClick={() => setFormData({...formData, nature: 'desire'})} className={`flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 border-2 transition-all ${formData.nature === 'desire' ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {formData.nature === 'desire' && <Check size={16}/>} 想要
                  </button>
                </div>
              </section>
            )}

            {/* 4. 選擇分類 */}
            <section>
              <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest">選擇分類</label>
              <div className="grid grid-cols-3 gap-2">
                {(inputType === 'expense' ? currentSettings.expCategories : currentSettings.incCategories).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setFormData({...formData, category: cat})} 
                    className={`py-3 rounded-xl border-2 text-xs font-black transition-all ${formData.category === cat ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* 5. 備註欄位 */}
            <section>
              <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-widest flex items-center gap-1"><MessageSquare size={12}/> 備註內容</label>
              <input 
                type="text" 
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="輸入備註..."
                className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border border-gray-100 outline-none focus:ring-2 focus:ring-gray-200"
              />
            </section>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center py-5 z-40 px-6 shadow-xl">
        <button onClick={() => {setActiveTab('home'); setShowInputPage(false);}} className={`flex flex-col items-center w-1/3 transition-all ${activeTab === 'home' && !showInputPage ? 'text-rose-500 scale-110 font-black' : 'text-gray-300'}`}>
          <Download size={28}/><span className="text-[9px] mt-1 uppercase">我的帳本</span>
        </button>
        
        {/* 中央 "+" 按鈕 (設為支出) */}
        <div className="relative -top-12 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all">
            <Plus size={40} />
          </button>
        </div>

        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className={`flex flex-col items-center w-1/3 transition-all ${showInputPage && inputType === 'income' ? 'text-blue-500 scale-110 font-black' : 'text-gray-300'}`}>
          <Wallet size={28}/><span className="text-[9px] mt-1 uppercase">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
