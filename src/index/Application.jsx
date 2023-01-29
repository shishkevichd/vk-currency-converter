// React
import React from "react";

// VK
import {
  Icon28InfoOutline,
  Icon28AddCircleOutline,
  Icon28CancelOutline,
} from "@vkontakte/icons";
import {
  AppRoot,
  SplitLayout,
  PanelHeader,
  SplitCol,
  View,
  Panel,
  Group,
  SimpleCell,
  Header,
  Spacing,
  FormLayout,
  FormItem,
  Input,
  Button,
} from "@vkontakte/vkui";

export default function Application() {
  const [count, setCount] = React.useState(0);

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>Конвертер валют</PanelHeader>
              <Group header={<Header mode="secondary">Настройки</Header>}>
                <FormLayout>
                  <FormItem top="Из">
                    <Input />
                  </FormItem>
                  <FormItem top="В">
                    <Input />
                  </FormItem>
                  <FormItem>
                    <Button mode="primary" stretched size="l">Конвертировать!</Button>
                  </FormItem>
                </FormLayout>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
