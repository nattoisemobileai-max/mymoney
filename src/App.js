import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Settings, Utensils, Car, GraduationCap, Coffee, ShoppingBag, 
  Delete, Mic, Camera, PieChart, BookOpen, Music, Calendar, Trash2
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  
  const [records, setRecords] = useState([
    { type: 'expense', amount: 2290, category: '餐飲', id: 1, color: '#C5B358', date: '2026-05-04' }
  ]);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文',
    appName: '隨手記 | Spending Ace',
    categories: ['餐飲', '交通', '教育', '補習', '咖啡', '購物']
  });

  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({ 
    amount: '0', category: '餐飲', note: '', date: getTodayStr()
  });
  
  const [calcExpr, setCalcExpr] = useState('');
  const [newCatInput, setNewCatInput] = useState('');

  // 產生橫向日曆數據
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -10; i <= 10; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push({
        full: d.toISOString().split('T')[0],
        dayNum: d.getDate(),
        weekDay: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
      });
    }
    return dates;
  };
  const calendarDates = generateDates();

  const handleSave = () => {
    if (parseFloat(formData.amount) === 0 || formData.amount === '0') {
      alert("⚠️ 金額不能為 0！"); return;
    }
    setRecords([{ ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() }, ...records]);
    alert("✅ 儲存成功！");
    setShowInputPage(false);
    setFormData({ ...formData, amount: '0', note: '', date: getTodayStr() });
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
        <h1 className="font-bold text-lg tracking-tight">{currentSettings.appName}</h1>
        <button onClick={() => setShowSettingsModal(true)} className="w-10 flex justify-end"><Menu size={24} /></button>
      </div>

      {/* 主頁面 */}
      <main className="p-4 space-y-5">
        {activeTab === 'home' && (
          <div className="animate-in fade-in">
            <div className="flex items-center justify-between px-2 pt-2 mb-4">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"><ChevronLeft size={20}/></button>
              <h2 className="text-xl font-black text-gray-800">4月明細</h2>
              <button className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"><ChevronRight size={20}/></button>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full border-[10px] border-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[10px] border-[#C5B358]" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)' }}></div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Total Expense</p>
                <p className="text-2xl font-black text-[#8B4513]">- HKD {records.reduce((s,r)=>s+r.amount,0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 新增支出頁面 (優化日曆) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-300 overflow-y-auto pb-40">
          <div className={`${inputType === 'expense' ? 'bg-red-500' : 'bg-blue-500'} p-6 text-white flex justify-between items-center sticky top-0 z-10`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <button onClick={handleSave} className="bg-white text-gray-800 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          <div className="space-y-8 pt-4">
            {/* 橫向捲動日曆 - 參考圖片設計 */}
            <section className="bg-gray-50/50 py-6">
              <div className="flex items-center justify-center gap-8 mb-6">
                <ChevronLeft size={20} className="text-gray-300"/>
                <span className="text-lg font-black text-gray-800">2026年4月</span>
                <ChevronRight size={20} className="text-gray-300"/>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 items-center">
                {calendarDates.map((d) => (
                  <button 
                    key={d.full}
                    onClick={() => setFormData({...formData, date: d.full})}
                    className={`flex flex-col items-center min-w-[55px] py-3 rounded-2xl transition-all border-2 ${
                      formData.date === d.full 
                      ? 'border-black bg-white scale-110 shadow-sm' 
                      : 'border-transparent bg-gray-100/50 text-gray-400'
                    }`}
                  >
                    <span className="text-[10px] font-bold mb-1">{d.weekDay}</span>
                    <span className="text-xl font-black">{d.dayNum}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="px-6 space-y-8">
              {/* 金額標題更名 */}
              <section>
                <label className="text-sm font-black text-gray-400 mb-4 block uppercase tracking-widest">
                  * Amount / 金額 (HKD $)
                </label>
                <div onClick={() => setShowCalc(true)} className="w-full bg-white border-b-4 border-gray-100 p-4 text-5xl font-black text-right text-gray-800">
                  {formData.amount}
                </div>
              </section>

              <section>
                <label className="text-sm font-black text-gray-400 mb-4 block uppercase tracking-widest">Category / 分類</label>
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {currentSettings.categories.map(name => (
                    <button key={name} onClick={() => setFormData({...formData, category: name})} className={`px-8 py-3 rounded-xl border-2 font-black transition-all ${formData.category === name ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}>{name}</button>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-sm font-black text-gray-400 mb-2 block uppercase tracking-widest">Remarks / 備註</label>
                <textarea placeholder="在此輸入詳情..." value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-bold text-gray-700 min-h-[80px] border border-gray-100"/>
              </section>
            </div>
          </div>

          {showCalc && (
            <div className="fixed inset-0 bg-black/80 z-[80] flex items-end">
              <div className="bg-[#121212] w-full p-8 rounded-t-[3rem]">
                <div className="text-right text-white text-4xl font-mono mb-8 p-2">{calcExpr || '0'}</div>
                <div className="grid grid-cols-4 gap-3">
                  {['7', '8', '9', 'del', '4', '5', '6', '+', '1', '2', '3', '-', 'C', '0', '.', '='].map(k => (
                    <button key={k} onClick={()=>handleCalcInput(k)} className={`h-14 rounded-xl font-black text-lg ${k === '=' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>{k}</button>
                  ))}
                </div>
                <button onClick={() => setShowCalc(false)} className="w-full mt-6 text-gray-500 font-bold uppercase tracking-widest">Close</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 設定 Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end">
          <div className="bg-white w-5/6 h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black">系統設定</h2><button onClick={() => setShowSettingsModal(false)}><X size={32} /></button></div>
            <div className="flex-1 space-y-8 overflow-y-auto">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">分類管理</label>
                <div className="space-y-2">
                  {currentSettings.categories.map(cat => (
                    <div key={cat} className="flex justify-between bg-gray-50 p-3 rounded-xl">
                      <span className="font-bold">{cat}</span>
                      <button onClick={() => setCurrentSettings({...currentSettings, categories: currentSettings.categories.filter(c => c !== cat)})} className="text-red-400"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 flex justify-around items-center py-4 z-40 px-6">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-300'}`}>
          <Download size={26}/><span className="text-[11px] mt-1 font-black">我的帳本</span>
        </button>
        <div className="relative -top-10 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-[8px] border-[#F8F9FB]">
            <Plus size={40} />
          </button>
        </div>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-blue-500' : 'text-gray-300'}`}>
          <Wallet size={26}/><span className="text-[11px] mt-1 font-black">收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
