import React from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;

const CustomCollapse = ({
  panels,
  defaultActiveKey = ['1'],
  accordion = false,
  bordered = false,
  expandIconPosition = "left",
  ghost = true,
}) => {
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      accordion={accordion}
      bordered={bordered}
      expandIconPosition={expandIconPosition}
      ghost={ghost}
    >
      {panels.map((panel, index) => (
        <Panel header={panel.header} key={panel.key || index}>
          {typeof panel.content === "string" ? (
            <Text>{panel.content}</Text>
          ) : (
            panel.content
          )}
        </Panel>
      ))}
    </Collapse>
  );
};

export default CustomCollapse;
