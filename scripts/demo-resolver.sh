#!/bin/bash

# 演示自動化合併衝突解析器 (Demonstration of Automated Merge Conflict Resolver)

echo "🎭 JunAiKey 自動化合併衝突解析器演示"
echo "🎭 JunAiKey Automated Merge Conflict Resolver Demo"
echo ""

# 檢查當前狀態
echo "📊 當前儲存庫狀態:"
git status --short
echo ""

# 檢查分支
echo "🌿 可用分支:"
git branch -a | grep -v "HEAD"
echo ""

# 運行衝突解析器
echo "🚀 運行自動化衝突解析器..."
npm run resolve-conflicts
echo ""

# 檢查結果
echo "✅ 解析完成！檢查最近的提交:"
git log --oneline -5
echo ""

echo "📋 如需檢查解析的詳細內容:"
echo "   git show HEAD  # 查看最新提交的詳細內容"
echo "   git diff HEAD~1  # 查看與上一個提交的差異"
echo ""

echo "🎉 演示完成！系統已成功檢測並解析合併衝突。"