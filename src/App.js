import React, { useState, useMemo } from 'react';

// 分離圖標導入，避免可能的打包問題
import Download from 'lucide-react/dist/esm/icons/download';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import Plus from 'lucide-react/dist/esm/icons/plus';
import X from 'lucide-react/dist/esm/icons/x';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Delete from 'lucide-react/dist/esm/icons/delete';
import Settings from 'lucide-react/dist/esm/icons/settings';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import Smartphone from 'lucide-react/dist/esm/icons/smartphone';
import Gift from 'lucide-react/dist/esm/icons/gift';
import Save from 'lucide-react/dist/esm/icons/save';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import ArrowUpCircle from 'lucide-react/dist/esm/icons/arrow-up-circle';
import ArrowDownCircle from 'lucide-react/dist/esm/icons/arrow-down-circle';
import CircleUser from 'lucide-react/dist/esm/icons/circle-user';

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

  const t = texts[settings.language] || texts['zh-TW'];
  
  // 使用靜態類別映射，避免 Tailwind 動態類別問題
  const getThemeColors = (theme) => {
    switch(theme) {
      case 'blue': return { primaryBg: 'bg-blue-500', primaryText: 'text-blue-600', bgLight: 'bg-blue-50', borderColor: 'border-blue-500' };
      case 'green': return { primaryBg: 'bg-emerald-500', primaryText: 'text-emerald-600', bgLight: 'bg-emerald-50', borderColor: 'border-emerald-500' };
      case 'gray': return { primaryBg: 'bg-gray-500', primaryText: 'text-gray-600', bgLight: 'bg-gray-50', borderColor: 'border-gray-500' };
      case 'black': return { primaryBg: 'bg-gray-900', primaryText: 'text-gray-900', bgLight: 'bg-gray-100', borderColor: 'border-gray-900' };
      default: return { primaryBg: 'bg-emerald-500', primaryText: 'text-emerald-600', bgLight: 'bg-emerald-50', borderColor: 'border-emerald-500' };
    }
  };
  
  const currentTheme = getThemeColors(settings.theme);

  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      days.push(`${year}-${month}-${day}`);
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

  const totalExpense = records.reduce((sum, r) => r.type === 'expense' ? sum + r.amount : sum, 0);
  const totalIncome = records.reduce((sum, r) => r.type === 'income' ? sum + r.amount : sum, 0);
  
  const filteredRecords = showDetailPage === 'expense' 
    ? records.filter(r => r.type === 'expense')
    : showDetailPage === 'income' 
    ? records.filter(r => r.type === 'income') 
    : [];
    
  const recentRecords = records.slice(0, 10);
  
  const formatShortDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length < 3) return '';
    return `${parts[1]}/${parts[2]}`;
  };

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
      if (val === '.' && newAmount.includes('.')) return prev;
      newAmount = newAmount + (val === '.' ? '.' : val.toString());
      return { ...prev, amount: newAmount };
    });
  };
  
  const handleSave = () => {
    if (!formData.amount || formData.amount === '0') return;
    
    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum)) return;
    
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

  // 如果沒有語言包，顯示加載中
  if (!t) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={`min-h-screen pb-32 font-sans ${settings.theme === 'black' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* 頂部 Header */}
      <div className={`${currentTheme.primaryBg} text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md`}>
        <button onClick={() => setShowSettingsPage(true)} className="p-2 hover:opacity-80 transition-opacity" aria-label="Settings">
          <CircleUser size={24} />
        </button>
        <h1 className="font-bold text-xl">{t.appName}</h1>
        <button onClick={() => setShowSettingsPage(true)} className="p-2 hover:opacity-80 transition-opacity" aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>

      {/* 設定頁面 */}
      {showSettingsPage && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className={`${currentTheme.primaryBg} text-white p-5 sticky top-0 flex justify-between items-center`}>
            <button onClick={handleCancelSettings} className="p-2 hover:opacity-80" aria-label="Close">
              <X size={24} />
            </button>
            <h2 className="font-bold text-lg">{t.settings}</h2>
            <div className="w-10"></div>
          </div>
          <div className="p-6 space-y-6">
            {/* 個人資料 */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">{t.profile}</label>
              <div className="flex items-center gap-4">
                <CircleUser size={48} className="text-gray-400" />
                <input 
                  type="text" 
                  value={tempSettings.userName} 
                  onChange={(e) => setTempSettings({...tempSettings, userName: e.target.value})}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder={t.userName} 
                />
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
                    className={`p-2 rounded-lg text-sm font-bold border transition-all ${tempSettings.language === lang ? `${currentTheme.primaryBg} text-white` : 'bg-gray-100 hover:bg-gray-200'}`}
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
                {['blue', 'green', 'gray', 'black'].map(theme => {
                  let bgClass = '';
                  if (tempSettings.theme === theme) {
                    if (theme === 'blue') bgClass = 'bg-blue-500 text-white';
                    else if (theme === 'green') bgClass = 'bg-emerald-500 text-white';
                    else if (theme === 'gray') bgClass = 'bg-gray-500 text-white';
                    else if (theme === 'black') bgClass = 'bg-gray-900 text-white';
                  } else {
                    bgClass = 'bg-gray-100 text-gray-700';
                  }
                  
                  return (
                    <button 
                      key={theme} 
                      onClick={() => setTempSettings({...tempSettings, theme})}
                      className={`py-2 rounded-lg font-bold border transition-all ${bgClass}`}
                    >
                      {theme === 'blue' && t.blue}
                      {theme === 'green' && t.green}
                      {theme === 'gray' && t.gray}
                      {theme === 'black' && t.black}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* 支出/收入分類管理 */}
            {['expense', 'income'].map(type => (
              <div key={type}>
                <label className="block text-sm font-bold mb-3 text-gray-700">
                  {type === 'expense' ? t.expenseManagement : t.incomeManagement}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(type === 'expense' ? tempSettings.expenseCategories : tempSettings.incomeCategories).map((cat, idx) => (
                    <div key={idx} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                      <span className="text-sm">{cat}</span>
                      <button 
                        onClick={() => {
                          const newCats = (type === 'expense' ? tempSettings.expenseCategories : tempSettings.incomeCategories).filter((_, i) => i !== idx);
                          setTempSettings(type === 'expense' ? {...tempSettings, expenseCategories: newCats} : {...tempSettings, incomeCategories: newCats});
                        }} 
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete category"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newCat = prompt('請輸入新分類名稱');
                      if (newCat && newCat.trim()) {
                        if (type === 'expense') {
                          setTempSettings({...tempSettings, expenseCategories: [...tempSettings.expenseCategories, newCat.trim()]});
                        } else {
                          setTempSettings({...tempSettings, incomeCategories: [...tempSettings.incomeCategories, newCat.trim()]});
                        }
                      }
                    }} 
                    className="text-blue-500 text-sm font-bold hover:text-blue-700 transition-colors"
                  >
                    + 新增
                  </button>
                </div>
              </div>
            ))}
            
            {/* 儲存取消按鈕 */}
            <div className="flex gap-3 pt-4">
              <button 
                onClick={handleSaveSettings} 
                className={`flex-1 ${currentTheme.primaryBg} text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
              >
                <Save size={20} /> {t.save}
              </button>
              <button 
                onClick={handleCancelSettings} 
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
              >
                <RefreshCw size={20} /> {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 詳細頁面 - 全部支出/全部收入 */}
      {(showDetailPage === 'expense' || showDetailPage === 'income') && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className={`${currentTheme.primaryBg} text-white p-5 sticky top-0 flex items-center`}>
            <button onClick={() => setShowDetailPage(null)} className="p-2 absolute left-2 hover:opacity-80" aria-label="Back">
              <ChevronLeft size={28} />
            </button>
            <h2 className="font-bold text-lg flex-1 text-center">
              {showDetailPage === 'expense' ? t.allExpenses : t.allIncomes}
            </h2>
            <div className="w-10"></div>
          </div>
          <div className="p-4 space-y-3">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-20 text-gray-400">{t.noData}</div>
            ) : (
              filteredRecords.map(record => (
                <div key={record.id} className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{record.category}</p>
                    <p className="text-sm text-gray-500 mt-1">{record.note || record.date}</p>
                    {record.paymentMethod && (
                      <p className="text-xs text-gray-400 mt-1">{record.paymentMethod}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-black text-lg ${showDetailPage === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                      {showDetailPage === 'expense' ? '-' : '+'} HK${record.amount}
                    </p>
                    <button 
                      onClick={() => handleDeleteRecord(record.id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete record"
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

      {/* 主頁面 */}
      {!showInputPage && !showSettingsPage && !showDetailPage && (
        <main className="p-4 space-y-6">
          {/* 總計卡片 */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowDetailPage('expense')} 
              className="bg-black text-white p-5 rounded-3xl text-left active:scale-95 transition-transform"
            >
              <p className="text-sm opacity-60">{t.totalExpense}</p>
              <p className="text-2xl font-black text-rose-300 mt-1">HK$ {totalExpense}</p>
              <ArrowUpCircle size={20} className="mt-3 opacity-60" />
            </button>
            <button 
              onClick={() => setShowDetailPage('income')} 
              className="bg-white p-5 rounded-3xl shadow-sm text-left active:scale-95 transition-transform border"
            >
              <p className="text-sm text-gray-400">{t.totalIncome}</p>
              <p className={`text-2xl font-black ${currentTheme.primaryText} mt-1`}>HK$ {totalIncome}</p>
              <ArrowDownCircle size={20} className="mt-3 text-gray-400" />
            </button>
          </div>

          {/* 圖表 */}
          <section className="bg-white p-5 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">{t.dailyTrend}</h3>
              <div className="flex gap-3 text-xs font-bold">
                <span className="flex items-center gap-1 text-rose-500">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div> {t.expense}
                </span>
                <span className={`flex items-center gap-1 ${currentTheme.primaryText}`}>
                  <div className={`w-2 h-2 rounded-full ${currentTheme.primaryBg.replace('bg-', 'bg-')}`}></div> {t.income}
                </span>
              </div>
            </div>
            <div className="h-40 flex items-end justify-around gap-1 border-b pb-2">
              {chartData.dates.map((date, idx) => (
                <div key={date} className="flex gap-1 items-end h-full w-full justify-center">
                  <div 
                    className="w-5 bg-rose-400 rounded-t-sm transition-all" 
                    style={{ height: `${Math.max(chartData.heights[idx].expense, 2)}%` }}
                  ></div>
                  <div 
                    className={`w-5 ${currentTheme.primaryBg} rounded-t-sm transition-all`} 
                    style={{ height: `${Math.max(chartData.heights[idx].income, 2)}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-[10px] font-bold text-gray-400">
              {chartData.dates.map(date => (
                <span key={date}>{formatShortDate(date)}</span>
              ))}
            </div>
            {records.length === 0 && (
              <div className="text-center text-xs text-gray-300 mt-4">{t.noData}</div>
            )}
          </section>

          {/* 最近記錄 */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-3">
              {t.recentTransactions} ({Math.min(10, records.length)}/{records.length})
            </h3>
            {records.length === 0 ? (
              <div className="text-center py-10 text-gray-300 text-sm">{t.noData}</div>
            ) : (
              recentRecords.map(record => (
                <div key={record.id} className="bg-white p-4 rounded-2xl flex justify-between items-center mb-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'expense' ? 'bg-rose-50 text-rose-500' : `${currentTheme.bgLight} ${currentTheme.primaryText}`}`}>
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{record.category}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{record.note || record.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`font-bold ${record.type === 'expense' ? 'text-rose-600' : currentTheme.primaryText}`}>
                      HK${record.amount}
                    </p>
                    <button 
                      onClick={() => handleDeleteRecord(record.id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Delete record"
                    >
                      <Trash2 size={18} />
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
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className={`${inputType === 'expense' ? 'bg-rose-500' : currentTheme.primaryBg} p-5 text-white flex justify-between items-center`}>
            <button 
              onClick={() => { 
                setShowInputPage(false); 
                setShowCalculator(false); 
              }} 
              className="p-2 hover:opacity-80 transition-opacity"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <span className="font-bold text-lg">
              {inputType === 'expense' ? t.addExpense : t.addIncome}
            </span>
            <div className="w-10"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* 金額 */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {t.amount} <span className="text-red-500">*</span>
              </label>
              <button 
                onClick={() => setShowCalculator(!showCalculator)} 
                className="w-full bg-gray-50 p-4 rounded-2xl text-left border mt-1 hover:bg-gray-100 transition-colors"
              >
                {formData.amount ? (
                  <span className="text-3xl font-black text-gray-800">HK$ {formData.amount}</span>
                ) : (
                  <span className="text-gray-400">{t.amountPlaceholder}</span>
                )}
              </button>
            </div>
            
            {/* 計算機 */}
            {showCalculator && (
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="bg-white p-3 rounded-xl mb-3 text-right">
                  <span className="text-2xl font-black">{formData.amount || '0'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[7,8,9,'del',4,5,6,'C',1,2,3,0,'.','00'].map(btn => (
                    <button 
                      key={btn} 
                      onClick={() => handleCalcPress(btn)} 
                      className="h-12 bg-white rounded-xl font-bold text-lg active:scale-95 transition-transform hover:bg-gray-50"
                    >
                      {btn === 'del' ? <Delete size={20} /> : btn}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* 日期 */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">日期</label>
              <input 
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})} 
                className="w-full p-3 bg-gray-50 rounded-xl border mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            {/* 分類 */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.category}</label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                {(inputType === 'expense' ? settings.expenseCategories : settings.incomeCategories).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`py-2 rounded-xl text-sm font-bold border transition-all ${formData.category === cat ? `${currentTheme.primaryBg} text-white` : 'bg-white hover:bg-gray-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 必要/想要 (僅支出) */}
            {inputType === 'expense' && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">類型</label>
                <div className="flex gap-2 mt-1">
                  <button 
                    onClick={() => setFormData({...formData, nature: 'essential'})} 
                    className={`flex-1 py-3 rounded-xl font-bold border transition-all ${formData.nature === 'essential' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                  >
                    {t.necessary}
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, nature: 'desire'})} 
                    className={`flex-1 py-3 rounded-xl font-bold border transition-all ${formData.nature === 'desire' ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-50'}`}
                  >
                    {t.want}
                  </button>
                </div>
              </div>
            )}
            
            {/* 付款方式 (僅收入) */}
            {inputType === 'income' && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.paymentMethod}</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {settings.incomeCategories.map(method => (
                    <button 
                      key={method} 
                      onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`p-3 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition-all ${formData.paymentMethod === method ? `${currentTheme.primaryBg} text-white` : 'bg-white hover:bg-gray-50'}`}
                    >
                      {method === '現金' && <DollarSign size={16} />}
                      {method === '信用卡' && <CreditCard size={16} />}
                      {method === 'AlipayHK' && <Smartphone size={16} />}
                      {method === 'PayMe' && <Gift size={16} />}
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* 備註 */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.note}</label>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border mt-1">
                <MessageSquare size={16} className="text-gray-400" />
                <input 
                  type="text" 
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  placeholder={t.notePlaceholder} 
                  className="bg-transparent text-sm outline-none flex-1" 
                />
              </div>
            </div>
          </div>
          
          {/* 按鈕 */}
          <div className="p-5 border-t flex gap-3">
            <button 
              onClick={() => { 
                setShowInputPage(false); 
                setShowCalculator(false); 
              }} 
              className="flex-1 bg-gray-200 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              onClick={handleSave} 
              className={`flex-1 ${currentTheme.primaryBg} text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity`}
            >
              {t.save}
            </button>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t flex justify-around items-center py-3 z-30 px-6">
        <button 
          onClick={() => { 
            setActiveTab('home'); 
            setShowInputPage(false); 
            setShowSettingsPage(false); 
            setShowDetailPage(null); 
          }} 
          className={`flex flex-col items-center transition-colors ${activeTab === 'home' ? currentTheme.primaryText : 'text-gray-300'}`}
        >
          <Download size={24} />
          <span className="text-[10px] mt-1 font-bold">{t.transactions}</span>
        </button>
        
        <div className="relative -top-8">
          <button 
            onClick={() => { 
              setInputType('expense'); 
              setShowInputPage(true);
              setShowCalculator(false);
              setFormData({ 
                amount: '', 
                category: settings.expenseCategories[0], 
                nature: 'essential', 
                note: '', 
                date: new Date().toISOString().slice(0,10), 
                paymentMethod: '' 
              }); 
            }} 
            className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white active:scale-95 transition-transform hover:scale-105"
            aria-label="Add expense"
          >
            <Plus size={32} />
          </button>
        </div>
        
        <button 
          onClick={() => { 
            setInputType('income'); 
            setShowInputPage(true);
            setShowCalculator(false);
            setFormData({ 
              amount: '', 
              category: settings.incomeCategories[0], 
              nature: 'essential', 
              note: '', 
              date: new Date().toISOString().slice(0,10), 
              paymentMethod: settings.incomeCategories[0] 
            }); 
          }} 
          className={`flex flex-col items-center transition-colors ${showInputPage && inputType === 'income' ? currentTheme.primaryText : 'text-gray-300'}`}
        >
          <Wallet size={24} />
          <span className="text-[10px] mt-1 font-bold">{t.addIncome}</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
