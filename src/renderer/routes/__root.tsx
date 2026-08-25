import NiceModal from '@ebay/nice-modal-react'
import { Box, Grid } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createRootRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo, useRef } from 'react'
import { createMessage, type RemoteConfig, type Settings, Theme } from '@/../shared/types'
import ExitFullscreenButton from '@/components/ExitFullscreenButton'
import Toasts from '@/components/Toasts'
import useAppTheme from '@/hooks/useAppTheme'
import { useSystemLanguageWhenInit } from '@/hooks/useDefaultSystemLanguage'
import { useI18nEffect } from '@/hooks/useI18nEffect'
import useScreenChange, { useSidebarWidth } from '@/hooks/useScreenChange'
import useShortcut from '@/hooks/useShortcut'
import { getOS } from '@/packages/navigator'
import * as remote from '@/packages/remote'
import CleanWidnow from '@/pages/CleanWindow'
import PictureDialog from '@/pages/PictureDialog'
import RemoteDialogWindow from '@/pages/RemoteDialogWindow'
import SearchDialog from '@/pages/SearchDialog'
import platform from '@/platform'
import Sidebar from '@/Sidebar'
import * as atoms from '@/stores/atoms'
import * as premiumActions from '@/stores/premiumActions'
import * as settingActions from '@/stores/settingActions'
import '@/modals'
import {
  Avatar,
  Button,
  Checkbox,
  Combobox,
  createTheme,
  type DefaultMantineColor,
  Input,
  type MantineColorsTuple,
  MantineProvider,
  Modal,
  NativeSelect,
  rem,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
  virtualColor,
} from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import storage, { StorageKey } from '@/storage'
import queryClient from '@/stores/queryClient'
import { fetchAidhApiKeyDetails } from '@/packages/aidh-api'
import { AIDH_API_URL } from '@/variables'
import axios from 'axios'
import { useProviderSettings } from '@/hooks/useSettings'
import { createSession, getSessionAsync } from '@/stores/sessionStorageMutations'
import * as sessionActions from '@/stores/sessionActions'
import { SolanaCommerceProvider } from '@/components/SolanaCommerceProvider'

function Root() {
  const location = useLocation()
  const navigate = useNavigate()
  const spellCheck = useAtomValue(atoms.spellCheckAtom)
  const language = useAtomValue(atoms.languageAtom)
  const initialized = useRef(false)

  const setOpenAboutDialog = useSetAtom(atoms.openAboutDialogAtom)
  const setRemoteConfig = useSetAtom(atoms.remoteConfigAtom)
  const { providerSettings, setProviderSettings } = useProviderSettings('aidh')
  const apiKey = providerSettings?.apiKey

  useEffect(() => {
    if (initialized.current) {
      return
    }
    // 通过定时器延迟启动，防止处理状态底层存储的异步加载前错误的初始数据
    const tid = setTimeout(() => {
      ;(async () => {
        await initialCheck(location.searchStr, apiKey, setProviderSettings).catch(
          (err) => console.error('Failed to initialize promo code session:', err)
        )

        await demoCheck(location.searchStr).catch(
          (err) => console.error('Failed to initialize demo session:', err)
        )

        const remoteConfig = await remote
          .getRemoteConfig('setting_chatboxai_first')
          .catch(() => ({ setting_chatboxai_first: false }) as RemoteConfig)
        setRemoteConfig((conf) => ({ ...conf, ...remoteConfig }))
        // 是否需要弹出设置窗口
        initialized.current = true
        if (settingActions.needEditSetting() && location.pathname !== '/settings/mcp') {
          const res = await NiceModal.show('welcome')
          if (res) {
            if (res === 'custom') {
              const provider: string = await NiceModal.show('provider-selector')
              // 用户选择Add Custom Provider的话，暂时无法直接拉起添加自定义供应商的弹窗，先跳去默认的供应商配置页
              if (provider === 'custom') {
                navigate({
                  to: '/settings/provider/aidh',
                  search: {
                    custom: true,
                  },
                } as any)
              } else {
                navigate({
                  to: '/settings/provider/$providerId',
                  params: {
                    providerId: provider,
                  },
                })
              }
            } else {
              navigate({
                to: '/settings/provider/aidh',
              } as any)
            }
          }

          return
        }
        // 是否需要弹出关于窗口（更新后首次启动）
        // 目前仅在桌面版本更新后首次启动、且网络环境为"外网"的情况下才自动弹窗
        const shouldShowAboutDialogWhenStartUp = await platform.shouldShowAboutDialogWhenStartUp()
        if (shouldShowAboutDialogWhenStartUp && remoteConfig.setting_chatboxai_first) {
          setOpenAboutDialog(true)
          return
        }
      })()
    }, 2000)

    return () => clearTimeout(tid)
  }, [navigate, setOpenAboutDialog, setRemoteConfig, location.pathname, location.searchStr, apiKey])

  const [showSidebar] = useAtom(atoms.showSidebarAtom)
  const sidebarWidth = useSidebarWidth()

  const _theme = useAtomValue(atoms.themeAtom)
  const { setColorScheme } = useMantineColorScheme()
  // biome-ignore lint/correctness/useExhaustiveDependencies: setColorScheme is stable
  useEffect(() => {
    if (_theme === Theme.Dark) {
      setColorScheme('dark')
    } else if (_theme === Theme.Light) {
      setColorScheme('light')
    } else {
      setColorScheme('auto')
    }
  }, [_theme])

  // FIXME: 为了从LocalStroage中初始化这两个atom，否则首次get这两个atom可能得到默认值
  useAtom(atoms.chatSessionSettingsAtom)
  useAtom(atoms.pictureSessionSettingsAtom)

  useEffect(() => {
    ;(async () => {
      const settings = await storage.getItem(StorageKey.Settings, {} as Settings)
      const sid = JSON.parse(localStorage.getItem('_currentSessionIdCachedAtom') || '""') as string
      if (sid && settings?.startupPage === 'session') {
        navigate({
          to: `/session/${sid}`,
          replace: true,
        })
      }
    })()
  }, [navigate])

  useEffect(() => {
    if (platform.onNavigate) {
      // 移动端和其他平台的导航监听器
      return platform.onNavigate((path) => {
        navigate({ to: path })
      })
    }
  }, [navigate])

  return (
    <Box className="box-border App" spellCheck={spellCheck} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {platform.type === 'desktop' && (getOS() === 'Windows' || getOS() === 'Linux') && <ExitFullscreenButton />}
      <Grid container className="h-full">
        <Sidebar />
        <Box
          className="h-full w-full"
          sx={{
            flexGrow: 1,
            ...(showSidebar
              ? language === 'ar'
                ? { paddingRight: { sm: `${sidebarWidth}px` } }
                : { paddingLeft: { sm: `${sidebarWidth}px` } }
              : {}),
          }}
        >
          <Outlet />
        </Box>
      </Grid>
      {/* 对话设置 */}
      {/* <AppStoreRatingDialog /> */}
      {/* 代码预览 */}
      {/* <ArtifactDialog /> */}
      {/* 对话列表清理 */}
      {/* <ChatConfigWindow /> */}
      {/* 似乎未使用 */}
      <CleanWidnow />
      {/* 对话列表清理 */}
      {/* <ClearConversationListWindow /> */}
      {/* 导出聊天记录 */}
      {/* <ExportChatDialog /> */}
      {/* 编辑消息 */}
      {/* <MessageEditDialog /> */}
      {/* 添加链接 */}
      {/* <OpenAttachLinkDialog /> */}
      {/* 图片预览 */}
      <PictureDialog />
      {/* 似乎是从后端拉一个弹窗的配置 */}
      <RemoteDialogWindow />
      {/* 手机端举报内容 */}
      {/* <ReportContentDialog /> */}
      {/* 搜索 */}
      <SearchDialog />
      {/* 没有配置模型时的欢迎弹窗 */}
      {/* <WelcomeDialog /> */}
      <Toasts /> {/* mui */}
    </Box>
  )
}

const initialCheck = async(
  searchStr: string,
  apiKey: string | undefined,
  setProviderSettings: (s: { apiKey: string }) => void,
) => {
  try {
    const promoCode = new URLSearchParams(searchStr).get('promoCode')

    if (!apiKey && !promoCode) return;

    if (promoCode) {
      const existingDetails = apiKey ? await getApiKeyDetails(apiKey) : null
      if (!existingDetails || existingDetails.promoCode !== promoCode) {
        apiKey = await redeemPromoCode(promoCode)
        setProviderSettings({ apiKey })
      }
    }

    if (!apiKey) return;

    const apiKeyDetails = await getApiKeyDetails(apiKey);
    const messages = apiKeyDetails.messages ?? []
    if (!messages.length) return

    const sessions = await Promise.all(
      messages.map((m: any) => createFollowUpSession(m.title, m.content))
    )

    await informMessageDeliveries(apiKey, messages.map((m: any) => m.id))

    const lastSessionId = sessions.at(-1)?.id;
    if (lastSessionId) sessionActions.switchCurrentSession(lastSessionId)

  } catch (err) {
    console.error('Failed to initialize promo code session:', err)
  }
}

const demoCheck = async(searchStr: string) => {
  const params = ['pg', 'ph', 'rel', 'liv', 'n', 'age', 'dtype', 'intensity', 'lang']
  const [pgValue, phValue, relValue, livValue, nameValue, ageValue, dtypeValue, intensityValue, langValue] = params.map(
    (param) => new URLSearchParams(searchStr).get(param) ?? undefined
  )

  if (!pgValue || !phValue || !relValue || !livValue ) return;

  const prompt = buildPrompt(
    pgValue,
    phValue,
    relValue,
    livValue,
    nameValue,
    ageValue,
    dtypeValue,
    intensityValue,
    langValue,
  )

  const session = await createDemoSession("Patient Care Demo", prompt, "Hi, how can I help you today?")

  const loaded = await getSessionAsync(session.id)
  console.log('loaded session', loaded?.messages?.length)

  sessionActions.switchCurrentSession(session.id)
  const assistantMsg = createMessage('assistant', '')
  sessionActions.insertMessage(session.id, assistantMsg)
  await sessionActions.generate(session.id, assistantMsg)
}

const buildPrompt = (
  pg: string,
  ph: string,
  rel: string,
  liv: string,
  n?: string,
  age?: string,
  dtype?: string,
  intensity?: string,
  lang: string = 'en'
): string => {
  const she = pg === "f";
  const pron = she ? "she" : "he";
  const poss = she ? "her" : "his";
  const obj  = she ? "her" : "him";
  const person = n ? n : (she ? "the caregiver's relative" : "the caregiver's relative");
  const personShort = n ? n : (she ? "she" : "he");

  var relMap: any = {
    spouse:"the spouse or partner", child:"an adult daughter or son", inlaw:"a child-in-law",
    sibling:"a sibling", other:"a close family member or friend"
  };
  var livMap: any = {
    alone:"lives at home alone", family:"lives at home together with family",
    withme:"lives in the caregiver's household", facility:"lives in a care home"
  };
  var phMap: any = {
    suspected:"There is no confirmed diagnosis yet; the family suspects dementia. Likely themes: recognising early signs, how to raise the topic, arranging an assessment at a memory clinic, uncertainty and worry.",
    lt6m:"The diagnosis was made less than six months ago. Likely themes: processing the diagnosis, informing family and friends, advance care planning (advance directive, power of attorney), understanding what to expect.",
    "6m2y":"The diagnosis was made between six months and two years ago. Likely themes: building daily routines, preserving independence and abilities, first respite and support services, adapting the home.",
    "2y5y":"The diagnosis was made two to five years ago. Likely themes: responding to behavioural changes, day-care and home-care services, sharing care within the family, caregiver exhaustion and guilt.",
    gt5y:"The diagnosis was made more than five years ago. Likely themes: advanced care needs, the decision about residential care, grieving a person who is still alive, sustaining the caregiver's own health."
  };
  var dtypeMap: any = {
    alz:"Alzheimer's disease", vasc:"vascular dementia", lewy:"Lewy body dementia",
    ftd:"frontotemporal dementia", unknown:"an unspecified or mixed form of dementia"
  };
  var intMap: any = {
    livein:"lives with the person and provides care around the clock",
    daily:"provides care in person every day",
    weekly:"provides care in person several times a week",
    distance:"organises and provides care from a distance"
  };
  var langMap: any = {en:"English", de:"German", fr:"French", it:"Italian"};

  var lines = [];
  lines.push("# Care Partner Agent — Dementia (Demo Configuration)");
  lines.push("");
  lines.push("## Role");
  lines.push("You are a Care Partner: a supportive companion for a family caregiver of a person living with dementia. Your purpose is education, orientation, emotional support, and practical everyday guidance for the caregiver. You are a wellness and education tool. You are not a medical device and you do not practise medicine.");
  lines.push("");
  lines.push("## Situation");
  var sit = "The caregiver is " + relMap[rel] + " of a " + (she ? "woman" : "man");
  if(age) sit += " aged " + age.replace("-", " to ").replace("+", " or older");
  sit += (n ? " named " + n : "") + " who is living with " + (dtype ? dtypeMap[dtype] : "dementia") + ".";
  lines.push(sit);
  lines.push((n ? n : "The person") + " " + livMap[liv] + ". The caregiver " + (intensity ? intMap[intensity] : "is closely involved in " + poss + " care") + ".");
  lines.push(ph ? phMap[ph] : "No diagnosis information provided");
  lines.push("");
  lines.push("## Conduct");
  lines.push("- Respond in " + (langMap[lang] || "English") + ". If the caregiver switches language, follow.");
  lines.push("- Address the caregiver directly and warmly. Validate before you inform.");
  lines.push("- Give practical, concrete suggestions for everyday situations: communication, routines, safety at home, respite, self-care.");
  lines.push("- Pay attention to the caregiver's own wellbeing. Ask about it when strain becomes apparent.");
  lines.push("- Refer to Swiss support structures where relevant: Alzheimer Schweiz, Pro Senectute, Spitex, local memory clinics, day-care centres.");
  lines.push("- Keep answers short. One topic at a time. No lists unless asked.");
  lines.push("");
  lines.push("## Safety floor (locked, not modified by configuration)");
  lines.push("- Never diagnose, stage, or assess the progression of any condition.");
  lines.push("- Never recommend, adjust, or comment on medication or treatments.");
  lines.push("- For medical questions, refer to the treating physician or the memory clinic.");
  lines.push("- If the caregiver describes a medical emergency, direct them to call 144 (Switzerland) or their local emergency number immediately.");
  lines.push("- If the caregiver expresses hopelessness or thoughts of self-harm, respond with care and refer to professional support (in Switzerland: Dargebotene Hand, 143).");
  lines.push("- If asked, state plainly that you are an AI support tool for caregivers, not a substitute for medical or psychological care.");
  return lines.join("\n");
}

const getApiKeyDetails = fetchAidhApiKeyDetails

const informMessageDeliveries = async(apiKey: string, messageIds: string[]) => {
  const keyQueryUrl = `${AIDH_API_URL}/message-deliveries`
  const resp = await axios.post(
    keyQueryUrl,
    messageIds,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  )
  return resp.data
}

const redeemPromoCode = async(promoCode: string): Promise<string> => {
  const redemptionUrl = `${AIDH_API_URL}/promotional-codes/redeem`
  const resp = await axios.post(
    redemptionUrl,
    { code: promoCode },
  )
  return resp.data.apiKey
}

const createDemoSession = async (name: string, systemMessage: string, message: string) => {
  systemMessage += "\n\nCompose a first message to the caregiver of a dementia patient using the common-sense model of illness paradigm based on the role, situation, and conduct. Do not address the user by name. Actively offer that they can ask questions."
  return await createSession({
    name,
    type: 'chat',
    messages: [
      {
        id: 'aidh-intro',
        role: 'system',
        model: 'gva/claude-sonnet-5',
        tokensUsed: 0,
        contentParts: [
          {
            type: 'text',
            text: systemMessage,
          },
        ],
      },
      // {
      //   id: 'aidh-intro',
      //   role: 'assistant',
      //   model: 'gva/claude-sonnet-5',
      //   tokensUsed: 0,
      //   contentParts: [
      //     {
      //       type: 'text',
      //       text: message,
      //     },
      //   ],
      // },
    ],
  })
}

const createFollowUpSession = async (name: string, message: string) => {
  return await createSession({
    name,
    type: 'chat',
    messages: [
      {
        id: 'aidh-intro',
        role: 'assistant',
        model: 'gva/claude-sonnet-5',
        tokensUsed: 0,
        contentParts: [
          {
            type: 'text',
            text: message,
          },
        ],
      },
    ],
  })
}

const creteMantineTheme = (scale = 1) =>
  createTheme({
    /** Put your mantine theme override here */
    scale,
    primaryColor: 'chatbox-brand',
    colors: {
      'chatbox-brand': virtualColor({
        name: 'chatbox-brand',
        dark: 'blue',
        light: 'blue',
      }),
      'chatbox-gray': virtualColor({
        name: 'chatbox-gray',
        dark: 'gray',
        light: 'gray',
      }),
      'chatbox-success': virtualColor({
        name: 'chatbox-success',
        dark: 'teal',
        light: 'teal',
      }),
      'chatbox-error': virtualColor({
        name: 'chatbox-error',
        dark: 'red',
        light: 'red',
      }),
      'chatbox-warning': virtualColor({
        name: 'chatbox-warning',
        dark: 'yellow',
        light: 'yellow',
      }),

      'chatbox-primary': [
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-gray-9)',
        'var(--mantine-color-gray-9)',
        'var(--mantine-color-gray-9)',
        'var(--mantine-color-gray-9)',
        'var(--mantine-color-gray-9)',
      ],
      'chatbox-secondary': [
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
      ],
      'chatbox-tertiary': [
        'var(--mantine-color-dark-2)',
        'var(--mantine-color-dark-2)',
        'var(--mantine-color-dark-2)',
        'var(--mantine-color-dark-2)',
        'var(--mantine-color-dark-2)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
      ],

      'chatbox-border-primary': [
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-7)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
      ],
      'chatbox-border-secondary': [
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-6)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
        'var(--mantine-color-gray-4)',
      ],

      'chatbox-background-primary': [
        'var(--mantine-color-dark-7)',
        'var(--mantine-color-dark-7)',
        'var(--mantine-color-dark-7)',
        'var(--mantine-color-dark-7)',
        'var(--mantine-color-dark-7)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
        'var(--mantine-color-white)',
      ],
      'chatbox-background-secondary': [
        'var(--mantine-color-dark-5)',
        'var(--mantine-color-dark-5)',
        'var(--mantine-color-dark-5)',
        'var(--mantine-color-dark-5)',
        'var(--mantine-color-dark-5)',
        'var(--mantine-color-gray-1)',
        'var(--mantine-color-gray-1)',
        'var(--mantine-color-gray-1)',
        'var(--mantine-color-gray-1)',
        'var(--mantine-color-gray-1)',
      ],
      'chatbox-background-tertiary': [
        'var(--mantine-color-dark-4)',
        'var(--mantine-color-dark-4)',
        'var(--mantine-color-dark-4)',
        'var(--mantine-color-dark-4)',
        'var(--mantine-color-dark-4)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
        'var(--mantine-color-gray-3)',
      ],
      'chatbox-background-disabled': [
        'var(--mantine-color-dark-6)',
        'var(--mantine-color-dark-6)',
        'var(--mantine-color-dark-6)',
        'var(--mantine-color-dark-6)',
        'var(--mantine-color-dark-6)',
        'var(--mantine-color-gray-2)',
        'var(--mantine-color-gray-2)',
        'var(--mantine-color-gray-2)',
        'var(--mantine-color-gray-2)',
        'var(--mantine-color-gray-2)',
      ],
      'chatbox-background-error-secondary': [
        'var(--mantine-color-red-9)',
        'var(--mantine-color-red-9)',
        'var(--mantine-color-red-9)',
        'var(--mantine-color-red-9)',
        'var(--mantine-color-red-9)',
        'var(--mantine-color-red-1)',
        'var(--mantine-color-red-1)',
        'var(--mantine-color-red-1)',
        'var(--mantine-color-red-1)',
        'var(--mantine-color-red-1)',
      ],
    },
    headings: {
      fontWeight: 'Bold',
      sizes: {
        h1: {
          fontSize: 'calc(2.5rem * var(--mantine-scale))', // 40px
          lineHeight: '1.2', // 48px
        },
        h2: {
          fontSize: 'calc(2rem * var(--mantine-scale))', // 32px
          lineHeight: '1.25', //  40px
        },
        h3: {
          fontSize: 'calc(1.5rem * var(--mantine-scale))', // 24px
          lineHeight: '1.3333333333', // 32px
        },
        h4: {
          fontSize: 'calc(1.125rem * var(--mantine-scale))', // 18px
          lineHeight: '1.3333333333', // 24px
        },
        h5: {
          fontSize: 'calc(1rem * var(--mantine-scale))', // 16px
          lineHeight: '1.25', // 20px
        },
        h6: {
          fontSize: 'calc(0.75rem * var(--mantine-scale))', // 12px
          lineHeight: '1.3333333333', // 16px
        },
      },
    },
    fontSizes: {
      xxs: 'calc(0.625rem * var(--mantine-scale))', // 10px
      xs: 'calc(0.75rem * var(--mantine-scale))', // 12px
      sm: 'calc(0.875rem * var(--mantine-scale))', // 14px
      md: 'calc(1rem * var(--mantine-scale))', // 16px
      lg: 'calc(1.125rem * var(--mantine-scale))', // 18px
      xl: 'calc(1.25rem * var(--mantine-scale))', // 20px
    },
    lineHeights: {
      xxs: '1.3', // 13px
      xs: '1.3333333333', // 16px
      sm: '1.4285714286', // 20px
      md: '1.5', // 24px
      lg: '1.5555555556', // 28px
      xl: '1.6', // 32px
    },
    radius: {
      xs: 'calc(0.125rem * var(--mantine-scale))',
      sm: 'calc(0.25rem * var(--mantine-scale))',
      md: 'calc(0.5rem * var(--mantine-scale))',
      lg: 'calc(1rem * var(--mantine-scale))',
      xl: 'calc(1.5rem * var(--mantine-scale))',
      xxl: 'calc(2rem * var(--mantine-scale))',
    },
    spacing: {
      '3xs': 'calc(0.125rem * var(--mantine-scale))',
      xxs: 'calc(0.25rem * var(--mantine-scale))',
      xs: 'calc(0.5rem * var(--mantine-scale))',
      sm: 'calc(0.75rem * var(--mantine-scale))',
      md: 'calc(1rem * var(--mantine-scale))',
      lg: 'calc(1.25rem * var(--mantine-scale))',
      xl: 'calc(1.5rem * var(--mantine-scale))',
      xxl: 'calc(2rem * var(--mantine-scale))',
    },
    components: {
      Text: Text.extend({
        defaultProps: {
          size: 'sm',
          c: 'chatbox-primary',
        },
      }),
      Title: Title.extend({
        defaultProps: {
          c: 'chatbox-primary',
        },
      }),
      Button: Button.extend({
        defaultProps: {
          color: 'chatbox-brand',
        },
        styles: () => ({
          root: {
            '--button-height-sm': rem('32px'),
            '--button-height-compact-xs': rem('24px'),
            fontWeight: '400',
          },
        }),
      }),
      Input: Input.extend({
        styles: (_, props) => ({
          wrapper: {
            '--input-height-sm': rem('32px'),
            ...(props.error
              ? {
                  '--input-color': 'var(--mantine-color-chatbox-error-text)',
                  '--input-bd': 'var(--mantine-color-chatbox-error-text)',
                }
              : {}),
          },
        }),
      }),
      TextInput: TextInput.extend({
        defaultProps: {
          size: 'sm',
        },
        styles: () => ({
          label: {
            marginBottom: 'var(--chatbox-spacing-xxs)',
            fontWeight: '600',
            lineHeight: '1.5',
          },
        }),
      }),
      Textarea: TextInput.extend({
        defaultProps: {
          size: 'sm',
        },
        styles: () => ({
          label: {
            marginBottom: 'var(--chatbox-spacing-xxs)',
            fontWeight: '600',
            lineHeight: '1.5',
          },
        }),
      }),
      Select: Select.extend({
        defaultProps: {
          size: 'sm',
          allowDeselect: false,
        },
        styles: () => ({
          label: {
            marginBottom: 'var(--chatbox-spacing-xxs)',
            fontWeight: '600',
            lineHeight: '1.5',
          },
        }),
      }),
      NativeSelect: NativeSelect.extend({
        defaultProps: {
          size: 'sm',
        },
        styles: () => ({
          label: {
            marginBottom: 'var(--chatbox-spacing-xxs)',
            fontWeight: '600',
            lineHeight: '1.5',
          },
        }),
      }),
      Switch: Switch.extend({
        defaultProps: {
          size: 'sm',
        },
        styles: (_, props) => {
          return {
            label: {
              color: props.checked
                ? 'var(--mantine-color-chatbox-primary-text)'
                : 'var(--mantine-color-chatbox-tertiary-text)',
            },
          }
        },
      }),
      Checkbox: Checkbox.extend({
        defaultProps: {
          size: 'sm',
        },
        styles: (_, props) => ({
          label: {
            color: props.checked
              ? 'var(--mantine-color-chatbox-primary-text)'
              : 'var(--mantine-color-chatbox-tertiary-text)',
          },
        }),
      }),
      Modal: Modal.extend({
        defaultProps: {
          zIndex: 2000,
        },
        styles: () => ({
          title: {
            fontWeight: '600',
            color: 'var(--mantine-color-chatbox-primary-text)',
            fontSize: 'var(--mantine-font-size-sm)',
          },
          close: {
            width: rem('24px'),
            height: rem('24px'),
            color: 'var(--mantine-color-chatbox-secondary-text)',
          },
        }),
      }),
      Combobox: Combobox.extend({
        defaultProps: {
          shadow: 'md',
        },
      }),
      Avatar: Avatar.extend({
        styles: () => ({
          image: {
            objectFit: 'contain',
          },
        }),
      }),
    },
  })

export const Route = createRootRoute({
  component: () => {
    useI18nEffect()
    premiumActions.useAutoValidate() // 每次启动都执行 license 检查，防止用户在lemonsqueezy管理页面中取消了当前设备的激活
    useSystemLanguageWhenInit()
    useShortcut()
    useScreenChange()
    const theme = useAppTheme()
    const _theme = useAtomValue(atoms.themeAtom)
    const settings = useAtomValue(atoms.settingsAtom)
    const scale = settings.fontSize / 14
    const mantineTheme = useMemo(() => creteMantineTheme(scale), [scale])

    return (
      <QueryClientProvider client={queryClient}>
        <SolanaCommerceProvider>
          <MantineProvider
            theme={mantineTheme}
            defaultColorScheme={_theme === Theme.Dark ? 'dark' : _theme === Theme.Light ? 'light' : 'auto'}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NiceModal.Provider>
                <Root />
              </NiceModal.Provider>
            </ThemeProvider>
          </MantineProvider>
        </SolanaCommerceProvider>
      </QueryClientProvider>
    )
  },
})

type ExtendedCustomColors =
  | 'chatbox-brand'
  | 'chatbox-gray'
  | 'chatbox-success'
  | 'chatbox-error'
  | 'chatbox-warning'
  | 'chatbox-primary'
  | 'chatbox-secondary'
  | 'chatbox-tertiary'
  | 'chatbox-border-primary'
  | 'chatbox-border-secondary'
  | 'chatbox-background-error-secondary'
  | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}
