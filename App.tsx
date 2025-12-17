
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronRight, PlaneIcon, MapIcon, MenuIcon, SquareCheckIcon, 
  CheckIcon, SquareIcon, LuggageIcon, BatteryIcon, HomeIcon, ClockIcon, LocationIcon,
  TrainIcon, UtensilsIcon, ShoppingBagIcon, TicketIcon, BedIcon,
  FuelIcon, ParkingIcon, CameraIcon, ShrineIcon, MailIcon, HotSpringIcon,
  BusIcon, ShipIcon, CableCarIcon, MusicIcon, ActivityIcon, LifeBuoyIcon, CarIcon
} from './components/Icons';
import { 
  initialPackingList, 
  importantNotes, powerBankRules, flightData, itineraryData, accommodationData
} from './constants';
import { FlightInfo, ItineraryDay, PackingCategory } from './types';

// =================================================================
// Sub-Components
// =================================================================

interface DayCardProps {
  dayData: ItineraryDay;
  onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ dayData, onClick }) => {
    const { day, date, color } = dayData;

    return (
        <div 
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer mb-5 border-l-4 ${color}`}
            onClick={onClick}
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-[#3c3c3c]">
                        DAY {day}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#757575]">
                        {date}
                    </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#757575]" />
            </div>
        </div>
    );
};

const DayDetail: React.FC<{ dayData: ItineraryDay; onBack: () => void }> = ({ dayData, onBack }) => {
    const { day, date, theme, color, stops } = dayData;

    // Helper to extract hex color from tailwind arbitrary class like 'border-[#123456]'
    const getThemeHex = (colorClass: string) => {
        const match = colorClass.match(/\[(.*?)\]/);
        return match ? match[1] : '#2b6e90'; // Default to blue if not found
    };
    
    const themeHex = getThemeHex(color);

    const getCategoryIcon = (category: string) => {
        const iconClass = "w-5 h-5";
        switch (category) {
            case "🛫": return <PlaneIcon className={`${iconClass} text-[#2b6e90] transform -rotate-45`} />;
            case "🛬": return <PlaneIcon className={`${iconClass} text-[#d15b47] transform rotate-45`} />;
            case "🚉": return <TrainIcon className={`${iconClass} text-[#3c3c3c]`} />;
            case "🍽️": return <UtensilsIcon className={`${iconClass} text-[#f1be42]`} />;
            case "🛍️": return <ShoppingBagIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🛏️": return <BedIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "⛽": return <FuelIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🅿": case "🅿️": return <ParkingIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "📷": return <CameraIcon className={`${iconClass} text-[#98c187]`} />;
            case "⛩️": return <ShrineIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🏣": return <MailIcon className={`${iconClass} text-[#d15b47]`} />;
            case "♨️": return <HotSpringIcon className={`${iconClass} text-[#d15b47]`} />;
            case "🏪": return <ShoppingBagIcon className={`${iconClass} text-[#f1be42]`} />;
            case "🏞️": return <CameraIcon className={`${iconClass} text-[#98c187]`} />;
            case "🚏": return <BusIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "⚓": case "🚢": case "🛥️": return <ShipIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "🎫": return <TicketIcon className={`${iconClass} text-[#f1be42]`} />;
            case "🌅": return <CameraIcon className={`${iconClass} text-[#f1be42]`} />;
            case "💊": return <ShoppingBagIcon className={`${iconClass} text-[#2b6e90]`} />;
            case "🚡": return <CableCarIcon className={`${iconClass} text-[#98c187]`} />;
            case "🎶": return <MusicIcon className={`${iconClass} text-[#d15b47]`} />;
            default: return <span className="text-lg">{category}</span>;
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto min-h-[calc(100vh-8rem)]">
             <button 
                onClick={onBack} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回行程總覽
            </button>

            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-8 ${color}`}>
                <div className="p-6">
                    <div className="flex items-baseline mb-4">
                         <span className={`text-4xl font-black mr-3 ${color.replace('border-', 'text-')}`}>
                             DAY {day}
                         </span>
                         <span className="text-[#757575] font-bold text-base">{date}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#3c3c3c] mb-6 border-b border-gray-100 pb-4">
                        {theme}
                    </h2>

                    <div>
                        <h4 className="text-sm font-bold text-[#757575] uppercase tracking-wider mb-6">行程細節</h4>
                        
                        {stops && stops.length > 0 ? (
                            <div className="">
                                {stops.map((stop, index) => (
                                    <div key={index} className="flex">
                                        {/* Timeline Column */}
                                        <div className="flex flex-col items-center w-12 flex-shrink-0 relative mr-2">
                                             {/* Node Pill */}
                                             <div className="w-3.5 h-10 rounded-full z-10 flex-shrink-0" style={{ backgroundColor: themeHex }}></div>
                                             
                                             {/* Connecting Line - thicker line */}
                                             {index !== stops.length - 1 && (
                                                 <div className="w-1.5 flex-grow -mt-2 opacity-50" style={{ backgroundColor: themeHex }}></div>
                                             )}
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 pb-6">
                                            {/* Time and Category Row */}
                                            <div className="flex items-center justify-between mb-3">
                                                {/* Time Box */}
                                                <div 
                                                    className="inline-block px-3 py-1 bg-white border-2 rounded-lg shadow-sm"
                                                    style={{ borderColor: themeHex }}
                                                >
                                                    <span className="text-lg font-bold text-[#3c3c3c]">{stop.time}</span>
                                                </div>

                                                {/* Category Box */}
                                                {stop.category && (
                                                    <div className="inline-flex items-center justify-center w-10 h-9 bg-white border-2 rounded-lg shadow-sm border-[#EDEDEF]" >
                                                        {stop.category}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Header Info */}
                                            <div className="mb-2">
                                                <h4 className="text-xl font-bold text-[#3c3c3c] mb-1 leading-tight">
                                                    {stop.name}
                                                </h4>
                                                {stop.durationLabel && (
                                                    <p className="text-sm text-[#757575] font-medium mb-1">
                                                        {stop.durationLabel}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions / Details Row */}
                                            <div className="space-y-2 mb-4">
                                                {/* Map Link */}
                                                <div className="flex flex-wrap gap-3">
                                                    {stop.mapUrl && (
                                                        <a 
                                                            href={stop.mapUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-yellow-500 text-lg">🌐</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">查看地圖</span>
                                                        </a>
                                                    )}
                                                    {stop.parkingUrl && (
                                                        <a 
                                                            href={stop.parkingUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-blue-500 text-lg">🧭</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">停車場導航</span>
                                                        </a>
                                                    )}
                                                    {stop.storageUrl && (
                                                        <a 
                                                            href={stop.storageUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-blue-500 text-lg">🧳</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">行李寄存導航</span>
                                                        </a>
                                                    )}
                                                    {stop.specialUrl && (
                                                        <a 
                                                            href={stop.specialUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="flex items-center text-base font-medium text-[#757575] hover:text-[#2b6e90] group"
                                                        >
                                                            <span className="mr-2 text-blue-500 text-lg">🗺️</span>
                                                            <span className="border-b border-dashed border-gray-400 group-hover:border-[#2b6e90]">特殊路線</span>
                                                        </a>
                                                    )}
                                                </div>
                                                
                                                {/* Note */}
                                                {stop.note && (
                                                    <div className="flex items-start text-left text-base text-[#3c3c3c] leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-100 w-full">
                                                        <span className="mt-0.5 text-base w-full whitespace-pre-line">{stop.note.replace(/^備註：\s*/, '')}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Transport Divider (Horizontal) */}
                                            {index !== stops.length - 1 && stop.transport && (
                                                <div className="relative mt-6 mb-2">
                                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                        <div className="w-full border-t-2 border-gray-300"></div>
                                                    </div>
                                                    <div className="relative flex justify-center">
                                                        <span className="bg-white px-3 text-base text-[#555] font-medium flex items-center">
                                                            <span className="mr-1 text-lg">{stop.transport.mode}</span> 
                                                            {stop.transport.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Fallback for days without structured data
                            <div className="space-y-4 border-l-2 border-gray-200 ml-2 pl-6 py-1">
                                <p className="text-sm text-[#757575]">
                                    08:30 出發
                                    <br/>
                                    <span className="text-xs text-gray-400">（詳細行程節點請於後續編輯補充）</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button 
                onClick={onBack} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回行程總覽
            </button>
        </div>
    );
};

const FlightCard: React.FC<{ flight: FlightInfo }> = ({ flight }) => {
    const { type, date, departure, arrival, flightNumber, airline, color, baggage } = flight;
    
    // Extract color for the top bar
    const barColor = color.replace('text-', 'bg-');

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
            {/* Top Color Bar */}
            <div className={`h-2 w-full ${barColor}`}></div>
            
            <div className="p-6">
                {/* Header */}
                <h3 className="flex items-center text-xl font-bold text-[#3c3c3c] mb-6">
                    <PlaneIcon className={`w-6 h-6 mr-2 ${color}`} />
                    {type}
                </h3>

                {/* Schedule Grid */}
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

                {/* Date Separator */}
                <div className="border-t border-gray-200 my-4 pt-4 text-center">
                    <p className="text-[#757575] text-md">日期：{date}</p>
                </div>

                {/* Baggage Section */}
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
        
        <div className="bg-[#f1be42] bg-opacity-20 border-l-4 border-[#f1be42] text-[#3c3c3c] p-4 rounded-lg shadow-inner mb-6" role="alert">
            <p className="font-bold text-sm">重要提醒：</p>
            <p className="text-sm">請務必在起飛前至少 2.5 小時抵達機場辦理報到手續。</p>
        </div>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            ✈️ 機票與行程
        </h2>
        
        <FlightCard flight={flightData.outbound} />
        <FlightCard flight={flightData.inbound} />
        <button 
            onClick={() => setSubView(null)} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const PowerBankRulesSection: React.FC = () => (
    <div className="mt-4 p-3 bg-gray-200 rounded-lg shadow-inner">
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
                    {/* Map Button */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <a 
                            href={item.mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#2b6e90] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition shadow-sm"
                        >
                            <MapIcon className="w-4 h-4 mr-2" />
                            地圖
                        </a>
                    </div>
                </div>
            ))}
        </div>
        <button 
            onClick={() => setSubView(null)} 
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const WorshipGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button
            onClick={() => setSubView(null)}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-base"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            ⛩️ 參拜禮儀指南
        </h2>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-[#d15b47]">
             <h3 className="text-lg font-bold text-[#3c3c3c] mb-2">二禮二拍手一禮</h3>
             <p className="text-[#757575] text-base leading-relaxed">
                這是日本神社最常見的參拜方式（神道教）。<br/>
                前往金刀比羅宮、高屋神社等神社時請參考。
             </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-6">

            {/* Step 1: Torii */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#f0f4f6] px-4 py-2 border-b border-gray-100 flex items-center">
                    <span className="bg-[#d15b47] text-white text-xs font-bold px-2 py-1 rounded mr-2">STEP 1</span>
                    <span className="font-bold text-[#3c3c3c]">鳥居 (Torii)</span>
                </div>
                <div className="p-4">
                    <ul className="list-disc list-outside ml-4 space-y-2 text-base text-[#3c3c3c]">
                        <li><span className="font-bold">入內前：</span>在鳥居前輕輕一鞠躬，以示敬意。</li>
                        <li><span className="font-bold">行走時：</span>請走在參道的兩側，中間（正中）是神明的通道。</li>
                    </ul>
                </div>
            </div>

            {/* Step 2: Chozuya */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#f0f4f6] px-4 py-2 border-b border-gray-100 flex items-center">
                    <span className="bg-[#2b6e90] text-white text-xs font-bold px-2 py-1 rounded mr-2">STEP 2</span>
                    <span className="font-bold text-[#3c3c3c]">手水舍 (淨身)</span>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex items-start">
                        <span className="text-lg mr-2">💧</span>
                        <p className="text-base text-[#3c3c3c]">右手拿勺子盛水，清洗<span className="font-bold text-[#2b6e90]">左手</span>。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">💧</span>
                        <p className="text-base text-[#3c3c3c]">換左手拿勺子，清洗<span className="font-bold text-[#2b6e90]">右手</span>。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">👄</span>
                        <p className="text-base text-[#3c3c3c]">右手拿勺子倒水在<span className="font-bold text-[#2b6e90]">左手掌心</span>，以口接水漱口（請勿直接以口對勺）。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">🤲</span>
                        <p className="text-base text-[#3c3c3c]">再次清洗左手。</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-lg mr-2">🔄</span>
                        <p className="text-base text-[#3c3c3c]">將勺子立起，用剩餘的水清洗勺柄，放回原處。</p>
                    </div>
                </div>
            </div>

             {/* Step 3: Worship */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#f0f4f6] px-4 py-2 border-b border-gray-100 flex items-center">
                    <span className="bg-[#f1be42] text-white text-xs font-bold px-2 py-1 rounded mr-2">STEP 3</span>
                    <span className="font-bold text-[#3c3c3c]">本殿參拜</span>
                </div>
                <div className="p-4 space-y-4">
                     <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">💰</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-sm">1. 賽錢 (Saisen)</p>
                            <p className="text-base text-[#757575]">輕輕投入香油錢（通常5円象徵結緣）。</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">🔔</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">2. 搖鈴</p>
                            <p className="text-base text-[#757575]">若有鈴鐺，用力搖響以呼喚神明。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">🙇</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">3. 二禮</p>
                            <p className="text-base text-[#757575]">深深鞠躬兩次。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">👏</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">4. 二拍手</p>
                            <p className="text-base text-[#757575]">拍手兩次。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">💭</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">5. 祈願</p>
                            <p className="text-base text-[#757575]">在心裡默念願望。</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">👏</span>
                        <div>
                            <p className="font-bold text-[#3c3c3c] text-base">6. 一禮</p>
                            <p className="text-base text-[#757575]">最後深深鞠躬一次。</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <button
            onClick={() => setSubView(null)}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-base"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const SurvivalGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button
            onClick={() => setSubView(null)}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🆘 生存指南注意事項
        </h2>

        {/* Postcards */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                📮 明信片 | 郵資
            </h3>
            <ul className="list-disc list-outside ml-4 space-y-2 text-base text-[#757575]">
                <li><span className="font-bold text-[#3c3c3c]">郵資：</span>¥100 (國際明信片)</li>
                <li><span className="font-bold text-[#3c3c3c]">郵便局：</span>需要抽號碼牌，櫃台可索取紀念戳章。</li>
                <li><span className="font-bold text-[#3c3c3c]">郵筒：</span>機場、街道都有，請投左邊【手紙・はがき】專用口。</li>
            </ul>
        </div>

        {/* Tax Free */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#f1be42] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                🛍️ TAX-FREE 免稅須知
            </h3>
            <ul className="list-disc list-outside ml-4 space-y-2 text-base text-[#757575] mb-4">
                <li><span className="font-bold text-[#3c3c3c]">消耗品：</span>會封裝，出境才能拆封。</li>
                <li><span className="font-bold text-[#3c3c3c]">一般物品：</span>日本境內使用的商品需分開結帳。</li>
                <li><span className="font-bold text-[#3c3c3c]">百貨公司：</span>分為「店裡辦理」與「免稅櫃台辦理」，請留意退稅時間。</li>
            </ul>
            <div className="flex space-x-2">
                <span className="bg-[#f1be42] text-white px-2 py-1 rounded font-bold text-sm">税込 (含稅)</span>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold text-sm">税抜き (未稅)</span>
            </div>
        </div>

        {/* Google Map */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#2b6e90] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                📍 Google Map 定位分享
            </h3>
            <div className="bg-gray-100 p-3 rounded-lg text-sm text-[#3c3c3c] font-medium">
                人像圖示 → 位置資訊分享 → 分享位置 → 複製連結
            </div>
        </div>

        {/* Insurance */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#98c187] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                🏥 旅遊保險
            </h3>
            <ul className="space-y-2 text-base text-[#757575]">
                <li><span className="font-bold text-[#3c3c3c]">全球海外急難救助 (國泰)：</span><br/>+886-2-27551258</li>
                <li><span className="font-bold text-[#3c3c3c]">保險單號：</span><br/>159C13TDCB03536</li>
                <li><span className="font-bold text-[#3c3c3c]">全球海外急難救助 (國泰)：</span><br/>+886-2-27551258</li>
                <li><span className="font-bold text-[#3c3c3c]">保險單號：</span><br/>159C13TDCB03536</li>
            </ul>
        </div>

        {/* Representative Office - Using Osaka data for correctness */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#d15b47] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                🆘 駐外代表處 (大阪)
            </h3>
            <ul className="space-y-2 text-base text-[#757575]">
                <li><span className="font-bold text-[#3c3c3c]">台北駐大阪經濟文化辦事處</span></li>
                <li className="text-base">大阪市北區中之島3-2-4 中之島フェスティバルタワー・ウエスト 30樓</li>
                <li><span className="font-bold text-[#3c3c3c]">電話 (境內)：</span>06-6227-8623</li>
                <li><span className="font-bold text-[#d15b47]">緊急聯絡 (境內)：</span>090-8794-4568</li>
                <li className="text-sm text-red-500">▲非緊急狀況不能使用</li>
            </ul>
        </div>

        {/* Emergency Numbers */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-red-500 text-center">
                <p className="text-gray-500 text-base">警察局</p>
                <p className="text-3xl font-black text-red-500">110</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-red-500 text-center">
                <p className="text-gray-500 text-base">火警 / 救護車</p>
                <p className="text-3xl font-black text-red-500">119</p>
            </div>
        </div>

        <button
            onClick={() => setSubView(null)}
            className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const DrivingGuideContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => (
    <div className="p-4 max-w-lg mx-auto">
        <button
            onClick={() => setSubView(null)}
            className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>

        <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
            🚗 日本自駕注意事項
        </h2>

         {/* Preparation */}
         <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#2b6e90] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                📋 準備證件
            </h3>
            <ul className="list-disc list-outside ml-5 space-y-2 text-base text-[#757575]">
                <li><span className="font-bold text-[#3c3c3c]">護照</span></li>
                <li><span className="font-bold text-[#3c3c3c]">台灣駕照</span> (正本)</li>
                <li><span className="font-bold text-[#3c3c3c]">駕照日文譯本</span> (正本)</li>
            </ul>
        </div>

        {/* Rental Car Info - Added based on request */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#6366f1] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3 flex items-center">
                🚙 租車預約資訊
            </h3>
            <div className="space-y-3 text-base text-[#3c3c3c]">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-bold text-[#757575]">租車公司</span>
                    <span className="font-bold text-[#2b6e90]">平成租車 Heisei Car Rentals</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-bold text-[#757575]">預約號碼</span>
                    <span className="font-mono text-[#d15b47]">20250812-2026-03-29-s1-0201</span>
                </div>
                 <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                    <span className="font-bold text-[#757575]">取車</span>
                    <span>2026-03-29 11:30<br/><span className="text-base text-gray-500">高松車站前店</span></span>
                    
                    <span className="font-bold text-[#757575]">還車</span>
                    <span>2026-04-04 14:30<br/><span className="text-base text-gray-500">高松車站前店</span></span>
                </div>
                <div className="bg-gray-50 p-2 rounded mt-2 space-y-1">
                     <p><span className="font-bold text-[#757575] mr-2">車型:</span>(S1) 小型家庭用車</p>
                     <p><span className="font-bold text-[#757575] mr-2">補償:</span>安心保障</p>
                     <p><span className="font-bold text-[#757575] mr-2">選項:</span>中文導航、ETC卡</p>
                     <p className="border-t border-gray-200 pt-1 mt-1 flex justify-between items-center">
                        <span className="font-bold text-[#757575]">預估費用</span>
                        <span className="font-bold text-lg text-[#d15b47]">¥ 56,430</span>
                     </p>
                </div>
                <p className="text-sm text-[#48404D] mt-2">*ETC費用另計，將於最後一天還車時在店內結算</p>
            </div>
        </div>

        

        {/* Speed Limits */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#98c187] mb-4">
            <h3 className="text-lg font-bold text-[#3c3c3c] mb-3">🚀 速限規定</h3>
            <div className="grid grid-cols-1 gap-3">
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="font-medium text-[#3c3c3c]">自動車道 (高速公路)</span>
                    <span className="font-black text-xl text-[#d15b47] bg-white border-2 border-red-500 rounded-full w-12 h-12 flex items-center justify-center">80</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="font-medium text-[#3c3c3c]">一般道路</span>
                    <span className="font-black text-xl text-blue-500 bg-white border-2 border-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-sm">40</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-purple-200">
                    <span className="font-medium text-purple-700">ETC 收費站</span>
                    <span className="font-bold text-base text-purple-700">減速至 20 km/h 以下</span>
                 </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">*高速公路過路費：ETC扣款，請走【ETC專用】道(紫色)。</p>
        </div>

        {/* Gas */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#f1be42] mb-4">
             <h3 className="text-lg font-bold text-[#3c3c3c] mb-3">⛽ 加油種類</h3>
             <p className="text-sm text-gray-500 mb-2">加油站大多是自助式加油。</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                    <p className="text-xs text-gray-500">一般汽油 (95)</p>
                    <p className="text-lg font-bold text-red-600">Regular</p>
                    <p className="text-xs text-red-400">レギュラー</p>
                    <div className="mt-1 w-full h-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
                    <p className="text-xs text-gray-500">特級汽油 (98)</p>
                    <p className="text-lg font-bold text-yellow-600">High Octane</p>
                    <p className="text-xs text-yellow-500">ハイオク</p>
                    <div className="mt-1 w-full h-2 bg-yellow-400 rounded-full"></div>
                </div>
             </div>
        </div>

        {/* Rules List */}
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500 mb-4">
             <h3 className="text-lg font-bold text-[#3c3c3c] mb-3">⚠️ 重要行車規則</h3>
             <ul className="space-y-4">
                <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white font-bold text-xs flex items-center justify-center transform" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                        止
                    </div>
                    <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">遇到「止まれ」標誌</p>
                        <p className="text-sm text-[#757575]">一定要在停止線前<span className="text-red-500 font-bold">完全停止</span>後再開。</p>
                    </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-lg">↩️</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">右轉車需禮讓</p>
                        <p className="text-sm text-[#757575]">左轉車優先 > 直行車 > 右轉車。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded text-white flex items-center justify-center text-sm">Bus</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">綠色車道</p>
                        <p className="text-sm text-[#757575]">限制車輛通行（通常為公車/計程車），請避免行駛。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded text-white flex items-center justify-center text-sm">Line</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">黃色實線</p>
                        <p className="text-sm text-[#757575]">禁止變換車道。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">彎</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">左轉小彎、右轉大彎</p>
                        <p className="text-sm text-[#757575]">靠左行駛：左轉轉入近側車道(小彎)，右轉跨越至遠側車道(大彎)。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded text-white flex items-center justify-center text-lg">🛣️</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">開車時記得「抓中線」</p>
                        <p className="text-sm text-[#757575]">右駕容易偏左，駕駛人應刻意靠路中央(中線)行駛，維持車身在車道內。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded text-white flex items-center justify-center text-lg">🚶</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">禮讓行人先行</p>
                        <p className="text-sm text-[#757575]">行人絕對優先。轉彎時若斑馬線有行人，必須完全停止禮讓。</p>
                     </div>
                </li>
                <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded text-white flex items-center justify-center text-lg">➡</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">依綠色箭頭指示</p>
                        <p className="text-sm text-[#757575]">即使主燈是紅燈，若下方綠色箭頭亮起，該方向車輛可通行。</p>
                     </div>
                </li>
                 <li className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded text-white flex items-center justify-center text-lg">🖐️</div>
                     <div className="ml-3">
                        <p className="font-bold text-[#3c3c3c]">雨刷左・方向燈右</p>
                        <p className="text-sm text-[#757575]">操作桿位置與台灣相反：方向燈在右側，雨刷在左側。</p>
                     </div>
                </li>
             </ul>
        </div>

        <button
            onClick={() => setSubView(null)}
            className="flex items-center text-[#2b6e90] font-semibold mt-6 mb-6 p-2 rounded-full hover:bg-white transition text-sm"
        >
            <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
            返回選單
        </button>
    </div>
);

const LegStretchContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    
    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => setSubView(null)} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>

            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 flex items-center">
                🦵 逛一整天腳底快炸掉？
            </h2>

            {/* Threads Button */}
            <div className="mb-8">
                 <a 
                    href="https://www.threads.net/@mobilitywithnoah/post/DNfAtfPzYWU?xmt=AQF0CLbzE-UAjiE0PF6g_xdyT4DRVU8KazsqlkfY1HnHl_AvgK1hYs6wEadfIfjZPlrRT7Yw&slof=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition duration-300"
                >
                    <ActivityIcon className="w-5 h-5 mr-2 text-white" />
                    <span>前往 Threads 觀看教學影片</span>
                </a>
                 <p className="text-xs text-gray-500 text-center mt-2">
                    點擊將開啟外部連結
                 </p>
            </div>

            {/* Exercise List */}
            <div className="space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#98c187]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">1. 足底踩球</h3>
                        <span className="bg-[#98c187] text-white text-xs px-2 py-1 rounded-full">腳趾篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">放鬆足底筋膜，減緩行走疲勞。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        30秒 x 3組
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#98c187]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">2. 腳趾步伐</h3>
                        <span className="bg-[#98c187] text-white text-xs px-2 py-1 rounded-full">腳趾篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">訓練足弓支撐力，改善走路姿勢。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                        <span className="text-sm">👣 10次 x 3組</span>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#f1be42]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">3. 腿後伸展</h3>
                        <span className="bg-[#f1be42] text-white text-xs px-2 py-1 rounded-full">腿型篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">弓箭步伸展，拉開緊繃的小腿後側。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                        <span className="text-sm">🦵 10次 x 3組</span>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#d15b47]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-[#3c3c3c]">4. 梨狀肌伸展</h3>
                        <span className="bg-[#d15b47] text-white text-xs px-2 py-1 rounded-full">腰痛篇</span>
                    </div>
                    <p className="text-[#757575] text-sm mb-2">躺姿翹腳抱膝，舒緩臀部與下背痠痛。</p>
                    <div className="flex items-center text-[#2b6e90] font-bold bg-[#f0f4f6] p-2 rounded-lg">
                         <ClockIcon className="w-4 h-4 mr-2" />
                        30秒 x 3組
                    </div>
                 </div>
            </div>
            <button 
                onClick={() => setSubView(null)} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};

const PackingListContent: React.FC<{ setSubView: (v: string | null) => void }> = ({ setSubView }) => {
    const [listState, setListState] = useState<PackingCategory[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPowerBankDetails, setShowPowerBankDetails] = useState(false);

    useEffect(() => {
        // Load from local storage or use initial list
        const loadList = () => {
            try {
                const savedList = localStorage.getItem('userPackingList');
                if (savedList) {
                    setListState(JSON.parse(savedList));
                } else {
                    setListState(initialPackingList);
                }
            } catch (e) {
                console.error("Failed to load packing list", e);
                setListState(initialPackingList);
            }
            setIsLoading(false);
        };

        loadList();
    }, []);

    const toggleItem = (categoryIndex: number, itemIndex: number) => {
        if (!listState) return;

        const newListState = JSON.parse(JSON.stringify(listState));
        const currentItem = newListState[categoryIndex].items[itemIndex];
        currentItem.packed = !currentItem.packed;
        
        setListState(newListState);
        localStorage.setItem('userPackingList', JSON.stringify(newListState));
    };

    const totalItems = listState?.reduce((acc, cat) => acc + cat.items.length, 0) || 0;
    const packedItems = listState?.reduce((acc, cat) => acc + cat.items.filter(item => item.packed).length, 0) || 0;
    const completionPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
    
    return (
        <div className="p-4 max-w-lg mx-auto">
            <button 
                onClick={() => setSubView(null)} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-2">🧳 行李清單</h2>
            <p className="text-sm text-[#757575] mb-6">點擊項目即可勾選/取消，進度將自動儲存 (Local Storage)。</p>
            
            {isLoading || !listState ? (
                <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-lg text-sm">
                    <svg className="animate-spin h-5 w-5 mr-3 text-[#98c187]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                    清單載入中...
                </div>
            ) : (
                <>
                    <div className="mb-6 bg-[#f1be42] bg-opacity-20 border-l-4 border-[#f1be42] p-4 rounded-lg shadow-xl">
                        <p className="text-base font-bold text-[#3c3c3c] mb-2 flex items-center">
                            <span className="text-lg mr-2">⚠️</span> 重要提醒
                        </p>
                        <ul className="space-y-2 text-sm text-[#3c3c3c]">
                            {importantNotes.map((note, index) => (
                                <li key={index}>
                                    {note}
                                    {note.includes("行動電源") && (
                                        <button 
                                            onClick={() => setShowPowerBankDetails(!showPowerBankDetails)}
                                            className="ml-2 text-[#2b6e90] hover:text-[#2b6e90] font-semibold text-xs transition duration-150"
                                        >
                                            {showPowerBankDetails ? '▲ 隱藏細節' : '▼ 查看細節'}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {showPowerBankDetails && <PowerBankRulesSection />}
                    </div>

                    <div className="mb-6 p-4 bg-white rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-md font-semibold text-[#757575]">準備進度：{packedItems} / {totalItems} 項</p>
                            <p className="text-lg font-bold text-[#98c187]">{completionPercentage}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-[#98c187] h-2 rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Packing Categories */}
                    <div className="space-y-4">
                        {listState.map((category, catIndex) => (
                            <div key={catIndex} className="bg-white p-4 rounded-xl shadow-lg border-t-3 border-[#98c187]">
                                <h3 className="text-base font-bold text-[#3c3c3c] mb-3 flex items-center">
                                    <span className="text-xl mr-2">{category.icon}</span>
                                    {category.category}
                                </h3>
                                <ul className="space-y-2">
                                    {category.items.map((item, itemIndex) => (
                                        <li 
                                            key={itemIndex} 
                                            className="flex items-center cursor-pointer p-1 rounded-lg transition duration-150 hover:bg-[#f0f4f6]"
                                            onClick={() => toggleItem(catIndex, itemIndex)}
                                        >
                                            <span className="w-5 h-5 mr-2 flex-shrink-0">
                                                {item.packed ? (
                                                    <CheckIcon className="text-[#98c187] bg-[#98c187] bg-opacity-20 rounded-full p-0.5" />
                                                ) : (
                                                    <SquareIcon className="text-[#757575]" />
                                                )}
                                            </span>
                                            <span className={`text-md font-medium transition duration-150 ${item.packed ? 'text-[#757575] line-through' : 'text-[#3c3c3c]'}`}>
                                                {item.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <button 
                onClick={() => setSubView(null)} 
                className="flex items-center text-[#2b6e90] font-semibold mb-6 p-2 rounded-full hover:bg-white transition text-sm"
            >
                <ChevronDown className="w-4 h-4 mr-1 transform rotate-90" />
                返回選單
            </button>
        </div>
    );
};

const MenuPage: React.FC<{ setCurrentPage: (p: string) => void }> = ({ setCurrentPage }) => {
    const [subView, setSubView] = useState<string | null>(null);

    if (subView === 'flights') {
        return <FlightContent setSubView={setSubView} />;
    }
    if (subView === 'packingList') {
        return <PackingListContent setSubView={setSubView} />;
    }
    if (subView === 'accommodation') {
        return <AccommodationContent setSubView={setSubView} />;
    }
    if (subView === 'worshipGuide') {
        return <WorshipGuideContent setSubView={setSubView} />;
    }
    if (subView === 'legStretch') {
        return <LegStretchContent setSubView={setSubView} />;
    }
    if (subView === 'survivalGuide') {
        return <SurvivalGuideContent setSubView={setSubView} />;
    }
    if (subView === 'drivingGuide') {
        return <DrivingGuideContent setSubView={setSubView} />;
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-[#3c3c3c] mb-6 border-b pb-3">🛠️ 旅遊工具選單</h2>

            {/* Flight Overview Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#2b6e90] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('flights')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">機票與行程</p>
                        <p className="text-sm text-[#757575]">查看 VZ566 / CI153 詳情</p>
                    </div>
                    <PlaneIcon className="w-6 h-6 text-[#2b6e90]" />
                </div>
            </div>

            {/* Packing List Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#98c187] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('packingList')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">行李清單</p>
                        <p className="text-sm text-[#757575]">打包進度追蹤與重要提醒</p>
                    </div>
                    <SquareCheckIcon className="w-6 h-6 text-[#98c187]" /> 
                </div>
            </div>

            {/* Accommodation Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#f1be42] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('accommodation')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">住宿資訊</p>
                        <p className="text-base text-[#757575]">各晚住宿地址、MapCode</p>
                    </div>
                    <HomeIcon className="w-6 h-6 text-[#f1be42]" /> 
                </div>
            </div>

            {/* Survival Guide Link - New */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#d15b47] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('survivalGuide')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">生存指南</p>
                        <p className="text-[14px] text-[#757575]">明信片、免稅、緊急電話</p>
                    </div>
                    <LifeBuoyIcon className="w-6 h-6 text-[#d15b47]" /> 
                </div>
            </div>

            {/* Driving Guide Link - New */}
             <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#2b6e90] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('drivingGuide')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">行車注意</p>
                        <p className="text-[14px] text-[#757575]">紅綠燈、速限、加油對照表</p>
                    </div>
                    <CarIcon className="w-6 h-6 text-[#2b6e90]" /> 
                </div>
            </div>

            {/* Worship Guide Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#d15b47] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('worshipGuide')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">如何參拜</p>
                        <p className="text-[14px] text-[#757575]">神社參拜禮儀、手水舍教學</p>
                    </div>
                    <ShrineIcon className="w-6 h-6 text-[#d15b47]" /> 
                </div>
            </div>

            {/* Leg Stretch Link */}
            <div 
                className="bg-white rounded-xl shadow-md p-4 mb-4 border-l-4 border-[#6366f1] cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => setSubView('legStretch')}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-[#3c3c3c]">腿部拉筋</p>
                        <p className="text-sm text-[#757575]">逛街久走自救！4招舒緩</p>
                    </div>
                    <ActivityIcon className="w-6 h-6 text-[#6366f1]" /> 
                </div>
            </div>

        </div>
    );
};

const ItineraryPage: React.FC<{ onDaySelect: (day: number) => void }> = ({ onDaySelect }) => (
    <main className="max-w-lg mx-auto p-4">
        {itineraryData.map((dayData) => (
            <DayCard
                key={dayData.day}
                dayData={dayData}
                onClick={() => onDaySelect(dayData.day)}
            />
        ))}
        <div className="h-4"></div>
    </main>
);

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'itinerary' | 'menu'>('itinerary');
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const handleDaySelect = (day: number) => {
        setSelectedDay(day);
    };

    const handleBackToItinerary = () => {
        setSelectedDay(null);
    };

    const handleTabChange = (page: 'itinerary' | 'menu') => {
        setCurrentPage(page);
        setSelectedDay(null); // Reset detail view when switching tabs
    };

    // Determine content to render
    let content;
    if (currentPage === 'itinerary') {
        if (selectedDay !== null) {
            const dayData = itineraryData.find(d => d.day === selectedDay);
            if (dayData) {
                content = <DayDetail dayData={dayData} onBack={handleBackToItinerary} />;
            } else {
                 content = <ItineraryPage onDaySelect={handleDaySelect} />;
            }
        } else {
            content = <ItineraryPage onDaySelect={handleDaySelect} />;
        }
    } else {
        content = <MenuPage setCurrentPage={setCurrentPage as any} />;
    }

    return (
        <div className="min-h-screen bg-[#f0f4f6] pb-20 font-sans">
            <header className="bg-white border-b border-gray-200 shadow-sm p-4 sticky top-0 z-30">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-xl font-extrabold text-[#2b6e90]">
                        2026 四國9日自駕遊
                    </h1>
                    <p className="text-xs text-[#757575] mt-0.5">
                        協同規劃儀表板
                    </p>
                </div>
            </header>

            {content}

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around text-xs text-[#757575] z-30 pb-safe">
                <button 
                    className={`flex flex-col items-center justify-center py-3 transition duration-200 w-1/2 ${currentPage === 'itinerary' ? 'text-[#2b6e90] font-bold' : 'text-[#757575] hover:text-[#2b6e90]'}`}
                    onClick={() => handleTabChange('itinerary')}
                >
                    <MapIcon className="w-6 h-6 mb-1" />
                    <span className="text-[14px]">行程總覽</span>
                </button>
                
                <button 
                    className={`flex flex-col items-center justify-center py-3 transition duration-200 w-1/2 ${currentPage === 'menu' ? 'text-[#2b6e90] font-bold' : 'text-[#757575] hover:text-[#2b6e90]'}`}
                    onClick={() => handleTabChange('menu')}
                >
                    <MenuIcon className="w-6 h-6 mb-1" />
                    <span className="text-[14px]">選單</span>
                </button>
            </footer>
        </div>
    );
};

export default App;
