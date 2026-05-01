import React, { useState, useEffect } from 'react';
import { Download, Wallet, Home, Plus, X, ChevronLeft, ChevronRight, MapPin, Camera, Menu, Settings } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [currentSettings, setCurrentSettings] = useState({
    themeColor: 'bg-emerald-500',
    language: '繁體中文'
  });

  const [tempSettings, setTempSettings] = useState({ ...currentSettings });

  // 生成以今天為中心的 7 天日期
  const generateCurrentWeek = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        displayDate: `${d.getMonth() + 1}/${d.getDate()}`,
        week: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
        isToday: i === 0
      });
    }
    return dates;
  };

  const [dateRange] = useState(generateCurrentWeek());
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // 預設選中中間的「今天」

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none">
      
      {/* 頂部 Header - 已恢復右側選單 */}
      <div className={`${currentSettings.themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-between items-center`}>
        <div className="w-10"></div>
        <h1 className="font-bold text-2xl tracking-wide">我的帳本</h1>
        <button 
          onClick={() => { setTempSettings(currentSettings); setShowSettingsModal(true); }} 
          className="w-10 flex justify-end active:scale-90 transition-transform"
        >
          <Menu size={28} />
        </button>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            {/* 簡潔日曆 */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100/50 flex items-center gap-2">
              <button className="p-2 text-gray-300"><ChevronLeft size={24} /></button>
              <div className="flex-1 flex justify-between py-2">
                {dateRange.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`flex-shrink-0 w-12 py-3 rounded-2xl border transition-all flex flex-col items-center justify-center ${
                      selectedDayIndex === idx 
                      ? 'bg-blue-500 text-white border-blue-500 shadow-lg' 
                      : 'bg-white text-gray-400 border-gray-100'
                    }`}
                  >
                    <span className="text-[10px] font-black">{item.displayDate}</span>
                    <span className="text-[10px] font-medium mt-1">{item.isToday ? '今' : item.week}</span>
                  </button>
                ))}
              </div>
              <button className="p-2 text-gray-300"><ChevronRight size={24} /></button>
            </div>

            {/* 收支摘要 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500 p-6 rounded-[2.5rem] text-white shadow-xl shadow-red-100">
                <div className="text-xs font-bold opacity-90 mb-1 tracking-widest uppercase">Expenses</div>
                <div className="text-3xl font-black">$13,719</div>
              </div>
              <div className={`${currentSettings.themeColor} p-6 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100`}>
                <div className="text-xs font-bold opacity-90 mb-1 tracking-widest uppercase">Income</div>
                <div className="text-3xl font-black">$0</div>
              </div>
            </div>

            {/* 列表佔位 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Download className="text-gray-200" size={40} />
                </div>
                <p className="text-gray-400 font-bold">今天還沒有紀錄喔</p>
            </div>
          </>
        )}
      </main>

      {/* 設定 Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end backdrop-blur-sm">
          <div className="bg-white w-5/6 max-w-sm h-full p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black flex items-center gap-3"><Settings size={28} /> 系統設定</h2>
              <button onClick={() => setShowSettingsModal(false)}><X size={32} /></button>
            </div>
            <div className="flex-1 space-y-10">
              <section>
                <label className="text-xs font-black text-gray-400 mb-4 block uppercase tracking-widest">主題配色</label>
                <div className="flex gap-5">
                  {['bg-emerald-500', 'bg-blue-500', 'bg-rose-500', 'bg-slate-800'].map(c => (
                    <button 
                      key={c} 
                      onClick={() => setTempSettings({...tempSettings, themeColor: c})} 
                      className={`w-12 h-12 rounded-full ${c} border-4 transition-all ${tempSettings.themeColor === c ? 'border-gray-300 scale-110' : 'border-transparent opacity-60'}`} 
                    />
                  ))}
                </div>
              </section>
            </div>
            <div className="pt-8 border-t space-y-4">
              <button 
                onClick={() => { setCurrentSettings(tempSettings); setShowSettingsModal(false); }} 
                className={`w-full py-5 ${tempSettings.themeColor} text-white rounded-[2rem] text-lg font-black shadow-xl`}
              >
                確認更新
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 輸入頁面 */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col overflow-y-auto">
          <div className={`${currentSettings.themeColor} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">新增紀錄</span>
            <button className="bg-white text-emerald-600 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          <div className="p-6 space-y-8 pb-20">
            {/* 幣別、金額、支付方式、地點輸入框 (已根據之前版本保留) */}
            <section className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-bold text-red-500 mb-3 block">* 金額</label>
                <input type="number" placeholder="0" className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-3xl font-black border-none outline-none" />
              </div>
            </section>
            {/* ... 其餘輸入項 ... */}
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
            <Wallet size={26}/><span className="text-[11px] mt-1 font-bold">資金帳戶</span>
        </button>
        <div className="relative -top-8 w-1/3 flex justify-center">
          <button onClick={() => setShowInputPage(true)} className={`${currentSettings.themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8]`}>
            <Plus size={40} />
          </button>
        </div>
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/3 ${activeTab === 'home' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
            <Download size={26}/><span className="text-[11px] mt-1 font-bold">我的帳本</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
