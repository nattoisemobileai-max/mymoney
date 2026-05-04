import React, { useState, useMemo, useEffect } from 'react';
import { 
  Download, Wallet, Plus, X, Menu, ChevronLeft, ChevronRight, 
  Trash2, TrendingUp, Check, MessageSquare, Delete, Settings,
  CreditCard, DollarSign, Smartphone, Gift, Save, RefreshCw,
  Eye, ArrowUpCircle, ArrowDownCircle, BarChart3, User, CircleUser
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
    userName: '用戶',
    userAvatar: ''
  });

  const [tempSettings, setTempSettings] = useState({ ...settings });

  const texts = {
    'zh-TW': {
      appName: '隨手記 | Spending Ace',
      totalExpense: '總支出',
      totalIncome: '總收入',
      dailyTrend: '每日趨勢',
      expense: '支出',
      income: '收入',
      transactions: '交易紀錄',
      noData: '暫無數據，請點擊下方 + 開始記帳',
      addExpense: '新增支出',
      addIncome: '新增收入',
      amount: '金額',
      amountPlaceholder: '請輸入金額',
      category: '分類',
      note: '備註',
      notePlaceholder: '輸入備註...',
      necessary: '必要',
      want: '想要',
      save: '儲存',
      cancel: '取消',
      settings: '設定',
      language: '語言',
      theme: '主題',
      expenseManagement: '支出分類管理',
      incomeManagement: '收入分類管理',
      blue: '藍色',
      green: '綠色',
      gray: '灰色',
      black: '黑色',
      allExpenses: '全部支出',
      allIncomes: '全部收入',
      paymentMethod: '付款方式',
      recentTransactions: '最近記錄',
      profile: '個人資料',
      userName: '用戶名稱'
    },
    'en': {
      appName: 'Spending Ace',
      totalExpense: 'Total Expense',
      totalIncome: 'Total Income',
      dailyTrend: 'Daily Trend',
      expense: 'Expense',
      income: 'Income',
      transactions: 'Transactions',
      noData: 'No data yet, tap + to start tracking',
      addExpense: 'Add Expense',
      addIncome: 'Add Income',
      amount: 'Amount',
      amountPlaceholder: 'Enter amount',
      category: 'Category',
      note: 'Note',
      notePlaceholder: 'Enter note...',
      necessary: 'Essential',
      want: 'Desire',
      save: 'Save',
      cancel: 'Cancel',
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      expenseManagement: 'Expense Categories',
      incomeManagement: 'Income Categories',
      blue: 'Blue',
      green: 'Green',
      gray: 'Gray',
      black: 'Black',
      allExpenses: 'All Expenses',
      allIncomes: 'All Incomes',
      paymentMethod: 'Payment Method',
      recentTransactions: 'Recent',
      profile: 'Profile',
      userName: 'Username'
    },
    'ja': {
      appName: 'スケッチ | Spending Ace',
      totalExpense: '総支出',
      totalIncome: '総収入',
      dailyTrend: '日別トレンド',
      expense: '支出',
      income: '収入',
      transactions: '取引履歴',
      noData: 'データがありません。+ をタップして記帳を開始',
      addExpense: '支出を追加',
      addIncome: '収入を追加',
      amount: '金額',
      amountPlaceholder: '金額を入力',
      category: 'カテゴリ',
      note: 'メモ',
      notePlaceholder: 'メモを入力...',
      necessary: '必要',
      want: '欲しい',
      save: '保存',
      cancel: 'キャンセル',
      settings: '設定',
      language: '言語',
      theme: 'テーマ',
      expenseManagement: '支出カテゴリ',
      incomeManagement: '収入カテゴリ',
      blue: 'ブルー',
      green: 'グリーン',
      gray: 'グレー',
      black: 'ブラック',
      allExpenses: '全ての支出',
      allIncomes: '全ての収入',
      paymentMethod: '支払い方法',
      recentTransactions: '最近',
      profile: 'プロフィール',
      userName: 'ユーザー名'
    },
    'de': {
      appName: 'Spending Ace',
      totalExpense: 'Gesamtausgaben',
      totalIncome: 'Gesamteinnahmen',
      dailyTrend: 'Täglicher Trend',
      expense: 'Ausgabe',
      income: 'Einnahme',
      transactions: 'Transaktionen',
      noData: 'Keine Daten, tippen Sie auf + um zu beginnen',
      addExpense: 'Ausgabe hinzufügen',
      addIncome: 'Einnahme hinzufügen',
      amount: 'Betrag',
      amountPlaceholder: 'Betrag eingeben',
      category: 'Kategorie',
      note: 'Notiz',
      notePlaceholder: 'Notiz eingeben...',
      necessary: 'Notwendig',
      want: 'Wunsch',
      save: 'Speichern',
      cancel: 'Abbrechen',
      settings: 'Einstellungen',
      language: 'Sprache',
      theme: 'Thema',
      expenseManagement: 'Ausgabenkategorien',
      incomeManagement: 'Einnahmenkategorien',
      blue: 'Blau',
      green: 'Grün',
      gray: 'Grau',
      black: 'Schwarz',
      allExpenses: 'Alle Ausgaben',
      allIncomes: 'Alle Einnahmen',
      paymentMethod: 'Zahlungsmethode',
      recentTransactions: 'Neueste',
      profile: 'Profil',
      userName: 'Benutzername'
    },
    'es': {
      appName: 'Spending Ace',
      totalExpense: 'Gasto Total',
      totalIncome: 'Ingreso Total',
      dailyTrend: 'Tendencia Diaria',
      expense: 'Gasto',
      income: 'Ingreso',
      transactions: 'Transacciones',
      noData: 'Sin datos, toque + para comenzar',
      addExpense: 'Agregar Gasto',
      addIncome: 'Agregar Ingreso',
      amount: 'Monto',
      amountPlaceholder: 'Ingrese monto',
      category: 'Categoría',
      note: 'Nota',
      notePlaceholder: 'Ingrese nota...',
      necessary: 'Necesario',
      want: 'Deseo',
      save: 'Guardar',
      cancel: 'Cancelar',
      settings: 'Configuración',
      language: 'Idioma',
      theme: 'Tema',
      expenseManagement: 'Categorías de Gastos',
      incomeManagement: 'Categorías de Ingresos',
      blue: 'Azul',
      green: 'Verde',
      gray: 'Gris',
      black: 'Negro',
      allExpenses: 'Todos los Gastos',
      allIncomes: 'Todos los Ingresos',
      paymentMethod: 'Método de Pago',
      recentTransactions: 'Recientes',
      profile: 'Perfil',
      userName: 'Nombre de usuario'
    }
  };

  const t = texts[settings.language];

  const themes = {
    blue: { primary: 'blue-500', secondary: 'blue-600', bg: 'blue-50', text: 'blue-600' },
    green: { primary: 'emerald-500', secondary: 'emerald-600', bg: 'emerald-50', text: 'emerald-600' },
    gray: { primary: 'gray-500', secondary: 'gray-600', bg: 'gray-50', text: 'gray-600' },
    black: { primary: 'gray-900', secondary: 'gray-900', bg: 'gray-100', text: 'gray-900' }
  };

  const currentTheme = themes[settings.theme];

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0,10);
      days.push(dateStr);
    }
    return days;
  };

  const chartData = useMemo(() => {
    const last7Days = getLast7Days();
    const dailyExpense = {};
    const dailyIncome = {};
    
    last7Days.forEach(date => {
      dailyExpense[date] = 0;
      dailyIncome[date] = 0;
    });

    records.forEach(record => {
      const date = record.date;
      if (dailyExpense[date] !== undefined) {
        if (record.type === 'expense') {
          dailyExpense[date] += record.amount;
        } else {
          dailyIncome[date] += record.amount;
        }
      }
    });

    const expenseValues = Object.values(dailyExpense);
    const incomeValues = Object.values(dailyIncome);
    const maxExpense = Math.max(...expenseValues, 0);
    const maxIncome = Math.max(...incomeValues, 0);
    const globalMax = Math.max(maxExpense, maxIncome, 1);

    const heights = last7Days.map(date => ({
      expense: (dailyExpense[date] / globalMax) * 100,
      income: (dailyIncome[date] / globalMax) * 100
    }));

    return { dates: last7Days, heights };
  }, [records]);

  const handleSaveSettings = () => {
    setSettings({ ...tempSettings });
    setShowSettingsPage(false);
  };

  const handleCancelSettings = () => {
    setTempSettings({ ...settings });
    setShowSettingsPage(false);
  };

  const handleCalcPress = (val) => {
    setFormData(prev => {
      let newAmount = prev.amount;
      if (val === 'C') return { ...prev, amount: '' };
      if (val === 'del') return { ...prev, amount: prev.amount.slice(0, -1) };
      if (val === '.') {
        if (newAmount.includes('.')) return prev;
        newAmount = newAmount + '.';
      } else {
        newAmount = newAmount + val;
      }
      return { ...prev, amount: newAmount };
    });
  };

  const handleSave = () => {
    if (!formData.amount || formData.amount === '0') return;
    
    const amountNum = parseFloat(formData.amount);
    const newRecord = { 
      ...formData, 
      type: inputType, 
      amount: amountNum, 
      id: Date.now(),
      paymentMethod: formData.paymentMethod || (inputType === 'income' ? settings.incomeCategories[0] : '')
    };
    setRecords([newRecord, ...records]);
    setShowInputPage(false);
    setShowCalculator(false);
    setFormData({ 
      amount: '', 
      category: inputType === 'expense' ? settings.expenseCategories[0] : settings.incomeCategories[0],
      nature: 'essential', 
      note: '', 
      date: new Date().toISOString().slice(0,10),
      paymentMethod: ''
    });
  };

  const handleDeleteRecord = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const formatShortDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}`;
  };

  const totalExpense = records.filter(r => r.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const totalIncome = records.filter(r => r.type === 'income').reduce((a, b) => a + b.amount, 0);

  const filteredRecords = showDetailPage === 'expense' 
    ? records.filter(r => r.type === 'expense')
    : showDetailPage === 'income'
    ? records.filter(r => r.type === 'income')
    : [];

  // 獲取最近10筆紀錄（不論支出或收入）
  const recentRecords = records.slice(0, 10);

  return (
    <div className={`min-h-screen bg-[#F8F9FB] text-gray-900 pb-32 font-sans select-none overflow-x-hidden ${settings.theme === 'black' ? 'bg-gray-900 text-white' : ''}`}>
      
      {/* 頂部 Header - 左側用戶圖示，右側設定圖示 */}
      <div className={`bg-${currentTheme.primary} text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md`}>
        <button onClick={() => setShowSettingsPage(true)} className="p-2">
          <CircleUser size={28} />
        </button>
        <h1 className="font-bold text-xl">{t.appName}</h1>
        <button onClick={() => setShowSettingsPage(true)} className="p-2">
          <Settings size={24} />
        </button>
      </div>

      {/* 設定頁面 */}
      {showSettingsPage && (
        <div className="fixed inset-0 bg-white z-[300] overflow-y-auto">
          <div className={`bg-${currentTheme.primary} text-white p-5 sticky top-0 flex justify-between items-center`}>
            <button onClick={handleCancelSettings} className="p-2"><X size={24} /></button>
            <h2 className="font-bold text-lg">{t.settings}</h2>
            <div className="w-10"></div>
          </div>

          <div className="p-6 space-y-6">
            {/* 個人資料 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.profile}</label>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <CircleUser size={40} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={tempSettings.userName}
                    onChange={(e) => setTempSettings({...tempSettings, userName: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    placeholder={t.userName}
                  />
                </div>
              </div>
            </div>

            {/* 語言設定 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.language}</label>
              <div className="grid grid-cols-2 gap-2">
                {['zh-TW', 'en', 'ja', 'de', 'es'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setTempSettings({...tempSettings, language: lang})}
                    className={`p-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      tempSettings.language === lang 
                        ? `bg-${currentTheme.primary} text-white border-${currentTheme.primary}` 
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {lang === 'zh-TW' && '繁體中文'}
                    {lang === 'en' && 'English'}
                    {lang === 'ja' && '日本語'}
                    {lang === 'de' && 'Deutsch'}
                    {lang === 'es' && 'Español'}
                  </button>
                ))}
              </div>
            </div>

            {/* 主題設定 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.theme}</label>
              <div className="grid grid-cols-4 gap-2">
                {['blue', 'green', 'gray', 'black'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => setTempSettings({...tempSettings, theme: theme})}
                    className={`p-3 rounded-xl text-xs font-bold border-2 ${
                      tempSettings.theme === theme 
                        ? `bg-${theme === 'black' ? 'gray-900' : theme + '-500'} text-white border-${theme === 'black' ? 'gray-900' : theme + '-500'}` 
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {theme === 'blue' && t.blue}
                    {theme === 'green' && t.green}
                    {theme === 'gray' && t.gray}
                    {theme === 'black' && t.black}
                  </button>
                ))}
              </div>
            </div>

            {/* 支出分類管理 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.expenseManagement}</label>
              <div className="flex flex-wrap gap-2">
                {tempSettings.expenseCategories.map((cat, idx) => (
                  <div key={idx} className="bg-gray-100 px-3 py-2 rounded-full flex items-center gap-2">
                    <span className="text-sm">{cat}</span>
                    <button
                      onClick={() => {
                        const newCats = tempSettings.expenseCategories.filter((_, i) => i !== idx);
                        setTempSettings({...tempSettings, expenseCategories: newCats});
                      }}
                      className="text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newCat = prompt('請輸入新分類名稱');
                  if (newCat) {
                    setTempSettings({
                      ...tempSettings,
                      expenseCategories: [...tempSettings.expenseCategories, newCat]
                    });
                  }
                }}
                className="mt-2 text-sm text-blue-500 font-bold"
              >
                + 新增分類
              </button>
            </div>

            {/* 收入分類管理 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.incomeManagement}</label>
              <div className="flex flex-wrap gap-2">
                {tempSettings.incomeCategories.map((cat, idx) => (
                  <div key={idx} className="bg-gray-100 px-3 py-2 rounded-full flex items-center gap-2">
                    <span className="text-sm">{cat}</span>
                    <button
                      onClick={() => {
                        const newCats = tempSettings.incomeCategories.filter((_, i) => i !== idx);
                        setTempSettings({...tempSettings, incomeCategories: newCats});
                      }}
                      className="text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newCat = prompt('請輸入新分類名稱');
                  if (newCat) {
                    setTempSettings({
                      ...tempSettings,
                      incomeCategories: [...tempSettings.incomeCategories, newCat]
                    });
                  }
                }}
                className="mt-2 text-sm text-blue-500 font-bold"
              >
                + 新增分類
              </button>
            </div>

            {/* 按鈕 */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveSettings}
                className={`flex-1 bg-${currentTheme.primary} text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2`}
              >
                <Save size={20} /> {t.save}
              </button>
              <button
                onClick={handleCancelSettings}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} /> {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 詳細頁面 */}
      {(showDetailPage === 'expense' || showDetailPage === 'income') && (
        <div className="fixed inset-0 bg-white z-[250] overflow-y-auto">
          <div className={`bg-${currentTheme.primary} text-white p-5 sticky top-0 flex justify-between items-center`}>
            <button onClick={() => setShowDetailPage(null)} className="p-2"><ChevronLeft size={28} /></button>
            <h2 className="font-bold text-lg">
              {showDetailPage === 'expense' ? t.allExpenses : t.allIncomes}
            </h2>
            <div className="w-10"></div>
          </div>

          <div className="p-4 space-y-3">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-20 text-gray-400 font-bold text-base">
                {t.noData}
              </div>
            ) : (
              filteredRecords.map(record => (
                <div key={record.id} className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800 text-base">{record.category}</p>
                    <p className="text-sm text-gray-500 mt-1">{record.note || record.date}</p>
                    {record.paymentMethod && (
                      <p className="text-xs text-gray-400 mt-1">{record.paymentMethod}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-black text-lg ${
                      showDetailPage === 'expense' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {showDetailPage === 'expense' ? '-' : '+'} HK${record.amount}
                    </p>
                    <button
                      onClick={() => handleDeleteRecord(record.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 主頁面內容 */}
      {!showInputPage && !showSettingsPage && !showDetailPage && (
        <main className="p-4 space-y-6 animate-in fade-in">
          {/* 數據概覽卡片 - 放大字型 */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowDetailPage('expense')}
              className="bg-black text-white p-6 rounded-[2rem] shadow-lg text-left transition-transform active:scale-95"
            >
              <p className="text-sm font-bold opacity-60">{t.totalExpense}</p>
              <p className="text-3xl font-black text-rose-300 mt-1">HK$ {totalExpense}</p>
              <ArrowUpCircle size={22} className="mt-3 opacity-60" />
            </button>
            <button 
              onClick={() => setShowDetailPage('income')}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-left transition-transform active:scale-95"
            >
              <p className="text-sm font-bold text-gray-400">{t.totalIncome}</p>
              <p className={`text-3xl font-black text-${currentTheme.text} mt-1`}>HK$ {totalIncome}</p>
              <ArrowDownCircle size={22} className="mt-3 text-gray-400" />
            </button>
          </div>

          {/* 動態長條圖 - 放大字型 */}
          <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-base font-black text-gray-700">{t.dailyTrend}</h3>
              <div className="flex gap-4 text-xs font-bold">
                <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500"></div> {t.expense}</span>
                <span className={`flex items-center gap-1 text-${currentTheme.text}`}><div className={`w-2 h-2 rounded-full bg-${currentTheme.primary}`}></div> {t.income}</span>
              </div>
            </div>
            <div className="h-48 flex items-end justify-around gap-1 px-2 border-b border-gray-100 pb-2">
              {chartData.dates.map((date, idx) => (
                <div key={date} className="flex gap-1 items-end h-full w-full justify-center">
                  <div 
                    className="w-6 bg-rose-400 rounded-t-sm transition-all duration-300" 
                    style={{ height: `${chartData.heights[idx].expense}%` }}
                  ></div>
                  <div 
                    className={`w-6 bg-${currentTheme.primary} rounded-t-sm transition-all duration-300`} 
                    style={{ height: `${chartData.heights[idx].income}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-3 text-xs font-black text-gray-400 uppercase">
              {chartData.dates.map(date => (
                <span key={date}>{formatShortDate(date)}</span>
              ))}
            </div>
            {records.length === 0 && (
              <div className="text-center text-sm text-gray-300 mt-4">{t.noData}</div>
            )}
          </section>

          {/* 交易記錄 - 只顯示最近10筆，放大字型 */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-2">
              {t.recentTransactions} ({Math.min(10, records.length)}/{records.length})
            </h3>
            {records.length === 0 ? (
              <div className="text-center py-10 text-gray-300 font-bold text-base">{t.noData}</div>
            ) : (
              recentRecords.map(record => (
                <div key={record.id} className="bg-white p-5 rounded-[1.8rem] flex justify-between items-center border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : `bg-${currentTheme.bg} text-${currentTheme.text}`}`}>
                      <TrendingUp size={22}/>
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-base">{record.category}</p>
                      <p className="text-sm text-gray-400 font-medium mt-0.5">{record.note || record.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-black text-lg ${record.type === 'expense' ? 'text-rose-600' : `text-${currentTheme.text}`}`}>
                      HK${record.amount}
                    </p>
                    <button 
                      onClick={() => handleDeleteRecord(record.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {/* 新增頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`bg-${inputType === 'expense' ? 'rose-500' : currentTheme.primary} p-5 text-white flex justify-between items-center`}>
            <button onClick={() => {
              setShowInputPage(false);
              setShowCalculator(false);
            }} className="p-2">
              <X size={30} />
            </button>
            <span className="text-lg font-black">
              {inputType === 'expense' ? t.addExpense : t.addIncome}
            </span>
            <div className="w-10"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* 金額輸入區域 */}
            <div>
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                {t.amount} <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="w-full bg-gray-50 p-5 rounded-2xl text-left border border-gray-200"
              >
                {formData.amount ? (
                  <span className="text-4xl font-black text-gray-800">HK$ {formData.amount}</span>
                ) : (
                  <span className="text-base text-gray-400">{t.amountPlaceholder}</span>
                )}
              </button>
            </div>

            {/* 計算機 */}
            {showCalculator && (
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="bg-white p-4 rounded-xl mb-3 text-right">
                  <span className="text-3xl font-black">{formData.amount || '0'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[7, 8, 9, 'del', 4, 5, 6, 'C', 1, 2, 3, 0, '.', '00'].map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handleCalcPress(btn)}
                      className="h-14 bg-white rounded-xl font-bold text-xl flex items-center justify-center active:scale-95"
                    >
                      {btn === 'del' ? <Delete size={22} /> : btn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 日期選擇 */}
            <div>
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">日期</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-base"
              />
            </div>

            {/* 分類選擇 */}
            <div>
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">{t.category}</label>
              <div className="grid grid-cols-4 gap-2">
                {(inputType === 'expense' ? settings.expenseCategories : settings.incomeCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      formData.category === cat 
                        ? `bg-${currentTheme.primary} text-white border-${currentTheme.primary}` 
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 必要/想要 (僅支出) */}
            {inputType === 'expense' && (
              <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">類型</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFormData({...formData, nature: 'essential'})}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 text-base ${
                      formData.nature === 'essential' 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {t.necessary}
                  </button>
                  <button
                    onClick={() => setFormData({...formData, nature: 'desire'})}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 text-base ${
                      formData.nature === 'desire' 
                        ? 'bg-orange-500 text-white border-orange-500' 
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {t.want}
                  </button>
                </div>
              </div>
            )}

            {/* 付款方式 (僅收入) */}
            {inputType === 'income' && (
              <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">{t.paymentMethod}</label>
                <div className="grid grid-cols-2 gap-2">
                  {settings.incomeCategories.map(method => (
                    <button
                      key={method}
                      onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`p-4 rounded-xl text-sm font-bold border-2 flex items-center justify-center gap-2 ${
                        formData.paymentMethod === method 
                          ? `bg-${currentTheme.primary} text-white border-${currentTheme.primary}` 
                          : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      {method === '現金' && <DollarSign size={18} />}
                      {method === '信用卡' && <CreditCard size={18} />}
                      {method === 'AlipayHK' && <Smartphone size={18} />}
                      {method === 'PayMe' && <Gift size={18} />}
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 備註 */}
            <div>
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">{t.note}</label>
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <MessageSquare size={18} className="text-gray-400"/>
                <input 
                  type="text" 
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  placeholder={t.notePlaceholder}
                  className="bg-transparent text-base outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* 按鈕 */}
          <div className="p-5 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => {
                setShowInputPage(false);
                setShowCalculator(false);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-base"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 bg-${currentTheme.primary} text-white py-4 rounded-xl font-bold text-base`}
            >
              {t.save}
            </button>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center py-5 z-40 px-6">
        <button 
          onClick={() => {
            setActiveTab('home');
            setShowInputPage(false);
            setShowSettingsPage(false);
            setShowDetailPage(null);
          }} 
          className={`flex flex-col items-center w-1/3 ${activeTab === 'home' && !show
