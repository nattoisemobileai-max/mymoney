import React, { useState, useMemo } from 'react';
import { 
  Download, Wallet, Plus, X, ChevronLeft, Trash2, TrendingUp, 
  MessageSquare, Delete, Settings, CreditCard, DollarSign, 
  Smartphone, Gift, Save, RefreshCw, ArrowUpCircle, ArrowDownCircle, 
  CircleUser
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(null);
  const [inputType, setInputType] = useState('expense');
  const [showCalculator, setShowCalculator] = useState(false);
  
  const [records, setRecords] = useState([]);

  const [formData, setFormData] = useState({
    amount: '',
    category: '購物',
    nature: 'essential', 
    note: '',
    date: new Date().toISOString().slice(0,10),
    paymentMethod: ''
  });

  const [settings, setSettings] = useState({
    language: 'zh-TW',
    theme: 'green',
    expenseCategories: ['交通', '飲食', '購物', '補習', '其他'],
    incomeCategories: ['現金', '信用卡', 'AlipayHK', 'PayMe'],
    userName: '用戶'
  });

  const [tempSettings, setTempSettings] = useState({ ...settings });

  // 多國語言文字庫
  const texts = {
    'zh-TW': {
      appName: '隨手記 | Spending Ace', totalExpense: '總支出', totalIncome: '總收入',
      dailyTrend: '每日趨勢', expense: '支出', income: '收入', transactions: '交易紀錄',
      noData: '暫無數據，請點擊下方 + 開始記帳', addExpense: '新增支出', addIncome: '新增收入',
      amount: '金額', amountPlaceholder: '請輸入金額', category: '分類', note: '備註',
      notePlaceholder: '輸入備註...', necessary: '必要', want: '想要', save: '儲存',
      cancel: '取消', settings: '設定', language: '語言', theme: '主題',
      expenseManagement: '支出分類管理', incomeManagement: '收入分類管理',
      blue: '藍色', green: '綠色', gray: '灰色', black: '黑色',
      allExpenses: '全部支出', allIncomes: '全部收入', paymentMethod: '付款方式',
      recentTransactions: '最近記錄', profile: '個人資料', userName: '用戶名稱'
    },
    'en': {
      appName: 'Spending Ace', totalExpense: 'Total Expense', totalIncome: 'Total Income',
      dailyTrend: 'Daily Trend', expense: 'Expense', income: 'Income', transactions: 'Transactions',
      noData: 'No data yet, tap + to start', addExpense: 'Add Expense', addIncome: 'Add Income',
      amount: 'Amount', amountPlaceholder: 'Enter amount', category: 'Category', note: 'Note',
      notePlaceholder: 'Enter note...', necessary: 'Essential', want: 'Desire', save: 'Save',
      cancel: 'Cancel', settings: 'Settings', language: 'Language', theme: 'Theme',
      expenseManagement: 'Expense Categories', incomeManagement: 'Income Categories',
      blue: 'Blue', green: 'Green', gray: 'Gray', black: 'Black',
      allExpenses: 'All Expenses', allIncomes: 'All Incomes', paymentMethod: 'Payment Method',
      recentTransactions: 'Recent', profile: 'Profile', userName: 'Username'
    },
    'ja': {
      appName: 'スケッチ | Spending Ace', totalExpense: '総支出', totalIncome: '総収入',
      dailyTrend: '日別トレンド', expense: '支出', income: '収入', transactions: '取引履歴',
      noData: 'データがありません。+ をタップ', addExpense: '支出を追加', addIncome: '収入を追加',
      amount: '金額', amountPlaceholder: '金額を入力', category: 'カテゴリ', note: 'メモ',
      notePlaceholder: 'メモを入力...', necessary: '必要', want: '欲しい', save: '保存',
      cancel: 'キャンセル', settings: '設定', language: '言語', theme: 'テーマ',
      expenseManagement: '支出カテゴリ', incomeManagement: '収入カテゴリ',
      blue: 'ブルー', green: 'グリーン', gray: 'グレー', black: 'ブラック',
      allExpenses: '全ての支出', allIncomes: '全ての収入', paymentMethod: '支払い方法',
      recentTransactions: '最近', profile: 'プロフィール', userName: 'ユーザー名'
    },
    'de': {
      appName: 'Spending Ace', totalExpense: 'Gesamtausgaben', totalIncome: 'Gesamteinnahmen',
      dailyTrend: 'Täglicher Trend', expense: 'Ausgabe', income: 'Einnahme', transactions: 'Transaktionen',
      noData: 'Keine Daten, tippe auf +', addExpense: 'Ausgabe hinzufügen', addIncome: 'Einnahme hinzufügen',
      amount: 'Betrag', amountPlaceholder: 'Betrag eingeben', category: 'Kategorie', note: 'Notiz',
      notePlaceholder: 'Notiz eingeben...', necessary: 'Notwendig', want: 'Wunsch', save: 'Speichern',
      cancel: 'Abbrechen', settings: 'Einstellungen', language: 'Sprache', theme: 'Thema',
      expenseManagement: 'Ausgabenkategorien', incomeManagement: 'Einnahmenkategorien',
      blue: 'Blau', green: 'Grün', gray: 'Grau', black: 'Schwarz',
      allExpenses: 'Alle Ausgaben', allIncomes: 'Alle Einnahmen', paymentMethod: 'Zahlungsmethode',
      recentTransactions: 'Neueste', profile: 'Profil', userName: 'Benutzername'
    },
    'es': {
      appName: 'Spending Ace', totalExpense: 'Gasto Total', totalIncome: 'Ingreso Total',
      dailyTrend: 'Tendencia Diaria', expense: 'Gasto', income: 'Ingreso', transactions: 'Transacciones',
      noData: 'Sin datos, toque +', addExpense: 'Agregar Gasto', addIncome: 'Agregar Ingreso',
      amount: 'Monto', amountPlaceholder: 'Ingrese monto', category: 'Categoría', note: 'Nota',
      notePlaceholder: 'Ingrese nota...', necessary: 'Necesario', want: 'Deseo', save: 'Guardar',
      cancel: 'Cancelar', settings: 'Configuración', language: 'Idioma', theme: 'Tema',
      expenseManagement: 'Categorías de Gastos', incomeManagement: 'Categorías de Ingresos',
      blue: 'Azul', green: 'Verde', gray: 'Gris', black: 'Negro',
      allExpenses: 'Todos los Gastos', allIncomes: 'Todos los Ingresos', paymentMethod: 'Método de Pago',
      recentTransactions: 'Recientes', profile: 'Perfil', userName: 'Nombre de usuario'
    }
  };

  const t = texts[settings.language];
  
  const themes = {
    blue: { primary: 'blue', text: 'blue-600', bg: 'blue-50' },
    green: { primary: 'emerald', text: 'emerald-600', bg: 'emerald-50' },
    gray: { primary: 'gray', text: 'gray-600', bg: 'gray-50' },
    black: { primary: 'gray', text: 'gray-900', bg: 'gray-100' }
  };
  
  const currentTheme = themes[settings.theme];

  // 取得最近7天日期
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0,10));
    }
    return days;
  };

  // 圖表資料計算
  const chartData = useMemo(() => {
    const last7Days = getLast7Days();
    const dailyExpense = {}, dailyIncome = {};
    last7Days.forEach(date => { dailyExpense[date] = 0; dailyIncome[date] = 0; });
    
    records.forEach(record => {
      const date = record.date;
      if (dailyExpense[date] !== undefined) {
        if (record.type === 'expense') dailyExpense[date] += record.amount;
        else dailyIncome[date] += record.amount;
      }
    });
    
    const maxVal = Math.max(...Object.values(dailyExpense), ...Object.values(dailyIncome), 1);
    const heights = last7Days.map(date => ({
      expense: (dailyExpense[date] / maxVal) * 100,
      income: (dailyIncome[date] / maxVal) * 100
    }));
    return { dates: last7Days, heights };
  }, [records]);

  // 計算總額
  const totalExpense = records.filter(r => r.type === 'expense').reduce((a,b) => a + b.amount, 0);
  const totalIncome = records.filter(r => r.type === 'income').reduce((a,b) => a + b.amount, 0);
  
  const filteredRecords = showDetailPage === 'expense' ? records.filter(r => r.type === 'expense')
    : showDetailPage === 'income' ? records.filter(r => r.type === 'income') : [];
  const recentRecords = records.slice(0, 10);
  const formatShortDate = (dateStr) => dateStr ? dateStr.split('-').slice(1).join('/') : '';

  // 事件處理
  const handleSaveSettings = () => { setSettings({ ...tempSettings }); setShowSettingsPage(false); };
  const handleCancelSettings = () => { setTempSettings({ ...settings }); setShowSettingsPage(false); };
  
  const handleCalcPress = (val) => {
    setFormData(prev => {
      let newAmount = prev.amount;
      if (val === 'C') return { ...prev, amount: '' };
      if (val === 'del') return { ...prev, amount: prev.amount.slice(0, -1) };
      if (val === '.' && newAmount.includes('.')) return prev;
      newAmount = newAmount + (val === '.' ? '.' : val.toString());
      return { ...prev, amount: newAmount };
    });
  };
  
  const handleSave = () => {
    if (!formData.amount) return;
    const newRecord = { 
      ...formData, type: inputType, amount: parseFloat(formData.amount), 
      id: Date.now(), paymentMethod: formData.paymentMethod || (inputType === 'income' ? settings.incomeCategories[0] : '')
    };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setShowCalculator(false);
    setFormData({ 
      amount: '', category: inputType === 'expense' ? settings.expenseCategories[0] : settings.incomeCategories[0],
      nature: 'essential', note: '', date: new Date().toISOString().slice(0,10), paymentMethod: ''
    });
  };
  
  const handleDeleteRecord = (id) => setRecords(records.filter(record => record.id !== id));

  // Helper: 動態主題類別
  const themeClass = (type, colorPart = 'primary') => {
    const color = colorPart === 'primary' ? currentTheme.primary : currentTheme[colorPart];
    return `${type}-${color}`;
  };

  return (
    <div className={`min-h-screen bg-gray-50 pb-32 font-sans ${settings.theme === 'black' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}>
      
      {/* 頂部 Header */}
      <div className={`bg-${currentTheme.primary}-500 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md`}>
        <button onClick={() => setShowSettingsPage(true)} className="p-2 hover:opacity-80">
          <CircleUser size={28} />
        </button>
        <h1 className="font-bold text-xl">{t.appName}</h1>
        <button onClick={() => setShowSettingsPage(true)} className="p-2 hover:opacity-80">
          <Settings size={24} />
        </button>
      </div>

      {/* 設定頁面 */}
      {showSettingsPage && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className={`bg-${currentTheme.primary}-500 text-white p-5 sticky top-0 flex justify-between items-center`}>
            <button onClick={handleCancelSettings} className="p-2"><X size={24} /></button>
            <h2 className="font-bold text-lg">{t.settings}</h2>
            <div className="w-10"></div>
          </div>
          <div className="p-6 space-y-6">
            {/* 個人資料 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.profile}</label>
              <div className="flex items-center gap-4">
                <CircleUser size={48} className="text-gray-400" />
                <input type="text" value={tempSettings.userName} onChange={(e) => setTempSettings({...tempSettings, userName: e.target.value})}
                  className="flex-1 p-2 border rounded-lg" placeholder={t.userName} />
              </div>
            </div>
            {/* 語言設定 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.language}</label>
              <div className="grid grid-cols-2 gap-2">
                {['zh-TW', 'en', 'ja', 'de', 'es'].map(lang => (
                  <button key={lang} onClick={() => setTempSettings({...tempSettings, language: lang})}
                    className={`p-2 rounded-lg text-sm font-bold border ${tempSettings.language === lang ? `bg-${currentTheme.primary}-500 text-white` : 'bg-gray-100'}`}>
                    {lang === 'zh-TW' && '繁體中文'}{lang === 'en' && 'English'}{lang === 'ja' && '日本語'}
                    {lang === 'de' && 'Deutsch'}{lang === 'es' && 'Español'}
                  </button>
                ))}
              </div>
            </div>
            {/* 主題設定 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.theme}</label>
              <div className="flex gap-2">
                {['blue', 'green', 'gray', 'black'].map(theme => (
                  <button key={theme} onClick={() => setTempSettings({...tempSettings, theme})}
                    className={`flex-1 py-2 rounded-lg font-bold border ${tempSettings.theme === theme ? `bg-${theme === 'black' ? 'gray-900' : theme + '-500'} text-white` : 'bg-gray-100'}`}>
                    {theme === 'blue' && t.blue}{theme === 'green' && t.green}{theme === 'gray' && t.gray}{theme === 'black' && t.black}
                  </button>
                ))}
              </div>
            </div>
            {/* 支出/收入分類管理 */}
            {['expense', 'income'].map(type => (
              <div key={type}>
                <label className="block text-sm font-bold mb-3 text-gray-700">{type === 'expense' ? t.expenseManagement : t.incomeManagement}</label>
                <div className="flex flex-wrap gap-2">
                  {(type === 'expense' ? tempSettings.expenseCategories : tempSettings.incomeCategories).map((cat, idx) => (
                    <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                      <span>{cat}</span>
                      <button onClick={() => {
                        const newCats = (type === 'expense' ? tempSettings.expenseCategories : tempSettings.incomeCategories).filter((_, i) => i !== idx);
                        setTempSettings(type === 'expense' ? {...tempSettings, expenseCategories: newCats} : {...tempSettings, incomeCategories: newCats});
                      }} className="text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newCat = prompt('請輸入新分類名稱');
                    if (newCat?.trim()) {
                      if (type === 'expense') setTempSettings({...tempSettings, expenseCategories: [...tempSettings.expenseCategories, newCat.trim()]});
                      else setTempSettings({...tempSettings, incomeCategories: [...tempSettings.incomeCategories, newCat.trim()]});
                    }
                  }} className="text-blue-500 text-sm font-bold">+ 新增</button>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveSettings} className={`flex-1 bg-${currentTheme.primary}-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2`}><Save size={20} /> {t.save}</button>
              <button onClick={handleCancelSettings} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2"><RefreshCw size={20} /> {t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* 詳細頁面 */}
      {(showDetailPage === 'expense' || showDetailPage === 'income') && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className={`bg-${currentTheme.primary}-500 text-white p-5 sticky top-0 flex items-center`}>
            <button onClick={() => setShowDetailPage(null)} className="p-2 absolute left-2"><ChevronLeft size={28} /></button>
            <h2 className="font-bold text-lg flex-1 text-center">{showDetailPage === 'expense' ? t.allExpenses : t.allIncomes}</h2>
            <div className="w-10"></div>
          </div>
          <div className="p-4 space-y-3">
            {filteredRecords.length === 0 ? <div className="text-center py-20 text-gray-400">{t.noData}</div> :
              filteredRecords.map(record => (
                <div key={record.id} className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
                  <div><p className="font-bold">{record.category}</p><p className="text-sm text-gray-500">{record.note || record.date}</p></div>
                  <div className="flex items-center gap-3">
                    <p className={`font-black ${showDetailPage === 'expense' ? 'text-red-500' : 'text-green-500'}`}>{showDetailPage === 'expense' ? '-' : '+'} HK${record.amount}</p>
                    <button onClick={() => handleDeleteRecord(record.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 主頁面 */}
      {!showInputPage && !showSettingsPage && !showDetailPage && (
        <main className="p-4 space-y-6">
          {/* 總計卡片 */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setShowDetailPage('expense')} className="bg-black text-white p-5 rounded-3xl text-left active:scale-95">
              <p className="text-sm opacity-60">{t.totalExpense}</p>
              <p className="text-2xl font-black text-rose-300">HK$ {totalExpense}</p>
              <ArrowUpCircle size={20} className="mt-2 opacity-60" />
            </button>
            <button onClick={() => setShowDetailPage('income')} className="bg-white p-5 rounded-3xl shadow-sm text-left active:scale-95 border">
              <p className="text-sm text-gray-400">{t.totalIncome}</p>
              <p className={`text-2xl font-black text-${currentTheme.text}`}>HK$ {totalIncome}</p>
              <ArrowDownCircle size={20} className="mt-2 text-gray-400" />
            </button>
          </div>

          {/* 圖表 */}
          <section className="bg-white p-5 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">{t.dailyTrend}</h3>
              <div className="flex gap-3 text-xs font-bold">
                <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> {t.expense}</span>
                <span className={`flex items-center gap-1 text-${currentTheme.text}`}><div className={`w-2 h-2 rounded-full bg-${currentTheme.primary}-500`}></div> {t.income}</span>
              </div>
            </div>
            <div className="h-40 flex items-end justify-around gap-1 border-b pb-2">
              {chartData.dates.map((date, idx) => (
                <div key={date} className="flex gap-1 items-end h-full w-full justify-center">
                  <div className="w-5 bg-rose-400 rounded-t-sm transition-all" style={{ height: `${chartData.heights[idx].expense}%`, minHeight: '2px' }}></div>
                  <div className={`w-5 bg-${currentTheme.primary}-500 rounded-t-sm transition-all`} style={{ height: `${chartData.heights[idx].income}%`, minHeight: '2px' }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-[10px] font-bold text-gray-400">
              {chartData.dates.map(date => <span key={date}>{formatShortDate(date)}</span>)}
            </div>
          </section>

          {/* 最近記錄 */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-3">{t.recentTransactions} ({Math.min(10, records.length)})</h3>
            {records.length === 0 ? <div className="text-center py-10 text-gray-300">{t.noData}</div> :
              recentRecords.map(record => (
                <div key={record.id} className="bg-white p-4 rounded-2xl flex justify-between items-center mb-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : `bg-${currentTheme.bg} text-${currentTheme.text}`}`}>
                      <TrendingUp size={20} />
                    </div>
                    <div><p className="font-bold">{record.category}</p><p className="text-xs text-gray-400">{record.note || record.date}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`font-bold ${record.type === 'expense' ? 'text-rose-600' : `text-${currentTheme.text}`}`}>HK${record.amount}</p>
                    <button onClick={() => handleDeleteRecord(record.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
          </div>
        </main>
      )}

      {/* 新增頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className={`bg-${inputType === 'expense' ? 'rose-500' : currentTheme.primary + '-500'} p-5 text-white flex justify-between items-center`}>
            <button onClick={() => { setShowInputPage(false); setShowCalculator(false); }} className="p-2"><X size={28} /></button>
            <span className="font-bold text-lg">{inputType === 'expense' ? t.addExpense : t.addIncome}</span>
            <div className="w-10"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* 金額 */}
            <div>
              <label className="text-xs font-bold text-gray-500">{t.amount} <span className="text-red-500">*</span></label>
              <button onClick={() => setShowCalculator(!showCalculator)} className="w-full bg-gray-50 p-4 rounded-2xl text-left border mt-1">
                {formData.amount ? <span className="text-3xl font-black">HK$ {formData.amount}</span> : <span className="text-gray-400">{t.amountPlaceholder}</span>}
              </button>
            </div>
            {/* 計算機 */}
            {showCalculator && (
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="bg-white p-3 rounded-xl mb-3 text-right text-2xl font-black">{formData.amount || '0'}</div>
                <div className="grid grid-cols-4 gap-2">
                  {[7,8,9,'del',4,5,6,'C',1,2,3,0,'.','00'].map(btn => (
                    <button key={btn} onClick={() => handleCalcPress(btn)} className="h-12 bg-white rounded-xl font-bold text-lg active:scale-95">
                      {btn === 'del' ? <Delete size={20} /> : btn}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* 日期 */}
            <div><label className="text-xs font-bold text-gray-500">日期</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border mt-1" />
            </div>
            {/* 分類 */}
            <div><label className="text-xs font-bold text-gray-500">{t.category}</label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                {(inputType === 'expense' ? settings.expenseCategories : settings.incomeCategories).map(cat => (
                  <button key={cat} onClick={() => setFormData({...formData, category: cat})}
                    className={`py-2 rounded-xl text-sm font-bold border ${formData.category === cat ? `bg-${currentTheme.primary}-500 text-white` : 'bg-white'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* 必要/想要 */}
            {inputType === 'expense' && (
              <div><label className="text-xs font-bold text-gray-500">類型</label>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setFormData({...formData, nature: 'essential'})} className={`flex-1 py-3 rounded-xl font-bold border ${formData.nature === 'essential' ? 'bg-blue-600 text-white' : 'bg-white'}`}>{t.necessary}</button>
                  <button onClick={() => setFormData({...formData, nature: 'desire'})} className={`flex-1 py-3 rounded-xl font-bold border ${formData.nature === 'desire' ? 'bg-orange-500 text-white' : 'bg-white'}`}>{t.want}</button>
                </div>
              </div>
            )}
            {/* 付款方式 */}
            {inputType === 'income' && (
              <div><label className="text-xs font-bold text-gray-500">{t.paymentMethod}</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {settings.incomeCategories.map(method => (
                    <button key={method} onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`p-3 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 ${formData.paymentMethod === method ? `bg-${currentTheme.primary}-500 text-white` : 'bg-white'}`}>
                      {method === '現金' && <DollarSign size={16} />}{method === '信用卡' && <CreditCard size={16} />}
                      {method === 'AlipayHK' && <Smartphone size={16} />}{method === 'PayMe' && <Gift size={16} />}{method}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* 備註 */}
            <div><label className="text-xs font-bold text-gray-500">{t.note}</label>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border mt-1">
                <MessageSquare size={16} className="text-gray-400" />
                <input type="text" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder={t.notePlaceholder} className="bg-transparent text-sm outline-none flex-1" />
              </div>
            </div>
          </div>
          <div className="p-5 border-t flex gap-3">
            <button onClick={() => { setShowInputPage(false); setShowCalculator(false); }} className="flex-1 bg-gray-200 py-3 rounded-xl font-bold">{t.cancel}</button>
            <button onClick={handleSave} className={`flex-1 bg-${currentTheme.primary}-500 text-white py-3 rounded-xl font-bold`}>{t.save}</button>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t flex justify-around items-center py-3 z-30 px-6">
        <button onClick={() => { setActiveTab('home'); setShowInputPage(false); setShowSettingsPage(false); setShowDetailPage(null); }} 
          className={`flex flex-col items-center ${activeTab === 'home' ? `text-${currentTheme.text}` : 'text-gray-300'}`}>
          <Download size={26} /><span className="text-[10px] mt-1 font-bold">{t.transactions}</span>
        </button>
        <div className="relative -top-8">
          <button onClick={() => { setInputType('expense'); setShowInputPage(true); setShowCalculator(false); setFormData({ amount: '', category: settings.expenseCategories[0], nature: 'essential', note: '', date: new Date().toISOString().slice(0,10), paymentMethod: '' }); }} 
            className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white active:scale-95">
            <Plus size={32} />
          </button>
        </div>
        <button onClick={() => { setInputType('income'); setShowInputPage(true); setShowCalculator(false); setFormData({ amount: '', category: settings.incomeCategories[0], nature: 'essential', note: '', date: new Date().toISOString().slice(0,10), paymentMethod: settings.incomeCategories[0] }); }} 
          className={`flex flex-col items-center ${showInputPage && inputType === 'income' ? `text-${currentTheme.text}` : 'text-gray-300'}`}>
          <Wallet size={26} /><span className="text-[10px] mt-1 font-bold">{t.addIncome}</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
