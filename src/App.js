import React, { useState, useEffect } from 'react';
import { Mic, Camera, Download, Wallet, Settings, Home, Menu, Plus, X, BarChart3, Calendar as CalendarIcon, MapPin } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [timeRange, setTimeRange] = useState('all');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1); // 預設選中 Day 1

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('my_ledger_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentSettings, setCurrentSettings] = useState(() => {
    const saved = localStorage.getItem('my_app_settings');
    return saved ? JSON.parse(saved) : {
      themeColor: 'bg-emerald-500',
      language: '繁體中文',
      currency: 'HKD ($)'
    };
  });

  const [tempSettings, setTempSettings] = useState({ ...currentSettings });

  // --- 模擬行程日期數據 (參照 image_692db6.png) ---
  const tripDays = [
    { day: 1, date: '3/10', week: '二' },
    { day: 2, date: '3/11', week: '三' },
    { day: 3, date: '3/12', week: '四' },
    { day: 4, date: '3/13', week: '五' },
    { day: 5, date: '3/14', week: '六' },
    { day: 6, date: '3/15', week: '日' },
    { day: 7, date: '3/16', week: '一' },
  ];

  // --- 多語言字典 ---
  const i18n = {
    '繁體中文': { home: '我的帳本', wallet: '資金帳戶', fixed: '固定開支', settings: '系統設定', income: '期間收入', expense: '期間支出', save: '儲存', amount: '金額', category: '分類', note: '備註', all: '全部', month: '本月', confirm: '確認', cancel: '取消', voice: '一語記帳', photo: '拍照記存', catTitle: '分類統計', total: '總支出', tripDate: '行程日期' },
    '英文': { home: 'Ledger', wallet: 'Accounts', fixed: 'Bills', settings: 'Settings', income: 'Income', expense: 'Expense', save: 'Save', amount: 'Amount', category: 'Category', note: 'Note', all: 'All', month: 'Month', confirm: 'Confirm', cancel: 'Cancel', voice: 'Voice', photo: 'Photo', catTitle: 'Analytics', total: 'Total', tripDate: 'Trip Date' },
    '日文': { home: '家計簿', wallet: '口座', fixed: '固定費', settings: '設定', income: '収入', expense: '支出', save: '保存', amount: '金額', category: 'カテゴリ', note: '備考', all: 'すべて', month: '今月', confirm: '確認', cancel: 'キャンセル', voice: '音聲', photo: '写真', catTitle: '統計', total: '合計', tripDate: '行程日程' },
    '德文': { home: 'Buch', wallet: 'Konten', fixed: 'Fix', settings: 'Setup', income: 'Einnahme', expense: 'Ausgabe', save: 'Sparen', amount: 'Betrag', category: 'Kategorie', note: 'Notiz', all: 'Alle', month: 'Monat', confirm: 'OK', cancel: 'X', voice: 'Sprache', photo: 'Foto', catTitle: 'Statistik', total: 'Gesamt', tripDate: 'Reise' },
    '西班牙文': { home: 'Libro', wallet: 'Cuentas', fixed: 'Gastos', settings: 'Ajustes', income: 'Ingreso', expense: 'Gasto', save: 'Guardar', amount: 'Monto', category: 'Categoría', note: 'Nota', all: 'Todo', month: 'Mes', confirm: 'Sí', cancel: 'No', voice: 'Voz', photo: 'Foto', catTitle: 'Estadística', total: 'Total', tripDate: 'Fecha' }
  };
  const t = i18n[currentSettings.language] || i18n['繁體中文'];

  // --- 支出分類 ---
  const expenseCategories = [
    { name: '飲食', color: '#f59e0b' }, { name: '交通', color: '#ef4444' },
    { name: '娛樂', color: '#06b6d4' }, { name: '其他', color: '#10b981' }
  ];

  const filteredTransactions = transactions.filter(t => {
    if (timeRange === 'all') return true;
    const date = new Date(t.timestamp);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const totalExpense = filteredTransactions.filter(i => i.type === 'expense').reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalIncome = filteredTransactions.filter(i => i.type === 'income').reduce((acc, cur) => acc + Number(cur.amount), 0);

  const generatePieStyle = () => {
    let current = 0;
    const gradients = expenseCategories.map(cat => {
      const amt = filteredTransactions.filter(i => i.type === 'expense' && i.category === cat.name).reduce((a, c) => a + Number(c.amount), 0);
      if (totalExpense === 0 || amt === 0) return '';
      const p = (amt / totalExpense) * 100;
      const s = current; current += p;
      return `${cat.color} ${s}% ${current}%`;
    }).filter(g => g !== '').join(', ');
    return totalExpense > 0 ? { background: `conic-gradient(${gradients})` } : { background: '#f3f4f6' };
  };

  // --- 手動輸入邏輯 ---
  const [formData, setFormData] = useState({ amount: '', note: '', category: '飲食' });
  const [displayAmount, setDisplayAmount] = useState('');

  const handleSave = () => {
    if (!formData.amount || formData.amount <= 0) return;
    setTransactions([{ id: Date.now(), timestamp: new Date().toISOString(), ...formData, type: activeTab === 'wallet' ? 'income' : 'expense' }, ...transactions]);
    setShowInputPage(false); setDisplayAmount(''); setFormData({ amount: '', note: '', category: '飲食' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none overflow-x-hidden">
      
      {/* 頂部 Header */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-2xl tracking-wide">{t.home}</h1>
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} className="w-10 flex justify-end active:scale-90 transition-transform"><Menu size={28} /></button>
      </div>

      <main className="p-4 space-y-6 animate-in fade-in duration-500">
        
        {activeTab === 'home' && (
          <>
            {/* 行程日期選擇器 (參照圖片 image_692db6.png) */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100/50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-gray-700 font-bold text-lg">
                  <CalendarIcon size={22} className="text-emerald-500" />
                  <span>{t.tripDate}</span>
                </div>
                <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1 border border-blue-100">
                  <MapPin size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-blue-600">釜山 Busan</span>
                </div>
              </div>

              {/* 橫向滾動日期卡片 */}
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {tripDays.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`flex-shrink-0 w-20 py-3 rounded-2xl border transition-all flex flex-col items-center justify-center ${
                      selectedDay === item.day 
                      ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200' 
                      : 'bg-white text-gray-400 border-gray-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase mb-1">Day {item.day}</span>
                    <span className="text-xl font-black">{item.date}</span>
                    <span className="text-xs font-medium mt-1">{item.week}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 收支卡片 - 字體加粗加大 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500 p-5 rounded-[2.5rem] text-white shadow-xl shadow-red-100 transition-transform active:scale-95">
                <div className="text-xs font-bold opacity-90 mb-1 tracking-widest">{t.expense}</div>
                <div className="text-2xl font-black">${totalExpense.toLocaleString()}</div>
              </div>
              <div className={`${currentSettings.themeColor} p-5 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 transition-transform active:scale-95`}>
                <div className="text-xs font-bold opacity-90 mb-1 tracking-widest">{t.income}</div>
                <div className="text-2xl font-black">${totalIncome.toLocaleString()}</div>
              </div>
            </div>

            {/* 快速記帳按鈕 */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-7 bg-white rounded-[2rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
                <Mic className="text-emerald-500 mb-2" size={32} />
                <span className="text-base font-bold text-gray-700">{t.voice}</span>
              </button>
              <button className="flex flex-col items-center justify-center p-7 bg-white rounded-[2rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
                <Camera className="text-emerald-500 mb-2" size={32} />
                <span className="text-base font-bold text-gray-700">{t.photo}</span>
              </button>
            </div>

            {/* 分類統計圖 */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 mb-8 font-black text-xl text-gray-800">
                 <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                 <span>{t.catTitle}</span>
               </div>
               <div className="flex flex-col items-center">
                 <div className="relative w-52 h-52 rounded-full mb-10 flex items-center justify-center shadow-inner" style={generatePieStyle()}>
                   <div className="absolute w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                     <span className="text-xs text-gray-400 font-black tracking-widest uppercase mb-1">{t.total}</span>
                     <span className="text-2xl font-black text-gray-800">${totalExpense}</span>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-x-10 gap-y-5 w-full px-2">
                    {expenseCategories.map(cat => (
                      <div key={cat.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                          <span className="text-sm font-bold text-gray-500">{cat.name}</span>
                        </div>
                        <span className="text-sm font-black text-gray-800">${filteredTransactions.filter(i => i.type === 'expense' && i.category === cat.name).reduce((a,c) => a + Number(c.amount), 0)}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </>
        )}
      </main>

      {/* 底部導航 - 優化尺寸 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-5 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}><Wallet size={26}/><span className="text-[11px] mt-1 font-black uppercase">{t.wallet}</span></button>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/4 transition-all ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}><Download size={26}/><span className="text-[11px] mt-1 font-black uppercase">{t.home}</span></button>
        <div className="relative -top-8">
          <button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all border-8 border-[#FDFCF8]`}>
            <Plus size={40} />
          </button>
        </div>
        <button className="flex flex-col items-center w-1/4 text-gray-400 opacity-50"><Home size={26}/><span className="text-[11px] mt-1 font-black uppercase">{t.fixed}</span></button>
        <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} className="flex flex-col items-center w-1/4 text-gray-400 active:scale-110 transition-all"><Settings size={26}/><span className="text-[11px] mt-1 font-black uppercase">{t.settings}</span></button>
      </nav>

      {/* 設定 Modal - Confirm/Cancel */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex justify-end backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-5/6 max-w-sm h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black flex items-center gap-3 text-gray-800"><Settings size={28} /> {t.settings}</h2>
              <button onClick={() => setShowSettingsModal(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 space-y-10 overflow-y-auto">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">語言 / Language</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(i18n).map(l => (
                    <button key={l} onClick={() => setTempSettings({...tempSettings, language: l})} className={`p-4 rounded-2xl border-2 text-xs font-black transition-all ${tempSettings.language === l ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>{l}</button>
                  ))}
                </div>
              </section>
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">主題配色 / Theme</label>
                <div className="flex gap-5">
                  {['bg-emerald-500', 'bg-blue-500', 'bg-slate-800', 'bg-rose-500'].map(c => (
                    <button key={c} onClick={() => setTempSettings({...tempSettings, themeColor: c})} className={`w-12 h-12 rounded-full ${c} border-4 transition-all ${tempSettings.themeColor === c ? 'border-gray-300 scale-125' : 'border-transparent opacity-60'}`} />
                  ))}
                </div>
              </section>
            </div>
            <div className="pt-8 border-t space-y-4">
              <button onClick={() => { setCurrentSettings(tempSettings); setShowSettingsModal(false); }} className={`w-full py-5 ${tempSettings.themeColor} text-white rounded-[2rem] text-lg font-black shadow-xl active:scale-95 transition-transform`}>{t.confirm}</button>
              <button onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(false); }} className="w-full py-5 bg-gray-100 text-gray-500 rounded-[2rem] text-lg font-bold active:scale-95 transition-transform">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* 新增頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-in slide-in-from-bottom duration-500">
          <div className={`${currentSettings.themeColor} p-6 text-white flex justify-between items-center shadow-lg`}>
            <button onClick={() => setShowInputPage(false)} className="active:scale-75 transition-transform"><X size={32} /></button>
            <span className="text-xl font-black tracking-tight">{activeTab === 'wallet' ? t.addIncome : t.addExpense}</span>
            <button onClick={handleSave} className="bg-white text-emerald-600 px-8 py-2 rounded-full font-black shadow-sm active:scale-90 transition-transform">{t.save}</button>
          </div>
          <div className="p-8 space-y-10">
            <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 shadow-inner">
              <label className="text-xs font-black text-gray-400 block mb-3 uppercase tracking-widest">{t.amount}</label>
              <input type="text" value={displayAmount} onChange={(e) => {
                setDisplayAmount(e.target.value);
                try { const res = eval(e.target.value.replace(/[^-+*/0-9.]/g, '')); if (isFinite(res)) setFormData({...formData, amount: res}); } catch(e){}
              }} placeholder="0.00" className="w-full text-6xl font-black bg-transparent outline-none py-2 text-gray-800" />
            </div>
            <div className="space-y-8 px-2">
              <div>
                <label className="text-xs font-black text-gray-400 block mb-3 uppercase tracking-widest">{t.category}</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-5 border-2 border-gray-50 rounded-2xl bg-gray-50 outline-none font-bold text-lg text-gray-700">
                  {(activeTab === 'wallet' ? [{name:'Cash 現金'},{name:'AlipayHK'},{name:'Others'}] : expenseCategories).map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 block mb-3 uppercase tracking-widest">{t.note}</label>
                <input type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="..." className="w-full p-5 border-2 border-gray-50 rounded-2xl bg-gray-50 outline-none font-bold text-lg" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
