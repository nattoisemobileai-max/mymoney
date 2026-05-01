import React, { useState, useRef } from 'react';
import { Download, Wallet, Home, Plus, X, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';

const App = () => {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('home');
  const [showInputPage, setShowInputPage] = useState(false);
  
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

  const themeColor = 'bg-emerald-500';

  const [formData, setFormData] = useState({
    currency: 'KRW',
    payment: '現金',
    location: '',
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 pb-32 font-sans select-none">
      
      {/* 頂部 Header */}
      <div className={`${themeColor} text-white p-5 sticky top-0 z-50 shadow-md flex justify-center items-center`}>
        <h1 className="font-bold text-2xl tracking-wide">我的帳本</h1>
      </div>

      <main className="p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            {/* 簡潔日曆 - 移除標題與地點 */}
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
                <div className="text-xs font-bold opacity-90 mb-1 tracking-widest">總支出</div>
                <div className="text-3xl font-black">$13,719</div>
              </div>
              <div className={`${themeColor} p-6 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100`}>
                <div className="text-xs font-bold opacity-90 mb-1 tracking-widest">總收入</div>
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

      {/* 輸入頁面 (參照 image_68bd78.png) */}
      {showInputPage && (
        <div className="fixed inset-0 bg-[#FDFCF8] z-[70] flex flex-col overflow-y-auto">
          <div className={`${themeColor} p-6 text-white flex justify-between items-center sticky top-0 shadow-md`}>
            <button onClick={() => setShowInputPage(false)}><X size={32} /></button>
            <span className="text-xl font-black">新增紀錄</span>
            <button className="bg-white text-emerald-600 px-8 py-2 rounded-full font-black">儲存</button>
          </div>

          <div className="p-6 space-y-8 pb-20">
            <section>
              <label className="text-sm font-bold text-gray-400 mb-3 block">幣別 (預設 KRW)</label>
              <div className="grid grid-cols-3 gap-3">
                {['KRW', 'TWD', 'USD'].map(c => (
                  <button key={c} onClick={() => setFormData({...formData, currency: c})} className={`py-4 rounded-xl border-2 font-black transition-all ${formData.currency === c ? 'bg-emerald-50 text-emerald-500 border-emerald-500' : 'bg-white border-gray-100 text-gray-400'}`}>{c}</button>
                ))}
              </div>
            </section>

            <section className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-bold text-red-500 mb-3 block">* 金額</label>
                <input type="number" placeholder="0" className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-3xl font-black border-none outline-none" />
              </div>
              <div className="w-1/3">
                <label className="text-sm font-bold text-gray-400 mb-3 block">約合台幣</label>
                <div className="w-full bg-[#F5F5F0] p-6 rounded-2xl text-2xl font-black text-gray-400 flex items-center justify-center">0</div>
              </div>
            </section>

            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">支付方式</label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['現金', '信用卡', 'WOWPASS', '行動支付'].map(p => (
                  <button key={p} onClick={() => setFormData({...formData, payment: p})} className={`px-6 py-3 rounded-xl border-2 whitespace-nowrap font-bold transition-all ${formData.payment === p ? 'border-amber-400 text-amber-600 bg-amber-50' : 'border-gray-100 text-gray-400'}`}>{p}</button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-sm font-bold text-gray-500 mb-3 block">地點 (選填)</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="text" placeholder="例如：便利商店" className="w-full bg-[#F5F5F0] p-5 pl-14 rounded-2xl font-bold border-none outline-none" />
              </div>
            </section>

            <section className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-sm font-bold text-red-500 mb-3 block">* 消費項目</label>
                <input type="text" placeholder="例如：午餐" className="w-full bg-[#F0F5E8] p-5 rounded-2xl font-bold border-none outline-none" />
              </div>
              <button className="bg-white border-2 border-emerald-100 p-5 rounded-2xl text-emerald-500">
                <Camera size={28} />
              </button>
            </section>
          </div>
        </div>
      )}

      {/* 底部導航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around items-center py-5 z-40">
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center w-1/3 ${activeTab === 'wallet' ? 'text-emerald-500 scale-110' : 'text-gray-400'}`}>
            <Wallet size={26}/><span className="text-[11px] mt-1 font-bold">資金帳戶</span>
        </button>
        
        <div className="relative -top-8 w-1/3 flex justify-center">
          <button onClick={() => setShowInputPage(true)} className={`${themeColor} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-[#FDFCF8]`}>
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
