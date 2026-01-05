
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ChevronRight, PlaneIcon, MapIcon, MenuIcon, SquareCheckIcon, 
  CheckIcon, SquareIcon, LuggageIcon, BatteryIcon, HomeIcon, ClockIcon, LocationIcon,
  TrainIcon, UtensilsIcon, ShoppingBagIcon, TicketIcon, BedIcon,
  FuelIcon, ParkingIcon, CameraIcon, ShrineIcon, MailIcon, HotSpringIcon,
  BusIcon, ShipIcon, CableCarIcon, MusicIcon, ActivityIcon, LifeBuoyIcon, CarIcon,
  InfoIcon, ClothIcon, StarIcon
} from './components/Icons.tsx';
import { 
  initialPackingList, 
  importantNotes, powerBankRules, flightData, itineraryData, accommodationData
} from './constants.ts';
import { FlightInfo, ItineraryDay, ItineraryStop } from './types.ts';

// =================================================================
// Sub-Components
// =================================================================

const getThemeHex = (colorClass: string) => {
    const match = colorClass?.match(/\[(.*?)\]/);
    return match ? match[1] : '#2b6e90';
};

const formatDateForHeader = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const mmdd = dateStr.split('/').slice(1).join('/');
    const dayOfWeek = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'][d.getDay()];
    return `${mmdd} ${dayOfWeek}`;
};

const StopItem: React.FC<{ stop: ItineraryStop; index: number; total: number; themeHex: string }> = ({ stop, index, total, themeHex }) => {
    return (
        <div className="flex">
            {/* Timeline Column */}
            <div className="flex flex-col items-center w-12 flex-shrink-0 relative mr-2">
                <div className="w-3.5 h-10 rounded-full z-10 flex-shrink-0" style={{ backgroundColor: themeHex }}></div>
                {index !== total - 1 && (
                    <div className="w-1.5 flex-grow -mt-2 opacity-50" style={{ backgroundColor: themeHex }}></div>
                )}
            </div>

            {/* Content Column */}
            <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-3">
                    <div 
                        className="inline-block px-3 py-1 bg-white border-2 rounded-lg shadow-sm"
                        style={{ borderColor: themeHex }}
                    >
                        <span className="text-lg font-bold text-[#3c3c3c]">{stop.time}</span>
                    </div>
                    {stop.category && (
                        <div className="inline-flex items-center justify-center w-10 h-9 bg-white border-2 rounded-lg shadow-sm border-[#EDEDEF]" >
                            {stop.category}
                        </div>
                    )}
                </div>

                <div className="mb-2 text-left">
                    <h4 className="text-xl font-bold text-[#3c3c3c] mb-1 leading-tight">
                        {stop.name}
                    </h4>
                    {stop.durationLabel && (
                        <p className="text-sm text-[#757575] font-medium mb-1">
                            {stop.durationLabel}
                        </p>
                    )}
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-3">
                        {stop.mapUrl && (
                            <a href={stop.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-yellow-500 text-lg">🌐</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">查看地圖</span>
                            </a>
                        )}
                        {stop.parkingUrl && (
                            <a href={stop.parkingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-blue-500 text-lg">🧭</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">停車場導航</span>
                            </a>
                        )}
                        {stop.storageUrl && (
                            <a href={stop.storageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group">
                                <span className="mr-2 text-blue-500 text-lg">🧳</span>
                                <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">行李寄存導航</span>
                            </a>
                        )}
                    </div>
                    {stop.note && (
                        <div className="flex items-start text-left text-base text-[#3c3c3c] leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 w-full">
                            <span className="w-full whitespace-pre-line">{stop.note.replace(/^備註：\s*/, '')}</span>
                        </div>
                    )}
                </div>

                {index !== total - 1 && stop.transport && (
                    <div className="relative mt-6 mb-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-[#f0f4f6] px-3 text-base text-[#555] font-medium flex items-center">
                                <span className="mr-1 text-lg">{stop.transport.mode}</span> 
                                {stop.transport.time}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// =================================================================
// Page Content Components
// =================================================================

const ItineraryView: React.FC<{ selectedDay: number; setSelectedDay: (d: number) => void }> = ({ selectedDay, setSelectedDay }) => {
    const dayData = itineraryData.find(d => d.day === selectedDay) || itineraryData[0];
    const themeHex = getThemeHex(dayData?.color);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Horizontal Day Selector Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-[57px] z-40 overflow-x-auto no-scrollbar shadow-sm">
                <div className="flex px-4" ref={scrollRef}>
                    {itineraryData.map((d) => (
                        <button
                            key={d.day}
                            onClick={() => setSelectedDay(d.day)}
                            className={`px-4 py-4 text-base font-bold whitespace-nowrap transition-all relative flex-shrink-0 ${
                                selectedDay === d.day ? 'text-[#333]' : 'text-[#aaa]'
                            }`}
                        >
                            第 {d.day} 天
                            {selectedDay === d.day && (
                                <div className="absolute bottom-0 left-4 right-4 h-1 bg-[#333] rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Itinerary Content */}
            <div className="p-6 max-w-lg mx-auto w-full">
                <h2 className="text-4xl font-bold text-[#5c6c7b] mb-8 text-left">
                    {formatDateForHeader(dayData?.date)}
                </h2>
                <div className="mt-4">
                    <h4 className="text-sm font-bold text-[#757575] uppercase tracking-wider mb-8 text-left border-b border-gray-200 pb-2">今日行程路線</h4>
                    {dayData?.stops?.length > 0 ? (
                        <div>
                            {dayData.stops.map((stop, idx) => (
                                <StopItem 
                                    key={idx} 
                                    stop={stop} 
                                    index={idx} 
                                    total={dayData.stops.length} 
                                    themeHex={themeHex} 
                                />
                            ))}
                            
                            <div className="pt-4 pb-12 flex justify-center">
                                <button 
                                    onClick={scrollToTop}
                                    className="flex items-center px-6 py-3 bg-white text-[#2b6e90] font-bold rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition active:scale-95"
                                >
                                    <span className="mr-2">↑</span>
                                    返回頂部
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="py-10 text-center text-gray-400 italic">尚未規劃細節行程</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const FlightCard: React.FC<{ flight: FlightInfo }> = ({ flight }) => {
    const { type, date, departure, arrival, flightNumber, airline, color, baggage } = flight;
    const barColor = color?.replace('text-', 'bg-') || 'bg-[#2b6e90]';

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
            <div className={`h-2 w-full ${barColor}`}></div>
            <div className="p-6">
                <h3 className="flex items-center text-xl font-bold text-[#3c3c3c] mb-6">
                    <PlaneIcon className={`w-6 h-6 mr-2 ${color}`} />
                    {type}
                </h3>
                <div className="mb-2">
                     <p className="text-[#757575] font-bold mb-4">航班時間表</p>
                     <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-8 items-center">
                        <span className="text-[#757575] font-medium">航空公司</span>
                        <span className="text-[#2b6e90] font-bold text-lg text-right">{airline}</span>
                        <span className="text-[#757575] font-medium">航班編號</span>
                        <span className="text-[#2b6e90] font-bold text-lg text-right">{flightNumber}</span>
                        <span className="text-[#757575] font-medium">起飛 ({departure.city}_{departure.terminal})</span>
                        <span className="text-[#2b6e90] font-bold text-xl text-right">{departure.time}</span>
                        <span className="text-[#757575] font-medium">抵達 ({arrival.city}_{arrival.terminal})</span>
                        <span className="text-[#d15b47] font-bold text-xl text-right">{arrival.time}</span>
                     </div>
                </div>
                <div className="border-t border-gray-200 my-4 pt-4 text-center">
                    <p className="text-[#757575] text-md">日期：{date}</p>
                </div>
                <div className="mt-2">
                     <h4 className="flex items-center text-[#2b6e90] font-bold mb-3 text-md">
                        <LuggageIcon className="w-5 h-5 mr-2" />
                        行李額度
                     </h4>
                     <div className="bg-[#f1be42] bg-opacity-20 border border-[#f1be42] rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#3c3c3c] text-md font-medium">托運行李:</span>
                            <span className="text-[#2b6e90] font-bold text-right text-md">{baggage.checked}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#3c3c3c] text-md font-medium">手提行李:</span>
                            <span className="text-[#2b6e90] font-bold text-right text-md">{baggage.carryOn}</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const FlightContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => setSubView(null)} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        <div className="bg-[#f1be42] bg-opacity-20 border-l-4 border-[#f1be42] text-[#3c3c3c] p-4 rounded-lg shadow-inner mb-6">
            <p className="font-bold text-sm">重要提醒：</p>
            <p className="text-sm">請務必在起飛前至少 2.5 小時抵達機場辦理報到手續。</p>
        </div>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            ✈️ 機票與行程
        </h2>
        <FlightCard flight={flightData.outbound} />
        <FlightCard flight={flightData.inbound} />
    </div>
);

const PowerBankRulesSection: React.FC = () => (
    <div className="mb-6 p-3 bg-gray-200 rounded-lg shadow-inner">
        <h4 className="text-base font-bold text-[#3c3c3c] mb-2 flex items-center">
            <BatteryIcon className="w-4 h-4 mr-2 text-[#98c187]" />
            行動電源攜帶詳細規定
        </h4>
        <ul className="space-y-2 text-base text-[#3c3c3c]">
            {powerBankRules.map((rule, index) => (
                <li key={index} className="flex items-start">
                    <span className="font-semibold text-[#3E3FB0] mr-2 min-w-[5rem]">{rule.rule}:</span>
                    <span className="flex-1">{rule.detail}</span>
                </li>
            ))}
        </ul>
    </div>
);

const AccommodationContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button 
            onClick={() => setSubView(null)} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🏠 住宿資訊
        </h2>
        <div className="space-y-6">
            {accommodationData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] hover:shadow-lg transition duration-300">
                    <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                        <HomeIcon className="w-5 h-5 mr-2 text-[#d15b47]" />
                        {item.name}
                    </h3>
                    <div className="space-y-2 text-sm text-[#757575]">
                        <div className="flex items-center bg-[#f0f4f6] p-2 rounded text-base text-left">
                            <ClockIcon className="w-4 h-4 mr-2 text-[#757575] flex-shrink-0" />
                            <span className="font-medium">{item.dates}</span>
                        </div>
                        <div className="flex items-start bg-[#f0f4f6] p-2 rounded text-base text-left">
                            <LocationIcon className="w-4 h-4 mr-2 text-[#757575] flex-shrink-0 mt-0.5" />
                            <span className="break-all">{item.address}</span>
                        </div>
                        {item.notes && (
                            <div className="bg-[#f1be42] bg-opacity-10 text-[#3c3c3c] p-3 rounded-md text-base font-mono whitespace-pre-line leading-relaxed border border-[#f1be42] border-opacity-30 mt-2 text-left">
                                <span className="font-normal block mb-1">{item.notes.replace(/^備註：\s*/, '')}</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <a href={item.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#2b6e90] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition shadow-sm">
                            <MapIcon className="w-4 h-4 mr-2" />地圖
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const WorshipGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button onClick={() => setSubView(null)} className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-base">
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">⛩️ 參拜禮儀指南</h2>
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-[#d15b47]">
             <h3 className="text-lg font-bold text-[#3c3c3c] mb-2">二禮二拍手一禮</h3>
             <p className="text-[#757575] text-base leading-relaxed">這是日本神社最常見的參拜方式。</p>
        </div>
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
                <p className="font-bold text-[#3c3c3c] mb-2">1. 鳥居：入內前輕輕一鞠躬。</p>
                <p className="font-bold text-[#3c3c3c] mb-2">2. 手水舍：左手 -> 右手 -> 漱口 -> 洗勺柄。</p>
                <p className="font-bold text-[#3c3c3c]">3. 本殿：二禮 -> 二拍手 -> 祈願 -> 一禮。</p>
            </div>
        </div>
    </div>
);

const SurvivalGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [cathayPolicy, setCathayPolicy] = useState(() => localStorage.getItem('cathay_policy_no') || '');
    const [tokioPolicy, setTokioPolicy] = useState(() => localStorage.getItem('tokio_policy_no') || '');

    useEffect(() => { localStorage.setItem('cathay_policy_no', cathayPolicy); }, [cathayPolicy]);
    useEffect(() => { localStorage.setItem('tokio_policy_no', tokioPolicy); }, [tokioPolicy]);

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button onClick={() => setSubView(null)} className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm">
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />返回選單
            </button>
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">🆘 生存指南</h2>
            <div className="mb-6">
                <a href="https://www.pac-group.net/index.php?pp=coupon" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-[#d15b47] text-white font-bold py-4 rounded-xl shadow-lg active:scale-95">
                    <TicketIcon className="w-6 h-6 mr-2" />
                    <span className="text-lg">優惠券懶人包</span>
                </a>
            </div>
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#98c187] mb-4">
                <h3 className="text-lg font-bold text-[#3c3c3c] mb-3">🏥 旅遊保險</h3>
                <input type="text" value={cathayPolicy} onChange={(e) => setCathayPolicy(e.target.value)} placeholder="國泰保單號..." className="w-full mb-2 px-3 py-2 bg-gray-50 border rounded-lg" />
                <input type="text" value={tokioPolicy} onChange={(e) => setTokioPolicy(e.target.value)} placeholder="東京海上保單號..." className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
            </div>
        </div>
    );
};

const CollapsibleSection: React.FC<{ title: string; colorClass: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, colorClass, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`bg-white rounded-xl shadow-md border-l-4 ${colorClass} mb-4 overflow-hidden`}>
      <button className="w-full p-5 flex justify-between items-center bg-white" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-bold text-[#3c3c3c]">{title}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-5 pb-5 pt-0 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
};

const DrivingGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button onClick={() => setSubView(null)} className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm">
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">🚗 自駕注意事項</h2>
        <CollapsibleSection title="📋 準備證件" colorClass="border-[#2b6e90]" defaultOpen={true}>
            <ul className="list-disc ml-5 text-base text-[#757575]">
                <li>護照、台灣駕照正本、日文譯本正本。</li>
            </ul>
        </CollapsibleSection>
        <CollapsibleSection title="⚠️ 重要規則" colorClass="border-red-500" defaultOpen={true}>
             <p className="text-sm font-bold text-red-600 mb-2">止まれ：完全停止三秒。</p>
             <p className="text-sm text-[#757575]">左轉小彎、右轉大彎。行人絕對優先。</p>
        </CollapsibleSection>
    </div>
);

const LegStretchContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button onClick={() => setSubView(null)} className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm">
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />返回選單
        </button>
        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">⭐ 腿部伸展</h2>
        <a href="https://www.threads.net/@mobilitywithnoah/post/DNfAtfPzYWU" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg mb-6">教學影片</a>
        <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#98c187] mb-4">
            <h3 className="font-bold">1. 足底踩球 (30秒 x 3)</h3>
        </div>
    </div>
);

const ShikokuInfoContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [selectedLocId, setSelectedLocId] = useState('064427');
    const weatherRegions = [{ id: '064427', name: '香川' }, { id: '064497', name: '德島' }, { id: '063941', name: '愛媛' }, { id: '2240297', name: '高知' }];

    useEffect(() => {
        const scriptId = 'tomorrow-sdk';
        if (!document.getElementById(scriptId)) {
            const js = document.createElement('script');
            js.id = scriptId;
            js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
            document.head.appendChild(js);
        } else if ((window as any).__TOMORROW__) {
            (window as any).__TOMORROW__.renderWidget();
        }
    }, [selectedLocId]);

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button onClick={() => setSubView(null)} className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm">
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />返回選單
            </button>
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">🌍 天氣資訊</h2>
            <div className="flex flex-wrap gap-2 mb-6">
                {weatherRegions.map((region) => (
                    <button key={region.id} onClick={() => setSelectedLocId(region.id)} className={`px-6 py-2 rounded-full font-bold border ${selectedLocId === region.id ? 'bg-[#2b6e90] text-white' : 'bg-white text-gray-500'}`}>{region.name}</button>
                ))}
            </div>
            <div key={selectedLocId} className="tomorrow" data-location-id={selectedLocId} data-language="EN" data-unit-system="METRIC" data-skin="light" data-widget-type="upcoming" />
        </div>
    );
};

const PackingListContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [list, setList] = useState(initialPackingList);
    const toggleItem = (catIdx: number, itemIdx: number) => {
        const newList = [...list];
        newList[catIdx].items[itemIdx].packed = !newList[catIdx].items[itemIdx].packed;
        setList(newList);
    };
    const progress = Math.round((list.reduce((acc, cat) => acc + cat.items.filter(i => i.packed).length, 0) / list.reduce((acc, cat) => acc + cat.items.length, 0)) * 100);

    return (
        <div className="p-4 max-w-lg mx-auto">
            <button onClick={() => setSubView(null)} className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm">
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />返回選單
            </button>
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">🧳 行李檢核表</h2>
            <div className="bg-white p-4 rounded-xl shadow-md mb-6 sticky top-[4.5rem] z-20 border border-gray-100">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-[#757575]">完成度</span>
                    <span className="text-2xl font-black text-[#2b6e90]">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#2b6e90] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="space-y-6">
                {list.map((category, catIdx) => (
                    <div key={catIdx} className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                        <div className="bg-[#f0f4f6] px-5 py-3 border-b flex items-center font-bold">
                            <span className="text-xl mr-2">{category.icon}</span>{category.category}
                        </div>
                        <div className="p-2">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => toggleItem(catIdx, itemIdx)}>
                                    <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center ${item.packed ? 'bg-[#2b6e90] border-[#2b6e90]' : 'border-gray-300'}`}>
                                        {item.packed && <CheckIcon className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className={`text-base font-medium ${item.packed ? 'text-gray-400 line-through' : 'text-[#3c3c3c]'}`}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MenuButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center active:scale-95 transition">
        {icon}<span className="text-[#3c3c3c] font-bold text-[16px]">{label}</span>
    </button>
);

const MenuPage: React.FC = () => {
    const [subView, setSubView] = useState<string | null>(null);
    if (subView === 'flight') return <FlightContent setSubView={setSubView} />;
    if (subView === 'accommodation') return <AccommodationContent setSubView={setSubView} />;
    if (subView === 'packing') return <PackingListContent setSubView={setSubView} />;
    if (subView === 'worship') return <WorshipGuideContent setSubView={setSubView} />;
    if (subView === 'survival') return <SurvivalGuideContent setSubView={setSubView} />;
    if (subView === 'driving') return <DrivingGuideContent setSubView={setSubView} />;
    if (subView === 'stretch') return <LegStretchContent setSubView={setSubView} />;
    if (subView === 'shikoku_info') return <ShikokuInfoContent setSubView={setSubView} />;

    return (
        <div className="p-4 max-w-lg mx-auto grid grid-cols-2 gap-4">
             <MenuButton icon={<PlaneIcon className="w-8 h-8 mb-2 text-[#2b6e90]" />} label="機票與行程" onClick={() => setSubView('flight')} />
             <MenuButton icon={<HomeIcon className="w-8 h-8 mb-2 text-[#d15b47]" />} label="住宿資訊" onClick={() => setSubView('accommodation')} />
             <MenuButton icon={<SquareCheckIcon className="w-8 h-8 mb-2 text-[#f1be42]" />} label="行李檢核表" onClick={() => setSubView('packing')} />
             <MenuButton icon={<ShrineIcon className="w-8 h-8 mb-2 text-[#98c187]" />} label="參拜禮儀" onClick={() => setSubView('worship')} />
             <MenuButton icon={<LifeBuoyIcon className="w-8 h-8 mb-2 text-[#d15b47]" />} label="生存指南" onClick={() => setSubView('survival')} />
             <MenuButton icon={<CarIcon className="w-8 h-8 mb-2 text-[#2b6e90]" />} label="自駕注意" onClick={() => setSubView('driving')} />
             <MenuButton icon={<StarIcon className="w-8 h-8 mb-2 text-[#98c187]" />} label="腿部伸展" onClick={() => setSubView('stretch')} />
             <MenuButton icon={<InfoIcon className="w-8 h-8 mb-2 text-[#2b6e90]" />} label="天氣資訊" onClick={() => setSubView('shikoku_info')} />
        </div>
    );
};

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'itinerary' | 'menu'>('itinerary');
    const [selectedDay, setSelectedDay] = useState(1);
    return (
        <div className="min-h-screen bg-[#f0f4f6] pb-24 font-sans">
            <header className="bg-white border-b border-gray-200 shadow-sm p-4 sticky top-0 z-50">
                <div className="max-w-lg mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-extrabold text-[#2b6e90]">2026 四國自駕遊</h1>
                        <p className="text-[10px] text-[#757575]">v2.1 Stable</p>
                    </div>
                </div>
            </header>
            {currentPage === 'itinerary' ? <ItineraryView selectedDay={selectedDay} setSelectedDay={setSelectedDay} /> : <MenuPage />}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around z-50 pb-safe">
                <button className={`flex flex-col items-center justify-center py-3 w-1/2 ${currentPage === 'itinerary' ? 'text-[#2b6e90] font-bold' : 'text-[#757575]'}`} onClick={() => setCurrentPage('itinerary')}>
                    <MapIcon className="w-6 h-6 mb-1" /><span className="text-[14px]">行程總覽</span>
                </button>
                <button className={`flex flex-col items-center justify-center py-3 w-1/2 ${currentPage === 'menu' ? 'text-[#2b6e90] font-bold' : 'text-[#757575]'}`} onClick={() => setCurrentPage('menu')}>
                    <MenuIcon className="w-6 h-6 mb-1" /><span className="text-[14px]">選單</span>
                </button>
            </footer>
        </div>
    );
};

export default App;
