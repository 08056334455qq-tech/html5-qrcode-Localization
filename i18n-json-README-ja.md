# JSON-Based Internationalization (i18n) README

## 🎉 JSONベースの多言語化システムに変更されました

html5-qrcodeライブラリは、翻訳管理を容易にするため、**JSONファイルベース**の多言語化システムに変更されました。

## 📁 ファイル構造

```
src/i18n/
├── types.ts                      # TypeScript型定義
├── manager.ts                    # i18nマネージャー
├── loader.ts                     # JSONローダーとバリデーター
├── index.ts                      # モジュールエクスポート
└── locales/
    ├── en.json                   # 英語翻訳
    ├── ja.json                   # 日本語翻訳
    ├── template.json             # 新しい言語用のテンプレート
    └── translation-schema.json   # バリデーション用JSONスキーマ
```

## ✨ 主な機能

### 1. JSONファイルからの翻訳読み込み

```typescript
import { I18nManager, SupportedLocales } from "html5-qrcode";

// 日本語に設定
I18nManager.setLocale(SupportedLocales.JA);
```

### 2. 動的な翻訳の読み込み

```typescript
// URLから翻訳を読み込む
await I18nManager.loadTranslationFromURL(
  SupportedLocales.ES,
  '/locales/es.json'
);

// JSONオブジェクトから読み込む
I18nManager.loadTranslationFromJSON(
  SupportedLocales.FR,
  frenchTranslationObject
);

// JSON文字列から読み込む
I18nManager.loadTranslationFromString(
  SupportedLocales.DE,
  jsonString
);
```

### 3. 自動バリデーション

すべての翻訳ファイルは、JSON Schemaに基づいて自動的に検証されます：
- 必須フィールドがすべて存在するか
- すべての値が文字列型か
- タイポによる余分なフィールドがないか

### 4. ブラウザ言語の自動検出

```typescript
// ブラウザの言語を自動検出して設定
const detectedLocale = I18nManager.detectAndSetLocale();
```

## 🌐 翻訳の作成方法

### ステップ1: テンプレートをコピー

```bash
cp src/i18n/locales/template.json src/i18n/locales/es.json
```

### ステップ2: 翻訳する

`template.json`の`[Your translation here]`を翻訳で置き換えます：

```json
{
  "html5Qrcode": {
    "scannerPaused": "スキャナーが一時停止しました"
  },
  "html5QrcodeScanner": {
    "scanningStatus": "スキャン中",
    "idleStatus": "待機中"
  },
  "libraryInfo": {
    "poweredBy": "提供: "
  }
}
```

### ステップ3: プレースホルダーに注意

一部の文字列には、動的な値に置き換えられるプレースホルダーがあります：

- `{error}` - エラーメッセージに置き換えられます
- `{decodedText}` - スキャンされたコードに置き換えられます

**プレースホルダーは翻訳しないでください！**

```json
{
  "codeParseError": "エラー: {error}",
  "lastMatch": "最後のマッチ: {decodedText}"
}
```

## 💡 なぜJSON？

### プログラミング知識不要
- TypeScriptの知識がなくても翻訳に貢献できます
- 任意のテキストエディタで編集可能
- JSON構文は学習が簡単

### バリデーション
- JSON Schemaによる自動検証
- 翻訳の完全性を保証
- タイポや欠落を防止

### 動的読み込み
- 実行時にURLから翻訳を読み込み可能
- ユーザーがカスタム翻訳をアップロード可能
- CDNからの配信に最適

### バージョン管理に優れている
- 差分が見やすい
- レビューしやすい
- マージコンフリクトが少ない

## 📚 完全なドキュメント

詳細なガイドは以下を参照してください：

- **[I18N-JSON.md](./I18N-JSON.md)** - 完全なJSON i18nガイド（英語）
- **[I18N.md](./I18N.md)** - 一般的なi18nガイド

## 🎯 使用例

### HTML例

`examples/html5/i18n-json-demo.html`を参照してください：
- 動的な言語切り替え
- カスタムURLからの翻訳読み込み
- リアルタイムプレビュー

### TypeScript例

```typescript
import { 
  Html5QrcodeScanner, 
  I18nManager, 
  SupportedLocales 
} from "html5-qrcode";

async function init() {
  // ブラウザ言語を検出
  I18nManager.detectAndSetLocale();

  // または特定の言語を設定
  I18nManager.setLocale(SupportedLocales.JA);

  // スキャナーを作成（設定された言語で表示）
  const scanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
  );

  scanner.render(
    (decodedText) => console.log(`スキャン完了: ${decodedText}`),
    (error) => {}
  );
}

init();
```

## 🤝 翻訳への貢献

### 翻訳者の方へ（プログラミング不要！）

1. **テンプレートをダウンロード**
   - `src/i18n/locales/template.json`を取得

2. **翻訳する**
   - テキストエディタで開く
   - `[Your translation here]`を翻訳で置き換え
   - プレースホルダー（`{error}`など）はそのまま残す

3. **検証（推奨）**
   - オンラインJSONバリデーターを使用
   - `translation-schema.json`に対して検証

4. **提出**
   - GitHubでプルリクエストを作成
   - またはメールで翻訳JSONを送信

## 🌍 サポートされる言語

現在実装済み：
- 🇬🇧 英語 (en)
- 🇯🇵 日本語 (ja)

フレームワークがサポート準備完了：
- 🇪🇸 スペイン語 (es)
- 🇫🇷 フランス語 (fr)
- 🇩🇪 ドイツ語 (de)
- 🇨🇳 中国語簡体字 (zh-CN)
- 🇹🇼 中国語繁体字 (zh-TW)
- 🇰🇷 韓国語 (ko)
- 🇮🇹 イタリア語 (it)
- 🇵🇹 ポルトガル語 (pt)
- 🇷🇺 ロシア語 (ru)
- 🇸🇦 アラビア語 (ar)
- 🇮🇳 ヒンディー語 (hi)

## 📋 API リファレンス

### I18nManager主要メソッド

```typescript
// ロケール設定
I18nManager.setLocale(SupportedLocales.JA);

// 現在のロケール取得
const locale = I18nManager.getLocale();

// JSONから翻訳を読み込み
I18nManager.loadTranslationFromJSON(locale, jsonObject);

// URLから翻訳を読み込み（非同期）
await I18nManager.loadTranslationFromURL(locale, url);

// 翻訳文字列を取得
const text = I18nManager.translate('html5QrcodeScanner.scanningStatus');

// パラメータ付きで翻訳を取得
const error = I18nManager.translate('html5Qrcode.codeParseError', {
  error: 'Invalid format'
});

// ブラウザ言語を自動検出
I18nManager.detectAndSetLocale();
```

## 🔍 トラブルシューティング

### 翻訳が読み込まれない

```typescript
// 翻訳が読み込まれているか確認
if (I18nManager.getLocale() !== SupportedLocales.ES) {
  console.error('スペイン語が読み込まれていません');
}
```

### バリデーションエラー

```typescript
try {
  I18nManager.loadTranslationFromJSON(locale, invalidJSON);
} catch (error) {
  console.error('バリデーション失敗:', error.message);
}
```

## 📄 ライセンス

翻訳はhtml5-qrcodeプロジェクトの一部であり、Apache 2.0ライセンスに従います。

## 🙏 謝辞

世界中のユーザーがこのライブラリを利用できるようにしてくださっているすべての翻訳者に感謝します！
