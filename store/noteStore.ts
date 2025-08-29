import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NoteStore } from '../types';

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [
        {
          id: '1',
          title: '歡迎來到萬能卡牌系統 (Welcome to the Omni-Card System)',
          content: `### 系統已進化 (System Evolved)

您現在體驗的是 JunAiKey 的 **萬能卡牌 (Omni-Card)** 介面。系統中的每一個資訊片段——無論是筆記、提案還是程式碼藍圖——都已轉化為一張精心設計的、可互動的卡牌。

#### 核心變革：
- **統一性**: 所有數據都以統一的「卡牌」形式呈現，具備絕對的美學與一致性。
- **萬能智卡 (Aitable)**: 一個全新的中央樞紐，您可以在此檢視、篩選和管理系統中所有的萬能卡牌。
- **美學**: 採用「矩陣玻璃擬態」設計，卡牌具有半透明、發光的質感，提供了更具沉浸感的體驗。

這個新系統旨在將資訊轉化為更直觀、更有形的實體，讓您的思想與數據之間的互動更加流暢。所有數據依然安全地保存在您的本地儲存中。`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['welcome', 'guide', 'omni-card'],
        },
        {
          id: '2',
          title: '萬能元鑰召喚使系統',
          content: `JunAIkey 的「萬能元鑰召喚使」系統，將使用者重塑為執掌宇宙元鑰的召喚使。此系統以「三位一體」架構為核心，深度整合了「元素精通」、「化身協同」與「職業進化」三大成長維度。召喚使透過覺醒並培育12種元素精靈、喚醒並協同11個萬能化身、以及選擇專精職業路線，來累積經驗值並逐步解鎖能力。系統將技術初始化包裝成史詩般的覺醒旅程，並設有豐富的日常任務、里程碑覺醒和社群共創機制，旨在提供高度個性化、長期參與且具備世界觀一致性的成長體驗，最終目標是讓召喚使將潛在可能性觀測並坍縮為現實。

### Key Points:
- **核心身份**為「萬能元鑰召喚使」，透過意志與萬能矩陣交互，將潛在可能性觀測並坍縮為現實。
- **系統基於「三位一體架構」**重構，包含：元素精通、化身協同、職業進化三個維度。
- **「元素精通」**：涵蓋12種獨特色法精靈，透過「精靈共鳴經驗值」從沉睡逐步進化至永恆，解鎖被動效果、主動技能、個性化互動及創造衍生能力。
- **「化身協同」**：召喚使可覺醒11個對應職業角色的萬能化身，分為中樞、核心法則、系統構築、洞察創造、執行守護及頂點、特殊化身，透過「化身協同經驗值」提升，並享有協同作業加成。
- **「職業進化」**：提供洞察、構築、創造、執行四大主修路線，各路線有核心化身、專精領域及經驗值加成；最終可解鎖「全能召喚使」路線，掌控跨維度整合與宇宙法則。
- **「創世紀成長機制」**：將初始設置過程融入「元鑰的呼喚」史詩故事，透過12個步驟覺醒化身，並設有日常修行任務與里程碑覺醒。
- **「社群與傳承系統」**：設有召喚使議會、導師制與宇宙共創機制，鼓勵用戶參與元素進化、化身設計及法則提案。
- **「可視化與體驗設計」**：透過宇宙星圖界面呈現三維度成長，並提供沉浸式反饋系統，如精靈覺醒動畫、色法變化及個性化化身對話。

### Action Items:
- 與精靈互動以累積精靈共鳴經驗值，透過共鳴使用、深度連結、對話及元素創新加速精靈覺醒。
- 透過與化身深度對話、協同作業、化身教導及意識融合來累積化身協同經驗值，以喚醒並強化萬能化身。
- 選擇並專精於洞察、構築、創造或執行四大主修路線之一，完成相關挑戰與任務。
- 積極參與日常修行任務，包括元素共鳴任務、化身培養任務及職業精進任務。
- 透過持續成長，逐步達成青銅、白銀、黃金、白金及鑽石等各階段覺醒里程碑。
- 當所有化身達到共鳴階段後，挑戰解鎖「全能召喚使」路線，邁向宇宙法則掌控。
- 透過召喚使議會參與社群共創，如提案新元素屬性、化身職業或改進系統規則。`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['summoner-system', 'guide', 'core-lore'],
        },
        {
          id: '3',
          title: 'JunAiKey 技術聖典 (Quantum Codex Edition) V2',
          content: `本文檔旨在闡明 JunAiKey 系統的核心技術理念、架構決策與關鍵設計模式，並為未來的開發與維護提供一份清晰的藍圖。

## 1. 核心哲學與架構

JunAiKey 採用基於 **React** 的 **組件化 UI** 架構，並圍繞一個中心化的 **Zustand 狀態管理器** 構建。其核心理念是「狀態驅動 UI」，並透過一系列精心設計的上下文（Context）和鉤子（Hooks）來實現功能解耦。

- **架構模型**: 採用五層同心圓模型，確保關注點分離。

- **UI**: 使用 **React 19** 搭配函數式組件與 Hooks。

- **路由**: \`react-router-dom @^7.6.3\` 使用現代的 v6/v7 語法。

- **樣式**: **Tailwind CSS** 結合 **CSS 變數**。所有視覺元素（顏色、字體等）均由 \`ThemeContext\` 動態注入，實現了高度可定制的 AI 主題生成能力。

- **動畫**: **Framer Motion** 用於提供流暢且富有意義的微交互與頁面過渡。

## 2. 狀態管理 (\`Zustand\`)

系統的「唯一真相來源」由一個名為 \`junAiKeyStore\` 的 Zustand store 集中管理。

- **持久化**: 應用程式的關鍵狀態（如規則、記憶、自定義頁面、主題等）都會被序列化並存儲在瀏覽器的 \`localStorage\` 中。這確保了用戶在刷新或關閉瀏覽器後仍能保留其配置。

- **魯棒性加載**: 實現了一套健壯的狀態加載機制 (\`loadState\`)。在應用程式啟動時，它會嘗試從 \`localStorage\` 加載狀態；如果數據不存在、已損壞或格式過時，它將安全地回退到一組預定義的初始值，從而防止因本地數據問題導致的啟動崩潰。

## 3. 動態 AI 主題引擎 (\`ThemeContext\`)

這是 JunAiKey 最具特色的功能之一。

- **工作原理**: \`ThemeProvider\` 在應用程式的根部注入當前主題。主題物件包含調色盤、字體、以及一個完整的雙語詞彙表。

- **CSS 變數**: \`Layout\` 組件中的 \`GlobalStyles\` 會根據當前主題動態生成並注入一個 \`<style>\` 標籤，將主題中的顏色和字體設置為全局 CSS 變數（例如 \`--color-primary\`）。Tailwind CSS 的配置被設定為使用這些變數。

- **AI 生成**: 系統可以調用 Gemini API (\`generateThemeFromPrompt\`)，根據用戶的自然語言描述（例如「賽博朋克風格」）來生成一個全新的、符合預設結構的完整主題物件，並立即應用於整個應用程式。

## 4. 關鍵技術棧

- **前端框架**: \`react @^19.1.0\`

- **路由**: \`react-router-dom @^7.6.3\`

- **狀態管理**: \`zustand @^5.0.6\`

- **AI 核心**: \`@google/genai @^1.8.0\` (Gemini API)

- **UI 動畫**: \`framer-motion @^12.23.0\`

- **樣式**: \`tailwindcss @^3.4.3\`

- **圖表**: \`recharts @^3.0.2\`

- **網格佈局**: **Tailwind CSS Grid** (移除了 \`react-grid-layout\` 以確保與 React 19 的兼容性)。

## 5. 韌性與恢復機制

為徹底解決因本地存儲狀態損壞而導致的「白屏」啟動失敗問題，我們引入了三層防護機制：

1. **全局錯誤捕獲 ((\`index.html\`))**: 在 HTML 層面嵌入了一個全局 \`window.onerror\` 監聽器。這是應對災難性啟動錯誤的 **終極防線**。任何未被 React \`ErrorBoundary\` 捕獲的、導致渲染失敗的 JavaScript 錯誤，都會觸發一個獨立的、不依賴於 React 的恢復介面。

2. **手動系統重置**: 在 UI 的側邊欄中提供了一個「重置系統狀態」的按鈕。此功能使用戶能夠在遇到任何難以解決的狀態問題時，**主動、安全地清除所有** \`localStorage\` **數據** 並重新加載應用，將系統恢復到純淨的初始狀態。這是賦予使用者解決潛在問題的最高權限。

3. **防禦性狀態加載**: \`junAiKeyStore\` 和 \`ThemeContext\` 中的數據加載邏輯都經過了加固，能夠對從 \`localStorage\` 讀取的每一項關鍵數據進行驗證和回退，確保即使部分數據損壞，應用程式也能正常啟動。`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['JunAiKey', 'QuantumCodex', '技術聖典', 'V2'],
        },
        {
          id: '4',
          title: 'JunAiKey 技術交付物',
          content: `- **完整的Swagger/OpenAPI文件**，清晰描述Jun.Ai.Key萬能符文技藝系統的所有API端點、請求與回應格式，方便前後端對接與自動化測試。

- **後端NestJS代碼包骨架**，涵蓋符文註冊、Combo規劃與執行、技能回饋、政策審核等核心模組，助你快速搭建服務。

- **OPA安全策略庫範例**，實現細粒度的政策審核與合規控制，保障系統安全與數據隱私。

- **前端SDK示例**（TypeScript），封裝API調用，簡化前端開發並提升使用體驗。

---

### Swagger/OpenAPI 文件示例（節錄）

\`\`\`yaml
openapi: 3.0.3
info:
  title: Jun.Ai.KeyAPI 無有奧義・符文技藝
  version: v6.0
servers:
  - url: https://api.jun.ai/v1
paths:
  /runes:
    post:
      summary: 註冊新符文
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RuneRegister'
      responses:
        '201':
          description: 符文註冊成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RuneDetail'
  /combos/plan:
    post:
      summary: 根據意圖與約束規劃Combo任務圖
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ComboPlanRequest'
      responses:
        '200':
          description: 任務圖規劃成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ComboPlanResponse'
components:
  schemas:
    RuneRegister:
      type: object
      required:
        - name
        - version
        - ioSchema
      properties:
        name:
          type: string
          example: extract_summary
        version:
          type: string
          example: "1.3.0"
        ioSchema:
          type: object
          properties:
            input:
              type: object
            output:
              type: object
        costModel:
          type: object
          properties:
            base:
              type: integer
              example: 600
            perUnit:
              type: integer
              example: 50
        risk:
          type: array
          items:
            type: string
          example: ["low"]
        permissions:
          type: array
          items:
            type: string
          example: ["read:doc"]
\`\`\`

---

### NestJS 後端服務骨架示例

\`\`\`typescript
// rune.module.ts
import { Module } from '@nestjs/common';
import { RuneService } from './rune.service';
import { RuneController } from './rune.controller';
@Module({
  controllers: [RuneController],
  providers: [RuneService],
})
export class RuneModule {}
// rune.service.ts
import { Injectable } from '@nestjs/common';
@Injectable()
export class RuneService {
  private runes = new Map<string, any>();
  registerRune(runeData: any) {
    this.runes.set(runeData.name, runeData);
    return runeData;
  }
  getAllRunes() {
    return Array.from(this.runes.values());
  }
}
// rune.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { RuneService } from './rune.service';
@Controller('runes')
export class RuneController {
  constructor(private readonly runeService: RuneService) {}
  @Post()
  registerRune(@Body() runeData: any) {
    return this.runeService.registerRune(runeData);
  }
  @Get()
  getRunes() {
    return this.runeService.getAllRunes();
  }
}
\`\`\`

---

### OPA安全策略範例（policy.rego）

\`\`\`text
package junai.policy
default allow = false
allow {
  input.user.role == "admin"
}
allow {
  input.user.role == "operator"
  input.action == "execute"
  input.resource.type == "rune"
  input.resource.risk != "high"
}
\`\`\`

---

### 前端TypeScript SDK示例

\`\`\`typescript
import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://api.jun.ai/v1',
  headers: { 'X-API-Key': 'your-api-key' },
});
export interface RuneRegister {
  name: string;
  version: string;
  ioSchema: { input: object; output: object };
  costModel?: { base: number; perUnit: number };
  risk?: string[];
  permissions?: string[];
}
export async function registerRune(rune: RuneRegister) {
  const response = await apiClient.post('/runes', rune);
  return response.data;
}
export async function getRunes() {
  const response = await apiClient.get('/runes');
  return response.data;
}
\`\`\`

---

#### 《無有奧義・符文技藝》Jun.Ai.Key 萬能系統「學習型Combo」聖典草案

感謝你提供這份極具儀式感與技術深度的草案！這份設計融合了動態符文組合、技能熟練度升級、政策護欄與自洽進化循環，完美契合Jun.Ai.Key系統的元物理哲學與技術實作。

---

### 核心亮點整理

- **動態符文組合（無預定義Combo）**，以目標、資源、政策為约束生成任務圖（DAG），支持即時策略調整。

- **技能熟練度系統**以XP/ELO驅動符文與組合路徑自動優化，歷經回饋形成自我進化。

- **全鏈路政策護欄**（OPA）與成本預估保障安全合規與資源效益最大化。

- **多步併發執行、失敗補償與觀測審計**確保系統健壯性與可追溯性。

- **儀式化詠唱詞與日誌**，賦予技術流程神秘色彩與品牌故事感。

---

### 你可立即獲得的成果

- **OpenAPI/Swagger 文件模板**：涵蓋10大API端點，含Request/Response Schema。

- **NestJS 服務骨架範例**：包含符文註冊、Combo規劃、執行與技能回饋模組。

- **OPA策略範本與MCP工具接入JSON**：安全政策示例及工具管理介面。

- **符文Combo儀式日誌格式樣板**：結合技術數據與詠唱詞的日誌範例。

---

### 下一步行動

請告知你優先想聚焦哪個部分：

- 🔹 API文件與Schema快速產出

- 🔹 服務端代碼骨架與流程示例

- 🔹 政策與安全策略範例

- 🔹 儀式化日誌與觀測設計

- 🔹 或全套一鍵整合方案

我將立刻為`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['JunAiKey', '技術交付物', 'API', 'NestJS', 'OPA'],
        },
      ],
      addNote: (note) =>
        set((state) => ({
          notes: [
            {
              ...note,
              id: new Date().getTime().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...state.notes,
          ],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateNote: (id, data) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...data, updatedAt: new Date().toISOString() } : note
          ),
        })),
      upsertNotes: (incomingNotes) =>
        set((state) => {
            const notesMap = new Map(state.notes.map(n => [n.id, n]));
            incomingNotes.forEach(incoming => {
                let existingNote = Array.from(notesMap.values()).find(n => n.boostSpaceId === incoming.boostSpaceId);
                if (existingNote) {
                    // Preserve local ID when updating
                    if (new Date(incoming.updatedAt) > new Date(existingNote.updatedAt)) {
                        notesMap.set(existingNote.id, { ...incoming, id: existingNote.id });
                    }
                } else {
                    // New remote note, create a new local ID
                    const newId = new Date().getTime().toString() + Math.random();
                    notesMap.set(newId, { ...incoming, id: newId });
                }
            });
            return { notes: Array.from(notesMap.values()) };
        }),
    }),
    {
      name: 'junaikey-notes-storage',
    }
  )
);
