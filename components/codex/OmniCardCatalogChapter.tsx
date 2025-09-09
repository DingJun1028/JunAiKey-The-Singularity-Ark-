
import React from 'react';
import BilingualLabel from '../BilingualLabel';
import SectionCard from './SectionCard';

const Rarity: React.FC<{type: 'Mythic' | 'Rare', children: React.ReactNode}> = ({ type, children }) => (
    <span className={`font-semibold ${type === 'Mythic' ? 'text-orange-400' : 'text-purple-400'}`}>{children}</span>
);

const TACTICAL_STYLES_DATA = [
    { faction: "🔥 火 (Fire)", hero: "萬能符文連結師", essence: "破壞與轉化；專注於直接傷害、快速攻擊與燃燒效果。", styles: ["烈焰強襲 (Aggro): 速攻生物與傷害法術壓制。", "焦土灼燒 (Burn): 持續性效果傷害消耗。"] },
    { faction: "💧 水 (Water)", hero: "萬能萬有引力協調者", essence: "流動與適應；擅長防禦、控制、凍結與負面狀態。", styles: ["靜潭壁壘 (Control): 防禦、治療與反制，拖入後期。", "深海寒流 (Tempo): 利用凍結與彈回效果擾亂節奏。"] },
    { faction: "⛰️ 土 (Earth)", hero: "萬能秩序守衛者", essence: "穩定與成長；強調韌性、防禦、資源生成與生命增益。", styles: ["不動山脈 (Fortress): 高生命值守護單位防禦。", "盤根巨木 (Ramp): 加速資源以召喚巨型生物。"] },
    { faction: "🌪️ 風 (Wind)", hero: "萬能天行者代理官", essence: "自由與變動；專精於快速移動、迴避與手牌操作。", styles: ["疾風連擊 (Tempo/Evasion): 穿透防禦持續施壓。", "空靈詭計 (Control/Hand): 操控雙方手牌，製造資訊差。"] },
    { faction: "⚡ 雷 (Lightning)", hero: "萬能真理探測者", essence: "速度與衝擊；側重於狀態效果、連鎖反應與爆發傷害。", styles: ["雷霆連鎖 (Spell Chain): 利用法術連鎖產生爆發。", "電磁脈衝 (Stun/Burst): 「暈眩」控制後給予致命一擊。"] },
    { faction: "☀️ 光 (Light)", hero: "萬能知識編年史家", essence: "純淨與秩序；代表治癒、保護、增益效果與清除負面狀態。", styles: ["聖盾壁壘 (Fortress): 利用「聖盾」與治療建立不敗防線。", "榮光遠征 (Go-Wide): 鋪開大量單位後集體強化。"] },
    { faction: "🌑 暗 (Dark)", hero: "萬能熵減煉金師", essence: "陰影與潛能；擅長犧牲、墓地互動與資源剝奪。", styles: ["虛空獻祭 (Sacrifice): 犧牲單位觸發強大效果。", "蝕魂詛咒 (Discard/Control): 棄牌與資源破壞。"] },
    { faction: "⚙️ 金 (Metal)", hero: "萬能第一建築師", essence: "堅固與創造；專注於神器、裝備、構築與資源利用。", styles: ["機工軍團 (Artifact Swarm): 透過神器協同效應取勝。", "神兵鍛造 (Voltron): 打造單一無敵的神器生物。"] },
    { faction: "🌳 木 (Wood)", hero: "萬能創世編織者", essence: "生命與連結；強調成長、召喚、連結與持續性效果。", styles: ["世界樹之裔 (Go-Tall): 培育單一巨大生物。", "萬物相生 (Go-Wide): 召喚大量衍生物形成軍隊。"] },
    { faction: "🌌 靈 (Spirit)", hero: "萬能核心演化引擎", essence: "普世與超越；能夠跨越元素界限，產生特殊協同。", styles: ["五色共鳴 (Multi-Element): 組合多陣營力量。", "乙太塑形 (Rule Manipulation): 扭曲遊戲規則本身。"] },
    { faction: "⏳ 時 (Time)", hero: "萬能平衡調律師", essence: "宿命與機遇；操控因果、扭曲節奏、玩弄回合結構。", styles: ["時序凍結 (Tempo/Delay): 透過延遲效果打亂對手。", "因果悖論 (Combo): 完成高難度的組合技取勝。"] },
    { faction: "🕳️ 空 (Void)", hero: "萬能啓蒙導師", essence: "虛無與潛能；代表萬物的缺席，專注於「放逐」卡牌。", styles: ["萬物歸虛 (Exile/Control): 透過放逐掏空對手資源。", "熵能爆發 (Self-Exile): 放逐自身卡牌以獲取力量。"] }
];

const TacticalTable: React.FC = () => (
    <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-matrix-bg text-matrix-cyan">
                <tr>
                    <th className="p-3">陣營 (Faction)</th>
                    <th className="p-3">對應英雄 (Corresponding Hero)</th>
                    <th className="p-3">核心本質 (Core Essence)</th>
                    <th className="p-3">戰術風格 (Tactical Styles)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-matrix-dark/30">
                {TACTICAL_STYLES_DATA.map(item => (
                    <tr key={item.faction}>
                        <td className="p-3 font-semibold">{item.faction}</td>
                        <td className="p-3">{item.hero}</td>
                        <td className="p-3 text-matrix-dark">{item.essence}</td>
                        <td className="p-3">
                            <ul className="list-disc list-inside space-y-1">
                                {item.styles.map(style => <li key={style}>{style}</li>)}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const OmniCardCatalogChapter: React.FC = () => {
    return (
        <div className="space-y-8 text-matrix-light">
             <SectionCard title="《萬能卡牌目錄集・創始卷》 (The Omni-Card Catalog - Genesis Volume)">
                <p>此目錄集共收錄 600 張卡牌，分為 13 大類。以下為各類別的戰術總覽及其核心高稀有度卡牌列表。</p>
            </SectionCard>
            
            <SectionCard title="第一部：十二創世元素 (The 12 Genesis Elements)">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🔥 火 (Fire) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 快速、直接的侵略性傷害與持續性的燃燒效果。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《天火焚城》、《燼滅鳳凰》</Rarity></li>
                            <li><Rarity type="Rare">《熔岩暴君》、《烈焰說書人》、《怒火燎原》、《永恆餘燼》、《爆燃地蟲》、《三次引爆》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">💧 水 (Water) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 透過凍結、反制與移回手牌等效果，掌控戰局節奏。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《絕對零度》、《利維坦巨獸》</Rarity></li>
                            <li><Rarity type="Rare">《深淵海妖》、《潮汐法師》、《集體失憶》、《倒影池》、《冰封巨蟹》、《心靈滲透》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">⛰️ 土 (Earth) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 建立堅不可摧的防線，並加速資源以召喚巨型生物。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《蓋亞之怒》、《世界承載巨龜》</Rarity></li>
                            <li><Rarity type="Rare">《盤根古樹》、《晶洞巨獸》、《石化皮膚》、《豐饒之季》、《生命之泉》、《撼地巨人》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">🌪️ 風 (Wind) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 利用「飛行」與「迴避」單位穿透防禦，並透過手牌操控擾亂對手。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《萬里長風》、《空域領主・隼》</Rarity></li>
                            <li><Rarity type="Rare">《幻影刺客》、《風暴召喚師》、《龍捲風》、《思想竊取》、《風暴祭壇》、《雲端翔龍》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">⚡ 雷 (Lightning) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 透過「暈眩」控制場面，並利用法術「連鎖」產生爆發性傷害。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《超新星風暴》、《風暴主宰・麒麟》</Rarity></li>
                            <li><Rarity type="Rare">《電漿術士》、《靜電監獄長》、《球狀閃電》、《連鎖閃電》、《磁能方尖碑》、《風暴飛龍》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">☀️ 光 (Light) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 透過治療、保護與「聖盾」建立優勢，並集結眾力給予致命一擊。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《創世紀之光》、《律法頒布者・黎明使者》</Rarity></li>
                            <li><Rarity type="Rare">《聖殿騎士團長》、《陽光守護者》、《榮光聖令》、《集體治療》、《聖光信標》、《知識看守者》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">🌑 暗 (Dark) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 犧牲己方單位觸發強大效果，並利用墓地資源與棄牌手段削弱對手。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《永夜降臨》、《熵之化身》</Rarity></li>
                            <li><Rarity type="Rare">《墓穴竊賊》、《噬魂魔》、《黑暗儀式》、《精神枯萎》、《褻瀆之地》、《影裔刺客》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">⚙️ 金 (Metal) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 透過大量「神器」之間的協同效應，或為單一核心裝備強大神器來取勝。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《世界編纂》、《白金巨像》</Rarity></li>
                            <li><Rarity type="Rare">《機工大師》、《鍛爐主宰》、《一鍵部署》、《結構重組》、《泰坦之錘》、《自走砲台》</Rarity></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🌳 木 (Wood) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 召喚大量衍生物形成軍隊，或透過+1/+1指示物培育單一的巨大生物。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《森羅萬象》、《古森看守者》</Rarity></li>
                            <li><Rarity type="Rare">《菌菇之王》、《荊棘纏繞體》、《集體繁盛》、《進化之力》、《生命搖籃》、《森林巨魔薩滿》</Rarity></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🌌 靈 (Spirit/Astral) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 跨越元素界限，組合多陣營力量，並利用獨特法術扭曲遊戲規則。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《萬法歸一》、《乙太編織者》</Rarity></li>
                            <li><Rarity type="Rare">《星界旅人》、《棱彩守衛》、《宇宙洪流》、《存在重構》、《交匯節點》、《靈魂嚮導》</Rarity></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-2">⏳ 時 (Time) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 透過「延遲」與「預視」等機制操控時間流，擾亂對手節奏或完成驚人的組合技。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《時間奇點》、《永恆時龍》</Rarity></li>
                            <li><Rarity type="Rare">《悖論法師》、《時空看守》、《時間扭曲》、《因果重置》、《停滯的沙漏》、《預言 sphinx》</Rarity></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🕳️ 空 (Void) [40張]</h3>
                        <p className="text-xs text-matrix-dark mb-2">戰術核心： 將卡牌從遊戲中「放逐」，並利用空無一物的狀態獲取力量。</p>
                        <ul className="list-disc list-inside">
                            <li><Rarity type="Mythic">《虛空奇點》、《噬界巨口》</Rarity></li>
                            <li><Rarity type="Rare">《虛空低語者》、《熵能巨像》、《徹底抹除》、《心靈真空》、《寂靜之地》、《裂隙獵犬》</Rarity></li>
                        </ul>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="第二部：無色共鳴卡牌 (Colorless Resonance Cards) [120張]">
                <p className="text-xs text-matrix-dark mb-2">戰術核心： 為所有陣營提供通用的戰術組件、資源工具與基礎單位。</p>
                <ul className="list-disc list-inside">
                    <li><Rarity type="Mythic">神器秘稀: 《萬象儀》</Rarity></li>
                    <li><Rarity type="Mythic">領域秘稀: 《維度監獄》</Rarity></li>
                    <li><Rarity type="Mythic">源力秘稀: 《無限源泉》</Rarity></li>
                    <li><Rarity type="Mythic">通用秘稀: 《時間吞噬者》</Rarity></li>
                    <li><Rarity type="Rare">稀有精選: 《複製熔爐》、《寧靜聖所》、《雙倍之日》、《全知》、《抹消》等...</Rarity></li>
                </ul>
            </SectionCard>

            <SectionCard title="《十二創世元素・戰術總覽表》 (The 12 Genesis Elements - Tactical Overview)">
                <TacticalTable />
            </SectionCard>
        </div>
    );
};

export default OmniCardCatalogChapter;
