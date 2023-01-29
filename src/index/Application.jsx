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
} from "@vkontakte/vkui";

export default function Application() {
  const [count, setCount] = React.useState(0);

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VK Mini App</PanelHeader>
              <Group header={<Header mode="secondary">Счёт</Header>}>
                <SimpleCell
                  hasActive={false}
                  hasHover={false}
                  before={<Icon28InfoOutline />}
                  subhead="На вашем счёте"
                >
                  {count}₽
                </SimpleCell>
                <Spacing size={10} />
                <SimpleCell
                  onClick={() => setCount((count) => count + 1)}
                  before={<Icon28AddCircleOutline />}
                >
                  Прибавить
                </SimpleCell>
                <SimpleCell
                  before={<Icon28CancelOutline />}
                  onClick={() => setCount(0)}
                >
                  Обнулить счёт
                </SimpleCell>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}
