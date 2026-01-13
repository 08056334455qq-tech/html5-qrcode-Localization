# GitHub Codespaces で JSON i18n をテストする方法

## 🎯 Codespaces に最適化されたテスト方法

GitHub Codespaces では localhost が使えないため、以下の方法でテストできます。

## 方法1: インラインテストページ（最も簡単！）✨

### ステップ1: ファイルを開く
```
test-i18n-inline.html
```

### ステップ2: プレビューで開く
VS Code で以下のいずれかの方法：

**オプションA: 右クリックメニュー**
1. `test-i18n-inline.html` を右クリック
2. 「Open with Live Server」または「Open Preview」を選択

**オプションB: コマンドパレット**
1. `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. 「Simple Browser: Show」と入力
3. ファイルのパスを指定

**オプションC: VS Code拡張機能**
1. 「Live Preview」拡張機能をインストール
2. ファイルを右クリック → 「Show Preview」

### このページでできること:
- ✅ 英語⇔日本語の翻訳テスト
- ✅ パラメータ付き翻訳のテスト
- ✅ 全キーの動作確認
- ✅ JSON構造の比較
- ✅ バリデーション実行

## 方法2: Codespaces のポート転送を使用 🌐

### ステップ1: サーバーを起動
```bash
python3 -m http.server 8000
```

### ステップ2: ポートを公開
1. VS Code下部の「PORTS」タブをクリック
2. ポート 8000 が表示される
3. 地球儀アイコンをクリックして公開URLを取得
4. ブラウザでそのURLを開く

### アクセスURL:
```
https://[your-codespace-name]-8000.preview.app.github.dev/test-i18n-inline.html
```

## 方法3: TypeScript/Node.js で直接テスト 💻

### テストファイルを作成: `test-i18n-quick.js`

```javascript
// JSONを直接読み込み
const enTranslations = require('./src/i18n/locales/en.json');
const jaTranslations = require('./src/i18n/locales/ja.json');

// 簡易翻訳関数
function translate(translations, key, params = {}) {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return `[Missing: ${key}]`;
        }
    }
    
    if (typeof value !== 'string') {
        return `[Not a string: ${key}]`;
    }
    
    // パラメータ置換
    return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params.hasOwnProperty(param) ? params[param] : match;
    });
}

console.log('🌍 JSON i18n テスト\n');

// 英語テスト
console.log('📌 英語翻訳:');
console.log('  スキャン中:', translate(enTranslations, 'html5QrcodeScanner.scanningStatus'));
console.log('  開始ボタン:', translate(enTranslations, 'html5QrcodeScanner.scanButtonStartScanningText'));
console.log('  エラー:', translate(enTranslations, 'html5Qrcode.codeParseError', { error: 'Test error' }));

console.log('\n📌 日本語翻訳:');
console.log('  スキャン中:', translate(jaTranslations, 'html5QrcodeScanner.scanningStatus'));
console.log('  開始ボタン:', translate(jaTranslations, 'html5QrcodeScanner.scanButtonStartScanningText'));
console.log('  エラー:', translate(jaTranslations, 'html5Qrcode.codeParseError', { error: 'テストエラー' }));

console.log('\n✅ テスト完了！');
```

### 実行:
```bash
node test-i18n-quick.js
```

## 方法4: VS Code の統合ターミナルで確認 📝

JSONファイルを直接確認:

```bash
# 英語翻訳を表示
cat src/i18n/locales/en.json | jq .

# 日本語翻訳を表示
cat src/i18n/locales/ja.json | jq .

# 構造を比較
diff <(jq -S . src/i18n/locales/en.json) <(jq -S . src/i18n/locales/ja.json)
```

## 🎯 推奨: インラインテストページ

**今すぐ試す:**

1. `test-i18n-inline.html` を開く
2. ファイル内で右クリック → 「Open Preview」
3. ボタンをクリックして各機能をテスト

このファイルは：
- ✨ サーバー不要
- ✨ 全てのJSONを埋め込み済み
- ✨ インタラクティブなUI
- ✨ リアルタイムテスト

## 📊 テストチェックリスト

- [ ] 英語⇔日本語の切り替えができる
- [ ] パラメータ置換が正しく動作する（{error}, {decodedText}）
- [ ] 全てのキーが存在する
- [ ] プレースホルダーが両言語で一致している
- [ ] JSON構造が完全に一致している

## トラブルシューティング 🔧

### プレビューが表示されない
→ 「Live Preview」拡張機能をインストール:
```
Ctrl+Shift+X → "Live Preview" で検索 → インストール
```

### JSONが読み込めない
→ `test-i18n-inline.html` を使用（全てのJSONが埋め込まれています）

### ポートが見つからない
→ VS Code下部の「PORTS」タブを確認。表示されていない場合はサーバーが起動していません。

## 📁 作成されたファイル

- ✅ `test-i18n-inline.html` - **今すぐ使える**インラインテストページ
- ✅ `CODESPACES-TESTING.md` - このガイド
- ✅ `start-test-server.sh` - ローカル用サーバー起動スクリプト

---

**今すぐ試してみましょう！**
👉 `test-i18n-inline.html` を開いてプレビュー
