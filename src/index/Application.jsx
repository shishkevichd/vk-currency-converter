// React
import React from "react";

// VK
import {
  AppRoot,
  SplitLayout,
  PanelHeader,
  SplitCol,
  View,
  Panel,
  Group,
  Header,
  Checkbox,
  FormLayout,
  FormItem,
  Input,
  Button,
  SimpleCell,
  Spinner,
  NativeSelect,
  FormLayoutGroup,
  ConfigProvider,
  AdaptivityProvider,
} from "@vkontakte/vkui";

// VK Bridge
import bridge from "@vkontakte/vk-bridge";

export default function Application() {
  const [buttonActive, setButtonActive] = React.useState(false)
  const [fromValue, setFromValue] = React.useState("usd")
  const [toValue, setToValue] = React.useState("rub")
  const [result, setResultValue] = React.useState({
    status: "passive",
    data: {}
  })
  const [availableCurriences, setAvailableCurriences] = React.useState([])
  const [currentMoney, setCurrentMoney] = React.useState("1");
  const [loadingState, setLoadingState] = React.useState(true)

  const [appearance, setAppearance] = React.useState("light")

  React.useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setAvailableCurriences(Object.keys(data))
        setLoadingState(false)
      })
  }, [])

  bridge.subscribe((event) => {
    if (event.detail.type == "VKWebAppUpdateConfig") {
      setAppearance(event.detail.data.appearance)
    }
  })

  const convertValue = () => {
    setResultValue({
      status: "loading",
      data: {}
    })

    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromValue}/${toValue}.json`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setResultValue(
          {
            status: "active",
            data: {
              fromValue: fromValue,
              toValue: toValue,
              value: currentMoney,
              currency: data[toValue]
            }
          }
        )
      })
      .catch(() => {
        setResultValue(
          {
            status: "error",
            data: {}
          }
        )
      })
  }

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout header={<PanelHeader separator={false} />}>
            <SplitCol>
              <View activePanel="main">
                <Panel id="main">
                  <PanelHeader>Конвертер валют</PanelHeader>
                  <Group header={<Header mode="secondary">Настройки</Header>}>
                    {loadingState ? (
                      <Spinner />
                    ) : (
                      <FormLayout>
                        <FormLayoutGroup mode="horizontal" segmented>
                          <FormItem top="Из какой валюты?">
                            <Input onChange={(e) => setCurrentMoney(e.target.value)} value={currentMoney} />
                          </FormItem>
                          <FormItem>
                            <NativeSelect onChange={(e) => setFromValue(e.target.value)} value={fromValue}>
                              {availableCurriences.map((cur) => (
                                <option key={cur} value={cur}>{cur.toUpperCase()}</option>
                              ))}
                            </NativeSelect>
                          </FormItem>
                        </FormLayoutGroup>
                        <FormItem top="В какую валюту?">
                          <NativeSelect onChange={(e) => setToValue(e.target.value)} value={toValue}>
                            {availableCurriences.map((cur) => (
                              <option value={cur}>{cur.toUpperCase()}</option>
                            ))}
                          </NativeSelect>
                        </FormItem>
                        <Checkbox onChange={(e) => setButtonActive(e.target.checked)} checked={buttonActive}>Активировать кнопку</Checkbox>
                        <FormItem>
                          <Button onClick={convertValue} disabled={!buttonActive} mode="primary" stretched size="l">Конвертировать!</Button>
                        </FormItem>
                      </FormLayout>
                    )}
                  </Group>
                  {!["passive", "error"].includes(result.status) ? (
                    <Group header={<Header mode="secondary">Результат</Header>}>
                      {result.status == "active" ? (
                        <SimpleCell subtitle={`${result.data["fromValue"].toUpperCase()} => ${result.data["toValue"].toUpperCase()}`}>
                          {Math.floor(result.data["value"] * result.data["currency"])}
                        </SimpleCell>
                      ) : (
                        <Spinner />
                      )}
                    </Group>
                  ) : null}
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
