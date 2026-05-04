import React, { useState } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, ChevronRight, Menu, 
  Trash2, TrendingUp, Check, MessageSquare, Delete
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [inputType, setInputType] = useState('expense');
  
  // 1. 數據全部清空
  const [records, setRecords] = useState([]);

  const [formData, setFormData] = useState({
    amount: '0',
    category: '購物',
    nature: 'essential', 
    note: '',
    date: '2026-05-04'
  });

  // 2. 分類順序重排
  const [currentSettings] = useState({
    appName: '隨手記 | Spending Ace',
    expCategories: ['購物', '交通', '餐飲', '補習', '水電費', '旅遊', '醫療', '其他'],
    incCategories: ['薪金', '獎金', '投資收入', '其他']
  });

  const handleCalcPress = (val) => {
    setFormData(prev => {
      let newAmount = prev.amount;
      if (val === 'C') return { ...prev, amount: '0' };
      if (val === 'del') return { ...prev, amount: prev.amount.length > 1 ? prev.amount.slice(0, -1) : '0' };
      if (prev.amount === '0' && val !== '.') {
        newAmount = val.toString();
      } else {
        newAmount = prev.amount + val;
      }
      return { ...prev, amount: newAmount };
    });
  };

  const handleSave = () => {
    if (formData.amount === '0') return;
    const newRecord = { ...formData, type: inputType, amount: Number(formData.amount), id: Date.now() };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setFormData({ amount: '0', category: '購物', nature: 'essential', note: '', date: '2026-05-04' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* 頂部 Header */}
      <div className="bg-emerald-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="w-10"></div>
        <h1 className="font-bold text-lg">{currentSettings.appName}</h1>
        <div className="w-10 flex justify-end"><Menu size={24} /></div>
      </div>

      {/* 主頁面內容 */}
      {!showInputPage && (
        <main className="p-4 space-y-6 animate-in fade-in">
          {/* 數據概覽卡片 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white p-6 rounded-[2rem] shadow-lg">
              <p className="text-xs font-bold opacity-60">總支出</p>
              <p className="text-2xl font-black text-rose-300">HK$ {records.filter(r => r.type==='expense').reduce((a,b)=>a+b.amount,0)}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400">總收入</p>
              <p className="text-2xl font-black text-emerald-500">HK$ {records.filter(r => r.type==='income').reduce((a,b)=>a+b.amount,0)}</p>
            </div>
          </div>

          {/* 強制顯示 Bar Chart */}
          <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-sm font-black text-gray-700">每日趨勢</h3>
              <div className="flex gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 支出</span>
                <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 收入</span>
              </div>
            </div>
            <div className="h-32 flex items-end justify-around gap-2 px-2 border-b border-gray-100 pb-2">
              {/* 預設靜態 Bars */}
              {[30, 45, 25, 60, 35, 50, 40].map((h, i) => (
                <div key={i} className="flex gap-1 items-end h-full">
                  <div className="w-3 bg-rose-400 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  <div className="w-3 bg-emerald-500 rounded-t-sm" style={{ height: `${h + 15}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-[9px] font-black text-gray-300 uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </section>

          {/* 紀錄列表 */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">交易紀錄</h3>
            {records.length === 0 ? (
              <div className="text-center py-10 text-gray-300 font-bold text-sm">暫無數據，請點擊下方 + 開始記帳</div>
            ) : (
              records.map(record => (
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
              ))
            )}
          </div>
        </main>
      )}

      {/* 新增頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`${inputType === 'expense' ? 'bg-rose-500' : 'bg-blue-500'} p-5 text-white flex justify-between items-center`}>
            <button onClick={() => setShowInputPage(false)} className="p-2"><X size={30} /></button>
            <span className="text-lg font-black">{inputType === 'expense' ? '新增支出' : '新增收入'}</span>
            <div className="w-10"></div>
          </div>

          {/* 日曆列 */}
          <section className="bg-gray-50 py-4 border-b border-gray-100">
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-6">
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                <button key={d} onClick={() => setFormData({...formData, date: `2026-05-0${d}`})} className={`min-w-[55px] py-3 rounded-xl flex flex-col items-center border-2 ${formData.date.endsWith(d.toString()) ? 'border-black bg-white shadow-sm' : 'border-transparent text-gray-400'}`}>
                  <span className="text-[8px] font-bold">5月</span>
                  <span className="text-base font-black">{d}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar">
            {/* 金額顯示與必要/想要 */}
            <div className="space-y-4">
              <section className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-rose-400">金額 (HKD $)</label>
                <div className="text-4xl font-black text-right text-gray-800">{formData.amount}</div>
              </section>

              {inputType === 'expense' && (
                <div className="flex gap-3">
                  <button onClick={() => setFormData({...formData, nature: 'essential'})} className={`flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 border-2 ${formData.nature === 'essential' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {formData.nature === 'essential' && <Check size={16}/>} 必要
                  </button>
                  <button onClick={() => setFormData({...formData, nature: 'desire'})} className={`flex-1 py-4 rounded-xl font-black flex items-center justify-center gap-2 border-2 ${formData.nature === 'desire' ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {formData.nature === 'desire' && <Check size={16}/>} 想要
                  </button>
                </div>
              )}
            </div>

            {/* 分類 - 已重排 */}
            <section className="grid grid-cols-4 gap-2">
              {(inputType === 'expense' ? currentSettings.expCategories : currentSettings.incCategories).map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFormData({...formData, category: cat})} 
                  className={`py-3 rounded-xl border-2 text-[11px] font-black transition-all ${formData.category === cat ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}
                >
                  {cat}
                </button>
              ))}
            </section>

            {/* 備註 */}
            <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <MessageSquare size={16} className="text-gray-400"/>
              <input 
                type="text" 
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="輸入備註..."
                className="bg-transparent text-sm font-bold outline-none w-full"
              />
            </div>

            {/* 計算機鍵盤 */}
            <section className="bg-gray-100 -mx-5 px-5 py-4 rounded-t-[2rem]">
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 'del', 4, 5, 6, 'C', 7, 8, 9, '.', 0].map((btn) => (
                  <button 
                    key={btn}
                    onClick={() => btn === 'del' ? handleCalcPress('del') : btn === 'C' ? handleCalcPress('C') : handleCalcPress(btn)}
                    className="h-12 bg-white rounded-xl font-black text-xl flex items-center justify-center active:scale-90"
                  >
                    {btn === 'del' ? <Delete size={20}/> : btn}
                  </button>
                ))}
                <button 
                  onClick={handleSave}
                  className="col-span-1 h-12 bg-emerald-500 text-white rounded-xl font-black text-lg active:scale-95"
                >
                  OK
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center py-5 z-40 px-6">
        <button onClick={() => {setActiveTab('home'); setShowInputPage(false);}} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' && !showInputPage ? 'text-rose-500 font-black' : 'text-gray-300'}`}>
          <Download size={28}/><span className="text-[9px] mt-1 uppercase font-bold">我的帳本</span>
        </button>
        <div className="relative -top-12 w-1/3 flex justify-center">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); }} className="bg-[#B08D57] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-[8px] border-[#F8F9FB] active:scale-90 transition-all"><Plus size={40} /></button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); }} className={`flex flex-col items-center w-1/3 ${showInputPage && inputType === 'income' ? 'text-blue-500 font-black' : 'text-gray-300'}`}>
          <Wallet size={28}/><span className="text-[9px] mt-1 uppercase font-bold">新增收入</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
