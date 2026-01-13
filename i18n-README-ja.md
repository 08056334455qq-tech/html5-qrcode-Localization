# html5-qrcode 多言語化プロジェクト

このプロジェクトがhtml5-qrcodeライブラリの国際化（i18n）対応版になりました。

## 🌍 実装された機能

### 1. i18nアーキテクチャ
- `/src/i18n/` - 国際化関連のコード
  - `types.ts` - TypeScript型定義とサポートされるロケール
  - `manager.ts` - i18n管理クラス（翻訳の取得、ロケール設定など）
  - `index.ts` - i18nモジュールのエクスポート
  - `/locales/` - 言語リソースファイル
    - `en.ts` - 英語翻訳
    - `ja.ts` - 日本語翻訳

### 2. サポートされる言語
現在実装済み：
- **英語 (en)** - デフォルト
- **日本語 (ja)**

フレームワークが今後の言語追加をサポート：
- スペイン語 (es)
- フランス語 (fr)
- ドイツ語 (de)
- 中国語簡体字 (zh-CN)
- 中国語繁体字 (zh-TW)
- 韓国語 (ko)
- イタリア語 (it)
- ポルトガル語 (pt)
- ロシア語 (ru)
- アラビア語 (ar)
- ヒンディー語 (hi)

### 3. 主要な機能

#### I18nManager クラス
- `setLocale(locale)` - 現在のロケールを設定
- `getLocale()` - 現在のロケールを取得
- `translate(key, params?)` - 翻訳文字列を取得
- `detectAndSetLocale()` - ブラウザの言語を自動検出して設定
- `registerTranslations(locale, translations)` - カスタム翻訳を登録
- `addLocale(locale, translations)` - 新しい言語を追加

#### 更新されたコード
- `src/strings.ts` - すべての文字列クラスがI18nManagerを使用するように更新
- `src/index.ts` - i18n関連のエクスポートを追加

### 4. ドキュメント
- `I18N.md` - 完全な国際化ガイド
  - 基本的な使い方
  - 高度な使用例
  - 新しい言語の追加方法
  - カスタム翻訳
  - 翻訳テンプレート

- `README.md` - i18nサポートの記載を追加
  - キーハイライトセクションに多言語サポートを追加
  - ドキュメントセクションにi18nガイドへのリンクを追加

### 5. 使用例
- `examples/i18n-example.ts` - TypeScriptでの使用例
  - 日本語ロケールの使用
  - 自動言語検出
  - 動的な言語切り替え
  - カスタム翻訳
  - 新しい言語の追加（スペイン語の例）
  - 直接翻訳アクセス

- `examples/html5/i18n-demo.html` - HTML/JavaScriptでのデモ
  - インタラクティブな言語セレクター
  - リアルタイム言語切り替え
  - QRコードスキャン結果の表示

## 📝 使用方法

### 基本的な使い方

```typescript
import { Html5QrcodeScanner, I18nManager, SupportedLocales } from "html5-qrcode";

// 日本語に設定
I18nManager.setLocale(SupportedLocales.JA);

// スキャナーを作成（日本語UIで表示される）
const scanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  false
);
```

### ブラウザの言語を自動検出

```typescript
import { I18nManager } from "html5-qrcode";

// ブラウザの言語を検出して自動設定
I18nManager.detectAndSetLocale();
```

### カスタム翻訳

```typescript
// 特定の翻訳を上書き
I18nManager.registerTranslations(SupportedLocales.EN, {
  html5QrcodeScanner: {
    scanButtonStartScanningText: "Begin Scan",
    scanButtonStopScanningText: "End Scan"
  }
});
```

### 新しい言語の追加

```typescript
// 完全な翻訳オブジェクトを提供して新しい言語を追加
const spanishTranslations = {
  html5Qrcode: { /* 翻訳 */ },
  html5QrcodeScanner: { /* 翻訳 */ },
  libraryInfo: { /* 翻訳 */ }
};

I18nManager.addLocale(SupportedLocales.ES, spanishTranslations);
I18nManager.setLocale(SupportedLocales.ES);
```

## 🔧 技術詳細

### アーキテクチャの変更
1. **下位互換性の維持** - 既存のAPIは変更なし
2. **モジュラー設計** - i18nコードは分離されたモジュール
3. **型安全性** - TypeScriptの完全な型定義
4. **拡張性** - 新しい言語の追加が簡単

### 翻訳のパターン
- プレースホルダー構文: `{paramName}`
- ドット記法によるキー: `html5QrcodeScanner.scanningStatus`
- 深いマージによるカスタム翻訳のサポート

## 🚀 次のステップ

このプロジェクトを完全に機能させるには：

1. **ビルドシステムの更新**
   ```bash
   npm run build
   ```

2. **テストの実行**
   ```bash
   npm test
   ```

3. **追加言語の貢献**
   - `I18N.md`の翻訳テンプレートを使用
   - 新しいロケールファイルを`src/i18n/locales/`に作成
   - マネージャーに翻訳を登録

4. **デモの確認**
   - `examples/html5/i18n-demo.html`をブラウザで開く
   - 言語切り替え機能をテスト

## 📦 パッケージの更新

`package.json`が以下のキーワードで更新されました：
- internationalization
- i18n
- localization
- l10n
- multilingual

## 🤝 貢献

新しい言語翻訳の貢献を歓迎します！詳細は`I18N.md`を参照してください。

---

このプロジェクトは、グローバルな開発者コミュニティをサポートするために多言語化されました。🌍
