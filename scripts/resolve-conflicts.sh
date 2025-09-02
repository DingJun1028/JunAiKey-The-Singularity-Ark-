#!/bin/bash

# JunAiKey 自動化合併衝突解析器執行腳本
# JunAiKey Automated Merge Conflict Resolver Execution Script

echo "🚀 啟動 JunAiKey 自動化合併衝突解析器..."
echo "🚀 Starting JunAiKey Automated Merge Conflict Resolver..."

# 確保在正確的目錄
cd "$(dirname "$0")/.."

# 檢查 Node.js 是否可用
if ! command -v node &> /dev/null; then
    echo "❌ 錯誤: 需要 Node.js 來執行解析器"
    echo "❌ Error: Node.js is required to run the resolver"
    exit 1
fi

# 執行解析器
echo "📊 執行衝突檢測和解析..."
echo "📊 Running conflict detection and resolution..."

node scripts/merge-conflict-resolver.js

# 檢查執行結果
if [ $? -eq 0 ]; then
    echo "✅ 解析器執行完成"
    echo "✅ Resolver execution completed"
else
    echo "❌ 解析器執行失敗"
    echo "❌ Resolver execution failed"
    exit 1
fi

echo ""
echo "📋 如需查看詳細的 git 狀態："
echo "📋 To see detailed git status:"
echo "   git status"
echo "   git log --oneline -5"
echo ""
echo "🎉 自動化合併衝突解析完成！"
echo "🎉 Automated merge conflict resolution completed!"