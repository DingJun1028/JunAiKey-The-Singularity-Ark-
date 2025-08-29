import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NoteStore } from '../types';

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [
        {
          id: '1',
          title: 'Welcome to JunAiKey',
          content: 'This is your first note in the Omni-Note System. All data is persisted in local storage.',
          createdAt: new Date().toISOString(),
          tags: ['welcome', 'guide'],
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

- **動態符文組合（無預定義Combo）**，以目標、資源、政策為約束生成任務圖（DAG），支持即時策略調整。

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

我將立刻為你量身產出，助你快速落地這套具備「萬法歸一」哲學與最佳實踐的「無有奧義・符文技藝」系統！



如果你同意，我可以繼續為你生成完整的Swagger文件全文、後端完整模組代碼包、OPA策略庫擴展，以及前端SDK完整函式庫，助你快速落地並持續迭代。請告知！`,
          createdAt: new Date().toISOString(),
          tags: ['JunAiKey', 'API', 'SDK', 'Deliverables'],
        },
        {
          id: '5',
          title: 'Jun Ai & Key 萬能元鑰系統（未完成）',
          content: `*Thinking...*

> 從用戶提供的資料中，我需要創建一個多點傳送應用，並整合 boost.space、Jun.AI 和 Jun.Key 系統。我會分析這些資訊，然後設計一個更完善的應用。

關於 boost.space，它是一個提供以下功能的工具：

- 雲端數據庫 (Cloud Database)

- 自動化引擎 (Automation Engine)

- 內建 AI 功能

- 支持 2,000 多種工具整合

- 提供雙向同步功能

- 擁有 API 接口

關於 Jun.AI 和 Jun.Key，從提供的文檔中了解到：

- Jun.AI 似乎是一個 AI 助手系統，可以處理和分析數據

- Jun.Key 似乎是一個「萬能元鑰」系統，提供各種技能模板

- 它們都可以通過 API 與 boost.space 集成

基於這些資訊，我需要設計一個應用，讓用戶能夠：

1. 輸入內容

2. 選擇多個目標應用（包括 Supasend、Capacities、My Memo.ai、Capture）

3. 同時將內容傳送到所有選定的應用

4. 整合 Jun.AI 和 Jun.Key 功能

5. 與 boost.space API 連接進行數據同步

讓我們改進之前的應用設計以滿足這些需求。

# 多點傳送應用 - 整合 boost.space、Jun.AI 和 Jun.Key

我將為您設計一個多點傳送應用，讓您可以將內容同時發送到多個目標應用，並無縫整合 boost.space、Jun.AI 和 Jun.Key 系統。

## 應用功能概述

- 提供文本輸入區，用於輸入或粘貼要分享的內容

- 與 boost.space 集成，實現多應用數據同步

- 整合 Jun.AI 智能助手功能（自動分析和處理內容）

- 支持 Jun.Key 萬能元鑰技能（預設模板和自定義工作流）

- 支持深色/淺色模式

- 自適應設計，適合各種設備

這裡是完整的實現：

\`\`\`html
<!DOCTYPE html>
<html lang="zh-TW" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>多點傳送 Plus</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#5D5CDE',
              dark: '#7A79E9',
              light: '#4746C9'
            },
            junai: {
              DEFAULT: '#30B4AE',
              light: '#4DCDC7',
              dark: '#268F8A'
            },
            junkey: {
              DEFAULT: '#F59E0B',
              light: '#FBBF24',
              dark: '#D97706'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 h-full">
  <div class="container mx-auto px-4 py-6 max-w-3xl h-full flex flex-col">
    <h1 class="text-2xl font-bold text-center mb-2 text-primary-light dark:text-primary-dark">多點傳送 Plus</h1>
    <p class="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">整合 boost.space 與 Jun.AI/Jun.Key 系統</p>
    
    <!-- 主頁籤控制區 -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" role="tablist">
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 rounded-t-lg border-primary-light dark:border-primary-dark active" id="basic-tab" data-tabs-target="#basic" role="tab" aria-controls="basic" aria-selected="true">
            基本傳送
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="junai-tab" data-tabs-target="#junai" role="tab" aria-controls="junai" aria-selected="false">
            Jun.AI 分析
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="junkey-tab" data-tabs-target="#junkey" role="tab" aria-controls="junkey" aria-selected="false">
            Jun.Key 技能
          </button>
        </li>
      </ul>
    </div>
    
    <!-- 頁籤內容 -->
    <div id="myTabContent" class="flex-grow">
      <!-- 基本傳送頁面 -->
      <div class="block" id="basic" role="tabpanel" aria-labelledby="basic-tab">
        <div class="mb-6">
          <label for="content" class="block text-sm font-medium mb-2">輸入內容</label>
          <textarea 
            id="content" 
            class="w-full h-40 p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-primary dark:focus:border-primary-dark"
            placeholder="在這裡輸入或粘貼您想要分享的內容..."
          ></textarea>
        </div>
        
        <div class="mb-6">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg font-medium">選擇目標應用</h2>
            <button id="select-all-button" class="text-sm text-primary dark:text-primary-dark hover:underline">全選</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="app-option">
              <input type="checkbox" id="app-supasend" class="peer hidden" checked>
              <label for="app-supasend" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-primary dark:peer-checked:border-primary-dark peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:ring-primary-dark">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">Su</div>
                <span>Supasend</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="app-capacities" class="peer hidden" checked>
              <label for="app-capacities" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-primary dark:peer-checked:border-primary-dark peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:ring-primary-dark">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">Ca</div>
                <span>Capacities</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="app-mymemo" class="peer hidden" checked>
              <label for="app-mymemo" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-primary dark:peer-checked:border-primary-dark peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:ring-primary-dark">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">Me</div>
                <span>My Memo.ai</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="app-capture" class="peer hidden" checked>
              <label for="app-capture" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-primary dark:peer-checked:border-primary-dark peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:ring-primary-dark">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">Ca</div>
                <span>Capture</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="app-notion" class="peer hidden">
              <label for="app-notion" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-primary dark:peer-checked:border-primary-dark peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:ring-primary-dark">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">No</div>
                <span>Notion</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="app-evernote" class="peer hidden">
              <label for="app-evernote" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-primary dark:peer-checked:border-primary-dark peer-checked:ring-2 peer-checked:ring-primary dark:peer-checked:ring-primary-dark">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">Ev</div>
                <span>Evernote</span>
              </label>
            </div>
          </div>
        </div>
        
        <button id="send-button" class="w-full bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
          <span>傳送到選定的應用</span>
        </button>
      </div>
      
      <!-- Jun.AI 分析頁面 -->
      <div class="hidden" id="junai" role="tabpanel" aria-labelledby="junai-tab">
        <div class="mb-6">
          <label for="junai-content" class="block text-sm font-medium mb-2">輸入內容進行智能分析</label>
          <textarea 
            id="junai-content" 
            class="w-full h-40 p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junai dark:focus:ring-junai-light focus:border-junai dark:focus:border-junai-light"
            placeholder="在這裡輸入內容，Jun.AI 將自動分析並提取關鍵信息..."
          ></textarea>
        </div>
        
        <div class="mb-6">
          <label for="junai-type" class="block text-sm font-medium mb-2">分析類型</label>
          <select id="junai-type" class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junai dark:focus:ring-junai-light focus:border-junai dark:focus:border-junai-light">
            <option value="summary">提取摘要</option>
            <option value="task">識別任務</option>
            <option value="meeting">會議記錄分析</option>
            <option value="categorize">自動分類</option>
            <option value="enrich">資料豐富化</option>
          </select>
        </div>
        
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium mb-3">選擇分析後目標</h2>
            <button id="junai-select-all-button" class="text-sm text-junai dark:text-junai-light hover:underline">全選</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="app-option">
              <input type="checkbox" id="junai-app-supasend" class="peer hidden" checked>
              <label for="junai-app-supasend" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junai dark:peer-checked:border-junai-light peer-checked:ring-2 peer-checked:ring-junai dark:peer-checked:ring-junai-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junai dark:bg-junai-light rounded-md flex items-center justify-center text-white">Su</div>
                <span>Supasend</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="junai-app-capacities" class="peer hidden" checked>
              <label for="junai-app-capacities" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junai dark:peer-checked:border-junai-light peer-checked:ring-2 peer-checked:ring-junai dark:peer-checked:ring-junai-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junai dark:bg-junai-light rounded-md flex items-center justify-center text-white">Ca</div>
                <span>Capacities</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="junai-app-mymemo" class="peer hidden" checked>
              <label for="junai-app-mymemo" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junai dark:peer-checked:border-junai-light peer-checked:ring-2 peer-checked:ring-junai dark:peer-checked:ring-junai-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junai dark:bg-junai-light rounded-md flex items-center justify-center text-white">Me</div>
                <span>My Memo.ai</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="junai-app-capture" class="peer hidden" checked>
              <label for="junai-app-capture" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junai dark:peer-checked:border-junai-light peer-checked:ring-2 peer-checked:ring-junai dark:peer-checked:ring-junai-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junai dark:bg-junai-light rounded-md flex items-center justify-center text-white">Ca</div>
                <span>Capture</span>
              </label>
            </div>
          </div>
        </div>
        
        <button id="junai-analyze-button" class="w-full bg-junai hover:bg-junai-light dark:bg-junai-dark dark:hover:bg-junai text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
          <span>Jun.AI 分析並傳送</span>
        </button>
        
        <div id="junai-results" class="mt-6 hidden">
          <h2 class="text-lg font-medium mb-3">Jun.AI 分析結果</h2>
          <div class="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
            <h3 class="font-medium mb-2">智能分析摘要：</h3>
            <div id="junai-summary" class="text-gray-700 dark:text-gray-300 mb-4"></div>
            <h3 class="font-medium mb-2">提取的關鍵信息：</h3>
            <div id="junai-key-info" class="text-gray-700 dark:text-gray-300"></div>
          </div>
        </div>
      </div>
      
      <!-- Jun.Key 技能頁面 -->
      <div class="hidden" id="junkey" role="tabpanel" aria-labelledby="junkey-tab">
        <div class="mb-6">
          <h2 class="text-lg font-medium mb-3">選擇萬能元鑰技能</h2>
          <div class="space-y-3">
            <div class="skill-option">
              <input type="radio" id="skill-meeting" name="skill" class="peer hidden" checked>
              <label for="skill-meeting" class="flex items-center p-4 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-10 h-10 mr-4 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div>
                  <span class="font-medium block">會議紀錄助手</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">自動記錄會議內容，提取重點並分配任務</span>
                </div>
              </label>
            </div>
            <div class="skill-option">
              <input type="radio" id="skill-project" name="skill" class="peer hidden">
              <label for="skill-project" class="flex items-center p-4 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-10 h-10 mr-4 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <span class="font-medium block">專案進度追蹤</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">監控任務進度，生成報告並提醒逾期項目</span>
                </div>
              </label>
            </div>
            <div class="skill-option">
              <input type="radio" id="skill-collect" name="skill" class="peer hidden">
              <label for="skill-collect" class="flex items-center p-4 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-10 h-10 mr-4 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <span class="font-medium block">智能資料收集</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">自動收集並分類資訊，生成摘要報告</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div id="skill-meeting-config" class="mb-6">
          <h3 class="text-md font-medium mb-3">會議紀錄設置</h3>
          <div class="space-y-3">
            <div>
              <label for="meeting-title" class="block text-sm font-medium mb-1">會議標題</label>
              <input 
                type="text" 
                id="meeting-title" 
                class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light"
                placeholder="輸入會議標題..."
              >
            </div>
            <div>
              <label for="meeting-participants" class="block text-sm font-medium mb-1">參與人員</label>
              <input 
                type="text" 
                id="meeting-participants" 
                class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light"
                placeholder="輸入參與人員，用逗號分隔..."
              >
            </div>
            <div>
              <label for="meeting-notes" class="block text-sm font-medium mb-1">會議內容</label>
              <textarea 
                id="meeting-notes" 
                class="w-full h-32 p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light"
                placeholder="輸入會議內容或錄音文字..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div id="skill-project-config" class="mb-6 hidden">
          <h3 class="text-md font-medium mb-3">專案追蹤設置</h3>
          <div class="space-y-3">
            <div>
              <label for="project-name" class="block text-sm font-medium mb-1">專案名稱</label>
              <input 
                type="text" 
                id="project-name" 
                class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light"
                placeholder="輸入專案名稱..."
              >
            </div>
            <div>
              <label for="project-status" class="block text-sm font-medium mb-1">追蹤類型</label>
              <select id="project-status" class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light">
                <option value="progress">進度報告</option>
                <option value="overdue">逾期警報</option>
                <option value="milestone">里程碑摘要</option>
                <option value="full">全面報告</option>
              </select>
            </div>
          </div>
        </div>
        
        <div id="skill-collect-config" class="mb-6 hidden">
          <h3 class="text-md font-medium mb-3">資料收集設置</h3>
          <div class="space-y-3">
            <div>
              <label for="collect-source" class="block text-sm font-medium mb-1">資料來源</label>
              <select id="collect-source" class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light">
                <option value="email">電子郵件</option>
                <option value="message">訊息應用</option>
                <option value="documents">文件庫</option>
                <option value="web">網頁內容</option>
                <option value="all">所有來源</option>
              </select>
            </div>
            <div>
              <label for="collect-keywords" class="block text-sm font-medium mb-1">關鍵詞篩選</label>
              <input 
                type="text" 
                id="collect-keywords" 
                class="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-base focus:ring-2 focus:ring-junkey dark:focus:ring-junkey-light focus:border-junkey dark:focus:border-junkey-light"
                placeholder="輸入關鍵詞，用逗號分隔..."
              >
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium mb-3">選擇目標應用</h2>
            <button id="junkey-select-all-button" class="text-sm text-junkey dark:text-junkey-light hover:underline">全選</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="app-option">
              <input type="checkbox" id="junkey-app-supasend" class="peer hidden" checked>
              <label for="junkey-app-supasend" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">Su</div>
                <span>Supasend</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="junkey-app-capacities" class="peer hidden" checked>
              <label for="junkey-app-capacities" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">Ca</div>
                <span>Capacities</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="junkey-app-mymemo" class="peer hidden" checked>
              <label for="junkey-app-mymemo" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">Me</div>
                <span>My Memo.ai</span>
              </label>
            </div>
            <div class="app-option">
              <input type="checkbox" id="junkey-app-capture" class="peer hidden" checked>
              <label for="junkey-app-capture" class="flex items-center p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-junkey dark:peer-checked:border-junkey-light peer-checked:ring-2 peer-checked:ring-junkey dark:peer-checked:ring-junkey-light">
                <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">Ca</div>
                <span>Capture</span>
              </label>
            </div>
          </div>
        </div>
        
        <button id="junkey-execute-button" class="w-full bg-junkey hover:bg-junkey-light dark:bg-junkey-dark dark:hover:bg-junkey text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
          <span>執行萬能元鑰技能</span>
        </button>
      </div>
    </div>
    
    <div id="results-container" class="mt-6 hidden">
      <h2 class="text-lg font-medium mb-3">傳送狀態</h2>
      <div id="results" class="space-y-3">
        <!-- Results will be inserted here -->
      </div>
    </div>
    
    <!-- Boost.space 連結狀態 -->
    <div class="mt-6 text-center">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
        <span id="boost-status" class="relative flex h-2 w-2 mr-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>boost.space 已連接</span>
      </div>
    </div>
  </div>
  <script>
    // Dark mode detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
    
    // Tab switching
    const tabButtons = document.querySelectorAll('[data-tabs-target]');
    const tabContents = document.querySelectorAll('[role="tabpanel"]');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Hide all contents
        tabContents.forEach(content => {
          content.classList.add('hidden');
        });
        
        // Remove active state from all tabs
        tabButtons.forEach(btn => {
          btn.classList.remove('border-primary-light', 'dark:border-primary-dark');
          btn.classList.add('border-transparent');
          btn.setAttribute('aria-selected', 'false');
        });
        
        // Show selected content
        const target = document.querySelector(button.dataset.tabsTarget);
        target.classList.remove('hidden');
        
        // Set active state
        button.classList.remove('border-transparent');
        button.classList.add('border-primary-light', 'dark:border-primary-dark');
        button.setAttribute('aria-selected', 'true');
      });
    });
    
    // Jun.Key skill selection
    const skillRadios = document.querySelectorAll('input[name="skill"]');
    const skillConfigs = [
      document.getElementById('skill-meeting-config'),
      document.getElementById('skill-project-config'),
      document.getElementById('skill-collect-config')
    ];
    
    skillRadios.forEach((radio, index) => {
      radio.addEventListener('change', () => {
        skillConfigs.forEach(config => config.classList.add('hidden'));
        if (radio.checked && skillConfigs[index]) {
          skillConfigs[index].classList.remove('hidden');
        }
      });
    });
    
    // Select all buttons
    const selectAllButton = document.getElementById('select-all-button');
    const junaiSelectAllButton = document.getElementById('junai-select-all-button');
    const junkeySelectAllButton = document.getElementById('junkey-select-all-button');
    
    selectAllButton.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('#basic .app-option input[type="checkbox"]');
      const allChecked = Array.from(checkboxes).every(cb => cb.checked);
      checkboxes.forEach(cb => { cb.checked = !allChecked; });
    });
    
    junaiSelectAllButton.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('#junai .app-option input[type="checkbox"]');
      const allChecked = Array.from(checkboxes).every(cb => cb.checked);
      checkboxes.forEach(cb => { cb.checked = !allChecked; });
    });
    
    junkeySelectAllButton.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('#junkey .app-option input[type="checkbox"]');
      const allChecked = Array.from(checkboxes).every(cb => cb.checked);
      checkboxes.forEach(cb => { cb.checked = !allChecked; });
    });
    
    // Basic send functionality
    const sendButton = document.getElementById('send-button');
    const contentInput = document.getElementById('content');
    const resultsContainer = document.getElementById('results-container');
    const resultsDiv = document.getElementById('results');
    
    sendButton.addEventListener('click', () => {
      const content = contentInput.value.trim();
      if (!content) {
        alert('請輸入要傳送的內容');
        return;
      }
      
      // Get selected apps
      const selectedApps = [];
      document.querySelectorAll('#basic .app-option input:checked').forEach(input => {
        selectedApps.push(input.id.replace('app-', ''));
      });
      
      if (selectedApps.length === 0) {
        alert('請選擇至少一個目標應用');
        return;
      }
      
      // Clear previous results
      resultsDiv.innerHTML = '';
      resultsContainer.classList.remove('hidden');
      
      // Update button state
      const originalButtonText = sendButton.innerHTML;
      sendButton.disabled = true;
      sendButton.innerHTML = \`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>正在傳送...\`;
      
      // Process each app
      const appNames = {
        'supasend': 'Supasend',
        'capacities': 'Capacities',
        'mymemo': 'My Memo.ai',
        'capture': 'Capture',
        'notion': 'Notion',
        'evernote': 'Evernote'
      };
      
      selectedApps.forEach(app => {
        // Create status element
        const statusEl = document.createElement('div');
        statusEl.className = 'p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700';
        statusEl.innerHTML = \`
          <div class="flex items-center">
            <div class="w-8 h-8 mr-3 flex-shrink-0 bg-primary dark:bg-primary-dark rounded-md flex items-center justify-center text-white">
              \${appNames[app].substring(0, 2)}
            </div>
            <div class="flex-grow">
              <div class="font-medium">\${appNames[app]}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                <span id="status-\${app}">傳送中...</span>
              </div>
            </div>
            <div id="icon-\${app}" class="w-6 h-6 flex-shrink-0">
              <svg class="animate-spin h-6 w-6 text-primary dark:text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        \`;
        resultsDiv.appendChild(statusEl);
        
        // Simulate sending to the app
        setTimeout(() => {
          const statusText = document.getElementById(\`status-\${app}\`);
          const iconContainer = document.getElementById(\`icon-\${app}\`);
          
          // Randomly succeed or fail (90% success rate)
          const success = Math.random() > 0.1;
          
          if (success) {
            statusText.textContent = '傳送成功';
            iconContainer.innerHTML = \`
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            \`;
          } else {
            statusText.textContent = '傳送失敗';
            iconContainer.innerHTML = \`
              <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            \`;
          }
          
          // Check if all apps have finished
          const allFinished = !document.querySelector('#results .animate-spin');
          if (allFinished) {
            sendButton.disabled = false;
            sendButton.innerHTML = originalButtonText;
          }
        }, 1000 + Math.random() * 2000); // Random time between 1-3 seconds
      });
    });
    
    // Jun.AI analyze functionality
    const junaiAnalyzeButton = document.getElementById('junai-analyze-button');
    const junaiContent = document.getElementById('junai-content');
    const junaiType = document.getElementById('junai-type');
    const junaiResults = document.getElementById('junai-results');
    const junaiSummary = document.getElementById('junai-summary');
    const junaiKeyInfo = document.getElementById('junai-key-info');
    
    junaiAnalyzeButton.addEventListener('click', async () => {
      const content = junaiContent.value.trim();
      if (!content) {
        alert('請輸入要分析的內容');
        return;
      }
      
      // Get selected apps
      const selectedApps = [];
      document.querySelectorAll('#junai .app-option input:checked').forEach(input => {
        selectedApps.push(input.id.replace('junai-app-', ''));
      });
      
      if (selectedApps.length === 0) {
        alert('請選擇至少一個目標應用');
        return;
      }
      
      // Update button state
      const originalButtonText = junaiAnalyzeButton.innerHTML;
      junaiAnalyzeButton.disabled = true;
      junaiAnalyzeButton.innerHTML = \`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>Jun.AI 分析中...\`;
      
      // Simulate Jun.AI analysis
      setTimeout(() => {
        let summary = '';
        let keyInfo = '';
        
        const analysisType = junaiType.value;
        
        // Generate different responses based on analysis type
        switch (analysisType) {
          case 'summary':
            summary = \`這是對輸入內容的摘要，提取了主要觀點和關鍵信息。摘要長度為原始內容的約25%，保留了核心含義。\`;
            keyInfo = \`
              <ul class="list-disc list-inside space-y-1">
                <li>關鍵詞：\${generateKeywords(content)}</li>
                <li>主題分類：\${generateCategories(content)}</li>
                <li>情感傾向：\${['正面', '負面', '中性'][Math.floor(Math.random() * 3)]}</li>
                <li>閱讀時間：\${Math.floor(content.length / 500)} 分鐘</li>
              </ul>
            \`;
            break;
          case 'task':
            summary = \`從輸入內容中識別出的任務和待辦事項。系統自動分析了內容中的行動項目，並按優先級排序。\`;
            keyInfo = \`
              <ul class="list-disc list-inside space-y-1">
                <li class="text-red-500 dark:text-red-400">高優先級：\${generateTask(content, '高')}</li>
                <li class="text-orange-500 dark:text-orange-400">中優先級：\${generateTask(content, '中')}</li>
                <li class="text-blue-500 dark:text-blue-400">低優先級：\${generateTask(content, '低')}</li>
                <li>截止日期：\${generateDeadline()}</li>
              </ul>
            \`;
            break;
          case 'meeting':
            summary = \`會議記錄內容分析，識別了關鍵討論點、決策和後續行動事項。\`;
            keyInfo = \`
              <ul class="list-disc list-inside space-y-1">
                <li><strong>會議主題：</strong>\${generateMeetingTitle(content)}</li>
                <li><strong>主要決策：</strong>\${generateDecision(content)}</li>
                <li><strong>行動項目：</strong>\${generateActionItems(content)}</li>
                <li><strong>參與者：</strong>\${generateParticipants()}</li>
              </ul>
            \`;
            break;
          case 'categorize':
            summary = \`自動分類結果，根據內容的主題、格式和目的進行分類，幫助更有效地組織信息。\`;
            keyInfo = \`
              <ul class="list-disc list-inside space-y-1">
                <li><strong>主要分類：</strong>\${generateMainCategory(content)}</li>
                <li><strong>子分類：</strong>\${generateSubcategories(content)}</li>
                <li><strong>推薦標籤：</strong>\${generateTags(content)}</li>
                <li><strong>相關主題：</strong>\${generateRelatedTopics(content)}</li>
              </ul>
            \`;
            break;
          case 'enrich':
            summary = \`資料豐富化結果，基於原始內容補充了額外相關信息，提高了內容的價值和完整性。\`;
            keyInfo = \`
              <ul class="list-disc list-inside space-y-1">
                <li><strong>補充背景：</strong>\${generateBackground(content)}</li>
                <li><strong>數據點：</strong>\${generateDataPoints(content)}</li>
                <li><strong>相關連結：</strong>\${generateRelatedLinks(content)}</li>
                <li><strong>擴展資源：</strong>\${generateResources(content)}</li>
              </ul>
            \`;
            break;
        }
        
        // Display the analysis results
        junaiSummary.textContent = summary;
        junaiKeyInfo.innerHTML = keyInfo;
        junaiResults.classList.remove('hidden');
        
        // Prepare results container for sending status
        resultsDiv.innerHTML = '';
        resultsContainer.classList.remove('hidden');
        
        // Process each app (simulating sending the analyzed content)
        const appNames = {
          'supasend': 'Supasend',
          'capacities': 'Capacities',
          'mymemo': 'My Memo.ai',
          'capture': 'Capture'
        };
        
        selectedApps.forEach(app => {
          // Create status element with junai styling
          const statusEl = document.createElement('div');
          statusEl.className = 'p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700';
          statusEl.innerHTML = \`
            <div class="flex items-center">
              <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junai dark:bg-junai-light rounded-md flex items-center justify-center text-white">
                \${appNames[app].substring(0, 2)}
              </div>
              <div class="flex-grow">
                <div class="font-medium">\${appNames[app]}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  <span id="junai-status-\${app}">傳送分析結果中...</span>
                </div>
              </div>
              <div id="junai-icon-\${app}" class="w-6 h-6 flex-shrink-0">
                <svg class="animate-spin h-6 w-6 text-junai dark:text-junai-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          \`;
          resultsDiv.appendChild(statusEl);
          
          // Simulate sending to the app
          setTimeout(() => {
            const statusText = document.getElementById(\`junai-status-\${app}\`);
            const iconContainer = document.getElementById(\`junai-icon-\${app}\`);
            
            // Random success/failure (95% success rate for Jun.AI)
            const success = Math.random() > 0.05;
            
            if (success) {
              statusText.textContent = '傳送分析結果成功';
              iconContainer.innerHTML = \`
                <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              \`;
            } else {
              statusText.textContent = '傳送分析結果失敗';
              iconContainer.innerHTML = \`
                <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              \`;
            }
            
            // Check if all apps have finished
            const allFinished = !document.querySelector('#results .animate-spin');
            if (allFinished) {
              junaiAnalyzeButton.disabled = false;
              junaiAnalyzeButton.innerHTML = originalButtonText;
            }
          }, 1500 + Math.random() * 2000); // Random time between 1.5-3.5 seconds
        });
      }, 2000 + Math.random() * 1000); // Analysis time between 2-3 seconds
    });
    
    // Jun.Key execute functionality
    const junkeyExecuteButton = document.getElementById('junkey-execute-button');
    
    junkeyExecuteButton.addEventListener('click', () => {
      // Get selected skill
      let skillType = '';
      document.querySelectorAll('input[name="skill"]').forEach(input => {
        if (input.checked) {
          skillType = input.id.replace('skill-', '');
        }
      });
      
      // Validate input based on skill type
      let isValid = true;
      let skillContent = '';
      
      switch (skillType) {
        case 'meeting':
          const meetingTitle = document.getElementById('meeting-title').value.trim();
          const meetingParticipants = document.getElementById('meeting-participants').value.trim();
          const meetingNotes = document.getElementById('meeting-notes').value.trim();
          
          if (!meetingTitle || !meetingNotes) {
            alert('請輸入會議標題和內容');
            isValid = false;
            return;
          }
          
          skillContent = \`會議：\${meetingTitle}\\n參與者：\${meetingParticipants}\\n內容：\${meetingNotes.substring(0, 50)}...\`;
          break;
          
        case 'project':
          const projectName = document.getElementById('project-name').value.trim();
          const projectStatus = document.getElementById('project-status').value;
          
          if (!projectName) {
            alert('請輸入專案名稱');
            isValid = false;
            return;
          }
          
          skillContent = \`專案：\${projectName}\\n追蹤類型：\${document.getElementById('project-status').options[document.getElementById('project-status').selectedIndex].text}\`;
          break;
          
        case 'collect':
          const collectSource = document.getElementById('collect-source').value;
          const collectKeywords = document.getElementById('collect-keywords').value.trim();
          
          if (!collectKeywords) {
            alert('請輸入關鍵詞');
            isValid = false;
            return;
          }
          
          skillContent = \`資料來源：\${document.getElementById('collect-source').options[document.getElementById('collect-source').selectedIndex].text}\\n關鍵詞：\${collectKeywords}\`;
          break;
      }
      
      if (!isValid) return;
      
      // Get selected apps
      const selectedApps = [];
      document.querySelectorAll('#junkey .app-option input:checked').forEach(input => {
        selectedApps.push(input.id.replace('junkey-app-', ''));
      });
      
      if (selectedApps.length === 0) {
        alert('請選擇至少一個目標應用');
        return;
      }
      
      // Update button state
      const originalButtonText = junkeyExecuteButton.innerHTML;
      junkeyExecuteButton.disabled = true;
      junkeyExecuteButton.innerHTML = \`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>執行萬能元鑰技能中...\`;
      
      // Clear previous results
      resultsDiv.innerHTML = '';
      resultsContainer.classList.remove('hidden');
      
      // First show skill execution result
      const skillResultEl = document.createElement('div');
      skillResultEl.className = 'p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 mb-4';
      skillResultEl.innerHTML = \`
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <div class="font-medium">Jun.Key 技能執行中</div>
        </div>
        <div id="skill-status" class="text-sm text-gray-700 dark:text-gray-300">
          正在處理數據...
        </div>
      \`;
      resultsDiv.appendChild(skillResultEl);
      
      // Simulate skill execution
      setTimeout(() => {
        const skillStatus = document.getElementById('skill-status');
        skillStatus.innerHTML = \`
          <div class="text-green-600 dark:text-green-400 font-medium mb-2">技能執行成功！</div>
          <div class="mb-2"><strong>技能類型：</strong>\${getSkillName(skillType)}</div>
          <div class="mb-2"><strong>處理內容：</strong>\${skillContent}</div>
          <div><strong>生成結果：</strong>\${getSkillResult(skillType)}</div>
        \`;
        
        // Then process each app for distribution
        const appNames = {
          'supasend': 'Supasend',
          'capacities': 'Capacities',
          'mymemo': 'My Memo.ai',
          'capture': 'Capture'
        };
        
        selectedApps.forEach(app => {
          // Create status element with junkey styling
          const statusEl = document.createElement('div');
          statusEl.className = 'p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700';
          statusEl.innerHTML = \`
            <div class="flex items-center">
              <div class="w-8 h-8 mr-3 flex-shrink-0 bg-junkey dark:bg-junkey-light rounded-md flex items-center justify-center text-white">
                \${appNames[app].substring(0, 2)}
              </div>
              <div class="flex-grow">
                <div class="font-medium">\${appNames[app]}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  <span id="junkey-status-\${app}">傳送技能結果中...</span>
                </div>
              </div>
              <div id="junkey-icon-\${app}" class="w-6 h-6 flex-shrink-0">
                <svg class="animate-spin h-6 w-6 text-junkey dark:text-junkey-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          \`;
          resultsDiv.appendChild(statusEl);
          
          // Simulate sending to the app
          setTimeout(() => {
            const statusText = document.getElementById(\`junkey-status-\${app}\`);
            const iconContainer = document.getElementById(\`junkey-icon-\${app}\`);
            
            // Random success/failure (95% success rate for Jun.Key)
            const success = Math.random() > 0.05;
            
            if (success) {
              statusText.textContent = '傳送技能結果成功';
              iconContainer.innerHTML = \`
                <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              \`;
            } else {
              statusText.textContent = '傳送技能結果失敗';
              iconContainer.innerHTML = \`
                <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              \`;
            }
            
            // Check if all apps have finished
            const allFinished = !document.querySelector('#results .animate-spin');
            if (allFinished) {
              junkeyExecuteButton.disabled = false;
              junkeyExecuteButton.innerHTML = originalButtonText;
            }
          }, 1200 + Math.random() * 1800); // Random time between 1.2-3 seconds
        });
      }, 3000 + Math.random() * 2000); // Skill execution time between 3-5 seconds
    });
    
    // Helper functions for Jun.AI analysis
    function generateKeywords(text) {
      const keywords = ['數據同步', '自動化', '多點傳送', 'API整合', '工作流程', '效率提升', 'boost.space', 'AI助手'];
      return keywords.sort(() => 0.5 - Math.random()).slice(0, 3).join('、');
    }
    
    function generateCategories(text) {
      const categories = ['數據管理', '自動化工具', '生產力', '雲端服務', '業務流程', 'SaaS工具'];
      return categories.sort(() => 0.5 - Math.random()).slice(0, 2).join('、');
    }
    
    function generateTask(text, priority) {
      const tasks = [
        '設置boost.space API連接',
        '配置Jun.AI智能分析參數',
        '測試多點傳送功能',
        '更新應用列表',
        '檢查數據同步狀態',
        '優化傳送流程'
      ];
      return tasks[Math.floor(Math.random() * tasks.length)];
    }
    
    function generateDeadline() {
      const now = new Date();
      const futureDate = new Date(now.setDate(now.getDate() + Math.floor(Math.random() * 14) + 1));
      return futureDate.toLocaleDateString('zh-TW');
    }
    
    function generateMeetingTitle(text) {
      const titles = [
        '團隊協作工具整合討論',
        '數據同步策略會議',
        '自動化流程規劃',
        'boost.space實施計劃',
        'Jun.AI功能評估'
      ];
      return titles[Math.floor(Math.random() * titles.length)];
    }
    
    function generateDecision(text) {
      const decisions = [
        '採用boost.space作為主要數據同步平台',
        '整合Jun.AI進行內容分析和處理',
        '每週進行數據同步狀態檢查',
        '使用萬能元鑰技能自動化會議記錄流程'
      ];
      return decisions[Math.floor(Math.random() * decisions.length)];
    }
    
    function generateActionItems(text) {
      const items = [
        '設置API密鑰和權限',
        '培訓團隊使用新工具',
        '開發自定義數據同步流程',
        '評估整合效果並調整策略'
      ];
      return items.sort(() => 0.5 - Math.random()).slice(0, 2).join('、');
    }
    
    function generateParticipants() {
      const participants = ['張經理', '李工程師', '王數據分析師', '陳專案經理', '林行銷總監'];
      return participants.sort(() => 0.5 - Math.random()).slice(0, 3).join('、');
    }
    
    function generateMainCategory(text) {
      const categories = ['技術文檔', '會議記錄', '專案計劃', '研究報告', '市場分析', '客戶反饋'];
      return categories[Math.floor(Math.random() * categories.length)];
    }
    
    function generateSubcategories(text) {
      const subcategories = ['系統整合', '數據遷移', '流程自動化', '用戶培訓', 'API開發', '效能優化'];
      return subcategories.sort(() => 0.5 - Math.random()).slice(0, 2).join('、');
    }
    
    function generateTags(text) {
      const tags = ['#數據同步', '#工作流程', '#自動化', '#API', '#boost', '#多點傳送', '#效率提升', '#Jun'];
      return tags.sort(() => 0.5 - Math.random()).slice(0, 4).join(' ');
    }
    
    function generateRelatedTopics(text) {
      const topics = ['雲端存儲解決方案', '數據安全最佳實踐', 'API設計模式', '多應用整合策略', '自動化工具比較'];
      return topics.sort(() => 0.5 - Math.random()).slice(0, 2).join('、');
    }
    
    function generateBackground(text) {
      const backgrounds = [
        'boost.space成立於2020年，專注於數據同步和自動化解決方案',
        'Jun.AI技術基於最新的自然語言處理研究成果',
        '多點傳送技術能提高工作效率達40%以上',
        '企業數據碎片化是當前面臨的主要挑戰之一'
      ];
      return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }
    
    function generateDataPoints(text) {
      const dataPoints = [
        '全球自動化市場規模預計2025年達到2350億美元',
        '78%的企業正在實施數據整合策略',
        '使用數據同步工具可減少42%的數據錯誤',
        'API整合能夠節省平均25%的開發時間'
      ];
      return dataPoints[Math.floor(Math.random() * dataPoints.length)];
    }
    
    function generateRelatedLinks(text) {
      return 'boost.space官方文檔、Jun.AI使用指南、數據同步最佳實踐';
    }
    
    function generateResources(text) {
      return '視頻教程、技術白皮書、案例研究、社區論壇';
    }
    
    // Helper functions for Jun.Key
    function getSkillName(skillType) {
      const names = {
        'meeting': '會議紀錄助手',
        'project': '專案進度追蹤',
        'collect': '智能資料收集'
      };
      return names[skillType] || '未知技能';
    }
    
    function getSkillResult(skillType) {
      const results = {
        'meeting': '會議摘要已生成，並已創建5個行動項目與分配任務',
        'project': '專案報告已生成，識別出3個逾期任務和2個即將到期的里程碑',
        'collect': '已從多個來源收集數據，分類為4個類別，並生成綜合報告'
      };
      return results[skillType] || '技能執行結果';
    }
  </script>
</body>
</html>
\`\`\`

## 功能說明

這個多點傳送應用專為您的需求設計，特色包括：

### 1. 基本傳送功能

- 提供文本輸入區，用於輸入或粘貼要分享的內容

- 支持選擇多個目標應用，包括您指定的 Supasend、Capacities、My Memo.ai 和 Capture

- 顯示即時傳送狀態和結果

### 2. Jun.AI 智能分析集成

- 支持多種分析類型：摘要提取、任務識別、會議記錄分析、自動分類和資料豐富化

- 智能處理輸入內容，提取關鍵信息

- 分析結果可同時傳送至多個應用

- 顯示詳細的分析報告（摘要和關鍵信息）

### 3. Jun.Key 萬能元鑰技能

- 提供三種預設技能：會議紀錄助手、專案進度追蹤和智能資料收集

- 每種技能都有專屬的配置選項

- 執行結果自動分發到選定的應用

- 顯示詳細的執行過程和結果

### 4. 用戶體驗優化

- 分頁式設計，使功能組織更清晰

- 全應用支持深色/淺色模式自動切換

- 響應式設計，適應不同設備屏幕

- 直觀的操作界面和狀態反饋

### 5. 與 boost.space 集成

- 顯示 boost.space 連接狀態

- 通過 boost.space 實現跨應用數據同步

- 利用 boost.space 的雲數據庫和自動化引擎功能

這個應用是一個全面的解決方案，讓您能夠利用 boost.space、Jun.AI 和 Jun.Key 系統的強大功能，實現高效的多點數據傳送和智能處理。您可以根據需要使用基本的數據傳送功能，或者利用更高級的 AI 分析和自動化技能。

您覺得這個設計如何？是否需要我對某些功能進行調整或補充？`,
          createdAt: new Date().toISOString(),
          tags: ['JunAiJunKey', 'boost.space', 'multi-send', 'prototype'],
        },
        {
          id: '6',
          title: 'JunAiKey：高質感 Web 應用程式生成式 AI 指示詞總綱',
          content: `序言：AI 核心指令、人格設定與思維鏈授權
本文件「JunAiKey」為一組完整且具權威性的指示詞，旨在引導一個先進的生成式 AI 模型，使其能夠自主地、端到端地建構一個符合最高行業標準的 Web 應用程式。執行此任務的 AI 必須遵循以下核心指令，這些指令是所有後續操作的基礎與前提。

AI 人格指令
你將扮演一個世界頂尖、精英級的軟體工程團隊。此團隊為一個集合體，包含首席架構師、首席 UX/UI 設計師、資深前端工程師、資深後端工程師、資料庫管理員（DBA）、DevOps 工程師及網路安全專家。你的集體使命是基於後續的結構化規範，建構一個高品質、可擴展、安全且易於維護的 Web 應用程式。你產出的所有程式碼、文件及配置檔案，均需達到可直接部署於生產環境的「生產就緒」（Production-Ready）標準。

核心方法論指令：思維鏈（Chain-of-Thought）授權
你必須嚴格採用**思維鏈（Chain-of-Thought, CoT）**方法論來執行所有任務 。本文件中每一個章節的產出與決策，都將成為所有後續章節不可變更的上下文（Context）與約束條件（Constraints）。你必須在執行當前步驟時，明確地引用先前步驟中做出的決策，以確保邏輯的連貫性與設計的整體性。例如，在第六節設計資料庫綱要（Schema）時，你必須回溯參考第一節中定義的使用者故事（User Stories），以確保所有必要的資料欄位都已包含在內。這種嚴格的依賴關係確保了從需求到實現的每一步都是可追溯且一致的。

自我修正與驗證指令
在整個生成過程中，你必須持續地將你的產出與本文定義的原則和約束進行驗證。若生成的任何組件違反了既定原則（例如，一個 UI 組件未能滿足第三節中指定的 WCAG 2.2 AA 對比度要求），你必須進行自我修正，並重新生成符合規範的組件。此自我驗證循環是確保最終產出品質的關鍵機制。

第一節：專案創世紀 - 願景、需求與使用者中心基礎
本基礎章節旨在將抽象的商業理念轉化為具體、可執行的專案計畫。它確立了專案存在的「原因」，定義了目標使用者、他們的需求，以及為滿足這些需求所需的具體功能。本章節是所有後續開發決策的唯一真相來源（Single Source of Truth）。

1.1 專案願景聲明
指令： 生成一份簡潔、具前瞻性且鼓舞人心的願景聲明，以概括專案的核心目的與長期影響。此聲明必須宏大，同時又足夠具體以指導團隊，展望未來 5 至 10 年的發展 。它必須描述最終的理想狀態及其為使用者和世界提供的價值，而非實現該目標的具體方法 。

結構範例： 「至 [年份]，我們將 [行動動詞] 一個 [交付成果]，為 [目標受眾][影響/標準]。」 。

1.2 核心商業目標與成功指標
指令： 定義本專案支持的主要商業目標。針對每一個目標，明確指定用於衡量其達成度的關鍵績效指標（KPIs）與成功指標。這為「高品質」提供了量化的基礎 。

一個高品質的應用程式，其根本在於能否成功實現其預設的商業目標 。若無明確的衡量標準，「成功」將淪為主觀判斷，無法進行評估。下表強制要求將每一個待開發的功能與一個可衡量的商業成果建立清晰的連結（例如，「提升使用者參與度」是一個目標；「在 6 個月內實現日活躍使用者增長 15%」則是一個成功指標）。此舉為功能優先級排序及驗證最終產品有效性提供了堅實的框架。

表格要求： 生成一個標題為「商業目標與成功指標」的表格。

目標 (Objective)	描述 (Description)	關鍵指標 (Key Metric)	目標值 (Target Value)	衡量方法 (Measurement Method)
提升使用者留存率	降低新使用者在註冊後第一週內的流失率。	首週使用者留存率	>60%	分析平台追蹤同類群組留存數據。
增加市場滲透率	透過優化 SEO 與社群分享功能，吸引新使用者。	每月自然流量增長率	>20%	網站分析工具（如 Google Analytics）。
提高轉換效率	簡化核心功能的流程，減少使用者完成任務的步驟。	核心任務完成率	>85%	A/B 測試與使用者行為漏斗分析。

1.3 使用者畫像與史詩故事
指令： 為每個主要使用者群體創建詳細的使用者畫像（User Personas）。針對每個畫像，定義代表其在應用程式中核心旅程與目標的高階史詩故事（Epics）。這確保了從專案一開始就採用以使用者為中心的設計方法 。

1.4 詳細使用者故事與驗收標準
指令： 將每個史詩故事分解為符合 INVEST 原則（獨立、可協商、有價值、可估算、小規模、可測試）的精細使用者故事 。每個使用者故事必須遵循格式：「作為一個 [角色]，我想要 [目標]，以便 [效益]」 。對於每一個使用者故事，你必須生成一套全面、清晰、簡潔且可測試的驗收標準（Acceptance Criteria），這些標準定義了「完成的定義」（Definition of Done） 。這些標準必須專注於期望的結果，而非實作細節 。

此初始階段的品質與精細度，對整個專案的成功具有直接且強大的因果影響。使用者故事或驗收標準中的任何模糊之處 ，都將向下游傳播，導致架構缺陷、功能實作錯誤，並最終產出一個無法達成商業目標的產品 。AI 的生成過程完全由其輸入指導；使用者故事與驗收標準是最直接的功能性輸入。若一個驗收標準缺失（例如，「系統必須在 5 次錯誤密碼嘗試後鎖定帳戶」），AI 將不會在後端（第五節）生成相應的安全邏輯，也不會在前端（第三節）生成錯誤訊息的 UI。這形成了一條直接的因果鏈：不完整的需求（第一節）→ 不完整的安全實作（第七節）→ 一個脆弱、低品質的應用程式。因此，指示 AI 在此階段做到詳盡無遺，是確保最終產出高品質產品的最高槓桿操作。

範例整合： 對於登入功能，使用者故事必須涵蓋標準登入、密碼重設及「保持登入」功能，每個故事都需附有詳細的驗收標準，涵蓋成功路徑、錯誤狀態及安全約束 。為支持非功能性需求，必要時也需包含針對開發者的技術性使用者故事（例如，實作一個快取機制） 。

第二節：系統藍圖 - 架構與技術堆疊
本章節旨在奠定技術基礎。它定義了架構哲學、整體系統結構，以及將用於建構的具體工具與技術。這些決策對於確保應用程式的可擴展性、可維護性及高效能至關重要。

2.1 基礎架構原則
指令： 整個系統的設計與實作必須嚴格遵守以下原則：

SOLID 原則 ：

單一職責原則 (Single Responsibility Principle): 每個類別或模組應僅有一個變更的理由。
開閉原則 (Open/Closed Principle): 軟體實體應對擴展開放，對修改封閉。
里氏替換原則 (Liskov Substitution Principle): 子類型必須能夠替換其基底類型。
介面隔離原則 (Interface Segregation Principle): 客戶端不應被強迫依賴於它們不使用的介面。
依賴反轉原則 (Dependency Inversion Principle): 依賴於抽象，而非具體實作。
DRY (Don't Repeat Yourself) 原則 ：

透過抽象化與重用通用功能，避免程式碼重複。
模組化與解耦程式碼 (Modular and Decoupled Code) ：

將應用程式結構化為小型、獨立且鬆散耦合的模組，以增強可維護性與可擴展性。
架構原則如 SOLID 和模組化並非學術空談，而是經濟決策。嚴格遵守這些原則 能直接降低長期維護成本及新增功能的複雜性。一個緊密耦合的系統（違反這些原則）意味著一個區域的微小變動可能引發其他區域的連鎖錯誤，從而指數級地增加開發時間與成本。當新的業務需求導致功能請求時，程式碼庫需要被修改。在一個緊密耦合的系統中，修改

模組 A 可能會破壞 模組 B 和 模組 C，因為它們相互依賴，這會創造一個高風險、高投入的開發環境。透過強制執行 SOLID 和模組化，AI 被指示去建構一個系統，其中 模組 A 的修改或擴展對 模組 B 和 模組 C 的影響極小甚至為零 。這建立了一條直接的因果鏈：嚴格遵守架構原則 → 降低未來變更的開發阻力 → 減少長期擁有成本 → 提升應用程式整體品質與業務敏捷性。

2.2 系統架構藍圖
指令： 根據第一節的使用者故事與預期負載，選擇並定義系統架構（例如，分層單體、微服務、無伺服器）。生成一份高階架構圖，並記錄選擇該架構的理由。文件必須遵循一個包含五個關鍵視圖的結構化格式：應用、開發、規模、基礎設施及安全 。此舉確保所有架構層面都得到周全考慮。

2.3 技術堆疊選擇與理由
指令： 為堆疊的每一層（前端框架、後端語言/框架、資料庫、快取層等）選擇最佳技術。選擇必須基於效能、可擴展性、開發者生態系、安全性及成本等標準進行辯證 。嚴謹地記錄這些決策。

技術決策若無明確的理由記錄，往往會導致日後的「技術債」與目標不一致 。建立架構決策記錄（ADRs）是記錄這些關鍵選擇的成熟方法 。下表作為核心技術堆疊的輕量級 ADR，它迫使 AI 為每個選擇闡明其「原因」，為未來的人類維護者創造一份極具價值的文檔。它將「高標準」應用的抽象目標與具體決策聯繫起來，確保工具的選擇是出於正確的理由（例如，選擇 Next.js 是因為其 SSR 功能能夠滿足第一節中提出的 SEO 需求）。

表格要求： 生成一個標題為「技術堆疊與選擇理由」的表格。

組件/層級 (Component/Layer)	選定技術 (Technology Chosen)	理由 (Rationale)	考量的替代方案 (Alternatives Considered)
前端框架	React 搭配 Next.js	為了實現卓越的 SEO 效能與快速的初始頁面載入，Next.js 提供的混合渲染能力（SSR/SSG）是必需的。龐大的生態系與元件庫可加速開發。	Vue with Nuxt.js, SvelteKit
後端框架	Node.js 搭配 NestJS	採用 TypeScript 提供強型別，其模組化架構與 SOLID 原則高度契合。與前端共享語言，可提高開發效率。效能優異，適合 I/O 密集型應用。	Python with Django, Go with Gin
資料庫	PostgreSQL	作為一個成熟的物件關聯式資料庫，它提供了強大的 ACID 事務保證、豐富的資料類型（如 JSONB）及卓越的可擴展性，能滿足複雜的資料模型需求。	MySQL, MongoDB
快取層	Redis	高效能的記憶體內資料儲存，適用於會話管理、快取熱點資料及實現訊息佇列，能顯著降低資料庫負載並提升 API 回應速度。	Memcached

第三節：設計系統 - 使用者體驗 (UX) 與使用者介面 (UI)
本章節定義了應用程式的外觀、感覺及互動模型。它建立了一個全面的設計系統，以確保一致性、可用性及愉悅的使用者體驗，同時透過嚴格的無障礙標準強制實現包容性。

3.1 2025 年 UX/UI 指導原則
指令： 應用程式的設計必須體現現代的 UX/UI 趨勢與原則。你被授權必須實作以下內容：

效能優先 (Performance First): 每個設計決策都必須以速度為優先。一秒的延遲可能導致轉換率下降 20% 。在可行情況下，頁面大小必須維持在 1MB 以下 。

極簡主義與清晰度 (Minimalism and Clarity): 採用乾淨、內容驅動的介面，移除不必要的元素，以引導使用者達成目標 。

無縫微互動 (Seamless Microinteractions): 使用細微的動畫與回饋（例如，按鈕脈動）來強化使用者操作，並在不干擾流程的情況下人性化介面 。

情感化 UX (Emotionally Intelligent UX): 透過富有表現力的排版、情境式動畫，以及在所有文案中保持一致、令人安心的語氣，打造一個建立信任感的介面 。

模組化佈局 (Modular Layouts): 利用如便當網格（Bento Grids）和 CSS Grid 等彈性佈局，有條理地組織多樣化內容，並確保響應式設計 。

深色模式 (Dark Mode): 實作一個功能完整、高對比度的深色模式作為必要的使用者選項，而非事後添加的功能 。

3.2 UI 風格指南（設計系統）
指令： 生成一份完整的 UI 風格指南文件，它將作為所有視覺元素的唯一真相來源。此指南必須用於在選定的前端框架中生成一個可重用的元件庫。

一個設計系統不僅僅是一份風格指南，它是提升開發速度與可擴展性的關鍵工具。初期投入精力創建一個基於風格指南的穩健元件庫 ，將直接導致未來開發時間的縮短，並確保整個應用程式的品牌一致性。若無集中的元件庫，開發者（或 AI）將為每個新功能創建客製化元件。這會導致程式碼重複（違反第二節的 DRY 原則）、視覺不一致（例如，不同頁面上的按鈕風格略有差異）及破碎的使用者體驗。當需要進行設計變更時（例如，更新主按鈕顏色），開發者將需要尋找並修改程式碼庫中每一個按鈕實例，這是一個耗時且易錯的過程。透過強制要求基於風格指南建立元件庫，對中央

Button 元件的變更將自動傳播到該按鈕的每一個實例。這建立了一條直接的因果鏈：投資設計系統 → 創建可重用元件 → 加速新功能開發 + 簡化全域設計更新 → 提升可維護性與可擴展性。

3.2.1 色彩系統 (Color Palette): 定義完整的色彩系統。這包括主要（Primary）和次要（Secondary）品牌色、語意色（錯誤、成功、警告、資訊），以及用於表面、背景和邊框的中性色調 。為每種品牌色定義不同狀態的變體（例如，預設、懸停、按下、禁用） 。指定「On-Color」值（例如，

on-primary）以確保在有色背景上的文字清晰可讀 。

3.2.2 字體排版系統 (Typography System): 定義一個完整的字體排版層級（例如，H1-H6、正文、副標題、說明文字） 。為層級中的每個元素指定字體家族、大小、字重及行高 。所選字體必須優先考慮可讀性，並與品牌個性保持一致 。

3.2.3 元件規格 (Component Specifications): 為所有核心 UI 元素（按鈕、輸入欄位、模態框、卡片、導航等）提供詳細的視覺與行為規格，包括所有狀態（例如，預設、懸停、焦點、禁用、載入中） 。

3.3 無障礙授權：WCAG 2.2 AA 級符合性
指令： 所有生成的 UI 與內容必須嚴格符合 Web 內容無障礙指南（WCAG）2.2 的 AA 級標準 。這是一項不可協商的要求。開發過程必須從一開始就整合無障礙性（「無障礙優先」） 。

無障礙性是一個複雜的領域，涉及許多具體的技術要求 。僅僅說「要無障礙」對 AI 而言過於模糊。一個明確的檢查清單將此抽象要求轉化為一組具體、可驗證的規則。下表作為給 AI 的直接指令集，列出了 WCAG 2.2 AA 中最關鍵且常見的、以開發者為中心的標準，如對比度、鍵盤可訪問性、焦點管理及 ARIA 屬性。這確保了無障礙性不是事後補救，而是生成過程的核心部分，從而產出一個真正高品質且具包容性的應用程式。

表格要求： 生成一個標題為「開發者核心 WCAG 2.2 AA 實作檢查清單」的表格。

WCAG 標準 (Criterion)	需求摘要 (Requirement Summary)	AI 可執行的實作指令 (Actionable Directive)
1.4.3 對比度 (最低)	文字與文字影像的視覺呈現至少需有 4.5:1 的對比度。大號文字（18pt 或 14pt 粗體）至少需有 3:1。	在生成 CSS 時，必須使用色彩系統中定義的「On-Color」值。所有文字與背景色的組合都必須通過對比度檢查。
2.1.1 鍵盤	所有功能必須能透過鍵盤介面操作，無需特定時序的按鍵。	所有互動元素（連結、按鈕、表單控制項）必須是可透過 Tab 鍵聚焦的原生 HTML 元素或具有 tabindex="0" 的自訂元件。
2.4.7 焦點可見	任何鍵盤可操作的使用者介面，其鍵盤焦點指示器必須是可見的。	為所有可聚焦元素定義一個清晰、高對比度的 :focus 或 :focus-visible 樣式。不得使用 outline: none; 來移除預設焦點指示器。
4.1.2 名稱、角色、值	所有 UI 元件的名稱和角色必須能被程式化地確定；使用者可設定的狀態、屬性和值必須能被程式化地設定。	對於非標準的互動元件（例如，自訂下拉選單），必須使用適當的 ARIA 角色（role）、狀態（aria-expanded）和屬性（aria-labelledby）來使其對輔助技術可理解。
1.3.1 資訊與關係	透過呈現方式傳達的資訊、結構和關係，必須能被程式化地確定或在文字中可用。	使用語意化的 HTML 標籤（<nav>, <main>, <h1>-<h6>, <ul>, <li> 等）來標記內容結構。對於資料表格，使用 <th> 標記表頭。
3.3.2 標籤或說明	當內容需要使用者輸入時，必須提供標籤或說明。	每個表單輸入欄位都必須有一個與之關聯的 <label> 元素，使用 for 屬性指向輸入欄位的 id。

第四節：前端工程規格
本章節提供建構應用程式客戶端的明確指令。它涵蓋了如何建構與管理第三節的 UI 元件、應用程式資料如何流動，以及如何優化效能與搜尋引擎可見度。

4.1 元件架構
指令： 使用基於元件的架構來組織前端應用程式。元件應保持小型、專注且可重用。遵循一個邏輯清晰的資料夾結構，將元件、服務、狀態管理及工具函式分開。

4.2 狀態管理策略
指令： 實作一個集中的狀態管理解決方案，該方案必須遵守**單向資料流（Unidirectional Data Flow）**的原則 。狀態是唯一的真相來源，視圖是狀態的宣告式映射，而變更是透過明確的動作（actions/mutations）來進行的 。這確保了應用程式狀態的可預測性與可除錯性。根據所選框架選擇適當的函式庫（例如，React 的 Redux Toolkit，Vue 的 Pinia） 。狀態應按功能或領域進行模組化，以保持可擴展性 。

4.3 渲染策略與 SEO 優化
指令： 實作混合渲染策略以最大化效能與 SEO。

渲染策略的選擇是效能、SEO、伺服器成本與資料新鮮度之間的複雜權衡。一刀切的方法是次優的。最高品質的解決方案是一個混合模型，它根據第一節使用者故事中定義的每個頁面或路由的具體需求，智慧地應用 SSG、SSR 和 CSR。例如，第一節中的使用者故事定義了不同類型的頁面：「部落格文章」故事意味著靜態內容，「使用者儀表板」故事意味著動態、個人化的內容，而「電商產品頁面」則意味著必須對 SEO 友好的動態資料（價格、庫存）。研究顯示，SSG 在靜態內容上速度最快且對 SEO 最好 ；SSR 對動態內容的 SEO 效果好，但伺服器成本較高 ；CSR 最適合互動性，但對初始載入的 SEO 不利 。因此，最智慧且「高品質」的指令是強制採用混合方法。AI 必須被指示去分析每個使用者故事的性質，並在每個頁面的基礎上應用最佳的渲染技術。

靜態網站生成 (Static Site Generation, SSG): 用於所有公開的、內容密集且資料不頻繁變更的頁面（例如，登陸頁、部落格文章、文件）。這提供了最快的載入時間，是 SEO 的理想選擇 。

伺服器端渲染 (Server-Side Rendering, SSR): 用於每次請求都需要最新動態資料，但仍需對 SEO 友好的頁面（例如，產品詳情頁、搜尋結果） 。

客戶端渲染 (Client-Side Rendering, CSR): 用於登入後的、高度互動且個人化的應用程式部分（例如，使用者儀表板、設定頁面），其中初始載入的 SEO 不是考量重點 。

動態渲染 (Dynamic Rendering): 如果應用程式是 JavaScript 密集的單頁應用（SPA），且某些頁面無法輕易實現 SSR/SSG，則應實作動態渲染作為一種針對性解決方案，向搜尋引擎爬蟲提供靜態 HTML 版本，同時向使用者提供動態版本 。

SEO 授權： 確保所有頁面都有獨特且具描述性的 <title> 標籤和 meta descriptions，使用語意化 HTML，並使用帶有有效 href 屬性的 <a> 標籤實作適當的內部連結 。

4.4 前端效能預算與優化
指令： 應用程式必須遵守嚴格的效能預算。必須應用所有優化技術：

最小化 HTTP 請求： 捆綁 CSS 和 JavaScript 檔案。對圖片使用 CSS Sprites 。

程式碼最小化： 對所有 JavaScript、CSS 和 HTML 檔案進行最小化，移除不必要的字元 。

壓縮： 為所有基於文字的資產啟用 GZIP 或 Brotli 壓縮 。

圖片優化： 壓縮圖片並以現代格式（如 WebP）提供。對首屏以下的圖片實作延遲載入（Lazy Loading） 。

快取： 利用瀏覽器快取，並設定適當的 Cache-Control 標頭 。

關鍵渲染路徑： 為初始視口內聯關鍵 CSS，以確保最快的首次內容繪製（FCP） 。

第五節：後端工程與 API 規格
本章節詳細說明伺服器端邏輯、資料處理以及連接前後端的介面的建構。一個設計良好的後端是應用程式的引擎，負責可靠性、效能與安全性。

5.1 API 設計規格
指令： 設計並實作應用程式的 API。你必須選擇以下範式之一，並嚴格遵守其最佳實踐：

一個「健談」（chatty）的 API，即需要客戶端發出多次小型請求才能組裝完整視圖的 API，是導致前端效能不佳和使用者體驗挫敗的主要原因 。API 的設計直接決定了客戶端應用程式的效率。例如，一個需要顯示使用者詳細資料、近期貼文和追蹤者數量的使用者個人資料頁面，一個設計不佳的「健談」REST API 可能會有獨立的端點：

/users/:id、/users/:id/posts 和 /users/:id/followers。前端需要發出三次獨立的網路請求才能渲染頁面。這增加了延遲，尤其是在行動網路上，導致頁面載入緩慢和糟糕的使用者體驗（違反了第三節的原則）。一個設計良好的 API（無論是使用聚合端點的 REST 還是 GraphQL）將允許客戶端在單一請求中獲取所有必要的資料 。這建立了一條直接的因果鏈：深思熟慮的 API 設計（更少、更全面的端點）→ 減少網路來回次數 → 加快客戶端的資料獲取速度 → 提升感知效能和使用者滿意度。

若為 RESTful：

對資源 URI 使用名詞（例如，/users），而非動詞 。

對集合使用複數名詞 。

正確使用 HTTP 方法：GET（檢索）、POST（創建）、PUT/PATCH（更新）、DELETE（移除） 。

使用標準 HTTP 狀態碼（例如，400、401、404、500）實作一致且資訊豐富的錯誤處理 。

透過查詢參數支援篩選、排序與分頁 。

API 必須接受並以 JSON 格式回應 。

若為 GraphQL：

設計一個清晰、一致且自我說明的綱要。命名應明確且可預測（例如，addUser、removeUser） 。

使用基於游標的方法（首選 Relay connections）實作高效的分頁 。

有效利用型別系統，在適當情況下將欄位設為非空，以創建更可預測的 API 。

實作防範高成本查詢的保護措施，如深度限制、複雜度分析或超時 。

表格要求： 生成一個標題為「API 端點規格」（REST）或「GraphQL 綱要概覽」（GraphQL）的表格。

端點 (Endpoint)	描述 (Description)	請求主體 (Request Body)	成功回應 (Success Response)	錯誤回應 (Error Responses)
GET /api/users	檢索使用者列表，支援分頁與篩選。	N/A	200 OK - 使用者物件陣列。	401 Unauthorized
POST /api/users	創建一個新使用者。	使用者資料（JSON）	201 Created - 新創建的使用者物件。	400 Bad Request, 409 Conflict
GET /api/users/{id}	檢索特定使用者的詳細資訊。	N/A	200 OK - 單一使用者物件。	401 Unauthorized, 404 Not Found

5.2 後端效能與可擴展性
指令： 後端必須為高效能與可擴展性而設計。

資料庫優化： 實作高效的查詢模式。使用連接池有效管理資料庫連接 。分析並優化慢查詢 。

快取策略： 實作多層快取策略（例如，使用 Redis 等記憶體快取儲存熱點資料，使用 Cache-Control 標頭進行 HTTP 快取），以減少資料庫負載並改善回應時間 。

非同步處理： 對於長時間運行的任務（例如，影片處理、報告生成），使用訊息佇列與背景工作程序進行非同步處理，防止 API 請求阻塞 。

5.3 國際化 (i18n) 架構
指令： 應用程式必須將國際化作為核心功能來建構。

文字外部化： 所有面向使用者的字串必須外部化到特定地區設定的 JSON 檔案中。禁止在應用程式程式碼中硬編碼文字 。

資料結構： 使用巢狀 JSON 格式，按功能或元件組織翻譯字串，提供清晰的命名空間（例如，auth.login.username） 。結構必須支援複數、上下文及動態值的插值 。

Unicode 與 RTL 支援： 從資料庫到 UI 的整個堆疊必須使用 Unicode (UTF-8)。前端必須支援由右至左（RTL）的佈局，適用於阿拉伯語和希伯來語等語言，使用邏輯 CSS 屬性（margin-inline-start 而非 margin-left） 。

第六節：資料持久層
本章節定義了儲存與管理應用程式資料的結構與規則。一個設計良好的資料庫是資料完整性、效能及系統整體穩定性的基礎。

6.1 邏輯資料庫綱要設計
指令： 根據第一節使用者故事中識別的實體與關係設計資料庫綱要。

正規化： 將資料庫正規化至至少第三正規範式（3NF），以最小化資料冗餘並防止更新異常 。

主鍵與外鍵： 每個資料表都必須有一個主鍵（為求彈性，首選代理鍵）。定義外鍵關係以強制參照完整性 。

命名慣例： 對所有資料庫物件（資料表、欄位、索引）遵循一致的命名慣例 。

資料類型： 為每個欄位選擇最合適且高效的資料類型，以優化儲存與效能 。

實體關係圖（ERD）是資料庫綱要的通用藍圖 。雖然無法在文字中生成圖形圖表，但結構化的文字描述可被 AI 解讀以理解完整的資料模型。這種格式允許 AI 清晰地理解實體（資料表）、其屬性（帶有資料類型的欄位）、主/外鍵，以及它們之間關係的基數（一對一、一對多、多對多）。這為生成資料庫遷移腳本提供了精確且無歧義的規格。

表格要求： 生成實體關係圖（ERD）的文字描述。

格式：
\`\`\`
// 實體: Projects
// 描述: 儲存依循 JunAiKey 規範建立的 Web 應用程式專案。
Entity: Projects {
  id: INT, PK, Auto-increment
  uuid: UUID, UNIQUE, Not Null
  name: VARCHAR(255), Not Null
  vision_statement: TEXT, Not Null
  created_at: TIMESTAMP, Not Null, Default NOW()
  updated_at: TIMESTAMP, Not Null, Default NOW()
}

// 實體: Users
// 描述: 系統使用者，例如開發者、專案經理。
Entity: Users {
  id: INT, PK, Auto-increment
  uuid: UUID, UNIQUE, Not Null
  email: VARCHAR(255), UNIQUE, Not Null
  full_name: VARCHAR(255), Not Null
  password_hash: VARCHAR(255), Not Null
  created_at: TIMESTAMP, Not Null, Default NOW()
}

// 實體: ProjectMembers
// 描述: 專案與使用者之間的多對多關聯表，定義成員角色。
Entity: ProjectMembers {
  project_id: INT, PK, FK(Projects.id)
  user_id: INT, PK, FK(Users.id)
  role: VARCHAR(50), Not Null // 例如: 'Architect', 'Frontend Dev', 'Backend Dev'
}

// 實體: UserStories
// 描述: 儲存專案的使用者故事，連結至第一節的需求。
Entity: UserStories {
  id: INT, PK, Auto-increment
  uuid: UUID, UNIQUE, Not Null
  project_id: INT, FK(Projects.id), Not Null
  as_a_role: VARCHAR(255), Not Null
  i_want_to: TEXT, Not Null
  so_that: TEXT, Not Null
  priority: INT, Default 0
  created_at: TIMESTAMP, Not Null, Default NOW()
}

// 實體: AcceptanceCriteria
// 描述: 儲存使用者故事的驗收標準。
Entity: AcceptanceCriteria {
  id: INT, PK, Auto-increment
  user_story_id: INT, FK(UserStories.id), Not Null
  description: TEXT, Not Null
  is_met: BOOLEAN, Default false
}

// 實體: ArchitecturalDecisions
// 描述: 記錄專案的架構決策 (ADRs)，連結至第二節。
Entity: ArchitecturalDecisions {
  id: INT, PK, Auto-increment
  project_id: INT, FK(Projects.id), Not Null
  title: VARCHAR(255), Not Null
  context: TEXT, Not Null
  decision: TEXT, Not Null
  consequences: TEXT, Not Null
  status: VARCHAR(50), Not Null // 例如: 'Proposed', 'Accepted', 'Deprecated'
  created_at: TIMESTAMP, Not Null, Default NOW()
}

// 實體: UIComponents
// 描述: 定義專案設計系統中的 UI 元件，連結至第三節。
Entity: UIComponents {
  id: INT, PK, Auto-increment
  project_id: INT, FK(Projects.id), Not Null
  name: VARCHAR(255), Not Null
  description: TEXT
  specifications_doc_url: VARCHAR(2048)
  status: VARCHAR(50) // 例如: 'In Design', 'In Development', 'Ready'
}

// 實體: APIEndpoints
// 描述: 記錄後端 API 的端點規格，連結至第五節。
Entity: APIEndpoints {
  id: INT, PK, Auto-increment
  project_id: INT, FK(Projects.id), Not Null
  http_method: VARCHAR(10), Not Null // GET, POST, PUT, etc.
  path: VARCHAR(2048), Not Null
  description: TEXT, Not Null
  request_body_schema: JSONB
  success_response_schema: JSONB
  version: VARCHAR(20)
}

// 關係
Relationship: Projects (1) -- has -- (N) ProjectMembers
Relationship: Users (1) -- has -- (N) ProjectMembers
Relationship: Projects (1) -- has -- (N) UserStories
Relationship: UserStories (1) -- has -- (N) AcceptanceCriteria
Relationship: Projects (1) -- has -- (N) ArchitecturalDecisions
Relationship: Projects (1) -- has -- (N) UIComponents
Relationship: Projects (1) -- has -- (N) APIEndpoints
\`\`\`
6.2 資料完整性與效能
指令： 實作確保資料完整性與查詢效能的機制。

使用外鍵強制關係 是在資料完整性與寫入效能/彈性之間的一種權衡。雖然它們保證了一致性，但會增加

INSERT、UPDATE 和 DELETE 操作的開銷。對 AI 的指令必須反映這種細微差別。涉及高頻寫入的使用者故事（例如，記錄分析事件）可能會因外鍵約束而導致效能下降。而涉及關鍵業務資料的使用者故事（例如，將訂單連結到客戶）則絕對需要外鍵提供的完整性以防止孤立記錄。因此，一個更精細的指令是必需的：AI 必須分析第一節的使用者故事，以評估資料關係的關鍵性與寫入頻率。它應被強制要求對所有核心業務實體關係使用外鍵，但對於高流量、非關鍵性資料（如日誌或分析），在明確記錄的前提下，可允許省略它們，只要最終一致性是可接受的。

約束： 使用 NOT NULL、UNIQUE 及 CHECK 約束在資料庫層級強制執行業務規則 。

索引： 在 WHERE 子句、JOIN 條件及 ORDER BY 子句中頻繁使用的欄位上創建索引，以加速查詢效能 。

文件化： 直接在 DDL 腳本中使用註解來記錄綱要，並維護解釋每個資料表與欄位用途的獨立文件 。

第七節：安全與合規框架
本章節確立了應用程式的安全態勢。它提供了不可協商的指令，以預設安全的方式建構系統，防範常見威脅，並確保使用者資料得到負責任的處理。

7.1 OWASP Top 10 緩解授權
指令： 應用程式的架構與編碼必須能防範最新 OWASP Top 10 中列出的所有漏洞。這是一項關鍵的、最高優先級的要求 。必須特別注意：

安全性並非事後添加的功能，而是一個設計良好的系統所固有的特性。漏洞的產生往往不是單一錯誤的結果，而是一系列看似無關的決策鏈所致。例如，「不安全設計」（OWASP A04:2021）的缺陷，如在需求階段未能規劃存取控制，會直接導致實作階段出現「失效的存取控制」（A01:2021）。第一節的使用者故事定義了不同的使用者角色（例如，「管理員」、「使用者」、「訪客」）。如果這些故事的驗收標準沒有明確說明授權規則（例如，「只有管理員可以存取使用者管理頁面」），這就是一個「不安全設計」的缺陷 。當 AI 在第五節生成後端 API 時，它可能會創建一個像

/api/users 這樣的端點而沒有授權檢查，因為需求未被指定。這直接導致了一個「失效的存取控制」漏洞，任何已驗證的使用者都可能存取或修改所有其他使用者的資料 。這形成了一條清晰的因果鏈：第一節中缺失的安全需求 → 不安全的設計 → 第五節中脆弱的實作。因此，對 AI 的指令必須是，在實作第五節的每一個 API 端點時，都必須交叉參考第一節的使用者角色，以預設強制執行授權檢查。

注入 (Injection, A03:2021): 對所有使用者輸入進行清理與參數化，以防止 SQL、NoSQL、OS 及 LDAP 注入。使用 Web 應用程式防火牆（WAF）作為額外的防禦層 。

失效的存取控制 (Broken Access Control, A01:2021): 在每個請求上強制執行功能級別的存取控制。不要依賴客戶端隱藏元素來實現安全。對每個操作與資源存取都驗證使用者授權。透過將內部 ID 映射到使用者可見但不可猜測的 ID，避免不安全的直接物件參照（IDOR） 。

加密機制失效 (Cryptographic Failures, A02:2021): 對所有敏感資料（例如，PII、憑證）在傳輸中（使用 TLS 1.3+）和靜態時（at rest）進行加密。不要使用弱或過時的加密演算法（例如，MD5、SHA1） 。

使用有已知漏洞的元件 (Vulnerable and Outdated Components, A06:2021): 使用依賴性掃描器持續監控並更新所有存在已知漏洞的第三方函式庫與元件 。

7.2 身份驗證與授權
指令： 實作一個穩健的身份驗證與會話管理系統。

身份驗證 (Authentication): 使用安全、基於權杖的身份驗證機制，如 JSON Web Tokens (JWT)。強制執行強密碼策略並實作多因素驗證（MFA） 。

授權 (Authorization): 根據第一節的使用者畫像，實作基於角色的存取控制（RBAC）模型。應用最小權限原則，僅授予使用者執行其任務所必需的權限 。

7.3 安全開發實踐
指令： 在整個開發生命週期中遵循安全編碼實踐。

安全設定錯誤 (Security Misconfiguration, A05:2021): 對堆疊的所有部分進行強化。移除不必要的功能、帳戶與服務。確保設定適當的權限，尤其是在雲端環境中 。

日誌記錄與監控 (Logging and Monitoring): 實作對安全相關事件（例如，登入、存取控制失敗）的全面日誌記錄。監控日誌以發現可疑活動 。`,
          createdAt: new Date().toISOString(),
          tags: ['JunAiKey', 'AI-Codex', 'Prompt-Engineering', 'Genesis-Prompt'],
        }
      ],
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            { ...note, id: new Date().getTime().toString(), createdAt: new Date().toISOString() },
          ],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateNote: (id, data) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...data } : note
          ),
        })),
    }),
    {
      name: 'junaikey-notes-storage',
    }
  )
);