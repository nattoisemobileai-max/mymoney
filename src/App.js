import React, { useState } from 'react';
import { Mic, Camera, Download, Wallet, Wand2, Settings, Home, Menu, ChevronDown, Check } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [themeColor, setThemeColor] = useState('bg-emerald-500'); // 預設翠綠

  // 主題顏色定義
  const themes = [
    { name: '翠綠', class: 'bg-emerald-500', hex: '#10b981' },
    { name: '天藍', class: 'bg-blue-500', hex: '#3b82f6' },
    { name: '酷黑', class: 'bg-slate-800', hex: '#1e293b' },
  ];

  // --- 子組件：主首頁 ---
  const HomeView = () => (
    <div className="p-4 space-y-4 animate-in fade-in duration-500">
      {/* 數據卡片區域 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-500 p-4 rounded-2xl text-white shadow-sm">
          <div className="text-xs opacity-80">期間支出</div>
          <div className="text-xl font-bold mt-1">HKD $13,719</div>
        </div>
        <div className={`p-4 rounded-2xl text-white shadow-sm ${themeColor}`}>
          <div className="text-xs opacity-80">期間收入</div>
          <div className="text-xl font-bold mt-1">HKD $0</div>
        </div>
        <div className="bg-indigo-500 p-4 rounded-2xl text-white shadow-sm">
          <div className="text-xs opacity-80">期間差額</div>
          <div className="text-xl font-bold mt-1">HKD $-13,719</div>
        </div>
        <div className="bg-cyan-500 p-4 rounded-2xl text-white shadow-sm">
          <div className="text-xs opacity-80">帳本資產</div>
          <div className="text-xl font-bold mt-1">HKD $38,939</div>
        </div>
      </div>

      {/* 快捷按鈕 */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
          <Mic className="text-emerald-500 mb-2" size={28} />
          <span className="text-sm font-medium text-gray-700">一語記帳</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
          <Camera className="text-emerald-500 mb-2" size={28} />
          <span className="text-sm font-medium text-gray-700">拍照記存</span>
        </button>
      </div>

      {/* 分類統計卡片 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <div className={`w-1 h-5 rounded-full mr-2 ${themeColor}`}></div>
          <h3 className="font-bold text-gray-800">分類統計</h3>
        </div>
        <div className="space-y-6">
          <CategoryItem icon="🚗" name="交通" amount="-4,200" color="bg-yellow-400" percent="40%" />
          <CategoryItem icon="🍱" name="飲食" amount="-5,845" color="bg-orange-400" percent="60%" />
          <CategoryItem icon="📚" name="教育" amount="-1,200" color="bg-blue-400" percent="15%" />
          <CategoryItem icon="🎮" name="娛樂" amount="-2,100" color="bg-purple-400" percent="20%" />
          <CategoryItem icon="📦" name="其他" amount="-374" color="bg-gray-400" percent="5%" />
        </div>
      </div>
    </div>
  );

  // --- 子組件：設置頁面 ---
  const SettingView = () => (
    <div className="p-4 animate-in slide-in-from-right duration-300">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="p-4 border-b border-gray-50 font-bold text-gray-800">系統設置</div>
        <div className="divide-y divide-gray-50">
          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-700">貨幣單位</span>
            <span className="font-bold text-gray-900">HKD ($)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="font-bold text-gray-800 mb-4">切換主題顏色</div>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => setThemeColor(t.class)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-xl border-2 transition-all ${
                themeColor === t.class ? 'border-emerald-500 bg-emerald-50' : 'border-transparent bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full shadow-inner ${t.class} flex items-center justify-center text-white`}>
                {themeColor === t.class && <Check size={20} />}
              </div>
              <span className="text-xs font-medium text-gray-600">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const CategoryItem = ({ icon, name, amount, color, percent }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center text-sm font-medium">
          <span className="mr-2">{icon}</span> {name}
        </div>
        <span className="text-red-500 font-bold text-sm">HKD {amount}</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: percent }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-24 transition-colors duration-500">
      {/* 頂部導航欄 - 顏色隨主題變動 */}
      <div className={`${themeColor} text-white p-4 sticky top-0 z-10 shadow-md transition-colors duration-500`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1.5 rounded-full border border-white border-opacity-30">
            <Home size={18} />
            <span className="text-sm font-medium">我的帳本</span>
            <ChevronDown size={14} />
          </div>
          <h1 className="text-lg font-bold tracking-wider">我的帳本</h1>
          <Menu size={24} />
        </div>
      </div>

      <main>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'settings' && <SettingView />}
        {activeTab !== 'home' && activeTab !== 'settings' && (
          <div className="p-10 text-center text-gray-400">內容建設中...</div>
        )}
      </main>

      {/* 底部選單欄 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 px-1 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <TabButton active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} icon={<Wallet size={20} />} label="資金帳戶" />
        <TabButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Download size={20} />} label="我的帳本" />
        
        <div className="relative -top-4">
          <div className="bg-gray-100 p-1 rounded-full shadow-lg">
            <div className={`${themeColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-inner active:scale-95 transition-all`}>
              <span className="text-2xl font-light">＋</span>
            </div>
          </div>
        </div>

        <TabButton active={activeTab === 'tool'} onClick={() => setActiveTab('tool')} icon={<Wand2 size={20} />} label="生活神器" />
        <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={20} />} label="系統設定" />
      </nav>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-1/5 transition-colors ${active ? 'text-emerald-500 font-bold' : 'text-gray-400'}`}>
    <div className={active ? 'scale-110 mb-0.5' : 'mb-0.5'}>{icon}</div>
    <span className="text-[10px]">{label}</span>
  </button>
);

export default App;
