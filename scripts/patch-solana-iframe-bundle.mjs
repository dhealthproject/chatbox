/**
 * Copies @solana-commerce/react iframe assets into the app and patches:
 * AIDH support, payment memo, fixed amounts, QR decimals, token labels, and AIDH logo.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const vendorIframeDir = path.join(
  root,
  'node_modules/@solana-commerce/kit/node_modules/@solana-commerce/react/dist/iframe'
)
const outDir = path.join(root, 'src/renderer/components/solana/iframe-app')
const aidhLogoPath = path.join(root, 'src/renderer/static/icons/providers/aidh.png')

const AIDH_MINT = 'AidHczUkwDnW7c1Lc89tTiP71dTqeEa52LgV6GxsfwYd'
const AIDH_LOGO_DATA_URL =
  'data:image/png;base64,' + fs.readFileSync(aidhLogoPath).toString('base64')

const PATCHES = [
  {
    name: 'H1 decimals',
    find: 'H1={USDC:6,USDC_DEVNET:6,USDT:6,USDT_DEVNET:6,SOL:9,SOL_DEVNET:9}',
    replace:
      'H1={AIDH:6,USDC:6,USDC_DEVNET:6,USDT:6,USDT_DEVNET:6,SOL:9,SOL_DEVNET:9}',
  },
  {
    name: 'V1 currency list',
    find: 'V1=[{value:"USDC",label:"USD Coin",symbol:"USDC"}',
    replace:
      'V1=[{value:"AIDH",label:"dHealth Intelligence",symbol:"AIDH"},{value:"USDC",label:"USD Coin",symbol:"USDC"}',
  },
  {
    name: 'ka CurrencyMap',
    find: 'var ka={SOL:"SOL",SOL_DEVNET:"SOL",USDC:{mint:ht("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")',
    replace: `var ka={SOL:"SOL",SOL_DEVNET:"SOL",AIDH:{mint:ht("${AIDH_MINT}"),tokenProgram:Yt,decimals:6,symbol:"AIDH",name:"dHealth Intelligence (AIDH)"},USDC:{mint:ht("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")`,
  },
  {
    name: 'cC payment memo with session nonce',
    find: 'function cC(e,t,n,r){let a=(0,Ym.useMemo)(()=>{if(!e||!t||!n)return null;Jv(n);let u=`tip-${Math.floor(Math.random()*1e6)}`',
    replace:
      'function cC(e,t,n,r,a,b){let o=(0,Ym.useMemo)(()=>{if(!e||!t||!n)return null;Jv(n);let u=a?`${b}:${a}`:`tip-${Math.floor(Math.random()*1e6)}`',
  },
  {
    name: 'cC include decimals in paymentData',
    find: 'splToken:l,memo:u,label:r?.label??"commerceKit"',
    replace: 'splToken:l,decimals:f,memo:u,label:r?.label??"commerceKit"',
  },
  {
    name: 'cC useMemo deps + return var',
    find: '},[e,t,n,r]),o=(0,Ym.useMemo)(()=>a?async()=>({...await iC(a.paymentData,a.qrOptions),memo:a.reference}):void 0,[a]),{data:i,loading:c,error:s}=Ks(o,!!a);return{paymentRequest:i,loading:c,error:s}}',
    replace:
      '},[e,t,n,r,a,b]),i=(0,Ym.useMemo)(()=>o?async()=>({...await iC(o.paymentData,o.qrOptions),memo:o.reference}):void 0,[o]),{data:c,loading:s,error:u}=Ks(i,!!o);return{paymentRequest:c,loading:s,error:u}}',
  },
  {
    name: '$v use token decimals in Solana Pay URL',
    find: 'function $v({recipient:e,amount:t,splToken:n,reference:r,label:a,message:o,memo:i}){let c=e.toString(),s=new URL(Km+c);if(t!==void 0){let u=jv(t,eC);s.searchParams.append("amount",u)}',
    replace:
      'function $v({recipient:e,amount:t,splToken:n,reference:r,label:a,message:o,memo:i,decimals:d}){let c=e.toString(),s=new URL(Km+c);if(t!==void 0){let u=jv(t,d??eC);s.searchParams.append("amount",u)}',
  },
  {
    name: 'Ys session nonce state',
    find: 'Ys=(0,or.memo)(({theme:e,config:t,selectedAmount:n,selectedCurrency:r,customAmount:a,showCustomInput:o,onPaymentComplete:i,onPaymentError:c})=>{let s=o?',
    replace:
      'Ys=(0,or.memo)(({theme:e,config:t,selectedAmount:n,selectedCurrency:r,customAmount:a,showCustomInput:o,onPaymentComplete:i,onPaymentError:c})=>{let[R]=(0,or.useState)(()=>`${Date.now()}-${Math.floor(Math.random()*1e6)}`),s=o?',
  },
  {
    name: 'Ys pass paymentMemo and session nonce to cC',
    find: '{paymentRequest:T,loading:D}=cC(t.merchant.wallet,E,r)',
    replace: '{paymentRequest:T,loading:D}=cC(t.merchant.wallet,E,r,void 0,t.paymentMemo,R)',
  },
  {
    name: 'initial amount from fixedAmounts',
    find: 'selectedAmount:5,selectedCurrency:e.allowedMints?.[0]||"USDC"',
    replace:
      'selectedAmount:e.fixedAmounts?.[e.allowedMints?.[0]||"USDC"]??5,selectedCurrency:e.allowedMints?.[0]||"USDC"',
  },
  {
    name: 'SET_CURRENCY updates fixed amount',
    find: 'case"SET_CURRENCY":return{...e,selectedCurrency:t.currency};',
    replace:
      'case"SET_CURRENCY":return{...e,selectedCurrency:t.currency,selectedAmount:t.amount??e.selectedAmount,showCustomInput:!1};',
  },
  {
    name: 'setCurrency passes fixed amount',
    find: 'setCurrency:c=>n({type:"SET_CURRENCY",currency:c})',
    replace: 'setCurrency:c=>n({type:"SET_CURRENCY",currency:c,amount:e.fixedAmounts?.[c]})',
  },
  {
    name: 'AmountSelector presetAmounts prop',
    find: 'ru=(0,vi.memo)(({theme:e,selectedAmount:t,showCustomInput:n,customAmount:r,currencySymbol:a="$",onAmountSelect:o,onCustomToggle:i,onCustomAmountChange:c})=>{',
    replace:
      'ru=(0,vi.memo)(({theme:e,selectedAmount:t,showCustomInput:n,customAmount:r,currencySymbol:a="$",presetAmounts:p=W1,fixedAmount:h,onAmountSelect:o,onCustomToggle:i,onCustomAmountChange:c})=>{',
  },
  {
    name: 'AmountSelector hide custom when fixed',
    find: 'W1.map(f=>(0,yt.jsx)(Jm,{theme:e,amount:f,currencySymbol:a,isSelected:t===f&&!n,onClick:()=>{o(f),i(!1)}},f)),(0,yt.jsx)(Jm,{theme:e,amount:"Custom"',
    replace:
      'p.map(m=>(0,yt.jsx)(Jm,{theme:e,amount:m,currencySymbol:a,isSelected:t===m&&!n,onClick:()=>{o(m),i(!1)}},m)),!h&&(0,yt.jsx)(Jm,{theme:e,amount:"Custom"',
  },
  {
    name: 'tip modal passes fixedAmounts to AmountSelector',
    find: '(0,we.jsx)(ru,{theme:t,selectedAmount:a.selectedAmount,showCustomInput:a.showCustomInput,customAmount:a.customAmount,currencySymbol:X1(a.selectedCurrency),onAmountSelect:o.setAmount,onCustomToggle:o.toggleCustomInput,onCustomAmountChange:o.setCustomAmount})',
    replace:
      '(0,we.jsx)(ru,{theme:t,selectedAmount:a.selectedAmount,showCustomInput:a.showCustomInput,customAmount:a.customAmount,currencySymbol:X1(a.selectedCurrency),presetAmounts:e.fixedAmounts?.[a.selectedCurrency]?[e.fixedAmounts[a.selectedCurrency]]:W1,fixedAmount:e.fixedAmounts?.[a.selectedCurrency],onAmountSelect:o.setAmount,onCustomToggle:o.toggleCustomInput,onCustomAmountChange:o.setCustomAmount})',
  },
  {
    name: 'X1 return currency ticker instead of dollar sign',
    find: 'var X1=e=>"$"',
    replace: 'var X1=e=>e',
  },
  {
    name: 'AmountButton suffix format with locale',
    find: 'children:typeof t=="number"?`${n}${t}`:t',
    replace: 'children:typeof t=="number"?`${t.toLocaleString()} ${n}`:t',
  },
  {
    name: 'Pay button token amount format',
    find: 'function cb(e,t){return t<=0?"0":`$${t.toString()}`}',
    replace: 'function cb(e,t){return t<=0?"0":`${Number(t).toLocaleString()} ${e}`}',
  },
  {
    name: 'AIDH logo data URL constant',
    find: '})},bs=({symbol:e,size:t=24,className:n,customIconUrl:r,"data-testid":a})=>',
    replace: `})},AIDH_LOGO="${AIDH_LOGO_DATA_URL}",bs=({symbol:e,size:t=24,className:n,customIconUrl:r,"data-testid":a})=>`,
  },
  {
    name: 'TokenIcon AIDH case',
    find: 'case"USDT":case"USDT_DEVNET":return(0,Vt.jsx)(em,{size:t,className:n,"data-testid":c});default:return(0,Vt.jsx)(_M,{',
    replace:
      'case"USDT":case"USDT_DEVNET":return(0,Vt.jsx)(em,{size:t,className:n,"data-testid":c});case"AIDH":return(0,Vt.jsx)("img",{src:r||AIDH_LOGO,alt:"AIDH token",width:t,height:t,className:n,style:{borderRadius:"50%"},loading:"lazy",decoding:"async"});default:return(0,Vt.jsx)(_M,{',
  },
  {
    name: 'CurrencySelector currencyLogos prop',
    find: 'nu=(0,MC.memo)(({theme:e,selectedCurrency:t,currencies:n,isOpen:r,onOpenChange:a,onSelect:o})=>',
    replace:
      'nu=(0,MC.memo)(({theme:e,selectedCurrency:t,currencies:n,isOpen:r,onOpenChange:a,onSelect:o,currencyLogos:g})=>',
  },
  {
    name: 'CurrencySelector pass logo to trigger icon',
    find: '(0,ge.jsx)(bs,{symbol:t,size:24,"data-testid":`token-icon-${t}-trigger`})',
    replace:
      '(0,ge.jsx)(bs,{symbol:t,size:24,customIconUrl:g?.[t],"data-testid":`token-icon-${t}-trigger`})',
  },
  {
    name: 'CurrencySelector pass logo to dropdown icon',
    find: '(0,ge.jsx)(bs,{symbol:l.value,size:16,"data-testid":`token-icon-${l.value}-dropdown`})',
    replace:
      '(0,ge.jsx)(bs,{symbol:l.value,size:16,customIconUrl:g?.[l.value],"data-testid":`token-icon-${l.value}-dropdown`})',
  },
  {
    name: 'tip modal pass currencyLogos to CurrencySelector',
    find: '(0,we.jsx)(nu,{theme:t,selectedCurrency:a.selectedCurrency,currencies:s,isOpen:a.currencyDropdownOpen,onOpenChange:o.setCurrencyDropdown,onSelect:o.setCurrency})',
    replace:
      '(0,we.jsx)(nu,{theme:t,selectedCurrency:a.selectedCurrency,currencies:s,isOpen:a.currencyDropdownOpen,onOpenChange:o.setCurrencyDropdown,onSelect:o.setCurrency,currencyLogos:e.currencyLogos})',
  },
  {
    name: 'Select stablecoin updated to Select coin',
    find: 'Select stablecoin',
    replace: 'Select coin',
  },
  {
    name: 'Update header title',
    find: '\"Support \",Kt(t.merchant.name)',
    replace: 'Kt(t.merchant.name)',
  },
  {
    name: 'Update transaction label',
    find: '\"commerceKit\"',
    replace: '\"AIDH Payment\"'
  },
  {
    name: 'Update QR code text content (1)',
    find: '\" $\",',
    replace: '\" \",',
  },
  {
    name: 'Update QR code text content (2)',
    find: '\" $\",',
    replace: '\" \",',
  },
]

function patchBundle(source) {
  let patched = source
  for (const { name, find, replace } of PATCHES) {
    if (!patched.includes(find)) {
      if (patched.includes(replace.slice(0, Math.min(40, replace.length)))) {
        console.log(`  skip ${name} (already patched)`)
        continue
      }
      throw new Error(`Patch target not found: ${name}`)
    }
    patched = patched.replace(find, replace)
  }
  if (!patched.includes('AIDH:{mint:ht("AidH')) {
    throw new Error('AIDH patch verification failed')
  }
  if (!patched.includes('jv(t,d??eC)')) {
    throw new Error('QR decimals patch verification failed')
  }
  if (!patched.includes('case"AIDH":return(0,Vt.jsx)("img"')) {
    throw new Error('AIDH logo patch verification failed')
  }
  if (patched.includes('},var AIDH_LOGO=')) {
    throw new Error('AIDH logo patch produced invalid syntax')
  }
  return patched
}

function writeCurrencyLogosModule() {
  const outPath = path.join(root, 'src/renderer/components/solana/constants/currency-logos.ts')
  const content = `// Auto-generated by patch:solana-iframe — do not edit manually.
// Source: src/renderer/static/icons/providers/aidh.png

export const AIDH_LOGO_DATA_URL = ${JSON.stringify(AIDH_LOGO_DATA_URL)}

/** Default token logos for the Solana payment iframe (data URLs work inside srcDoc CSP). */
export const DEFAULT_CURRENCY_LOGOS = {
  AIDH: AIDH_LOGO_DATA_URL,
} as const
`
  fs.writeFileSync(outPath, content)
}

function main() {
  const vendorJs = path.join(vendorIframeDir, 'index.global.js')
  const vendorCss = path.join(vendorIframeDir, 'index.css')

  if (!fs.existsSync(vendorJs)) {
    throw new Error(`Vendor iframe bundle not found: ${vendorJs}`)
  }
  if (!fs.existsSync(aidhLogoPath)) {
    throw new Error(`AIDH logo not found: ${aidhLogoPath}`)
  }

  fs.mkdirSync(outDir, { recursive: true })

  const js = fs.readFileSync(vendorJs, 'utf8')
  const css = fs.readFileSync(vendorCss, 'utf8')
  const patchedJs = patchBundle(js)

  fs.writeFileSync(path.join(outDir, 'index.global.js'), patchedJs)
  fs.writeFileSync(path.join(outDir, 'index.css'), css)
  writeCurrencyLogosModule()

  const bundleTs = `// This file is auto-generated. Do not edit manually.
// Regenerate: npm run patch:solana-iframe

export const IFRAME_BUNDLE = ${JSON.stringify(patchedJs)}
export const IFRAME_STYLES = ${JSON.stringify(css)}
`

  fs.writeFileSync(path.join(outDir, 'bundle.ts'), bundleTs)

  console.log(`Patched iframe bundle written to ${outDir}`)
}

main()
